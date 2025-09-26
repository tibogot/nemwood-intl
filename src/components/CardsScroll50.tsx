"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Logo from "./Logo";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

function CardsScroll() {
  const mainContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const mainRef = useRef<HTMLElement>(null); // Add ref for main section

  // Store ScrollTrigger instances for proper cleanup
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const splitTextInstancesRef = useRef<any[]>([]);

  useEffect(() => {
    let cleanup: (() => void) | null = null;

    // Wait for fonts to load before splitting
    document.fonts.ready.then(() => {
      if (!mainRef.current) return; // Early return if component unmounted

      const scrollTriggerSettings = {
        trigger: mainRef.current, // Use ref instead of class selector
        start: "top 25%",
        toggleActions: "play reverse play reverse",
      };

      const leftXValues = [-800, -900, -800];
      const rightXValues = [800, 900, 800];
      const leftRotationValues = [-30, -20, -35];
      const rightRotationValues = [30, 20, 35];
      const yValues = [100, -150, -400];

      // Animate cards
      gsap.utils.toArray(".row").forEach((row: any, index: number) => {
        const cardLeft = row.querySelector(".card-left");
        const cardRight = row.querySelector(".card-right");

        if (cardLeft && mainRef.current) {
          const leftST = ScrollTrigger.create({
            trigger: mainRef.current, // Use ref instead of class selector
            start: "top center",
            end: "150% bottom",
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              cardLeft.style.transform = `translateX(${progress * leftXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * leftRotationValues[index]}deg)`;
            },
          });
          scrollTriggersRef.current.push(leftST);
        }

        if (cardRight && mainRef.current) {
          const rightST = ScrollTrigger.create({
            trigger: mainRef.current, // Use ref instead of class selector
            start: "top center",
            end: "150% bottom",
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              cardRight.style.transform = `translateX(${progress * rightXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * rightRotationValues[index]}deg)`;
            },
          });
          scrollTriggersRef.current.push(rightST);
        }
      });

      // Modern SplitText with built-in mask
      let titleSplit: any = null;
      let descriptionSplit: any = null;

      if (titleRef.current) {
        titleSplit = SplitText.create(titleRef.current, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          aria: "none", // Disable automatic aria-label addition
          onSplit: (self: any) => {
            const tl = gsap.from(self.lines, {
              yPercent: 100,
              stagger: 0.15,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: scrollTriggerSettings,
            });
            if (tl.scrollTrigger) {
              scrollTriggersRef.current.push(tl.scrollTrigger);
            }
            return tl;
          },
        });
        splitTextInstancesRef.current.push(titleSplit);
      }

      if (descriptionRef.current) {
        descriptionSplit = SplitText.create(descriptionRef.current, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          aria: "none", // Disable automatic aria-label addition
          onSplit: (self: any) => {
            const tl = gsap.from(self.lines, {
              yPercent: 100,
              stagger: 0.1,
              duration: 0.6,
              ease: "power2.out",
              delay: 0.4,
              scrollTrigger: scrollTriggerSettings,
            });
            if (tl.scrollTrigger) {
              scrollTriggersRef.current.push(tl.scrollTrigger);
            }
            return tl;
          },
        });
        splitTextInstancesRef.current.push(descriptionSplit);
      }

      // Animate the main text content
      if (mainContentRef.current && mainRef.current) {
        const mainContentST = ScrollTrigger.create({
          trigger: mainRef.current, // Use ref instead of class selector
          start: "top center",
          end: "150% bottom",
          scrub: true,
          animation: gsap.to(mainContentRef.current, {
            y: -100,
            ease: "none",
          }),
        });
        scrollTriggersRef.current.push(mainContentST);
      }
    });

    // Cleanup function that works regardless of font loading
    cleanup = () => {
      // Kill only the ScrollTriggers created by this component
      scrollTriggersRef.current.forEach((trigger) => {
        if (trigger && trigger.kill) {
          trigger.kill();
        }
      });
      scrollTriggersRef.current = [];

      // Properly clean up SplitText instances
      splitTextInstancesRef.current.forEach((splitInstance) => {
        if (splitInstance && splitInstance.revert) {
          splitInstance.revert();
        }
      });
      splitTextInstancesRef.current = [];
    };

    // Return cleanup function
    return cleanup;
  }, []);

  const generateRows = () => {
    const rows = [];
    for (let i = 1; i <= 3; i++) {
      rows.push(
        <div className="row m-4 flex w-full justify-center gap-4" key={i}>
          <div className="card card-left relative h-[240px] w-[50%] overflow-hidden rounded-sm will-change-transform md:h-[360px] md:w-[40%]">
            <Image
              src={`/img-${2 * i - 1}.webp`}
              alt={`Réalisation ${2 * i - 1} - Meubles en bois sur mesure par Nemwood, menuisier artisan en Belgique`}
              fill
              sizes="(max-width: 768px) 50vw, 40vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="card card-right relative h-[240px] w-[50%] overflow-hidden rounded-sm will-change-transform md:h-[360px] md:w-[40%]">
            <Image
              src={`/img-${2 * i}.webp`}
              alt={`Réalisation ${2 * i} - Mobilier artisanal en bois massif créé par Nemwood en Belgique`}
              fill
              sizes="(max-width: 768px) 50vw, 40vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>,
      );
    }
    return rows;
  };

  return (
    <div>
      <section
        ref={mainRef} // Add ref to main section
        className="main relative flex w-full flex-col items-center justify-center overflow-hidden text-center"
      >
        <div
          className="main-content absolute top-1/2 flex w-full -translate-y-1/2 flex-col items-center justify-center px-4 md:px-8"
          ref={mainContentRef}
        >
          <div className="copy text-primary flex flex-col items-center justify-center">
            <h3 className="text-5xl md:text-7xl" ref={titleRef}>
              Nos spécialités <br />
              artisanales
            </h3>
            <p
              ref={descriptionRef}
              className="font-HelveticaNow mx-auto mt-8 text-lg md:max-w-lg"
            >
              Découvrez notre gamme complète : escaliers sur mesure, garde-robes
              personnalisées, tables uniques et cuisines en bois massif. Chaque
              création est pensée pour s'harmoniser parfaitement avec votre
              intérieur.
            </p>
            <Link href="/services">
              <button className="font-HelveticaNow mt-10">
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
        {generateRows()}
      </section>
    </div>
  );
}

export default CardsScroll;
