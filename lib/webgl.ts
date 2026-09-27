// Cheap, synchronous WebGL support check used before ever importing the
// three.js/@react-three/fiber bundle — if this returns false, the dynamic
// import for the 3D scene is never triggered at all, and the static
// CircuitField fallback is used instead.
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}
