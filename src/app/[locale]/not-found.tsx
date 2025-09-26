import Link from "next/link";
import Image from "next/image";
import AnimatedText from "@/components/AnimatedText3";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="bg-secondary text-primary flex min-h-[100svh] flex-col items-center justify-center px-4 md:px-8">
      {/* Background Image */}
      {/* <div className="absolute inset-0 z-0">
        <Image
          src="/images/iso2.webp"
          alt="Nemwood - Page not found"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div> */}

      {/* Content */}
      <div className="relative z-10 mx-auto w-full text-center">
        {/* 404 Number */}
        <AnimatedText isHero delay={0.0} stagger={0.1}>
          <div className="mb-1 flex justify-center md:mb-4">
            <svg
              viewBox="0 0 1200 500"
              className="text-primary h-[clamp(150px,25vh,400px)] w-full max-w-full md:h-[clamp(200px,40vh,400px)] md:w-[95vw]"
              fill="currentColor"
            >
              <text
                x="50%"
                y="60%"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="600"
                style={{
                  fontFamily: "var(--font-ITCGaramondStdLtNarrow), serif",
                  fontWeight: "normal",
                }}
              >
                404
              </text>
            </svg>
          </div>
        </AnimatedText>

        {/* Error Message */}
        <AnimatedText isHero delay={0.3} stagger={0.2}>
          <h2 className="font-ITCGaramondN mb-1 text-2xl md:mb-2 md:text-3xl">
            Page introuvable
          </h2>
        </AnimatedText>

        {/* Description */}
        <AnimatedText isHero delay={0.6} stagger={0.1}>
          <p className="font-HelveticaNow text-primary/60 mx-auto mb-6 max-w-sm text-base leading-relaxed text-balance md:text-sm">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </AnimatedText>

        {/* Action Buttons */}
        <AnimatedText isHero delay={0.9} stagger={0.1}>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            {/* Home Button */}
            <Link href="/">
              <button className="font-HelveticaNow cursor-pointer">
                <div className="border-primary hover:bg-primary hover:text-secondary flex items-center border border-solid px-4 py-2 transition-colors duration-300 ease-in-out">
                  <span>Retour à l'accueil</span>
                  <div className="mt-0.5 ml-1">
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </div>
                </div>
              </button>
            </Link>

            {/* Blog Button */}
            {/* <Link
              href="/blog"
              className="font-HelveticaNow border-primary text-primary hover:bg-primary hover:text-secondary flex cursor-pointer items-center justify-center border border-solid px-8 py-4 transition-all duration-300 ease-in-out hover:scale-105"
            >
              <span>Voir nos articles</span>
            </Link> */}
          </div>
        </AnimatedText>

        {/* Additional Help */}
        {/* <AnimatedText isHero delay={1.2} stagger={0.1}>
          <div className="border-primary/60 mt-12 border-t pt-8">
            <p className="font-HelveticaNow mb-4 text-sm text-gray-500">
              Besoin d'aide ? Contactez-nous
            </p>
            <div className="flex flex-col items-center justify-center gap-4 text-sm sm:flex-row">
              <a
                href="mailto:contact@nemwood.be"
                className="text-primary hover:text-primary/70 cursor-pointer transition-colors"
              >
                contact@nemwood.be
              </a>
              <span className="hidden text-gray-400 sm:block">•</span>
              <a
                href="tel:+32489330544"
                className="text-primary hover:text-primary/70 cursor-pointer transition-colors"
              >
                +32 489 33 05 44
              </a>
            </div>
          </div>
        </AnimatedText> */}
      </div>

      {/* Decorative Elements */}
      {/* <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transform">
        <div className="flex space-x-2">
          <div className="bg-primary/30 h-2 w-2 animate-pulse rounded-full"></div>
          <div
            className="bg-primary/30 h-2 w-2 animate-pulse rounded-full"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="bg-primary/30 h-2 w-2 animate-pulse rounded-full"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div> */}
    </main>
  );
}
