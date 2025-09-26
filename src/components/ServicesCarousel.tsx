"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

// Register GSAP plugins
gsap.registerPlugin(Draggable, InertiaPlugin);

interface Service {
  title: string;
  slug: string;
  image: string;
}

interface ServicesCarouselProps {
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onLinkClick?: () => void;
}

const services: Service[] = [
  {
    title: "Escaliers",
    slug: "escaliers",
    image: "/images/stairs.webp",
  },
  {
    title: "Garde-robes",
    slug: "garde-robes",
    image: "/images/wardrobe.webp",
  },
  {
    title: "Tables",
    slug: "tables",
    image: "/images/table.webp",
  },
  {
    title: "Cuisines",
    slug: "cuisines",
    image: "/images/kitchen.webp",
  },
  {
    title: "Bibliothèque",
    slug: "bibliotheque",
    image: "/images/woodshelf.webp",
  },
  {
    title: "Bureau",
    slug: "bureau",
    image: "/images/desk.webp",
  },
  {
    title: "Salle de bain",
    slug: "salle-de-bain",
    image: "/images/bathroom.webp",
  },
];

export default function ServicesCarousel({
  isVisible,
  onMouseEnter,
  onMouseLeave,
  onLinkClick,
}: ServicesCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Initialize cards to hidden state
  useGSAP(() => {
    if (!cardsRef.current.length) return;

    // Set initial hidden state
    gsap.set(cardsRef.current, {
      x: 200,
      opacity: 0,
      scale: 0.9,
    });
  }, []);

  // Handle visibility changes
  useGSAP(() => {
    if (!cardsRef.current.length) return;

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    if (isVisible) {
      // Entrance animation
      setIsAnimating(true);
      timelineRef.current = gsap.timeline({
        onComplete: () => {
          setAnimationComplete(true);
          setIsAnimating(false);
        },
      });

      timelineRef.current.to(cardsRef.current, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: {
          each: 0.08,
          from: "start",
        },
        ease: "power2.out",
      });
    } else {
      // Exit animation - can interrupt entrance animation
      setIsAnimating(true);
      timelineRef.current = gsap.timeline({
        onComplete: () => {
          setAnimationComplete(false);
          setIsAnimating(false);
          // Reset to initial hidden state
          gsap.set(cardsRef.current, {
            x: 200,
            opacity: 0,
            scale: 0.9,
          });
        },
      });

      timelineRef.current.to(cardsRef.current, {
        x: -100,
        opacity: 0,
        scale: 0.9,
        duration: 0.3, // Slightly faster exit
        stagger: {
          each: 0.04, // Faster stagger
          from: "end",
        },
        ease: "power2.in",
      });
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [isVisible]);

  // Calculate bounds for dragging
  const calculateBounds = () => {
    if (!containerRef.current || !carouselRef.current) return null;

    const container = containerRef.current;
    const slideWidth = 320; // w-80
    const gap = 16; // gap-4
    const slidesCount = services.length;
    const rightPadding = 80; // md:pr-20

    // Calculate total content width (cards + gaps + padding)
    const totalSliderWidth =
      slideWidth * slidesCount + gap * (slidesCount - 1) + rightPadding;

    // Calculate max drag distance - how far we can scroll
    const maxDragX = -(totalSliderWidth - container.offsetWidth);

    // Add small buffer to prevent over-scrolling
    const bufferedMaxDragX = maxDragX + 50; // 50px buffer

    return {
      minX: bufferedMaxDragX,
      maxX: 0,
      totalSliderWidth,
    };
  };

  // Create draggable functionality directly on the carousel
  const createDraggable = () => {
    const bounds = calculateBounds();
    if (!bounds || !carouselRef.current) return;

    const { minX, maxX } = bounds;
    const slider = carouselRef.current;

    draggableRef.current = Draggable.create(slider, {
      type: "x",
      edgeResistance: 0.75,
      bounds: { minX, maxX },
      inertia: true,
      throwProps: true,
      cursor: "grab",
      onPress: function () {
        gsap.set(document.body, { cursor: "grabbing" });
        gsap.killTweensOf(slider);
      },
      onRelease: function () {
        gsap.set(document.body, { cursor: "grab" });
      },
      onClick: function (e) {
        // GSAP's built-in click detection - only fires if no significant dragging occurred
        // Since clickableTest allows links to be clicked directly, this mainly serves as a fallback
        console.log("Click detected on carousel (fallback)");
      },
      // Allow clicks on interactive elements like links
      clickableTest: function (target) {
        // Return true if the target should be considered clickable (ignored by dragging)
        // This allows links and buttons to be clicked normally
        return target.tagName === "A" || target.closest("a") !== null;
      },
    })[0];
  };

  // Arrow navigation functions
  const scrollLeft = () => {
    if (!carouselRef.current || !draggableRef.current) return;

    const currentX = gsap.getProperty(carouselRef.current, "x") as number;
    const cardWidth = 320 + 16; // w-80 + gap-4
    const newX = Math.min(currentX + cardWidth, 0);

    gsap.to(carouselRef.current, {
      x: newX,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const scrollRight = () => {
    if (!carouselRef.current || !draggableRef.current) return;

    const bounds = calculateBounds();
    if (!bounds) return;

    const currentX = gsap.getProperty(carouselRef.current, "x") as number;
    const cardWidth = 320 + 16; // w-80 + gap-4
    const newX = Math.max(currentX - cardWidth, bounds.minX);

    gsap.to(carouselRef.current, {
      x: newX,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  // Initialize draggables when animation is complete
  useGSAP(() => {
    if (!isVisible || !animationComplete || isAnimating) return;

    const timeoutId = setTimeout(() => {
      createDraggable();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (draggableRef.current) {
        draggableRef.current.kill();
        draggableRef.current = null;
      }
    };
  }, [isVisible, animationComplete, isAnimating]);

  return (
    <div
      className={`relative z-50 hidden md:block ${!isVisible ? "pointer-events-none" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div ref={containerRef} className="relative w-screen overflow-hidden">
        <div
          ref={carouselRef}
          className="flex gap-4 pr-12 md:pr-20"
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
            perspective: 1000,
            cursor: "grab",
          }}
        >
          {services.map((service, index) => (
            <div
              key={service.slug}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="flex-shrink-0"
            >
              <Link
                href={`/services/${service.slug}`}
                className="group block"
                onClick={onLinkClick}
              >
                <div className="service-card bg-primary/5 relative h-72 w-80 cursor-pointer overflow-hidden rounded-sm">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    sizes="320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-ITCGaramondN text-4xl font-medium">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Always rendered to reserve space, opacity controlled */}
        <div className="mt-6 flex justify-end pr-12 md:pr-20">
          <div
            className={`flex gap-2 transition-opacity duration-300 ${
              isVisible && animationComplete ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={scrollLeft}
              className="text-primary hover:text-primary/70 flex h-10 w-10 cursor-pointer items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="Scroll left"
              disabled={!isVisible || !animationComplete}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="text-primary hover:text-primary/70 flex h-10 w-10 cursor-pointer items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="Scroll right"
              disabled={!isVisible || !animationComplete}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
