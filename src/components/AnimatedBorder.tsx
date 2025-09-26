"use client";
import { useRef, ReactNode, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedBorderProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedBorder({
  children,
  className = "",
}: AnimatedBorderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!wrapperRef.current || !borderRef.current) return;

    // Set initial state - border starts from 0 width
    gsap.set(borderRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
    });

    // Create the animation
    gsap.to(borderRef.current, {
      scaleX: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
        refreshPriority: -1,
      },
    });
  }, []);

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {children}
      {/* Animated border line */}
      <div
        ref={borderRef}
        className="bg-primary absolute bottom-0 left-0 h-px w-full origin-left"
      />
    </div>
  );
}
