"use client";

import { useLenis } from "lenis/react";

export default function ScrollProgress() {
  const lenis = useLenis((lenis) => {
    // This callback runs on every scroll
    // You can access lenis.scroll, lenis.limit, lenis.progress, etc.
  });

  // Get current scroll progress (0 to 1)
  const progress = lenis?.progress || 0;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-100"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
