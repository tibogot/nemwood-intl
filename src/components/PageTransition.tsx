"use client";

import Logo from "./Logo4";
import { useEffect, useRef, ReactNode, MouseEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<SVGSVGElement | null>(null);
  const logoOverlayRef = useRef<HTMLDivElement | null>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const isTransitioning = useRef(false);
  const isMounted = useRef(false);
  const pathLengthRef = useRef<number | null>(null);

  useEffect(() => {
    const createBlocks = () => {
      if (!overlayRef.current) return;
      overlayRef.current.innerHTML = "";
      blocksRef.current = [];

      for (let i = 0; i < 20; i++) {
        const block = document.createElement("div");
        block.className = "block";
        overlayRef.current.appendChild(block);
        blocksRef.current.push(block);
      }
    };

    createBlocks();

    gsap.set(blocksRef.current, { scaleX: 0, transformOrigin: "left" });

    if (logoRef.current) {
      const path = logoRef.current.querySelector("path");
      if (path) {
        try {
          const length = path.getTotalLength();
          pathLengthRef.current = length; // Cache the path length
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            fill: "transparent",
          });
        } catch (error) {
          console.warn("PageTransition: Error setting up logo path:", error);
        }
      }
    }

    revealPage();
    isMounted.current = true;

    const handleRouteChange = (url: string) => {
      if (isTransitioning.current || !isMounted.current) return;
      isTransitioning.current = true;
      coverPage(url);
    };

    const handleLinkClick = (e: MouseEvent<HTMLAnchorElement> | Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const url = new URL(target.href).pathname;
      if (url !== pathname) {
        handleRouteChange(url);
      }
    };

    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]');
    links.forEach((link) => {
      link.addEventListener("click", handleLinkClick as EventListener);
    });

    return () => {
      isMounted.current = false;
      links.forEach((link) => {
        link.removeEventListener("click", handleLinkClick as EventListener);
      });
    };
  }, [router, pathname]);

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
      onComplete: () => router.push(url),
    });

    tl.to(blocksRef.current, {
      scaleX: 1,
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.out",
      transformOrigin: "left",
    })
      .set(logoOverlayRef.current, { opacity: 1 }, "-=0.2")
      .set(
        logoPath,
        {
          strokeDashoffset: pathLengthRef.current, // Use cached length
          fill: "transparent",
        },
        "-=0.25",
      )
      .to(
        logoPath,
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
        },
        "-=0.5",
      )
      .to(logoOverlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.inOut",
      });
  };

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

  return (
    <>
      <div ref={overlayRef} className="transition-overlay"></div>
      <div ref={logoOverlayRef} className="logo-overlay">
        <div className="logo-container">
          <Logo ref={logoRef} />
        </div>
      </div>
      {children}
    </>
  );
}
