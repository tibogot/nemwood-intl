"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

function ReverseCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const leftTitleRef = useRef<HTMLHeadingElement>(null);
  const leftDescRef = useRef<HTMLParagraphElement>(null);
  const leftButtonRef = useRef<HTMLButtonElement>(null);
  const rightTitleRef = useRef<HTMLHeadingElement>(null);
  const rightDescRef = useRef<HTMLParagraphElement>(null);
  const rightButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!leftCardRef.current || !rightCardRef.current || !sectionRef.current)
      return;

    // Wait for fonts to load before splitting
    document.fonts.ready.then(() => {
      // Set initial positions (cards start spread out and rotated)
      gsap.set(leftCardRef.current, {
        x: -400,
        y: 200,
        rotation: -25,
        transformOrigin: "center center",
      });

      gsap.set(rightCardRef.current, {
        x: 400,
        y: 200,
        rotation: 25,
        transformOrigin: "center center",
      });

      // Hide text initially
      gsap.set(
        [
          leftTitleRef.current,
          leftDescRef.current,
          leftButtonRef.current,
          rightTitleRef.current,
          rightDescRef.current,
          rightButtonRef.current,
        ],
        {
          opacity: 0,
        },
      );

      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      });

      // Animate cards to center (0 to 0.7 of timeline)
      tl.to(
        leftCardRef.current,
        {
          x: 0,
          y: 0,
          rotation: 0,
          ease: "power2.out",
          duration: 0.7,
          onUpdate: function () {
            const progress = this.progress() * 0.7; // Scale to 70% of timeline
            if (leftCardRef.current) {
              leftCardRef.current.style.transform = `translateX(${-400 + (progress * 400) / 0.7}px) translateY(${200 - (progress * 200) / 0.7}px) rotate(${-25 + (progress * 25) / 0.7}deg)`;
            }
          },
        },
        0,
      ).to(
        rightCardRef.current,
        {
          x: 0,
          y: 0,
          rotation: 0,
          ease: "power2.out",
          duration: 0.7,
          onUpdate: function () {
            const progress = this.progress() * 0.7; // Scale to 70% of timeline
            if (rightCardRef.current) {
              rightCardRef.current.style.transform = `translateX(${400 - (progress * 400) / 0.7}px) translateY(${200 - (progress * 200) / 0.7}px) rotate(${25 - (progress * 25) / 0.7}deg)`;
            }
          },
        },
        0,
      );

      // Create SplitText instances and animate (0.7 to 1 of timeline)
      let leftTitleSplit: any = null;
      let leftDescSplit: any = null;
      let rightTitleSplit: any = null;
      let rightDescSplit: any = null;

      // Left card text animations
      if (leftTitleRef.current) {
        leftTitleSplit = SplitText.create(leftTitleRef.current, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          aria: "none", // Disable automatic aria-label addition
        });

        tl.from(
          leftTitleSplit.lines,
          {
            yPercent: 100,
            stagger: 0.1,
            duration: 0.15,
            ease: "power2.out",
          },
          0.7,
        );
      }

      if (leftDescRef.current) {
        leftDescSplit = SplitText.create(leftDescRef.current, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          aria: "none", // Disable automatic aria-label addition
        });

        tl.from(
          leftDescSplit.lines,
          {
            yPercent: 100,
            stagger: 0.05,
            duration: 0.1,
            ease: "power2.out",
          },
          0.75,
        );
      }

      // Right card text animations
      if (rightTitleRef.current) {
        rightTitleSplit = SplitText.create(rightTitleRef.current, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          aria: "none", // Disable automatic aria-label addition
        });

        tl.from(
          rightTitleSplit.lines,
          {
            yPercent: 100,
            stagger: 0.1,
            duration: 0.15,
            ease: "power2.out",
          },
          0.7,
        );
      }

      if (rightDescRef.current) {
        rightDescSplit = SplitText.create(rightDescRef.current, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          aria: "none", // Disable automatic aria-label addition
        });

        tl.from(
          rightDescSplit.lines,
          {
            yPercent: 100,
            stagger: 0.05,
            duration: 0.1,
            ease: "power2.out",
          },
          0.75,
        );
      }

      // Animate buttons
      tl.to(
        [leftButtonRef.current, rightButtonRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.1,
          ease: "power2.out",
          stagger: 0.05,
        },
        0.8,
      );

      // Show text containers
      tl.to(
        [
          leftTitleRef.current,
          leftDescRef.current,
          rightTitleRef.current,
          rightDescRef.current,
        ],
        {
          opacity: 1,
          duration: 0.01,
        },
        0.7,
      );

      // Cleanup function
      return () => {
        // Kill all ScrollTriggers
        ScrollTrigger.getAll().forEach((trigger) => {
          trigger.kill();
        });

        // Properly clean up SplitText instances
        if (leftTitleSplit) {
          leftTitleSplit.revert();
        }
        if (leftDescSplit) {
          leftDescSplit.revert();
        }
        if (rightTitleSplit) {
          rightTitleSplit.revert();
        }
        if (rightDescSplit) {
          rightDescSplit.revert();
        }

        // Kill timeline
        tl.kill();
      };
    }); // End of document.fonts.ready.then()
  }, []);

  return (
    <div>
      <section
        ref={sectionRef}
        className="text-primary flex w-full flex-col gap-10 overflow-hidden px-4 pt-0 pb-8 md:h-[800px] md:flex-row md:px-8 md:pb-20"
      >
        {/* Left Card */}
        <div
          ref={leftCardRef}
          className="left relative flex flex-col will-change-transform md:w-1/2"
        >
          {/* Image Container */}
          <div className="absolute inset-0 h-full w-full overflow-hidden rounded-sm select-none">
            <Image
              src="/images/woman-garden.webp"
              alt="Aménagement extérieur en bois sur mesure - Terrasse et mobilier de jardin par Nemwood"
              fill
              sizes="50vw"
              // width={1000}
              // height={800}
              className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-110"
              loading="lazy"
            />
          </div>

          {/* Text over Image */}
          <div className="z-10 mt-auto p-6 text-left text-white">
            <h2
              ref={leftTitleRef}
              className="font-ITCGaramondN text-5xl leading-tight"
            >
              Aménagements intérieurs
            </h2>
            <p ref={leftDescRef} className="font-NHD text-sm">
              Créations sur mesure pour optimiser et embellir vos espaces de
              vie.
            </p>
            <button ref={leftButtonRef} className="font-HelveticaNow mt-4">
              <div className="border-secondary hover:border-primary hover:bg-primary hover:text-secondary flex cursor-pointer items-center border border-solid px-4 py-2 transition-colors duration-300 ease-in-out">
                <span>Read more</span>
                <div className="mt-0.5 ml-1">
                  <ArrowRight size={18} strokeWidth={1.5} />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Right Card */}
        <div
          ref={rightCardRef}
          className="right relative flex flex-col will-change-transform md:w-1/2"
        >
          {/* Image Container */}
          <div className="absolute inset-0 h-full w-full overflow-hidden rounded-sm select-none">
            <Image
              src="/images/dress.webp"
              alt="Dressing et garde-robe sur mesure en bois massif - Menuiserie artisanale Nemwood"
              fill
              sizes="50vw"
              // width={1000}
              // height={800}
              className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-110"
              loading="lazy"
            />
          </div>

          {/* Text over Image */}
          <div className="z-10 mt-auto p-6 text-left text-white">
            <h2
              ref={rightTitleRef}
              className="font-ITCGaramondN text-5xl leading-tight"
            >
              Mobilier design
            </h2>
            <p ref={rightDescRef} className="font-HelveticaNow text-sm">
              Tables, chaises et meubles d'exception façonnés dans notre atelier
              belge.{" "}
            </p>
            <button ref={rightButtonRef} className="font-HelveticaNow mt-4">
              <div className="border-secondary hover:border-primary hover:bg-primary hover:text-secondary flex cursor-pointer items-center border border-solid px-4 py-2 transition-colors duration-300 ease-in-out">
                <span>Read more</span>
                <div className="mt-0.5 ml-1">
                  <ArrowRight size={18} strokeWidth={1.5} />
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReverseCards;
