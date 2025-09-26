"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

interface SimplePageTransitionProps {
  children: React.ReactNode;
}

export default function SimplePageTransition({
  children,
}: SimplePageTransitionProps) {
  const pathname = usePathname();
  const pageRef = useRef<HTMLDivElement>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const previousPathname = useRef<string>("");

  const { contextSafe } = useGSAP(() => {
    // Always start with opacity 0 to prevent FOUC
    gsap.set(pageRef.current, {
      opacity: 0,
    });
  }, []);

  const animateIn = contextSafe(() => {
    gsap.to(pageRef.current, {
      opacity: 1,
      duration: isFirstLoad ? 0.8 : 0.6,
      ease: "power2.out",
      delay: isFirstLoad ? 0.1 : 0,
    });
  });

  useEffect(() => {
    if (isFirstLoad) {
      // First load - just animate in
      setIsFirstLoad(false);
      previousPathname.current = pathname || "";
      animateIn();
    } else if (previousPathname.current !== pathname) {
      // Page change - smooth transition
      const tl = gsap.timeline();

      tl.to(pageRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      }).to(pageRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });

      previousPathname.current = pathname || "";
    }
  }, [pathname, animateIn, isFirstLoad]);

  return (
    <div
      ref={pageRef}
      className="page-transition"
      style={{ opacity: 0 }} // Inline style to prevent FOUC before GSAP takes over
    >
      {children}
    </div>
  );
}
