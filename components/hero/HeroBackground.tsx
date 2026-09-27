"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CircuitField } from "@/components/ui/CircuitField";
import { SceneErrorBoundary } from "@/components/hero/SceneErrorBoundary";
import { isWebGLAvailable } from "@/lib/webgl";

type Tier = "mobile" | "tablet" | "desktop";

// Loaded only on the client, only once we've already decided the 3D scene is
// appropriate — this keeps three.js/@react-three/fiber entirely out of the
// initial page bundle for every visitor who doesn't end up needing it
// (reduced-motion users, unsupported browsers, and the brief instant before
// the check below resolves for everyone else).
const CircuitNetwork = dynamic(
  () => import("@/components/hero/CircuitNetwork").then((m) => m.CircuitNetwork),
  { ssr: false }
);

function getTier(width: number): Tier {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

export function HeroBackground() {
  // Start with the static fallback so Hero content renders immediately with
  // zero layout shift; only upgrade to the 3D scene once we've confirmed the
  // visitor's setup genuinely supports and wants it.
  const [use3D, setUse3D] = useState(false);
  const [tier, setTier] = useState<Tier>("desktop");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return; // never even check WebGL — stay on the fallback

    if (!isWebGLAvailable()) return;

    setTier(getTier(window.innerWidth));
    setUse3D(true);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {use3D ? (
        <SceneErrorBoundary fallback={<CircuitField />}>
          <CircuitNetwork tier={tier} />
        </SceneErrorBoundary>
      ) : (
        <CircuitField />
      )}
    </div>
  );
}
