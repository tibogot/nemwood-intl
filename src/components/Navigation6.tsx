"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Logo from "./Logo3";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";
import ServicesCarousel from "./ServicesCarousel";

// Register the SplitText plugin
gsap.registerPlugin(SplitText);

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [splitTextReady, setSplitTextReady] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const burgerLine1Ref = useRef<HTMLDivElement>(null);
  const burgerLine2Ref = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "A propos", href: "/a-propos" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  // Store split text instances for cleanup
  const splitTextInstances = useRef<SplitText[]>([]);

  // Simplified font loading detection
  useEffect(() => {
    const checkFontsLoaded = async () => {
      try {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
          // Reduced delay for faster initialization
          setTimeout(() => setFontsLoaded(true), 50);
        } else {
          // Fallback for browsers that don't support document.fonts
          setTimeout(() => setFontsLoaded(true), 100);
        }
      } catch (error) {
        console.warn("Font loading detection failed, using fallback:", error);
        setTimeout(() => setFontsLoaded(true), 100);
      }
    };

    checkFontsLoaded();
  }, []);

  // Helper function to check if mobile
  const isMobile = () => window.innerWidth < 768;

  // Handle mobile viewport changes (address bar show/hide)
  useEffect(() => {
    if (!isMobile()) return;

    const handleViewportChange = () => {
      // Update menu height to current viewport height when open
      if (menuRef.current && isMenuOpen) {
        gsap.set(menuRef.current, {
          height: `${window.innerHeight}px`,
        });
      }
    };

    // Listen for viewport changes
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("orientationchange", handleViewportChange);

    // Also listen for visual viewport changes (more reliable for mobile)
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleViewportChange);
    }

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("orientationchange", handleViewportChange);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          "resize",
          handleViewportChange,
        );
      }
    };
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isMobile() && isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Create SplitText instances with proper timing
  useEffect(() => {
    if (!fontsLoaded) return;

    const createSplitTextInstances = () => {
      // Clean up existing instances first
      splitTextInstances.current.forEach((split) => {
        if (split) split.revert();
      });
      splitTextInstances.current = [];

      let allInstancesCreated = true;

      menuItemsRef.current.forEach((item, index) => {
        if (item) {
          const linkElement = item.querySelector("a");
          if (linkElement) {
            try {
              // Ensure text is visible and properly styled
              gsap.set(linkElement, {
                visibility: "visible",
                opacity: 1,
              });

              // Force a reflow to ensure the element is fully rendered
              linkElement.offsetHeight;

              const split = new SplitText(linkElement, {
                type: "chars",
                charsClass: "split-char",
              });

              // Verify the split was successful
              if (split.chars && split.chars.length > 0) {
                splitTextInstances.current[index] = split;

                // Set initial state for split characters (excluding spaces)
                const visibleChars = split.chars.filter(
                  (char: Element) =>
                    char.textContent && char.textContent.trim() !== "",
                ) as HTMLElement[];
                gsap.set(visibleChars, {
                  y: isMobile() ? 60 : 100,
                  opacity: 0,
                  rotationX: -90,
                  transformOrigin: "0% 50% -50",
                });
              } else {
                console.warn(
                  `SplitText failed for item ${index}:`,
                  linkElement.textContent,
                );
                allInstancesCreated = false;
              }
            } catch (error) {
              console.error(
                `Error creating SplitText for item ${index}:`,
                error,
              );
              allInstancesCreated = false;
            }
          }
        }
      });

      if (allInstancesCreated) {
        setSplitTextReady(true);
      } else {
        // Retry after a short delay if some instances failed
        setTimeout(createSplitTextInstances, 100);
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      setTimeout(createSplitTextInstances, 100);
    });

    // Cleanup function
    return () => {
      splitTextInstances.current.forEach((split) => {
        if (split) split.revert();
      });
      splitTextInstances.current = [];
      setSplitTextReady(false);
    };
  }, [fontsLoaded]);

  const { contextSafe } = useGSAP(() => {
    if (!fontsLoaded || !splitTextReady) return;

    // Position burger lines properly - much thinner lines
    gsap.set(burgerLine1Ref.current, {
      y: -3,
      rotation: 0,
      transformOrigin: "center",
    });
    gsap.set(burgerLine2Ref.current, {
      y: 3,
      rotation: 0,
      transformOrigin: "center",
    });

    // Initial state - menu items hidden
    gsap.set(menuItemsRef.current, {
      y: isMobile() ? 50 : -30,
      opacity: 0,
    });

    // Set overlay initial state
    if (overlayRef.current) {
      gsap.set(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
      });
    }
  }, [fontsLoaded, splitTextReady]);

  const openMenu = contextSafe(() => {
    if (!splitTextReady) return;

    const tl = gsap.timeline();
    // Use current viewport height for mobile to adapt to browser bar show/hide
    const menuHeight = isMobile() ? `${window.innerHeight}px` : "75vh";

    // 1. Animate burger lines to form X with enhanced animation
    tl.to(burgerLine1Ref.current, {
      rotation: 45,
      y: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
    }).to(
      burgerLine2Ref.current,
      {
        rotation: -45,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      0,
    );

    // 2. Show overlay
    if (overlayRef.current) {
      tl.to(
        overlayRef.current,
        {
          opacity: 0.8,
          pointerEvents: "auto",
          duration: 0.6,
          ease: "power2.out",
        },
        0.1,
      );
    }

    // 3. Stretch the navbar down with improved easing
    tl.to(
      menuRef.current,
      {
        height: menuHeight,
        duration: 0.9,
        ease: "power3.inOut",
      },
      0.1,
    );

    // 4. Logo fade animation on mobile - REMOVED
    // Logo now stays unchanged when menu opens

    // 5. Show menu items container with enhanced stagger
    tl.to(
      menuItemsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: isMobile() ? 0.1 : 0.15,
        ease: "back.out(1.2)",
      },
      0.4,
    );

    // 6. Animate individual letters with enhanced stagger
    splitTextInstances.current.forEach((split, index) => {
      if (split && split.chars && split.chars.length > 0) {
        const visibleChars = split.chars.filter(
          (char: Element) => char.textContent && char.textContent.trim() !== "",
        ) as HTMLElement[];
        tl.to(
          visibleChars,
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1,
            stagger: {
              each: isMobile() ? 0.02 : 0.03,
              from: "start",
            },
            ease: "back.out(1.4)",
          },
          0.6 + index * (isMobile() ? 0.08 : 0.1),
        );
      }
    });
  });

  const closeMenu = contextSafe(() => {
    if (!splitTextReady) return;

    const tl = gsap.timeline();

    // 1. Hide individual letters first with reverse stagger
    splitTextInstances.current.forEach((split, index) => {
      if (split && split.chars && split.chars.length > 0) {
        const visibleChars = split.chars.filter(
          (char: Element) => char.textContent && char.textContent.trim() !== "",
        ) as HTMLElement[];
        tl.to(
          visibleChars,
          {
            y: isMobile() ? 60 : 100,
            opacity: 0,
            rotationX: -90,
            duration: 0.5,
            stagger: {
              each: 0.015,
              from: "end",
            },
            ease: "power2.in",
          },
          index * 0.04,
        );
      }
    });

    // 2. Hide menu items container
    tl.to(
      menuItemsRef.current,
      {
        y: isMobile() ? 50 : -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.in",
      },
      0.2,
    );

    // 3. Restore logo on mobile - REMOVED
    // Logo now stays unchanged when menu closes

    // 4. Hide overlay
    if (overlayRef.current) {
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.4,
          ease: "power2.in",
        },
        0.4,
      );
    }

    // 5. Collapse navbar back to original size
    tl.to(
      menuRef.current,
      {
        height: "4rem", // h-16 = 64px = 4rem
        duration: 0.8,
        ease: "power3.inOut",
      },
      0.3,
    );

    // 6. Reset burger lines with bounce effect
    tl.to(
      burgerLine1Ref.current,
      {
        rotation: 0,
        y: -3,
        duration: 0.7,
        ease: "back.out(1.5)",
      },
      0.4,
    ).to(
      burgerLine2Ref.current,
      {
        rotation: 0,
        y: 3,
        duration: 0.7,
        ease: "back.out(1.5)",
      },
      0.4,
    );

    // 7. Reset characters to initial state after closing
    tl.call(() => {
      splitTextInstances.current.forEach((split) => {
        if (split && split.chars) {
          const visibleChars = split.chars.filter(
            (char: Element) =>
              char.textContent && char.textContent.trim() !== "",
          ) as HTMLElement[];
          gsap.set(visibleChars, {
            y: isMobile() ? 60 : 100,
            opacity: 0,
            rotationX: -90,
            transformOrigin: "0% 50% -50",
          });
        }
      });
    });
  });

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    if (isMenuOpen) {
      closeMenu();
      setIsMenuOpen(false);
    }
  };

  const handleOverlayClick = () => {
    if (isMenuOpen) {
      closeMenu();
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Overlay - Always rendered but invisible when menu is closed */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-black/60"
        onClick={handleOverlayClick}
        style={{ opacity: 0, pointerEvents: "none" }}
      />

      <nav
        ref={menuRef}
        className="bg-secondary desktop-nav fixed top-0 right-0 left-0 z-50 h-16 overflow-hidden border-b border-[#504630]/30 backdrop-blur-sm select-none md:pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative z-10 h-16 px-4 md:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo - Much Larger */}
            {pathname === "/" ? (
              // Disabled logo for home page - using Link but disabled
              <Link
                ref={logoRef}
                href="#"
                className="pointer-events-none flex cursor-default items-center space-x-2 transition-all duration-300"
                style={{ transform: "translateY(-4px)" }}
                title="You are currently on the home page"
                onClick={(e) => e.preventDefault()}
              >
                <Logo width={120} height={52} className="text-primary" />
              </Link>
            ) : (
              // Active logo for other pages
              <Link
                ref={logoRef}
                href="/"
                className="flex items-center space-x-2 transition-all duration-300 hover:scale-105"
                style={{ transform: "translateY(-4px)" }}
              >
                <Logo width={120} height={52} className="text-primary" />
              </Link>
            )}

            {/* Right side - Theme Toggle and Burger Menu */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Burger Menu Button - Much thinner lines */}
              <button
                onClick={toggleMenu}
                className={`text-primary relative flex h-10 w-10 cursor-pointer flex-col items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none md:h-8 md:w-8 ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <div
                  ref={burgerLine1Ref}
                  className="absolute h-px w-7 rounded-full bg-current transition-colors duration-200 md:w-8"
                />
                <div
                  ref={burgerLine2Ref}
                  className="absolute h-px w-7 rounded-full bg-current transition-colors duration-200 md:w-8"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Menu Content */}
        <div className="absolute inset-0 flex h-full flex-col justify-between px-4 py-0 md:relative md:px-8 md:py-8">
          {/* Contact and Social Info - Top on Desktop Only */}
          <div className="hidden pt-8 md:block md:pt-0">
            <div className="flex flex-col gap-4 md:flex-row md:gap-12">
              {/* CONTACT Column */}
              <div className="flex flex-col">
                {/* <h3 className="font-HelveticaNow text-primary/70 mb-2 text-xs font-medium tracking-wider uppercase">
                  Contact
                </h3> */}
                <div className="flex flex-col space-y-1">
                  <Link
                    href="tel:+32489330544"
                    className="font-HelveticaNow text-primary/60 hover:text-primary cursor-pointer text-sm transition-colors"
                  >
                    +32 489 33 05 44
                  </Link>
                  <Link
                    href="mailto:contact@nemwood.be"
                    className="font-HelveticaNow text-primary/60 hover:text-primary cursor-pointer text-sm transition-colors"
                  >
                    contact@nemwood.be
                  </Link>
                </div>
              </div>

              {/* SOCIAL Column */}
              <div className="flex flex-col">
                {/* <h3 className="font-HelveticaNow text-primary/70 mb-2 text-xs font-medium tracking-wider uppercase">
                  Social
                </h3> */}
                <div className="flex flex-col space-y-1">
                  <Link
                    href="https://instagram.com/nem_wood"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-HelveticaNow text-primary/60 hover:text-primary cursor-pointer text-sm transition-colors"
                  >
                    Instagram
                  </Link>
                  <Link
                    href="https://www.facebook.com/p/NemwOod-100063674583109/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-HelveticaNow text-primary/60 hover:text-primary cursor-pointer text-sm transition-colors"
                  >
                    Facebook
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Services Carousel - Always rendered for smooth animations */}
          <ServicesCarousel
            isVisible={isServicesHovered}
            onMouseEnter={() => setIsServicesHovered(true)}
            onMouseLeave={() => setIsServicesHovered(false)}
            onLinkClick={handleLinkClick}
          />

          {/* Navigation Links - Centered on Mobile, Bottom on Desktop */}
          <div
            className="flex w-full flex-1 flex-col items-center justify-center space-y-2 py-4 md:flex-none md:flex-row md:items-end md:justify-start md:gap-8 md:space-y-0 md:py-0 md:pb-12"
            onMouseLeave={() => {
              setHoveredIndex(null);
              // Don't automatically hide services carousel here
              // Let individual items handle their own hover states
            }}
          >
            {navItems.map((item, index) => {
              const isCurrentPage = pathname === item.href;
              const isServices = item.name === "Services";
              const isOnServiceSubpage =
                pathname?.startsWith("/services/") || false;
              // Treat carousel visibility as if Services is being hovered
              // Find Services index for when carousel is visible
              const servicesIndex = navItems.findIndex(
                (navItem) => navItem.name === "Services",
              );
              const effectiveHoveredIndex = isServicesHovered
                ? servicesIndex
                : hoveredIndex;
              return (
                <div
                  key={item.name}
                  ref={(el) => {
                    menuItemsRef.current[index] = el;
                  }}
                  className={`group relative flex-shrink-0 py-2 md:py-0 ${isServices ? "pb-2" : ""}`}
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    if (isServices) {
                      console.log("Services hovered!");
                      setIsServicesHovered(true);
                    } else {
                      // If hovering other links, hide services carousel
                      setIsServicesHovered(false);
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    // Don't hide services carousel when leaving Services link
                    // It will stay visible until hovering other links or carousel is left
                  }}
                >
                  {isCurrentPage ? (
                    // Disabled link for current page - using Link but disabled
                    <Link
                      href="#"
                      className="font-ITCGaramondN text-primary/30 current-page-link pointer-events-none block cursor-default text-center text-5xl leading-tight transition-all duration-300 sm:text-6xl md:text-left md:text-[clamp(40px,6vw,120px)]"
                      style={{
                        visibility:
                          fontsLoaded && splitTextReady ? "visible" : "hidden",
                        opacity: fontsLoaded && splitTextReady ? 1 : 0,
                      }}
                      title="You are currently on this page"
                      onClick={(e) => e.preventDefault()}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    // Active link for other pages
                    <Link
                      href={item.href}
                      className={`font-ITCGaramondN block cursor-pointer text-center text-5xl leading-tight transition-all duration-300 sm:text-6xl md:text-left md:text-[clamp(40px,6vw,120px)] ${
                        // Current page logic: fade current page (or Services when on service subpage)
                        isCurrentPage || (isOnServiceSubpage && isServices)
                          ? "text-primary/50"
                          : // Hover logic: fade non-hovered items when something is hovered
                            effectiveHoveredIndex !== null &&
                              effectiveHoveredIndex !== index
                            ? "text-primary/50"
                            : "text-primary"
                      }`}
                      onClick={handleLinkClick}
                      style={{
                        visibility:
                          fontsLoaded && splitTextReady ? "visible" : "hidden",
                        opacity: fontsLoaded && splitTextReady ? 1 : 0,
                      }}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Hover underline effect */}
                  {/* <div className="bg-primary/50 absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full" /> */}
                </div>
              );
            })}
          </div>

          {/* Contact and Social Info - Bottom on Mobile Only */}
          <div className="pb-8 md:hidden">
            <div className="flex items-start justify-between">
              {/* CONTACT - Left side */}
              <div className="flex flex-col space-y-1">
                <Link
                  href="tel:+32489330544"
                  className="font-HelveticaNow text-primary/60 hover:text-primary cursor-pointer text-xs transition-colors"
                >
                  +32 489 33 05 44
                </Link>
                <Link
                  href="mailto:contact@nemwood.be"
                  className="font-HelveticaNow text-primary/60 hover:text-primary cursor-pointer text-xs transition-colors"
                >
                  contact@nemwood.be
                </Link>
              </div>

              {/* SOCIAL - Right side */}
              <div className="flex flex-col space-y-1">
                <Link
                  href="https://instagram.com/nem_wood"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-HelveticaNow text-primary/60 hover:text-primary cursor-pointer text-xs transition-colors"
                >
                  Instagram
                </Link>
                <Link
                  href="https://www.facebook.com/p/NemwOod-100063674583109/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-HelveticaNow text-primary/60 hover:text-primary cursor-pointer text-xs transition-colors"
                >
                  Facebook
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced CSS for split characters and mobile optimization */}
      <style jsx>{`
        /* ESSENTIAL - Required for SplitText 3D animations */
        .split-char {
          display: inline-block;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
        }

        /* ESSENTIAL - Prevents text flash during font loading */
        .font-ITCGaramondN {
          font-display: block;
        }

        /* ESSENTIAL - Prevents SplitText characters from breaking layout */
        .font-ITCGaramondN a {
          white-space: nowrap;
        }

        /* ESSENTIAL - Prevents navigation items from wrapping */
        .group {
          white-space: nowrap;
          overflow: hidden;
        }

        /* ESSENTIAL - Fix line-through with 3D transforms */
        .current-page-link .split-char {
          text-decoration: line-through;
          text-decoration-skip-ink: none;
        }

        /* ESSENTIAL - Responsive text sizing for desktop */
        @media (min-width: 768px) {
          .desktop-nav .font-ITCGaramondN a {
            font-size: clamp(40px, 6vw, 120px) !important;
          }
        }

        /* ESSENTIAL - Desktop navigation layout optimization */
        @media (min-width: 768px) {
          .desktop-nav .flex-row {
            justify-content: flex-start !important;
            align-items: flex-start !important;
            width: fit-content !important;
          }

          .desktop-nav .group {
            margin-right: clamp(0.5rem, 1vw, 1rem);
          }

          .desktop-nav .group:last-child {
            margin-right: 0;
          }
        }

        /* NON-ESSENTIAL - Text overflow handling (Tailwind handles this) */
        /* .font-ITCGaramondN a {
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        } */

        /* NON-ESSENTIAL - Duplicate responsive text rule */
        /* @media (min-width: 768px) {
          .font-ITCGaramondN a {
            font-size: clamp(40px, 6vw, 120px) !important;
          }
        } */

        /* NON-ESSENTIAL - iOS smooth scrolling (modern browsers handle this) */
        /* @media (max-width: 767px) {
          html {
            -webkit-overflow-scrolling: touch;
          }
        } */

        /* NON-ESSENTIAL - Custom scrollbar styling (cosmetic only) */
        /* ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(80, 70, 48, 0.3);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(80, 70, 48, 0.5);
        } */
      `}</style>
    </>
  );
}
