"use client";

import Logo from "./Logo4";
import { useRef, ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Register the useGSAP hook
gsap.registerPlugin(useGSAP);

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<SVGSVGElement | null>(null);
  const logoOverlayRef = useRef<HTMLDivElement | null>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const isTransitioning = useRef(false);
  const isMounted = useRef(false);
  const pathLengthRef = useRef<number | null>(null);
  const hasNavigated = useRef(false); // Track if this is from navigation

  // Ensure SVG is properly initialized after mount
  useEffect(() => {
    if (logoRef.current) {
      const path = logoRef.current.querySelector("path");
      if (path && pathLengthRef.current === null) {
        try {
          const length = path.getTotalLength();
          pathLengthRef.current = length;
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            fill: "transparent",
            stroke: "currentColor",
          });
        } catch (error) {
          console.warn(
            "PageTransition: Error setting up logo path in useEffect:",
            error,
          );
        }
      }
    }
  }, []);

  useGSAP(
    () => {
      const createBlocks = () => {
        if (!overlayRef.current) return;
        overlayRef.current.innerHTML = "";
        blocksRef.current = [];

        for (let i = 0; i < 20; i++) {
          const block = document.createElement("div");
          // Using inline styles to ensure perfect block positioning with slight overlap
          block.style.cssText = `
            flex: 1;
            height: 100%;
            background-color: #222;
            min-width: 0;
            transform-origin: left;
            box-sizing: border-box;
            width: calc(100% + 2px); /* Slight overlap to prevent gaps */
            margin-right: -2px; /* Compensate for the extra width */
          `;
          overlayRef.current.appendChild(block);
          blocksRef.current.push(block);
        }
      };

      // Define animation functions
      const revealPage = () => {
        gsap.set(blocksRef.current, { scaleX: 1, transformOrigin: "right" });

        gsap.to(blocksRef.current, {
          scaleX: 0,
          duration: 0.4,
          stagger: 0.02,
          ease: "power2.out",
          transformOrigin: "right",
          onComplete: () => {
            isTransitioning.current = false;
          },
        });
      };

      const coverPage = (url: string) => {
        if (
          !logoRef.current ||
          !logoOverlayRef.current ||
          !blocksRef.current.length
        ) {
          console.warn(
            "PageTransition: Required refs not available, skipping transition",
          );
          router.push(url);
          return;
        }

        const logoPath = logoRef.current.querySelector("path");
        if (!logoPath || pathLengthRef.current === null) {
          console.warn(
            "PageTransition: Logo path not found or not initialized, skipping transition",
          );
          router.push(url);
          return;
        }

        const tl = gsap.timeline({
          onComplete: () => {
            isTransitioning.current = false;
            hasNavigated.current = true; // Mark that we navigated
            router.push(url);
          },
        });

        // Always ensure the logo path is properly set up before animation
        gsap.set(logoPath, {
          strokeDashoffset: pathLengthRef.current,
          fill: "transparent",
        });

        tl.to(blocksRef.current, {
          scaleX: 1,
          duration: 0.4,
          stagger: 0.02,
          ease: "power2.out",
          transformOrigin: "left",
        })
          .set(logoOverlayRef.current, { opacity: 1 }, "-=0.2")
          .to(
            logoPath,
            {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: "power2.inOut",
            },
            "-=0.3",
          )
          .to(logoOverlayRef.current, {
            opacity: 0,
            duration: 0.25,
            ease: "power2.inOut",
          });
      };

      // Initialize everything
      createBlocks();

      gsap.set(blocksRef.current, { scaleX: 0, transformOrigin: "left" });

      // Ensure SVG path is properly set up before proceeding
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
              console.warn(
                "PageTransition: Error setting up logo path:",
                error,
              );
              return false;
            }
          }
        }
        return false;
      };

      // Only run reveal animation if we came from a navigation (not page refresh)
      if (setupLogoPath()) {
        // Check if this looks like we came from navigation
        if (
          hasNavigated.current ||
          sessionStorage.getItem("navigated") === "true"
        ) {
          revealPage();
          sessionStorage.removeItem("navigated"); // Clear the flag
        }
        isMounted.current = true;
      }

      const handleRouteChange = (url: string) => {
        if (isTransitioning.current || !isMounted.current) return;
        isTransitioning.current = true;
        sessionStorage.setItem("navigated", "true"); // Mark that we're navigating
        coverPage(url);
      };

      const handleLinkClick = (e: Event) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLAnchorElement;
        const url = new URL(target.href).pathname;
        if (url !== pathname) {
          handleRouteChange(url);
        }
      };

      const links =
        document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]');
      links.forEach((link) => {
        link.addEventListener("click", handleLinkClick);
      });

      return () => {
        isMounted.current = false;
        links.forEach((link) => {
          link.removeEventListener("click", handleLinkClick);
        });
      };
    },
    { scope: containerRef, dependencies: [router, pathname] },
  );

  return (
    <div ref={containerRef}>
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[1000] flex overflow-hidden"
      />
      <div
        ref={logoOverlayRef}
        className="pointer-events-none fixed inset-0 z-[1000] flex items-center justify-center bg-[#222] opacity-0"
      >
        <div className="flex h-[200px] w-[200px] items-center justify-center p-5">
          <Logo ref={logoRef} />
        </div>
      </div>
      {children}

      {/* Component-specific styles that can't be handled by Tailwind */}
      <style jsx>{`
        /* Custom scrollbar for webkit browsers */
        // ::-webkit-scrollbar {
        //   width: 6px;
        // }

        // ::-webkit-scrollbar-track {
        //   background: transparent;
        // }

        // ::-webkit-scrollbar-thumb {
        //   background: rgba(80, 70, 48, 0.3);
        //   border-radius: 3px;
        // }

        // ::-webkit-scrollbar-thumb:hover {
        //   background: rgba(80, 70, 48, 0.5);
        // }
      `}</style>
    </div>
  );
}
