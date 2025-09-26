"use client";
import { useRef, ReactNode, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedBorderLinesProps {
  children: ReactNode;
  trigger?: string | HTMLElement;
  start?: string;
  toggleActions?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  className?: string;
  lineClassName?: string;
  direction?: "left-to-right" | "right-to-left";
}

function AnimatedBorderLines({
  children,
  trigger,
  start = "top 80%",
  toggleActions = "play none none reverse",
  stagger = 0.2,
  duration = 0.8,
  delay = 0,
  ease = "power2.out",
  className = "",
  lineClassName = "",
  direction = "left-to-right",
}: AnimatedBorderLinesProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLElement[]>([]);
  const [animationReady, setAnimationReady] = useState(false);

  // Initialize animation readiness
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setAnimationReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Add CSS to prevent FOUC
  useEffect(() => {
    const styleId = "animated-border-lines-fouc-prevention";

    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement("style");
      styleElement.id = styleId;
      styleElement.textContent = `
        .animated-border-lines-wrapper {
          overflow: hidden;
        }
        
        /* Hide lines until animation is ready */
        .animated-border-lines-wrapper.fouc-prevent {
          opacity: 0 !important;
        }
        
        /* Line styling */
        .animated-line {
          transform-origin: ${direction === "left-to-right" ? "left center" : "right center"};
          transform: scaleX(0);
        }
      `;
      document.head.appendChild(styleElement);
    }
  }, [direction]);

  useGSAP(
    () => {
      if (!wrapperRef.current || !animationReady) return;

      // Add FOUC prevention class initially
      wrapperRef.current.classList.add("fouc-prevent");

      const createAnimations = () => {
        // Find all elements with border classes (top and bottom borders)
        const borderElements = Array.from(
          wrapperRef.current!.querySelectorAll(
            ".border-t, .border-b, .border-primary\\/50",
          ),
        ) as HTMLElement[];

        if (borderElements.length === 0) return;

        // Create animated line elements
        borderElements.forEach((element, index) => {
          // Create the animated line element
          const line = document.createElement("div");
          line.className = `animated-line absolute h-px bg-primary/50 ${lineClassName}`;

          // Position the line based on whether it's a top or bottom border
          if (element.classList.contains("border-t")) {
            line.style.top = "0";
            line.style.left = "0";
            line.style.right = "0";
          } else if (element.classList.contains("border-b")) {
            line.style.bottom = "0";
            line.style.left = "0";
            line.style.right = "0";
          }

          // Make the element relative if it's not already positioned
          if (getComputedStyle(element).position === "static") {
            element.style.position = "relative";
          }

          // Hide the original border and add our animated line
          element.style.borderTop = "none";
          element.style.borderBottom = "none";
          element.appendChild(line);

          linesRef.current.push(line);

          // Set initial state
          gsap.set(line, {
            scaleX: 0,
            transformOrigin:
              direction === "left-to-right" ? "left center" : "right center",
          });
        });

        // Remove FOUC prevention class
        if (wrapperRef.current) {
          wrapperRef.current.classList.remove("fouc-prevent");
        }

        // Animate the lines
        const animation = gsap.to(linesRef.current, {
          scaleX: 1,
          stagger,
          duration,
          ease,
          delay,
          scrollTrigger: {
            trigger: trigger || wrapperRef.current,
            start,
            toggleActions,
            refreshPriority: -1,
          },
        });
      };

      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        setTimeout(createAnimations, 50);
      });

      return () => {
        // Cleanup: remove animated lines
        linesRef.current.forEach((line) => {
          if (line && line.parentNode) {
            line.parentNode.removeChild(line);
          }
        });
        linesRef.current = [];
      };
    },
    {
      dependencies: [
        trigger,
        start,
        toggleActions,
        stagger,
        duration,
        delay,
        ease,
        animationReady,
        direction,
      ],
    },
  );

  return (
    <div
      ref={wrapperRef}
      className={`animated-border-lines-wrapper fouc-prevent ${className}`}
    >
      {children}
    </div>
  );
}

export default AnimatedBorderLines;
