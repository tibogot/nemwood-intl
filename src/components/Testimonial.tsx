"use client";

import React, { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import AnimatedText from "./AnimatedText3";
import { useTranslation } from "@/hooks/useTranslation";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonial() {
  const { t, language } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper function to get translated text with fallback
  const getTranslation = (key: string, fallback: string) => {
    const translated = t(key);
    return translated === key ? fallback : translated;
  };

  // Get title translation with fallback
  const title = getTranslation(
    "home.testimonials.title",
    language === "nl" ? "Getuigenissen" : "Témoignages",
  );

  // Get testimonials with translations and fallbacks - use useMemo to prevent recreation
  const testimonials = useMemo(
    () => [
      {
        name: getTranslation(
          "home.testimonials.testimonial1.name",
          "Sophie Dubois",
        ),
        text: getTranslation(
          "home.testimonials.testimonial1.text",
          language === "nl"
            ? "Het team van Nemwood heeft een op maat gemaakte keuken gecreëerd die al onze verwachtingen overtreft. Elk detail is zorgvuldig doordacht en het vakmanschap is van uitzonderlijke kwaliteit."
            : "L'équipe de Nemwood a créé une cuisine sur mesure qui dépasse toutes nos attentes. Chaque détail a été pensé avec soin et l'artisanat est d'une qualité exceptionnelle.",
        ),
        image: "/images/profile-1.webp",
      },
      {
        name: getTranslation(
          "home.testimonials.testimonial2.name",
          "Marc Lefevre",
        ),
        text: getTranslation(
          "home.testimonials.testimonial2.text",
          language === "nl"
            ? "Onze massief houten trap is het middelpunt van ons huis geworden. Meesterlijk werk dat schoonheid en functionaliteit combineert."
            : "Notre escalier en bois massif est devenu la pièce maîtresse de notre maison. Un travail d'orfèvre qui allie beauté et fonctionnalité.",
        ),
        image: "/images/profile-2.webp",
      },
      {
        name: getTranslation(
          "home.testimonials.testimonial3.name",
          "Claire Martinez",
        ),
        text: getTranslation(
          "home.testimonials.testimonial3.text",
          language === "nl"
            ? "Perfect geïntegreerde kasten die onze ruimte optimaliseren. Traditioneel vakmanschap ten dienste van hedendaags design."
            : "Des garde-robes parfaitement intégrées qui optimisent notre espace. Le savoir-faire traditionnel au service du design contemporain.",
        ),
        image: "/images/profile-3.webp",
      },
    ],
    [language, t],
  );

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray(".testimonial-card") as HTMLElement[];

        // Safety check - make sure we have cards
        if (!cards.length) {
          console.warn("Testimonial component: No cards found");
          return;
        }

        // Set initial state for all cards
        gsap.set(cards, {
          y: "100vh",
          scale: 0.8,
          rotation: 0,
        });

        // Create the main timeline with ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${cards.length * 100}%`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        // Animate each card one by one
        cards.forEach((card, i) => {
          tl.to(
            card,
            {
              y: 0,
              scale: 1,
              rotation: (i - 1) * 3, // Slight rotation for stacking effect
              duration: 1,
              ease: "power2.out",
            },
            i * 0.5, // Stagger the animations
          );
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [language] },
  );

  // Debug: Check if testimonials are loading
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="bg-secondary relative h-[100vh] overflow-hidden px-4 py-30 text-white md:px-8">
        <div className="flex h-full items-center justify-center">
          <p className="text-primary">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        ref={containerRef}
        className="bg-secondary relative h-[100vh] overflow-hidden px-4 py-30 text-white md:px-8"
      >
        {/* <Image
          src="/images/testimonial.webp"
          alt="Random from Picsum"
          fill
          className="rounded-sm object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
          // priority
          loading="lazy"
        /> */}
        <AnimatedText
          delay={0.0}
          stagger={0.3}
          translationKey="home.testimonials.title"
        >
          <h2 className="font-ITCGaramondN text-primary relative text-5xl leading-tight md:text-7xl">
            {title}
          </h2>
        </AnimatedText>
        {/* <Image
          className="relative h-auto w-full"
          src="/logonew4.svg"
          alt="Logo"
          width={1200} // use a large width for SVG
          height={300} // adjust height proportionally
          quality={100}
          // priority
        /> */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {testimonials.map((testimonial, i) => (
              <div
                key={`${language}-testimonial-${i}`}
                className="testimonial-card border-primary bg-secondary absolute top-1/2 left-1/2 flex h-[400px] w-[320px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-sm border p-6 md:h-[450px] md:w-[350px]"
                style={{ zIndex: i + 1 }}
              >
                {/* Main content - blockquote takes up most space */}
                <div className="flex flex-1 items-center justify-center">
                  <blockquote className="font-HelveticaNow text-primary text-center text-base leading-relaxed md:text-lg md:leading-tight">
                    <span className="font-HelveticaNow text-5xl">“</span>
                    {testimonial.text}
                    <span className="font-HelveticaNow inline-block align-top text-5xl leading-none">
                      “
                    </span>
                  </blockquote>
                </div>

                {/* Bottom section with profile image and name */}
                <div className="mt-4 flex flex-col items-center space-y-3 border-t pt-4">
                  <div className="relative h-12 w-12 md:h-14 md:w-14">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="border-primary/20 rounded-full border-2 object-cover"
                      sizes="(max-width: 768px) 48px, 56px"
                      quality={85}
                      onError={(e) => {
                        // Fallback to a default avatar if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback = document.createElement("div");
                        fallback.className =
                          "border-primary/20 h-12 w-12 md:h-14 md:w-14 rounded-full border-2 bg-primary/10 flex items-center justify-center";
                        fallback.innerHTML = `<span class="text-primary text-xs font-bold">${testimonial.name.charAt(0)}</span>`;
                        target.parentNode?.appendChild(fallback);
                      }}
                    />
                  </div>
                  <p className="font-HelveticaNow text-primary text-center text-xs tracking-wide uppercase md:text-sm">
                    {testimonial.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
