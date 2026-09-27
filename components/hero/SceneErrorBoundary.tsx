"use client";

import { Component, type ReactNode } from "react";

export class SceneErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Decorative background only — a WebGL/runtime failure here should never
    // surface to the visitor as a broken page, just a quiet fallback.
    console.warn("3D hero background failed to render, using static fallback:", error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
