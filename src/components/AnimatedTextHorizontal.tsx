"use client";
import { useRef, ReactNode, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Function to fix SplitText clipping issues with descenders
function fixMask(
  { elements, masks }: { elements: HTMLElement[]; masks: Element[] },
  baseLineHeight = 1.2,
) {
  const [firstElement] = elements;
  const lineHeightValue = gsap.getProperty(firstElement, "line-height", "em");
  const lineHeight = parseFloat(String(lineHeightValue));
  const lineHeightDifference = lineHeight - baseLineHeight;

  masks.forEach((mask, i) => {
    const isFirstMask = i === 0;
    const isLastMask = i === masks.length - 1;

    const marginTop = isFirstMask ? `${0.5 * lineHeightDifference}em` : "0";
    const marginBottom = isLastMask
      ? `${0.5 * lineHeightDifference}em`
      : `${lineHeightDifference}em`;

    gsap.set(mask as HTMLElement, {
      lineHeight: baseLineHeight,
      marginTop,
      marginBottom,
    });
  });
}

interface AnimatedTextHorizontalProps {
  children: ReactNode;
  horizontalContainer?: string | HTMLElement | null; // The horizontal scroll container
  sectionIndex?: number; // Which section in the horizontal scroll (0, 1, 2, 3...)
  totalSections?: number; // Total number of sections in horizontal scroll
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  className?: string;
}

function AnimatedTextHorizontal({
  children,
  horizontalContainer,
  sectionIndex = 0,
  totalSections = 4,
  stagger = 0.15,
  duration = 0.8,
  delay = 0,
  ease = "power2.out",
  className = "",
}: AnimatedTextHorizontalProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const splitRefs = useRef<any[]>([]); // Store all SplitText instances for cleanup
  const [fontsReady, setFontsReady] = useState(false);
  const [splitTextCreated, setSplitTextCreated] = useState(false);
  const [pageLoaderReady, setPageLoaderReady] = useState(false);

  // Enhanced font loading detection - same as AnimatedText3
  useEffect(() => {
    const checkFontsLoaded = async () => {
      try {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;

          // Additional check to ensure specific fonts are loaded
          if (document.fonts.check) {
            const fontChecks = [
              "1em ITCGaramondN",
              '1em "ITC Garamond Narrow"',
              "16px serif", // fallback check
            ];

            let fontFound = false;
            for (const fontCheck of fontChecks) {
              if (document.fonts.check(fontCheck)) {
                fontFound = true;
                break;
              }
            }

            if (fontFound) {
              setTimeout(() => setFontsReady(true), 150);
            } else {
              // Fallback - wait longer if font isn't detected
              setTimeout(() => setFontsReady(true), 400);
            }
          } else {
            // Fallback for browsers without font.check
            setTimeout(() => setFontsReady(true), 300);
          }
        } else {
          // Fallback for browsers that don't support document.fonts
          setTimeout(() => setFontsReady(true), 500);
        }
      } catch (error) {
        console.warn(
          "Font loading detection failed in AnimatedTextHorizontal, using fallback:",
          error,
        );
        setTimeout(() => setFontsReady(true), 500);
      }
    };

    checkFontsLoaded();
  }, []);

  // Wait for PageLoader to complete
  useEffect(() => {
    const handlePageLoaderComplete = () => {
      setPageLoaderReady(true);
      setTimeout(() => setFontsReady(true), 100);
    };

    // Check if PageLoader is already complete
    if (document.documentElement.classList.contains("page-loader-complete")) {
      handlePageLoaderComplete();
    } else {
      // Listen for PageLoader completion
      window.addEventListener("pageLoaderComplete", handlePageLoaderComplete);

      return () => {
        window.removeEventListener(
          "pageLoaderComplete",
          handlePageLoaderComplete,
        );
      };
    }
  }, []);

  // Add CSS to prevent FOUC - same as AnimatedText3
  useEffect(() => {
    const styleId = "animated-text-horizontal-fouc-prevention";

    // Check if style already exists
    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement("style");
      styleElement.id = styleId;
      styleElement.textContent = `
        .animated-text-horizontal-wrapper {
          overflow: hidden;
        }
        
        /* Fix for SplitText clipping with tight line heights */
        .animated-text-horizontal-wrapper.overflow-visible {
          overflow: visible !important;
        }
        
        /* Hide text until animation is ready */
        .animated-text-horizontal-wrapper.fouc-prevent {
          visibility: hidden !important;
          opacity: 0 !important;
        }
      `;
      document.head.appendChild(styleElement);
    }
  }, []);

  useGSAP(
    () => {
      if (!wrapperRef.current || !fontsReady || !pageLoaderReady) return;

      // Only run on desktop (same check as HorizScroll8)
      if (window.innerWidth < 768) return;

      // Add FOUC prevention class initially
      wrapperRef.current.classList.add("fouc-prevent");

      const createSplitTextInstances = () => {
        // Clean up existing instances
        splitRefs.current.forEach((split) => {
          if (split) split.revert();
        });
        splitRefs.current = [];

        const children = Array.from(
          wrapperRef.current!.children,
        ) as HTMLElement[];

        if (children.length === 0) return;

        let allInstancesCreated = true;

        children.forEach((child, index) => {
          try {
            // Hide the original text element to prevent FOUC
            gsap.set(child, {
              visibility: "hidden",
              opacity: 0,
            });

            // Force a reflow to ensure the element is fully rendered
            child.offsetHeight;

            const split = SplitText.create(child, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              aria: "none", // Disable automatic aria-label addition
            });

            // Apply the fixMask function to prevent clipping of descenders
            if (split.lines && split.lines.length > 0) {
              fixMask({ elements: [child], masks: split.lines });
            }

            // Verify the split was successful
            if (split && split.lines && split.lines.length > 0) {
              splitRefs.current.push(split);

              // Set initial state to prevent FOUC
              gsap.set(split.lines, {
                yPercent: 100,
                autoAlpha: 0,
              });

              // Get the horizontal container element
              const triggerElement =
                typeof horizontalContainer === "string"
                  ? (document.querySelector(horizontalContainer) as HTMLElement)
                  : horizontalContainer;

              if (triggerElement) {
                // Use a simpler approach: detect when the section element itself comes into view
                // during the horizontal scroll animation
                const sectionElement = wrapperRef.current?.closest(
                  ".scroll-section",
                ) as HTMLElement;

                if (sectionElement) {
                  // Create the text animation (paused initially)
                  const textAnimation = gsap.to(split.lines, {
                    yPercent: 0,
                    autoAlpha: 1,
                    stagger,
                    duration,
                    ease,
                    paused: true,
                  });

                  // Use intersection observer to detect when this section is visible
                  const observer = new IntersectionObserver(
                    (entries) => {
                      entries.forEach((entry) => {
                        if (
                          entry.isIntersecting &&
                          entry.intersectionRatio > 0.3
                        ) {
                          // Section is 30% visible, trigger animation forward
                          if (
                            !textAnimation.isActive() &&
                            textAnimation.progress() === 0
                          ) {
                            // Remove FOUC prevention and make visible
                            if (wrapperRef.current) {
                              wrapperRef.current.classList.remove(
                                "fouc-prevent",
                              );
                            }
                            gsap.set(child, {
                              visibility: "visible",
                              opacity: 1,
                            });

                            // Play the text animation with delay
                            gsap.delayedCall(delay, () => {
                              textAnimation.play();
                            });
                          }
                        } else if (
                          !entry.isIntersecting &&
                          entry.intersectionRatio < 0.1
                        ) {
                          // Section is leaving view, reverse animation
                          if (textAnimation.progress() > 0) {
                            textAnimation.reverse();
                          }
                        }
                      });
                    },
                    {
                      root: null, // Use viewport as root
                      rootMargin: "0px",
                      threshold: [0.1, 0.3, 0.5, 0.7], // Multiple thresholds for better detection
                    },
                  );

                  // Start observing the section element
                  observer.observe(sectionElement);

                  // For the first section, also animate on ScrollTrigger enter
                  if (sectionIndex === 0) {
                    ScrollTrigger.create({
                      trigger: triggerElement,
                      start: "top center",
                      onEnter: () => {
                        if (
                          !textAnimation.isActive() &&
                          textAnimation.progress() === 0
                        ) {
                          if (wrapperRef.current) {
                            wrapperRef.current.classList.remove("fouc-prevent");
                          }
                          gsap.set(child, {
                            visibility: "visible",
                            opacity: 1,
                          });

                          gsap.delayedCall(delay, () => {
                            textAnimation.play();
                          });
                        }
                      },
                    });
                  }

                  // Store observer for cleanup
                  splitRefs.current.push({ observer, textAnimation });
                } else {
                  console.warn(
                    "Section element not found for horizontal animation",
                  );
                }
              } else {
                // Fallback: immediate animation if no horizontal container found
                console.warn(
                  "Horizontal container not found, using immediate animation",
                );
                if (wrapperRef.current) {
                  wrapperRef.current.classList.remove("fouc-prevent");
                }
                gsap.set(child, { visibility: "visible", opacity: 1 });

                gsap.to(split.lines, {
                  yPercent: 0,
                  autoAlpha: 1,
                  stagger,
                  duration,
                  ease,
                  delay: delay + index * 0.1,
                });
              }
            } else {
              console.warn(
                `SplitText failed for AnimatedTextHorizontal child ${index}:`,
                child.textContent,
              );
              allInstancesCreated = false;
            }
          } catch (error) {
            console.error(
              `Error creating SplitText for AnimatedTextHorizontal child ${index}:`,
              error,
            );
            allInstancesCreated = false;
          }
        });

        if (allInstancesCreated) {
          setSplitTextCreated(true);
        } else {
          // Retry after a short delay if some instances failed
          setTimeout(createSplitTextInstances, 100);
        }
      };

      // Use requestAnimationFrame and additional timeout for better timing
      requestAnimationFrame(() => {
        setTimeout(createSplitTextInstances, 200);
      });

      return () => {
        splitRefs.current.forEach((item) => {
          if (item && typeof item.revert === "function") {
            // It's a SplitText instance
            item.revert();
          } else if (item && item.observer) {
            // It's our custom object with observer
            item.observer.disconnect();
            if (item.textAnimation) {
              item.textAnimation.kill();
            }
          }
        });
        splitRefs.current = [];
        setSplitTextCreated(false);
      };
    },
    {
      dependencies: [
        horizontalContainer,
        sectionIndex,
        totalSections,
        stagger,
        duration,
        delay,
        ease,
        fontsReady,
        pageLoaderReady,
      ],
    },
  );

  return (
    <div
      ref={wrapperRef}
      className={`animated-text-horizontal-wrapper fouc-prevent ${className}`}
    >
      {children}
    </div>
  );
}

export default AnimatedTextHorizontal;
