"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ParallaxImageProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxImage({
  children,
  speed = 0.5,
  className = "",
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !contentRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const isVisible = rect.bottom >= 0 && rect.top <= window.innerHeight;

      if (isVisible) {
        // Calculate the parallax offset based on how much of the container is visible
        const scrollProgress =
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const parallaxOffset = (scrollProgress - 0.5) * 100 * speed;

        contentRef.current.style.transform = `translateY(${parallaxOffset}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div ref={contentRef} className="relative h-full w-full">
        {children}
      </div>
    </div>
  );
}
