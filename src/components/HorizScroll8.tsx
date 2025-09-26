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
import { useTranslation } from "@/hooks/useTranslation";
import { getLocalizedRoute } from "@/utils/navigation";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HorizScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { t, language, isLoading } = useTranslation();
  const [containerReady, setContainerReady] = useState(false);

  // Helper function to get translated text with fallback
  const getTranslation = (key: string, fallback: string) => {
    const translated = t(key);
    return translated === key ? fallback : translated;
  };

  // Data for sections with fallbacks
  const sections = [
    {
      number: "1/4",
      title: getTranslation(
        "services.stairs.title",
        language === "nl" ? "Trappen" : "Escaliers",
      ),
      description: getTranslation(
        "services.stairs.description",
        language === "nl"
          ? "Voeg karakter toe aan uw interieur met een op maat gemaakte houten trap, die robuustheid, esthetiek en ambachtelijke afwerking combineert."
          : "Ajoutez du caractère à votre intérieur avec un escalier en bois sur mesure, alliant robustesse, esthétique et finition artisanale.",
      ),
      slug: "escaliers",
      image: "/images/stairs.webp",
    },
    {
      number: "2/4",
      title: getTranslation(
        "services.wardrobes.title",
        language === "nl" ? "Kasten" : "Garde-robes",
      ),
      description: getTranslation(
        "services.wardrobes.description",
        language === "nl"
          ? "Ontwerp een massief houten kast die bij u past: warm, functioneel en volledig gepersonaliseerd volgens uw behoeften en ruimte."
          : "Concevez une garde-robe en bois massif qui vous ressemble : chaleureuse, fonctionnelle et entièrement personnalisée selon vos besoins et votre espace.",
      ),
      slug: "garde-robes",
      image: "/images/wardrobe.webp",
    },
    {
      number: "3/4",
      title: getTranslation(
        "services.tables.title",
        language === "nl" ? "Tafels" : "Tables",
      ),
      description: getTranslation(
        "services.tables.description",
        language === "nl"
          ? "Creëer uw op maat gemaakte houten tafel: het middelpunt van uw huis, uniek, duurzaam en handgemaakt in onze werkplaats."
          : "Créez votre table en bois sur mesure : pièce centrale de votre maison, unique, durable et façonnée à la main dans notre atelier.",
      ),
      slug: "tables",
      image: "/images/table.webp",
    },
    {
      number: "4/4",
      title: getTranslation(
        "services.kitchens.title",
        language === "nl" ? "Keukens" : "Cuisines",
      ),
      description: getTranslation(
        "services.kitchens.description",
        language === "nl"
          ? "Ontwerp een massief houten keuken die bij u past: warm, functioneel en volledig gepersonaliseerd volgens uw behoeften en ruimte."
          : "Concevez une cuisine en bois massif qui vous ressemble : chaleureuse, fonctionnelle et entièrement personnalisée selon vos besoins et votre espace.",
      ),
      slug: "cuisines",
      image: "/images/kitchen.webp",
    },
  ];

  // Track when container is ready
  useEffect(() => {
    setContainerReady(false);
    const timer = setTimeout(() => {
      if (containerRef.current) {
        setContainerReady(true);
      }
    }, 200); // Increased delay for better reliability
    return () => clearTimeout(timer);
  }, [language]);

  // Fallback to ensure text is always visible after language change
  useEffect(() => {
    if (!containerReady) return;

    const fallbackTimer = setTimeout(() => {
      // Ensure any hidden text becomes visible as fallback
      const container = containerRef.current;
      if (container) {
        const hiddenElements = container.querySelectorAll(
          '[style*="visibility: hidden"], [style*="opacity: 0"]',
        );
        console.log(
          `Found ${hiddenElements.length} hidden elements after language change to ${language}`,
        );

        hiddenElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.textContent && htmlEl.textContent.trim()) {
            console.log(
              "Making element visible:",
              htmlEl.textContent.substring(0, 50),
            );
            gsap.set(htmlEl, { visibility: "visible", opacity: 1 });
          }
        });
      }
    }, 1500); // Fallback after 1.5 seconds

    return () => clearTimeout(fallbackTimer);
  }, [language, containerReady]);

  useGSAP(
    () => {
      // Only run horizontal scroll animation on desktop (md and up) - exact same check as HorizScroll7
      if (
        window.innerWidth < 768 ||
        !containerRef.current ||
        !scrollerRef.current
      )
        return;

      // Wait for page transition to complete before initializing ScrollTrigger
      const initializeScrollTrigger = () => {
        // Check if page transition is blocking scroll
        const isScrollBlocked =
          document.body.style.overflow === "hidden" ||
          document.documentElement.style.overflow === "hidden";

        if (isScrollBlocked) {
          // Wait for scroll to be unblocked
          setTimeout(initializeScrollTrigger, 100);
          return;
        }

        // Check if this ScrollTrigger already exists to prevent duplicates
        const existingTrigger = ScrollTrigger.getById("horizontal-scroll-main");
        if (existingTrigger) {
          existingTrigger.kill();
        }

        // Force refresh ScrollTrigger to work properly with Lenis
        ScrollTrigger.refresh();

        // Additional null check for scrollerRef
        if (!scrollerRef.current) return;

        const scrollWidth = scrollerRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;

        // Calculate the distance to scroll (total width - viewport width)
        const scrollDistance = scrollWidth - viewportWidth;

        // Create the horizontal scroll animation with proper cleanup
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
            // Add unique id for better cleanup
            id: "horizontal-scroll-main",
            // Add markers for debugging (remove in production)
            // markers: true,
          },
        });

        // Store animation reference for manual cleanup if needed
        if (containerRef.current) {
          (containerRef.current as any).horizontalScrollAnimation =
            horizontalScrollAnimation;
        }
      };

      // Delay initialization to avoid conflicts with page transitions
      const timeoutId = setTimeout(initializeScrollTrigger, 300);

      // Cleanup function
      return () => {
        clearTimeout(timeoutId);
        // Kill the specific ScrollTrigger
        ScrollTrigger.getById("horizontal-scroll-main")?.kill();
        // Kill any stored animation
        if (
          containerRef.current &&
          (containerRef.current as any).horizontalScrollAnimation
        ) {
          (containerRef.current as any).horizontalScrollAnimation.kill();
        }
      };
    },
    { scope: containerRef, dependencies: [language, containerReady] },
  );

  // Show loading state while translations are loading
  if (isLoading) {
    return (
      <div className="text-primary flex h-64 w-full items-center justify-center py-8">
        <div className="font-HelveticaNow text-primary/60">Chargement...</div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Layout */}
      <div className="text-primary block w-full py-8 md:hidden">
        <div className="space-y-8 px-4">
          {sections.map((section, index) => (
            <div
              key={`mobile-${language}-${index}`}
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
                  href={getLocalizedRoute(`services/${section.slug}`, language)}
                  aria-label={`${getTranslation("services.learn_more_aria", language === "nl" ? "Meer weten over onze" : "En savoir plus sur nos")} ${section.title.toLowerCase()}`}
                >
                  <button className="font-HelveticaNow">
                    <div className="border-primary hover:bg-primary hover:text-secondary flex cursor-pointer items-center border border-solid px-4 py-2 transition-colors duration-300 ease-in-out">
                      <span>
                        {getTranslation(
                          "services.learn_more",
                          language === "nl" ? "Meer weten" : "En savoir plus",
                        )}
                      </span>
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
        key={`horizontal-scroll-${language}`}
      >
        <div
          ref={scrollerRef}
          className="flex h-full"
          style={{ width: "400vw" }}
        >
          {sections.map((section, index) => (
            <div
              key={`desktop-${language}-${index}`}
              className="scroll-section flex h-full w-screen flex-row"
            >
              <div className="flex h-full w-1/2 flex-col justify-between pt-30 pb-20 pl-8">
                {containerReady ? (
                  <AnimatedTextHorizontal
                    key={`horizontal-text-${language}-${index}-title`}
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
                ) : (
                  // Fallback content while container is not ready
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
                )}
                {containerReady ? (
                  <AnimatedTextHorizontal
                    key={`horizontal-text-${language}-${index}-description`}
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
                ) : (
                  // Fallback content while container is not ready
                  <p
                    className="font-HelveticaNow mb-6 w-1/2 text-lg leading-tight"
                    aria-hidden="true"
                  >
                    {section.description}
                  </p>
                )}
                <div>
                  <Link
                    href={getLocalizedRoute(
                      `services/${section.slug}`,
                      language,
                    )}
                    tabIndex={-1}
                    aria-hidden="true"
                    aria-label={`${getTranslation("services.learn_more_aria", language === "nl" ? "Meer weten over onze" : "En savoir plus sur nos")} ${section.title.toLowerCase()}`}
                  >
                    <button className="font-HelveticaNow" tabIndex={-1}>
                      <div className="border-primary hover:bg-primary hover:text-secondary flex cursor-pointer items-center border border-solid px-4 py-2 transition-colors duration-300 ease-in-out">
                        <span>
                          {getTranslation(
                            "services.learn_more",
                            language === "nl" ? "Meer weten" : "En savoir plus",
                          )}
                        </span>
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
