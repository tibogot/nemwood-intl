import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ParallaxImage from "@/components/ParallaxImage";
import AnimatedText from "@/components/AnimatedText3";
import { generateMetadata } from "@/app/metadata";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = generateMetadata(
  "Bureaux sur mesure en Belgique | Nemwood",
  "Bureaux en bois sur mesure pour votre espace de travail. Fabrication artisanale en Belgique par Nemwood.",
  "/images/table.webp",
  "https://www.nemwood.be/services/bureau",
);

export default function BureauPage() {
  return (
    <main className="bg-secondary text-primary">
      {/* Hero Section */}
      <section className="px-4 py-40 md:px-8 md:py-64">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedText isHero delay={0.0} stagger={0.3}>
            <h1 className="mb-6 text-5xl md:text-7xl">Bureaux</h1>
            <p className="font-HelveticaNow mx-auto max-w-2xl text-lg">
              Bureaux en bois sur mesure pour créer un espace de travail
              fonctionnel et élégant. Chaque bureau est conçu pour optimiser
              votre productivité tout en s'intégrant parfaitement à votre
              intérieur.
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Full Width Image Section with Parallax */}
      <ParallaxImage speed={1.5} className="h-[400px] md:h-[100svh]">
        <Image
          src="/images/table.webp"
          alt="Bureau sur mesure Nemwood"
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
                Nos bureaux sur mesure allient ergonomie et esthétique. Nous
                concevons des solutions adaptées à votre espace de travail et à
                vos besoins professionnels.
              </p>
              <p className="font-HelveticaNow text-lg">
                Chaque bureau est fabriqué avec des matériaux de qualité
                supérieure et une finition soignée qui crée un environnement de
                travail inspirant et fonctionnel.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-2xl md:text-3xl">Caractéristiques</h3>
              <ul className="font-HelveticaNow space-y-3 text-lg">
                <li>• Conception ergonomique</li>
                <li>• Bois massif de qualité</li>
                <li>• Tiroirs et rangements intégrés</li>
                <li>• Passages de câbles intégrés</li>
                <li>• Finitions personnalisées</li>
                <li>• Installation professionnelle</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ
        title="Questions sur les bureaux"
        description="Découvrez les réponses aux questions les plus courantes sur nos bureaux en bois sur mesure."
        faqs={[
          {
            question: "Quels types de bureaux pouvez-vous réaliser ?",
            answer:
              "Nous réalisons tous types de bureaux : bureaux d'angle, bureaux droits, bureaux avec rangements intégrés, ou solutions sur mesure. Chaque bureau est conçu selon votre espace de travail et vos besoins professionnels.",
          },
          {
            question: "Peut-on intégrer des passages de câbles ?",
            answer:
              "Oui, nous prévoyons des passages de câbles discrets et des prises intégrées pour un espace de travail propre et fonctionnel. Nous adaptons l'électrification selon vos équipements.",
          },
          {
            question: "Quelle est la hauteur recommandée pour un bureau ?",
            answer:
              "La hauteur standard est de 75cm, mais nous l'adaptons selon votre taille et vos préférences. Nous proposons aussi des bureaux à hauteur réglable pour un confort optimal.",
          },
          {
            question: "Proposez-vous des rangements intégrés ?",
            answer:
              "Oui, nous intégrons tiroirs, étagères, casiers et tous types de rangements selon vos besoins. Chaque rangement est conçu pour optimiser votre espace de travail et votre productivité.",
          },
        ]}
      />
    </main>
  );
}
