import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ParallaxImage from "@/components/ParallaxImage";
import AnimatedText from "@/components/AnimatedText3";
import { generateMetadata } from "@/app/metadata";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = generateMetadata(
  "Salles de bain sur mesure en Belgique | Nemwood",
  "Salles de bain en bois sur mesure pour créer un espace de détente unique. Fabrication artisanale en Belgique par Nemwood.",
  "/images/kitchen.webp",
  "https://www.nemwood.be/services/salle-de-bain",
);

export default function SalleDeBainPage() {
  return (
    <main className="bg-secondary text-primary">
      {/* Hero Section */}
      <section className="px-4 py-40 md:px-8 md:py-64">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedText isHero delay={0.0} stagger={0.3}>
            <h1 className="mb-6 text-5xl md:text-7xl">Salles de bain</h1>
            <p className="font-HelveticaNow mx-auto max-w-2xl text-lg">
              Salles de bain en bois sur mesure pour créer un espace de détente
              unique et fonctionnel. Chaque salle de bain est conçue pour allier
              esthétique et praticité dans un environnement humide.
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Full Width Image Section with Parallax */}
      <ParallaxImage speed={1.5} className="h-[400px] md:h-[100svh]">
        <Image
          src="/images/kitchen.webp"
          alt="Salle de bain sur mesure Nemwood"
          fill
          className="object-cover"
          sizes="100vw"
          quality={95}
          priority
        />
      </ParallaxImage>

      {/* Content Section */}
      <section className="px-4 py-20 md:px-8 md:py-40">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="mb-6 text-3xl md:text-4xl">Notre expertise</h2>
              <p className="font-HelveticaNow mb-6 text-lg">
                Nos salles de bain sur mesure allient design et résistance à
                l'humidité. Nous concevons des solutions adaptées à votre espace
                et à vos besoins de confort.
              </p>
              <p className="font-HelveticaNow text-lg">
                Chaque salle de bain est fabriquée avec des matériaux adaptés à
                l'environnement humide et une finition soignée qui crée un
                espace de détente unique et durable.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-2xl md:text-3xl">Caractéristiques</h3>
              <ul className="font-HelveticaNow space-y-3 text-lg">
                <li>• Bois traité anti-humidité</li>
                <li>• Finitions hydrofuges</li>
                <li>• Rangements intégrés</li>
                <li>• Éclairage adapté</li>
                <li>• Design personnalisé</li>
                <li>• Installation professionnelle</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ
        title="Questions sur les salles de bain"
        description="Découvrez les réponses aux questions les plus courantes sur nos salles de bain en bois sur mesure."
        faqs={[
          {
            question: "Le bois résiste-t-il à l'humidité de la salle de bain ?",
            answer:
              "Oui, nous utilisons des essences de bois traitées et des finitions spéciales pour l'humidité. Le teck, l'iroko ou le chêne traité sont parfaits pour les salles de bain et résistent parfaitement à l'humidité.",
          },
          {
            question: "Quels éléments pouvez-vous intégrer ?",
            answer:
              "Nous intégrons tous types d'éléments : meubles vasque, rangements, étagères, niches, bancs, ou solutions sur mesure. Chaque élément est conçu pour optimiser votre espace et résister à l'humidité.",
          },
          {
            question: "Peut-on rénover une salle de bain existante ?",
            answer:
              "Oui, nous proposons la rénovation complète ou partielle. Nous pouvons remplacer les meubles, ajouter des rangements, ou refaire entièrement l'aménagement en respectant vos contraintes existantes.",
          },
          {
            question: "Quel est le délai de réalisation ?",
            answer:
              "Une salle de bain complète prend 4-6 semaines de fabrication et installation. Nous planifions chaque étape pour minimiser les désagréments et respecter vos contraintes d'usage.",
          },
        ]}
      />
    </main>
  );
}
