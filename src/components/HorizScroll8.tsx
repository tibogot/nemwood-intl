"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedTextHorizontal from "./AnimatedTextHorizontal";
import AnimatedText from "./AnimatedText3";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HorizScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  // Data for sections
  const sections = [
    {
      number: "1/4",
      title: "Escaliers",
      slug: "escaliers",
      description:
        "Ajoutez du caractère à votre intérieur avec un escalier en bois sur mesure, alliant robustesse, esthétique et finition artisanale.",
      image: "/images/stairs.webp",
    },
    {
      number: "2/4",
      title: "Garde-robes",
      slug: "garde-robes",
      description:
        "Concevez une garde-robe en bois massif qui vous ressemble : chaleureuse, fonctionnelle et entièrement personnalisée selon vos besoins et votre espace.",
      image: "/images/wardrobe.webp",
    },
    {
      number: "3/4",
      title: "Tables",
      slug: "tables",
      description:
        "Créez votre table en bois sur mesure : pièce centrale de votre maison, unique, durable et façonnée à la main dans notre atelier.",
      image: "/images/table.webp",
    },
    {
      number: "4/4",
      title: "Cuisines",
      slug: "cuisines",
      description:
        "Concevez une cuisine en bois massif qui vous ressemble : chaleureuse, fonctionnelle et entièrement personnalisée selon vos besoins et votre espace.",
      image: "/images/kitchen.webp",
    },
  ];

  useGSAP(
    () => {
      // Only run horizontal scroll animation on desktop (md and up) - exact same check as HorizScroll7
      if (
        window.innerWidth < 768 ||
        !containerRef.current ||
        !scrollerRef.current
      )
        return;

      // Force refresh ScrollTrigger to work properly with Lenis
      ScrollTrigger.refresh();

      const scrollWidth = scrollerRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;

      // Calculate the distance to scroll (total width - viewport width)
      const scrollDistance = scrollWidth - viewportWidth;

      // Create the horizontal scroll animation - exact same config as HorizScroll7
      const horizontalScrollAnimation = gsap.to(scrollerRef.current, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          //@ts-ignore
          normalizeScroll: true,
        },
      });

      // Cleanup function is handled by useGSAP
    },
    { scope: containerRef },
  );

  return (
    <>
      {/* Mobile Layout */}
      <div className="text-primary block w-full py-8 md:hidden">
        <div className="space-y-8 px-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className="group bg-secondary relative cursor-pointer overflow-hidden rounded-sm duration-300"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={section.image}
                  alt={section.title}
                  width={1000}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={75}
                />
              </div>
              <div className="py-6">
                <AnimatedText>
                  <p className="font-HelveticaNow text-primary/70 mb-3 text-xs tracking-wider uppercase">
                    {section.number}
                  </p>
                  <h3 className="font-ITCGaramondN text-primary mb-4 text-4xl leading-tight">
                    {section.title}
                  </h3>
                  <p className="font-HelveticaNow text-primary/80 mb-6 text-base leading-relaxed">
                    {section.description}
                  </p>
                </AnimatedText>
                <Link
                  href={`/services/${section.slug}`}
                  aria-label={`En savoir plus sur nos ${section.title.toLowerCase()}`}
                >
                  <button className="font-HelveticaNow">
                    <div className="border-primary hover:bg-primary hover:text-secondary flex cursor-pointer items-center border border-solid px-4 py-2 transition-colors duration-300 ease-in-out">
                      <span>En savoir plus</span>
                      <div className="mt-0.5 ml-1">
                        <ArrowRight size={18} strokeWidth={1.5} />
                      </div>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout - Hidden from SEO to avoid duplicate content */}
      <div
        ref={containerRef}
        className="text-primary hidden h-screen w-full overflow-hidden md:block"
        aria-hidden="true"
        data-horizontal-scroll
      >
        <div
          ref={scrollerRef}
          className="flex h-full"
          style={{ width: "400vw" }}
        >
          {sections.map((section, index) => (
            <div
              key={`desktop-${index}`}
              className="scroll-section flex h-full w-screen flex-row"
            >
              <div className="flex h-full w-1/2 flex-col justify-between pt-30 pb-20 pl-8">
                <AnimatedTextHorizontal
                  horizontalContainer={containerRef.current}
                  sectionIndex={index}
                  totalSections={4}
                  stagger={0.1}
                  duration={0.6}
                  delay={0.2}
                >
                  <div>
                    <p
                      className="font-HelveticaNow text-primary/70 text-sm leading-tight"
                      aria-hidden="true"
                    >
                      {section.number}
                    </p>
                    <h3
                      className="font-ITCGaramondN mt-8 mb-4 text-8xl"
                      aria-hidden="true"
                    >
                      {section.title}
                    </h3>
                  </div>
                </AnimatedTextHorizontal>
                <AnimatedTextHorizontal
                  horizontalContainer={containerRef.current}
                  sectionIndex={index}
                  totalSections={4}
                  stagger={0.05}
                  duration={0.5}
                  delay={0.4}
                >
                  <p
                    className="font-HelveticaNow mb-6 w-1/2 text-lg leading-tight"
                    aria-hidden="true"
                  >
                    {section.description}
                  </p>
                </AnimatedTextHorizontal>
                <div>
                  <Link
                    href={`/services/${section.slug}`}
                    tabIndex={-1}
                    aria-hidden="true"
                    aria-label={`En savoir plus sur nos ${section.title.toLowerCase()}`}
                  >
                    <button className="font-HelveticaNow" tabIndex={-1}>
                      <div className="border-primary hover:bg-primary hover:text-secondary flex cursor-pointer items-center border border-solid px-4 py-2 transition-colors duration-300 ease-in-out">
                        <span>En savoir plus</span>
                        <div className="mt-0.5 ml-1">
                          <ArrowRight size={18} strokeWidth={1.5} />
                        </div>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>

              <div className="group relative h-full w-1/2 cursor-pointer overflow-hidden">
                <Image
                  src={section.image}
                  alt={`Réalisation ${section.title.toLowerCase()} sur mesure par Nemwood - Menuisier artisan en Belgique`}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  loading="lazy"
                  fetchPriority="auto"
                  sizes="50vw"
                  quality={75}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HorizScroll;
