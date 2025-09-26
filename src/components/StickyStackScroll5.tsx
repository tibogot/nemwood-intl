"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useLenis } from "lenis/react";
import Image from "next/image";
import AnimatedText from "./AnimatedText3";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Card1() {
  return (
    <div className="card relative w-full" id="card-1">
      <div className="card-inner bg-secondary text-primary border-primary/30 h-[600px] w-full overflow-hidden border-t px-4 py-4 md:h-[600px] md:px-8 md:py-6">
        <div className="flex h-full w-full flex-col md:flex-row">
          {/* Number */}
          <div className="flex w-full items-start md:w-1/12">
            <span className="text-sm leading-none">01</span>
          </div>

          {/* Title + Copy */}
          <div className="flex w-full flex-col items-start md:w-5/12 md:pr-6">
            <div>
              <h2 className="-mt-1 text-4xl leading-none">
                Deep Specialization
              </h2>

              <div className="mt-12" />

              <p className="font-HelveticaNow max-w-lg text-lg leading-relaxed">
                With decades of combined experience, Stack's specialists have
                unmatched insight into their sectors. By leveraging extensive
                industry relationships and AI-powered applied research, our
                teams systematically uncover emerging opportunities and critical
                market challenges. We then partner with the innovators best
                positioned to address these issues, ensuring they generate
                meaningful, lasting value.{" "}
              </p>
            </div>
          </div>

          {/* Desktop Image */}
          <div className="relative hidden h-full w-full overflow-hidden rounded-sm md:flex md:w-1/2">
            <Image
              src="/images/kitchen.webp"
              alt="Cuisine sur mesure"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="card relative w-full" id="card-2">
      <div className="card-inner bg-secondary text-primary border-primary/30 h-[600px] w-full overflow-hidden border-t px-4 py-4 md:h-[600px] md:px-8 md:py-6">
        <div className="flex h-full w-full flex-col md:flex-row">
          {/* Number */}
          <div className="flex w-full items-start md:w-1/12">
            <span className="text-sm leading-none">02</span>
          </div>

          {/* Title + Copy */}
          <div className="flex w-full flex-col items-start md:w-5/12 md:pr-6">
            <div>
              <h2 className="-mt-1 text-4xl leading-none">
                Modular Portfolio Construction
              </h2>

              <div className="mt-12" />

              <p className="font-HelveticaNow max-w-lg text-lg leading-relaxed">
                Every Stack fund operates as a standardized modular building
                block, empowering LPs to design custom private-market portfolios
                aligned precisely to their strategic priorities. Rather than
                selecting managers, LPs choose sectors—assembling targeted
                exposures to meet exact investment goals. This modular approach
                delivers clarity, precision, and tailored control, redefining
                portfolio construction as an intentional, sector-driven
                allocation strategy.
              </p>
            </div>
          </div>

          {/* Desktop Image */}
          <div className="relative hidden h-full w-full overflow-hidden rounded-sm md:flex md:w-1/2">
            <Image
              src="/images/stairs.webp"
              alt="Escaliers sur mesure"
              fill
              className="object-cover"
              sizes="50vw"
              loading="lazy"
              fetchPriority="auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="card relative w-full" id="card-3">
      <div className="card-inner bg-secondary text-primary border-primary/30 h-[600px] w-full overflow-hidden border-t px-4 py-4 md:h-[600px] md:px-8 md:py-6">
        <div className="flex h-full w-full flex-col md:flex-row">
          {/* Number */}
          <div className="flex w-full items-start md:w-1/12">
            <span className="text-sm leading-none">03</span>
          </div>

          {/* Title + Copy */}
          <div className="flex w-full flex-col items-start md:w-5/12 md:pr-6">
            <div>
              <h2 className="-mt-1 text-4xl leading-none">
                Institutional-Grade Infrastructure
              </h2>

              <div className="mt-12" />

              <p className="font-HelveticaNow max-w-lg text-lg leading-relaxed">
                Stack's scalable digital-first and AI-powered operational
                infrastructure ensures every fund benefits from uniformity in
                processes, compliance, reporting, and risk management. By
                centralizing and standardizing these operational elements across
                all funds, Stack delivers consistency and reliability, allowing
                partners to focus solely on their core strategic
                objectives.{" "}
              </p>
            </div>
          </div>

          {/* Desktop Image */}
          <div className="relative hidden h-full w-full overflow-hidden rounded-sm md:flex md:w-1/2">
            <Image
              src="/images/wardrobe.webp"
              alt="Garde-robes sur mesure"
              fill
              className="object-cover"
              sizes="50vw"
              loading="lazy"
              fetchPriority="auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Card4() {
  return (
    <div className="card relative w-full" id="card-4">
      <div className="card-inner bg-secondary text-primary border-primary/30 h-[600px] w-full overflow-hidden border-t px-4 py-4 md:h-[600px] md:px-8 md:py-6">
        <div className="flex h-full w-full flex-col md:flex-row">
          {/* Number */}
          <div className="flex w-full items-start md:w-1/12">
            <span className="text-sm leading-none">04</span>
          </div>

          {/* Title + Copy */}
          <div className="flex w-full flex-col items-start md:w-5/12 md:pr-6">
            <div>
              <h2 className="-mt-1 text-4xl leading-none">Construction</h2>

              <div className="mt-12" />

              <p className="font-HelveticaNow max-w-lg text-lg leading-relaxed">
                Innovative execution methods to deliver safe, high quality
                project is the foundation of our business and success.
              </p>
            </div>
          </div>

          {/* Desktop Image */}
          <div className="relative hidden h-full w-full overflow-hidden rounded-sm md:flex md:w-1/2">
            <Image
              src="/images/table.webp"
              alt="Tables en bois massif"
              fill
              className="object-cover"
              sizes="50vw"
              loading="lazy"
              fetchPriority="auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomeCard() {
  const lenis = useLenis();
  const container = useRef<HTMLDivElement>(null);
  const [domReady, setDomReady] = useState(false);

  // Force a refresh of ScrollTrigger on component mount
  useEffect(() => {
    // Short timeout to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      setDomReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Targeted cleanup on component unmount
  useEffect(() => {
    return () => {
      // Only kill ScrollTrigger instances that belong to this component's cards
      if (container.current) {
        const componentCards = container.current.querySelectorAll(".card");
        componentCards.forEach((card) => {
          ScrollTrigger.getAll().forEach((trigger) => {
            if (
              trigger.trigger === card ||
              trigger.trigger?.contains(card as Node)
            ) {
              trigger.kill();
            }
          });
        });

        // Only kill tweens that belong to this component's elements
        gsap.killTweensOf(container.current.querySelectorAll("*"));
      }
    };
  }, []);

  useGSAP(
    () => {
      if (!container.current || !domReady || !lenis) return;

      // Only run animations on desktop (md breakpoint and above)
      const mediaQuery = window.matchMedia("(min-width: 768px)");
      if (!mediaQuery.matches) {
        return;
      }

      const cards = gsap.utils.toArray(
        container.current.querySelectorAll(".card"),
      ) as Element[];
      if (cards.length === 0) return;

      // Tell ScrollTrigger to use Lenis for scroll calculations
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value?: number) {
          if (arguments.length && lenis) {
            // Use smooth scrolling for better integration
            lenis.scrollTo(value!, {
              duration: 0.6,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
          return lenis ? lenis.scroll : window.pageYOffset;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: document.body.style.transform ? "transform" : "fixed",
      });

      // Update ScrollTrigger on Lenis scroll with throttling
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            ScrollTrigger.update();
            ticking = false;
          });
          ticking = true;
        }
      };

      // Store the listener reference for proper cleanup
      const scrollListener = handleScroll;
      lenis.on("scroll", scrollListener);

      // Desktop settings only
      const startPosition = "top 20%";
      const endPosition = "top 30%";
      // Stop pinning when cards have stacked enough - before outro reaches top
      const cardEndPosition = "top 50%";
      const yOffset = 8;

      // Create a context for the intro pin
      const introPinCtx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: cards[0],
          start: startPosition,
          endTrigger: cards[cards.length - 1],
          end: endPosition,
          pin: ".intro",
          pinSpacing: false,
          scroller: document.body,
        });
      });

      // Array to store all card animation contexts
      const cardContexts: gsap.Context[] = [];

      cards.forEach((card, index) => {
        const isLastCard = index === cards.length - 1;
        const cardInner = card.querySelector(".card-inner") as HTMLElement;

        if (!isLastCard && cardInner) {
          // Pin each card except the last one
          const pinCtx = gsap.context(() => {
            ScrollTrigger.create({
              trigger: card,
              start: startPosition,
              endTrigger: cards[cards.length - 1], // End when last card starts
              end: "top 20%", // Stop pinning when last card reaches start position
              pin: true,
              pinSpacing: false,
              scroller: document.body,
            });
          });

          // Create stacking animation - move card up slightly
          const animCtx = gsap.context(() => {
            gsap.to(cardInner, {
              y: `-${(cards.length - index - 1) * yOffset}vh`,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: startPosition,
                endTrigger: cards[cards.length - 1],
                end: "top 20%",
                scrub: true,
                scroller: document.body,
              },
            });
          });

          cardContexts.push(pinCtx, animCtx);
        }
      });

      // Refresh ScrollTrigger after setup with proper timing
      ScrollTrigger.refresh();

      // Additional refresh after Lenis is fully initialized
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      // Return cleanup function
      return () => {
        // Clean up Lenis listener with proper reference
        if (lenis && scrollListener) {
          lenis.off("scroll", scrollListener);
        }

        // Clean up all contexts (this will properly kill associated ScrollTriggers)
        introPinCtx.revert();
        cardContexts.forEach((ctx) => ctx.revert());

        // Clear the scrollerProxy to prevent conflicts with other components
        ScrollTrigger.scrollerProxy(document.body, undefined);

        // Only kill tweens that belong to this component's elements
        if (container.current) {
          gsap.killTweensOf(container.current.querySelectorAll("*"));
        }
      };
    },
    {
      scope: container,
      dependencies: [domReady, lenis],
    },
  );

  return (
    <div className="overflow-x-hidden" ref={container}>
      {/* <section className="intro min-h-[40vh] px-4 pt-10 pb-14 md:flex md:min-h-[50vh] md:px-10 md:pb-30">
        <div className="left md:w-3/4">
          <h4 className="text-accent text-base md:text-lg">Services</h4>
          <h2 className="font-ITCGaramondN mt-4 w-full text-2xl md:w-3/4 md:text-3xl lg:text-4xl">
            Develop comprehensive solutions for each project
          </h2>
        </div>
        <div className="right mt-6 md:mt-0 md:w-1/2">
          <p className="font-HelveticaNow text-primary/80 mt-6 text-lg text-balance md:mt-14 md:w-3/4 md:text-xl">
            COAN West Africa Limited offers a complete spectrum of engineering
            and construction services designed to meet the diverse
            infrastructure needs of modern Nigeria. Our multidisciplinary
            approach ensures seamless project delivery from conception to
            completion.
          </p>
        </div>
      </section> */}
      <section className="text-primary bg-secondary intro mx-auto px-4 py-20 text-center md:px-8 md:py-30">
        <h1 className="font-ITCGaramondN mb-6 text-6xl">
          Creativity to design
        </h1>
        <AnimatedText>
          <p className="font-HelveticaNow mx-auto text-lg md:w-1/2">
            Vous cherchez un artisan menuisier en Belgique pour créer des
            meubles en bois sur mesure ? Nemwood est spécialisé dans la
            fabrication artisanale de tables, chaises, garde-robes, escaliers et
            même de décors pour le cinéma.
          </p>
        </AnimatedText>
      </section>

      {/* Mobile Layout */}
      <section className="text-primary block w-full py-8 md:hidden">
        <div className="space-y-8 px-4">
          {/* Card 1 */}
          <div className="bg-secondary border-primary/30 overflow-hidden border-t py-6">
            <span className="text-sm leading-none">01</span>
            <h2 className="mt-4 text-4xl leading-none">Deep Specialization</h2>
            <div className="mt-8" />
            <p className="font-HelveticaNow text-lg leading-relaxed">
              With decades of combined experience, Stack's specialists have
              unmatched insight into their sectors. By leveraging extensive
              industry relationships and AI-powered applied research, our teams
              systematically uncover emerging opportunities and critical market
              challenges. We then partner with the innovators best positioned to
              address these issues, ensuring they generate meaningful, lasting
              value.
            </p>
            <div className="mt-8">
              <div className="h-[400px] w-full overflow-hidden rounded-sm">
                <Image
                  src="/images/kitchen.webp"
                  alt="Cuisine sur mesure"
                  width={1000}
                  height={400}
                  className="h-full w-full object-cover"
                  style={{ width: "100%", height: "100%" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-secondary border-primary/30 overflow-hidden border-t py-6">
            <span className="text-sm leading-none">02</span>
            <h2 className="mt-4 text-4xl leading-none">
              Modular Portfolio Construction
            </h2>
            <div className="mt-8" />
            <p className="font-HelveticaNow text-lg leading-relaxed">
              Every Stack fund operates as a standardized modular building
              block, empowering LPs to design custom private-market portfolios
              aligned precisely to their strategic priorities. Rather than
              selecting managers, LPs choose sectors—assembling targeted
              exposures to meet exact investment goals. This modular approach
              delivers clarity, precision, and tailored control, redefining
              portfolio construction as an intentional, sector-driven allocation
              strategy.
            </p>
            <div className="mt-8">
              <div className="h-[400px] w-full overflow-hidden rounded-sm">
                <Image
                  src="/images/stairs.webp"
                  alt="Escaliers sur mesure"
                  width={1000}
                  height={400}
                  className="h-full w-full object-cover"
                  style={{ width: "100%", height: "100%" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-secondary border-primary/30 overflow-hidden border-t py-6">
            <span className="text-sm leading-none">03</span>
            <h2 className="mt-4 text-4xl leading-none">
              Institutional-Grade Infrastructure
            </h2>
            <div className="mt-8" />
            <p className="font-HelveticaNow text-lg leading-relaxed">
              Stack's scalable digital-first and AI-powered operational
              infrastructure ensures every fund benefits from uniformity in
              processes, compliance, reporting, and risk management. By
              centralizing and standardizing these operational elements across
              all funds, Stack delivers consistency and reliability, allowing
              partners to focus solely on their core strategic objectives.
            </p>
            <div className="mt-8">
              <div className="h-[400px] w-full overflow-hidden rounded-sm">
                <Image
                  src="/images/wardrobe.webp"
                  alt="Garde-robes sur mesure"
                  width={1000}
                  height={400}
                  className="h-full w-full object-cover"
                  style={{ width: "100%", height: "100%" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-secondary border-primary/30 overflow-hidden border-t py-6">
            <span className="text-sm leading-none">04</span>
            <h2 className="mt-4 text-4xl leading-none">Construction</h2>
            <div className="mt-8" />
            <p className="font-HelveticaNow text-lg leading-relaxed">
              Innovative execution methods to deliver safe, high quality project
              is the foundation of our business and success.
            </p>
            <div className="mt-8">
              <div className="h-[400px] w-full overflow-hidden rounded-sm">
                <Image
                  src="/images/table.webp"
                  alt="Tables en bois massif"
                  width={1000}
                  height={400}
                  className="h-full w-full object-cover"
                  style={{ width: "100%", height: "100%" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Layout */}
      <section className="cards relative hidden space-y-0 md:block md:space-y-0">
        <Card1 />
        <Card2 />
        <Card3 />
        <Card4 />
      </section>
      {false && (
        <section className="outro min-h-[40vh] px-4 py-10 md:min-h-[50vh] md:px-10 md:pb-30">
          <div className="md:w-3/4">
            <h4 className="text-accent text-base md:text-lg">Notre mission</h4>
            <h2 className="font-ITCGaramondN mt-4 w-full text-2xl md:w-3/4 md:text-3xl lg:text-4xl">
              Transforming Communities Through Superior Infrastructure
            </h2>
          </div>
          <div className="w-full text-base md:flex md:text-lg lg:text-xl">
            <div className="left md:w-3/4">
              <p className="font-HelveticaNow text-primary/80 mt-8 md:mt-14 md:w-1/2">
                At COAN West Africa Limited, our mission extends beyond
                construction – we are nation builders committed to creating
                sustainable infrastructure that enhances quality of life,
                promotes economic development, and connects communities across
                Nigeria.
              </p>
            </div>
            <div className="right mt-6 md:mt-0 md:w-1/2">
              {/* <Copy>
              <p className="mt-8 w-full text-lg md:mt-14 md:text-xl">
                To be the most trusted and innovative construction company in
                West Africa, setting new standards for quality, sustainability,
                and technological advancement in infrastructure development. We
                envision a future where our projects serve as benchmarks for
                excellence and contribute significantly to regional economic
                integration and development.
              </p>
              <br />
            </Copy> */}
            </div>
          </div>
          <div className="center-banner bg-secondary mt-8 rounded-sm md:mt-16">
            <div className="imgwrapper relative flex h-[300px] w-full items-center justify-center rounded-sm bg-amber-200 bg-[url(/images/testimonial.webp)] bg-cover bg-center text-white md:h-[400px]">
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 px-4"></div>

              <div className="flex flex-col items-center justify-center px-4 text-center">
                <h5 className="font-ITCGaramondN text-3xl md:w-3/4 md:text-5xl">
                  Nemwood, artisan menuisier en Belgique
                </h5>

                {/* <div className="relative z-50 flex justify-center">
                <a href="/contact" className="relative z-50">
                  <Button variant="withArrow" className="mt-10">
                    Contact us
                  </Button>
                </a>
              </div> */}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
