"use client";

import Logo from "./Logo3";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Register the useGSAP hook
gsap.registerPlugin(useGSAP);

interface PageLoaderProps {
  onComplete?: () => void;
  onReady?: () => void;
}

export default function PageLoader({ onComplete, onReady }: PageLoaderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const logoOverlayRef = useRef<HTMLDivElement | null>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  // Block scroll when loader is visible
  useEffect(() => {
    if (isVisible) {
      // Prevent scroll on body
      document.body.style.overflow = "hidden";
      // Also prevent scroll on html element for better browser compatibility
      document.documentElement.style.overflow = "hidden";
    } else {
      // Restore scroll when loader is hidden
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    // Cleanup function to restore scroll if component unmounts
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isVisible]);

  useGSAP(
    () => {
      const createBlocks = () => {
        if (!overlayRef.current) return;
        overlayRef.current.innerHTML = "";
        blocksRef.current = [];

        for (let i = 0; i < 20; i++) {
          const block = document.createElement("div");
          // Using exact same inline styles as page transition
          block.style.cssText = `
            flex: 1;
            height: 100%;
            background-color: var(--color-primary);
            min-width: 0;
            transform-origin: right;
            box-sizing: border-box;
            width: calc(100% + 2px);
            margin-right: -2px;
          `;
          overlayRef.current.appendChild(block);
          blocksRef.current.push(block);
        }
      };

      const startLoaderAnimation = () => {
        if (
          !logoRef.current ||
          !logoOverlayRef.current ||
          !blocksRef.current.length
        ) {
          console.warn("PageLoader: Required refs not available");
          if (onComplete) onComplete();
          return;
        }

        // Start with blocks covering the entire page
        gsap.set(blocksRef.current, { scaleX: 1, transformOrigin: "right" });
        gsap.set(logoOverlayRef.current, { opacity: 1 });

        // Signal that PageLoader is ready and covering the page
        if (onReady) onReady();

        // Set initial logo state (same as PageTransition4)
        gsap.set(logoRef.current, {
          y: 100,
          opacity: 0,
        });

        // Wait for page to load, then animate out
        const checkPageLoaded = () => {
          // Check if page is loaded (DOM ready and images loaded)
          if (document.readyState === "complete") {
            startExitAnimation();
          } else {
            // Fallback: start animation after minimum time
            setTimeout(startExitAnimation, 1500);
          }
        };

        const startExitAnimation = () => {
          // Check if all elements are still available
          if (
            !logoRef.current ||
            !logoOverlayRef.current ||
            !blocksRef.current.length
          ) {
            console.warn(
              "PageLoader: Elements not available for exit animation",
            );
            setIsVisible(false);
            if (onComplete) onComplete();
            return;
          }

          const tl = gsap.timeline({
            onComplete: () => {
              // Hide the entire loader
              setIsVisible(false);
              if (onComplete) onComplete();
            },
          });

          // Animate logo slide up first
          tl.to(logoRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          })
            .to(
              logoRef.current,
              {
                y: -50,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
              },
              "+=0.4",
            )
            .to(
              logoOverlayRef.current,
              {
                opacity: 0,
                duration: 0.2,
                ease: "power2.inOut",
              },
              "-=0.1",
            )
            // Then animate blocks out to reveal the page
            .to(
              blocksRef.current,
              {
                scaleX: 0,
                duration: 0.6,
                stagger: 0.015,
                ease: "power2.out",
                transformOrigin: "right",
              },
              "-=0.1",
            );
        };

        // Start checking for page load after a short delay
        setTimeout(checkPageLoaded, 500);
      };

      // Initialize everything
      createBlocks();

      // Wait for everything to be ready, then start
      setTimeout(() => {
        startLoaderAnimation();
      }, 100);
    },
    { scope: containerRef, dependencies: [] },
  );

  // Don't render if not visible (after animation completes)
  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[1001] cursor-default">
      {/* The blocks themselves are the main overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[1002] flex overflow-hidden"
      />
      <div
        ref={logoOverlayRef}
        className="pointer-events-none fixed inset-0 z-[1003] flex items-center justify-center opacity-0"
      >
        <div
          ref={logoRef}
          className="flex h-[400px] w-[600px] items-center justify-center overflow-hidden p-5"
          style={{ color: "var(--color-secondary)" }}
        >
          <Logo width={400} height={120} />
        </div>
      </div>
    </div>
  );
}
