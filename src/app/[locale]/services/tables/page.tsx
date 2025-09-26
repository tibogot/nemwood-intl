import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { generateMetadata } from "@/app/metadata";
import FAQ from "@/components/FAQ";
import AnimatedText from "@/components/AnimatedText3";
import ParallaxImage from "@/components/ParallaxImage";

export const metadata: Metadata = generateMetadata(
  "Tables en bois sur mesure en Belgique | Nemwood",
  "Fabrication de tables en bois massif sur mesure en Belgique. Tables à manger, tables basses, bureaux uniques et durables.",
  "/images/table.webp",
  "https://www.nemwood.be/services/tables",
);

export default function TablesPage() {
  return (
    <main className="bg-secondary text-primary">
      {/* Hero Section */}
      <section className="px-4 py-40 md:px-8 md:py-64">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedText isHero delay={0.0} stagger={0.3}>
            <h1 className="mb-6 text-5xl md:text-7xl">
              Tables en bois sur mesure
            </h1>
            <p className="font-HelveticaNow mx-auto max-w-2xl text-lg">
              Créez votre table en bois sur mesure : pièce centrale de votre
              maison, unique, durable et façonnée à la main dans notre atelier.
              Chaque table raconte une histoire et s'adapte parfaitement à votre
              mode de vie.
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Full Width Image Section with Parallax */}
      <ParallaxImage speed={1.5} className="h-[400px] md:h-[100svh]">
        <Image
          src="/images/table.webp"
          alt="Table en bois sur mesure - Artisanat Nemwood"
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
                Tables sur mesure
              </h3>
            </AnimatedText>
            <p className="font-HelveticaNow pt-8 text-lg md:max-w-xl md:pt-60">
              Chaque table est une pièce unique, façonnée à la main dans notre
              atelier. Nous créons des tables parfaitement adaptées à vos
              dimensions et besoins : tables à manger familiales, tables basses
              élégantes, bureaux personnalisés. En bois massif de qualité
              supérieure, nos tables allient robustesse et esthétique. Chaque
              finition est soignée par nos artisans pour créer une pièce
              d'exception qui raconte votre histoire et s'adapte parfaitement à
              votre mode de vie.
            </p>
          </div>
        </div>
        <div className="right flex flex-col items-end text-left md:w-1/2">
          <div className="relative h-[400px] w-full overflow-hidden bg-amber-400 select-none md:h-[600px]">
            <Image
              src="/images/table.webp"
              alt="Table en bois sur mesure - Détail de l'artisanat Nemwood"
              fill
              className="object-cover transition-transform duration-500 ease-out hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
              quality={85}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-secondary px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl md:text-5xl">
            Créez votre table idéale
          </h2>
          <p className="font-HelveticaNow mx-auto mb-8 max-w-2xl text-lg">
            De la table à manger familiale au bureau personnalisé, donnons vie à
            votre vision. Accompagnement complet de la conception à la
            livraison.
          </p>

          <Link href="/contact">
            <button className="font-HelveticaNow">
              <div className="border-secondary hover:bg-secondary hover:text-primary flex cursor-pointer items-center border border-solid px-6 py-3 transition-colors duration-300 ease-in-out">
                <span>Concevoir ma table</span>
                <div className="ml-2">
                  <ArrowRight size={18} strokeWidth={1.5} />
                </div>
              </div>
            </button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ
        title="Questions sur les tables"
        description="Découvrez les réponses aux questions les plus courantes sur nos tables en bois sur mesure."
        faqs={[
          {
            question: "Quels types de tables pouvez-vous réaliser ?",
            answer:
              "Nous réalisons tous types de tables : tables à manger, tables basses, tables de salon, tables de bureau, tables d'appoint. Chaque table est conçue selon vos dimensions et votre style.",
          },
          {
            question:
              "Quelles essences de bois recommandez-vous pour une table ?",
            answer:
              "Pour les tables, nous recommandons le chêne pour sa robustesse, le noyer pour son élégance, ou le frêne pour sa légèreté. Chaque essence a ses caractéristiques que nous vous expliquons lors du devis.",
          },
          {
            question: "Peut-on personnaliser la finition ?",
            answer:
              "Oui, nous proposons diverses finitions : huiles naturelles, vernis mat ou brillant, cires, ou même peintures. Chaque finition est choisie pour mettre en valeur le bois et s'adapter à votre intérieur.",
          },
          {
            question: "Quel est le délai de fabrication d'une table ?",
            answer:
              "Une table sur mesure prend généralement 2-3 semaines de fabrication, plus le temps de séchage et de finition. Nous vous fournissons un planning précis lors du devis.",
          },
        ]}
      />
    </main>
  );
}
