"use client";

import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useTranslation } from "@/hooks/useTranslation";

gsap.registerPlugin(ScrollTrigger, SplitText);

// TypeScript-safe interface matching GSAP SplitText return
interface SplitTextInstance {
  chars: Element[];
  words: Element[];
  lines: Element[];
  revert: () => void;
}

const BlurryTextReveal: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { t, language, isLoading } = useTranslation();
  const [animationReady, setAnimationReady] = useState(false);

  // Helper function to get translated text with fallback
  const getTranslation = (key: string, fallback: string) => {
    const translated = t(key);
    return translated === key ? fallback : translated;
  };

  // Track when animation is ready after language change
  useEffect(() => {
    setAnimationReady(false);
    const timer = setTimeout(() => {
      setAnimationReady(true);
    }, 200); // Give time for DOM to update with new text
    return () => clearTimeout(timer);
  }, [language]);

  useGSAP(
    () => {
      if (!animationReady) return;

      let splitInstance: SplitTextInstance | null = null;

      const setupAnimation = () => {
        if (!titleRef.current || !sectionRef.current) return;

        // Wait for fonts to load before initializing SplitText
        document.fonts.ready.then(() => {
          // Use GSAP's premium SplitText plugin if available
          if (typeof SplitText !== "undefined") {
            splitInstance = new SplitText(titleRef.current, {
              type: "chars, words",
              charsClass: "char",
              wordsClass: "word",
              aria: "none", // Disable automatic aria-label addition
            }) as unknown as SplitTextInstance;

            // Initial state
            gsap.set(splitInstance.chars, {
              filter: "blur(20px)",
              opacity: 0,
              y: 50,
              rotateX: -90,
              transformOrigin: "0% 50% -50",
            });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "bottom 60%",
                scrub: 1.2,
              },
            });

            tl.to(splitInstance.chars, {
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
              rotateX: 0,
              stagger: {
                amount: 1.5,
                from: "start",
              },
              duration: 2,
              ease: "power3.out",
            });
          } else {
            // Fallback: manual character splitting
            const text = titleRef.current;
            if (!text) return;

            const textContent = text.innerHTML;

            const chars = textContent
              .split("")
              .map((char: string) =>
                char === " "
                  ? '<span class="char"> </span>'
                  : `<span class="char" style="display: inline-block;">${char}</span>`,
              )
              .join("");

            text.innerHTML = chars;

            const charElements = text.querySelectorAll(
              ".char",
            ) as NodeListOf<HTMLElement>;

            gsap.set(charElements, {
              filter: "blur(20px)",
              opacity: 0,
              y: 50,
              rotateX: -90,
              transformOrigin: "0% 50% -50",
            });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "bottom 60%",
                scrub: 1.2,
              },
            });

            tl.to(charElements, {
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
              rotateX: 0,
              stagger: {
                amount: 1.5,
                from: "start",
              },
              duration: 2,
              ease: "power3.out",
            });
          }
        });
      };

      setupAnimation();

      return () => {
        if (splitInstance?.revert) {
          splitInstance.revert();
        }
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: sectionRef, dependencies: [animationReady, language] },
  );

  // Show loading state while translations are loading
  if (isLoading) {
    return (
      <section className="text-primary mx-auto w-full px-4 text-center md:px-8">
        <div className="flex h-64 items-center justify-center">
          <div className="font-HelveticaNow text-primary/60">Chargement...</div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="text-primary mx-auto w-full px-4 text-center md:px-8"
      key={`textreveal-${language}`}
    >
      <span
        ref={titleRef}
        className="font-ITCGaramondN mx-auto max-w-6xl text-6xl md:text-9xl"
      >
        {getTranslation(
          "textreveal.part1",
          language === "nl" ? "Laten we iets" : "Créons quelque chose",
        )}{" "}
        <span
          className="font-ITCGaramondNI"
          style={{
            fontFamily: "var(--font-ITCGaramondStdLtNarrowIta), serif",
            fontWeight: "400",
            fontStyle: "italic",
            WebkitTextSizeAdjust: "none",
          }}
        >
          {getTranslation(
            "textreveal.part2",
            language === "nl" ? "ongelooflijks" : "d'incroyable",
          )}
        </span>{" "}
        {getTranslation(
          "textreveal.part3",
          language === "nl" ? "samen creëren" : "ensemble",
        )}
      </span>
    </section>
  );
};

export default BlurryTextReveal;
