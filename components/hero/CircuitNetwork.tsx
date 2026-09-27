"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Deep teal / terracotta only — the Phase 3 accent pair, nothing else.
const TEAL = new THREE.Color("#0F5B66");
const TERRACOTTA = new THREE.Color("#E06D53");

type Tier = {
  nodeCount: number;
  maxConnectionsPerNode: number;
  connectionDistance: number;
  particleCount: number;
};

const TIERS: Record<"mobile" | "tablet" | "desktop", Tier> = {
  mobile: { nodeCount: 14, maxConnectionsPerNode: 2, connectionDistance: 2.6, particleCount: 18 },
  tablet: { nodeCount: 26, maxConnectionsPerNode: 2, connectionDistance: 2.8, particleCount: 40 },
  desktop: { nodeCount: 42, maxConnectionsPerNode: 3, connectionDistance: 3.1, particleCount: 70 },
};

// Small seeded PRNG so the network's layout is stable across reloads instead
// of reshuffling every mount (a fixed, intentional-looking composition reads
// as "designed"; a different random scatter every visit reads as noise).
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildNetwork(tier: Tier) {
  const rand = mulberry32(1337);
  const positions: THREE.Vector3[] = [];
  const isAccent: boolean[] = [];

  for (let i = 0; i < tier.nodeCount; i++) {
    // Spread across a wide, short box so the network reads as a broad,
    // shallow layer behind the content rather than a centered blob.
    const x = (rand() - 0.5) * 13;
    const y = (rand() - 0.5) * 7;
    const z = (rand() - 0.5) * 5.5; // foreground/midground/background depth
    positions.push(new THREE.Vector3(x, y, z));
    isAccent.push(rand() < 0.18); // ~18% terracotta accent nodes, rest teal
  }

  // Structured nearest-neighbor connections, capped per node, rather than a
  // dense random mesh — keeps the network reading as a circuit/graph rather
  // than a spider-web.
  const segments: number[] = [];
  const segmentColors: number[] = [];
  const connectionCounts = new Array(tier.nodeCount).fill(0);

  for (let i = 0; i < positions.length; i++) {
    if (connectionCounts[i] >= tier.maxConnectionsPerNode) continue;
    const distances: { j: number; d: number }[] = [];
    for (let j = 0; j < positions.length; j++) {
      if (i === j) continue;
      const d = positions[i].distanceTo(positions[j]);
      if (d <= tier.connectionDistance) distances.push({ j, d });
    }
    distances.sort((a, b) => a.d - b.d);

    for (const { j } of distances) {
      if (connectionCounts[i] >= tier.maxConnectionsPerNode) break;
      if (connectionCounts[j] >= tier.maxConnectionsPerNode) continue;

      const a = positions[i];
      const b = positions[j];
      segments.push(a.x, a.y, a.z, b.x, b.y, b.z);

      const c1 = isAccent[i] ? TERRACOTTA : TEAL;
      const c2 = isAccent[j] ? TERRACOTTA : TEAL;
      segmentColors.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b);

      connectionCounts[i]++;
      connectionCounts[j]++;
    }
  }

  return { positions, isAccent, segments, segmentColors };
}

function Nodes({ positions, isAccent }: { positions: THREE.Vector3[]; isAccent: boolean[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const phases = useMemo(() => positions.map(() => Math.random() * Math.PI * 2), [positions]);

  // Color is the only thing that needs setting once on mount — the instance
  // matrices (position/scale) are fully (re)computed every frame in useFrame
  // below anyway, before the first frame is ever painted, so duplicating
  // that work here was wasted computation with no visible effect.
  useEffect(() => {
    if (!meshRef.current) return;
    isAccent.forEach((accent, i) => {
      meshRef.current!.setColorAt(i, accent ? TERRACOTTA : TEAL);
    });
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [isAccent]);

  // Gentle per-node vertical drift — written straight to the instance
  // matrices inside the WebGL render loop, never via React state.
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    positions.forEach((pos, i) => {
      dummy.position.set(pos.x, pos.y + Math.sin(t * 0.15 + phases[i]) * 0.08, pos.z);
      dummy.scale.setScalar(isAccent[i] ? 0.075 : 0.055);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, positions.length]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshBasicMaterial vertexColors transparent opacity={0.85} />
    </instancedMesh>
  );
}

function Connections({ segments, segmentColors }: { segments: number[]; segmentColors: number[] }) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(segments, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(segmentColors, 3));
    return geo;
  }, [segments, segmentColors]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial vertexColors transparent opacity={0.22} />
    </lineSegments>
  );
}

function Particles({ count }: { count: number }) {
  const geometry = useMemo(() => {
    const rand = mulberry32(99);
    const pts = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pts[i * 3] = (rand() - 0.5) * 15;
      pts[i * 3 + 1] = (rand() - 0.5) * 8;
      pts[i * 3 + 2] = (rand() - 0.5) * 6;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return geo;
  }, [count]);

  return (
    <points geometry={geometry}>
      <pointsMaterial color={TEAL} size={0.035} transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

// Reads the pointer via a plain window listener into a ref (never React
// state) and slowly rotates the whole network group toward it — a single
// lerp per frame inside useFrame, decoupled entirely from the canvas's own
// pointer-events (which stay disabled so clicks pass through to Hero content).
function NetworkGroup({ tier }: { tier: Tier }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const enableParallax = useRef(false);

  useEffect(() => {
    enableParallax.current = !window.matchMedia("(pointer: coarse)").matches;
    if (!enableParallax.current) return;

    function onPointerMove(e: PointerEvent) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  const network = useMemo(() => buildNetwork(tier), [tier]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Very slow constant rotation.
    groupRef.current.rotation.y += delta * 0.02;

    // Extremely subtle parallax tilt, smoothly lerped — never a direct jump.
    if (enableParallax.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointer.current.y * 0.06,
        0.02
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -pointer.current.x * 0.04,
        0.02
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Nodes positions={network.positions} isAccent={network.isAccent} />
      <Connections segments={network.segments} segmentColors={network.segmentColors} />
      <Particles count={tier.particleCount} />
    </group>
  );
}

export function CircuitNetwork({ tier }: { tier: "mobile" | "tablet" | "desktop" }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 9], fov: 42 }}
    >
      <NetworkGroup tier={TIERS[tier]} />
    </Canvas>
  );
}
