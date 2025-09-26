"use client";

import Logo from "./Logo4";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Register the useGSAP hook
gsap.registerPlugin(useGSAP);

interface PageLoaderProps {
  onComplete?: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<SVGSVGElement | null>(null);
  const logoOverlayRef = useRef<HTMLDivElement | null>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const pathLengthRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);

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
            background-color: #222;
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

      const setupLogoPath = () => {
        if (logoRef.current) {
          const path = logoRef.current.querySelector("path");
          if (path) {
            try {
              const length = path.getTotalLength();
              pathLengthRef.current = length;
              gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
                fill: "transparent",
                stroke: "currentColor",
              });
              return true;
            } catch (error) {
              console.warn("PageLoader: Error setting up logo path:", error);
              return false;
            }
          }
        }
        return false;
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

        const logoPath = logoRef.current.querySelector("path");
        if (!logoPath || pathLengthRef.current === null) {
          console.warn("PageLoader: Logo path not found or not initialized");
          if (onComplete) onComplete();
          return;
        }

        // Start with blocks covering the entire page (same as PageTransition3 revealPage)
        gsap.set(blocksRef.current, { scaleX: 1, transformOrigin: "right" });
        gsap.set(logoOverlayRef.current, { opacity: 1 });
        gsap.set(logoPath, {
          strokeDashoffset: pathLengthRef.current,
          fill: "transparent",
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
            !logoPath ||
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

          // Animate logo first (same as PageTransition3)
          tl.to(logoPath, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.inOut",
          })
            .to(logoOverlayRef.current, {
              opacity: 0,
              duration: 0.25,
              ease: "power2.inOut",
            })
            // Then animate blocks out to reveal the page (same as PageTransition3 revealPage)
            .to(
              blocksRef.current,
              {
                scaleX: 0,
                duration: 0.4,
                stagger: 0.02,
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
        if (setupLogoPath()) {
          startLoaderAnimation();
        }
      }, 100);
    },
    { scope: containerRef, dependencies: [] },
  );

  // Don't render if not visible (after animation completes)
  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[1001]">
      {/* The blocks themselves are the main overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[1002] flex overflow-hidden"
      />
      <div
        ref={logoOverlayRef}
        className="pointer-events-none fixed inset-0 z-[1003] flex items-center justify-center bg-transparent opacity-0"
      >
        <div className="flex h-[200px] w-[200px] items-center justify-center p-5">
          <Logo ref={logoRef} />
        </div>
      </div>
    </div>
  );
}
