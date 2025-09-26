"use client";

import Logo from "./Logo3";
import { useRef, ReactNode, useEffect, useState } from "react";
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
  const logoRef = useRef<HTMLDivElement | null>(null);
  const logoOverlayRef = useRef<HTMLDivElement | null>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const isTransitioning = useRef(false);
  const isMounted = useRef(false);
  const hasNavigated = useRef(false); // Track if this is from navigation
  const [shouldBlockScroll, setShouldBlockScroll] = useState(false);

  // Block scroll during transitions
  useEffect(() => {
    if (shouldBlockScroll) {
      // Prevent scroll on body
      document.body.style.overflow = "hidden";
      // Also prevent scroll on html element for better browser compatibility
      document.documentElement.style.overflow = "hidden";
    } else {
      // Restore scroll when transition is complete
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    // Cleanup function to restore scroll if component unmounts
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [shouldBlockScroll]);

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
            background-color: var(--color-primary);
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
        setShouldBlockScroll(true); // Block scroll during reveal animation
        gsap.set(blocksRef.current, { scaleX: 1, transformOrigin: "right" });

        gsap.to(blocksRef.current, {
          scaleX: 0,
          duration: 0.6,
          stagger: 0.015,
          ease: "power2.out",
          transformOrigin: "right",
          onComplete: () => {
            isTransitioning.current = false;
            setShouldBlockScroll(false); // Restore scroll after reveal
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

        setShouldBlockScroll(true); // Block scroll during cover animation

        const tl = gsap.timeline({
          onComplete: () => {
            isTransitioning.current = false;
            hasNavigated.current = true; // Mark that we navigated
            // Note: Don't restore scroll here as the new page will handle it
            router.push(url);
          },
        });

        // Set initial logo state
        gsap.set(logoRef.current, {
          y: 100,
          opacity: 0,
        });

        tl.to(blocksRef.current, {
          scaleX: 1,
          duration: 0.6,
          stagger: 0.015,
          ease: "power2.out",
          transformOrigin: "left",
        })
          .set(logoOverlayRef.current, { opacity: 1 }, "-=0.3")
          .to(
            logoRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.4",
          )
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
          );
      };

      // Initialize everything
      createBlocks();

      gsap.set(blocksRef.current, { scaleX: 0, transformOrigin: "left" });

      // Only run reveal animation if we came from a navigation (not page refresh)
      // Check if this looks like we came from navigation
      if (
        hasNavigated.current ||
        sessionStorage.getItem("navigated") === "true"
      ) {
        revealPage();
        sessionStorage.removeItem("navigated"); // Clear the flag
      }
      isMounted.current = true;

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
        className="pointer-events-none fixed inset-0 z-[1000] flex items-center justify-center opacity-0"
      >
        <div
          ref={logoRef}
          className="flex h-[400px] w-[600px] items-center justify-center overflow-hidden p-5"
          style={{ color: "var(--color-secondary)" }}
        >
          <Logo width={400} height={120} />
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
