import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { generateMetadata } from "@/app/metadata";
import FAQ from "@/components/FAQ";
import AnimatedText from "@/components/AnimatedText3";
import ParallaxImage from "@/components/ParallaxImage";

export const metadata: Metadata = generateMetadata(
  "Escaliers en bois sur mesure en Belgique | Nemwood",
  "Fabrication d'escaliers en bois massif sur mesure en Belgique. Artisanat traditionnel, finitions personnalisées. Devis gratuit.",
  "/images/stairs.webp",
  "https://www.nemwood.be/services/escaliers",
);

export default function EscaliersPage() {
  return (
    <main className="bg-secondary text-primary">
      {/* Hero Section */}
      <section className="px-4 py-40 md:px-8 md:py-64">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedText isHero delay={0.0} stagger={0.3}>
            <h1 className="mb-6 text-5xl md:text-7xl">
              Escaliers en bois sur mesure
            </h1>
            <p className="font-HelveticaNow mx-auto max-w-2xl text-lg">
              Ajoutez du caractère à votre intérieur avec un escalier en bois
              sur mesure, alliant robustesse, esthétique et finition artisanale.
              Chaque escalier est conçu selon vos besoins spécifiques et
              l'architecture de votre espace.
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Full Width Image Section with Parallax */}
      <ParallaxImage speed={1.5} className="h-[400px] md:h-[100svh]">
        <Image
          src="/images/stairs.webp"
          alt="Escalier en bois sur mesure - Artisanat Nemwood"
          fill
          className="object-cover"
          sizes="100vw"
          quality={95}
          priority
        />
      </ParallaxImage>

      {/* Content Section */}
      <section className="border-b-primary flex w-full flex-col gap-10 border-b border-solid px-4 py-20 md:flex-row md:px-8 md:py-40">
        <div className="left md:w-1/2">
          <div>
            <AnimatedText>
              <h3 className="font-ITCGaramondN text-6xl leading-none md:max-w-xl">
                Escaliers sur mesure
              </h3>
            </AnimatedText>
            <p className="font-HelveticaNow pt-8 text-lg md:max-w-xl md:pt-60">
              Chaque escalier est une pièce unique, conçue selon vos dimensions
              exactes et votre style. Nous utilisons exclusivement du bois
              massif de qualité supérieure pour garantir une durabilité
              optimale. Nos artisans expérimentés apportent un soin particulier
              aux finitions, créant des escaliers qui allient robustesse,
              esthétique et fonctionnalité. Que ce soit un escalier droit,
              tournant, hélicoïdal ou suspendu, nous nous adaptons à toutes les
              contraintes d'espace et d'architecture.
            </p>
          </div>
        </div>
        <div className="right flex flex-col items-end text-left md:w-1/2">
          <div className="relative h-[400px] w-full overflow-hidden bg-amber-400 select-none md:h-[600px]">
            <Image
              src="/images/stairs.webp"
              alt="Escalier en bois sur mesure - Détail de l'artisanat Nemwood"
              fill
              className="object-cover transition-transform duration-500 ease-out hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
              quality={85}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ
        title="Questions sur les escaliers"
        description="Découvrez les réponses aux questions les plus courantes sur nos escaliers en bois sur mesure."
        faqs={[
          {
            question: "Quels types d'escaliers pouvez-vous réaliser ?",
            answer:
              "Nous réalisons tous types d'escaliers : droits, tournants, hélicoïdaux, suspendus, avec ou sans contremarches. Chaque escalier est conçu selon vos contraintes d'espace et vos préférences esthétiques.",
          },
          {
            question: "Quel est le prix d'un escalier sur mesure ?",
            answer:
              "Le prix varie selon la complexité, les dimensions et les matériaux choisis. Un escalier simple commence à 2 500€, un escalier tournant à 4 000€. Nous établissons un devis gratuit adapté à votre projet.",
          },
          {
            question: "Peut-on installer un escalier dans un bâtiment ancien ?",
            answer:
              "Oui, nous nous spécialisons dans l'adaptation aux contraintes des bâtiments anciens. Nous effectuons une étude préalable pour garantir une installation parfaite dans votre espace existant.",
          },
          {
            question: "Quelles finitions proposez-vous ?",
            answer:
              "Nous proposons diverses finitions : huiles naturelles, vernis, cires, ou peintures. Chaque finition est choisie pour mettre en valeur le bois et s'adapter à votre style d'intérieur.",
          },
        ]}
      />
    </main>
  );
}
