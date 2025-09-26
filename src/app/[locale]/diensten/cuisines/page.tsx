import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { generateMetadata } from "@/app/metadata";
import FAQ from "@/components/FAQ";
import AnimatedText from "@/components/AnimatedText3";
import ParallaxImage from "@/components/ParallaxImage";

export const metadata: Metadata = generateMetadata(
  "Cuisines en bois sur mesure en Belgique | Nemwood",
  "Fabrication de cuisines en bois massif sur mesure en Belgique. Aménagements cuisine personnalisés, meubles de cuisine artisanaux.",
  "/images/kitchen.webp",
  "https://www.nemwood.be/services/cuisines",
);

export default function CuisinesPage() {
  return (
    <main className="bg-secondary text-primary">
      {/* Hero Section */}
      <section className="px-4 py-40 md:px-8 md:py-64">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedText isHero delay={0.0} stagger={0.3}>
            <h1 className="mb-6 text-5xl md:text-7xl">
              Cuisines en bois sur mesure
            </h1>
            <p className="font-HelveticaNow mx-auto max-w-2xl text-lg">
              Concevez une cuisine en bois massif qui vous ressemble :
              chaleureuse, fonctionnelle et entièrement personnalisée selon vos
              besoins et votre espace. Le cœur de votre maison mérite une
              attention particulière.
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Full Width Image Section with Parallax */}
      <ParallaxImage speed={1.5} className="h-[400px] md:h-[100svh]">
        <Image
          src="/images/kitchen.webp"
          alt="Cuisine en bois sur mesure - Artisanat Nemwood"
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
                Cuisines sur mesure
              </h3>
            </AnimatedText>
            <p className="font-HelveticaNow pt-8 text-lg md:max-w-xl md:pt-60">
              Chaque cuisine est conçue comme le cœur de votre maison, alliant
              ergonomie, qualité et style unique. Nous créons des aménagements
              pensés pour votre confort et vos habitudes culinaires, utilisant
              des matériaux nobles résistants à l'humidité et à l'usage
              quotidien. Du plan de travail aux rangements, chaque détail est
              personnalisé pour refléter votre personnalité et optimiser votre
              espace de vie. Une cuisine sur mesure qui transforme votre
              quotidien en expérience culinaire exceptionnelle.
            </p>
          </div>
        </div>
        <div className="right flex flex-col items-end text-left md:w-1/2">
          <div className="relative h-[400px] w-full overflow-hidden bg-amber-400 select-none md:h-[600px]">
            <Image
              src="/images/kitchen.webp"
              alt="Cuisine en bois sur mesure - Détail de l'artisanat Nemwood"
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
            Transformez votre cuisine
          </h2>
          <p className="font-HelveticaNow mx-auto mb-8 max-w-2xl text-lg">
            Créons ensemble l'espace culinaire de vos rêves. Étude personnalisée
            et accompagnement complet pour votre projet de cuisine sur mesure.
          </p>

          <Link href="/contact">
            <button className="font-HelveticaNow">
              <div className="border-secondary hover:bg-secondary hover:text-primary flex cursor-pointer items-center border border-solid px-6 py-3 transition-colors duration-300 ease-in-out">
                <span>Planifier ma cuisine</span>
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
        title="Questions sur les cuisines"
        description="Découvrez les réponses aux questions les plus courantes sur nos cuisines en bois sur mesure."
        faqs={[
          {
            question: "Peut-on rénover une cuisine existante ?",
            answer:
              "Oui, nous proposons la rénovation complète ou partielle de cuisines existantes. Nous pouvons remplacer les façades, ajouter des éléments, ou refaire entièrement l'aménagement selon vos besoins.",
          },
          {
            question: "Quels équipements pouvez-vous intégrer ?",
            answer:
              "Nous intégrons tous types d'équipements : électroménager encastré, éclairage LED, tiroirs à fermeture douce, systèmes de rangement innovants. Chaque équipement est choisi pour optimiser votre espace.",
          },
          {
            question: "Combien coûte une cuisine sur mesure ?",
            answer:
              "Le prix varie selon la taille, les matériaux et les équipements. Une cuisine complète commence à 8 000€. Nous établissons un devis détaillé gratuit adapté à votre projet et votre budget.",
          },
          {
            question: "Quel est le délai de réalisation ?",
            answer:
              "Une cuisine complète prend 6-8 semaines de fabrication et installation. Nous planifions chaque étape avec vous pour minimiser les désagréments et respecter vos contraintes.",
          },
        ]}
      />
    </main>
  );
}
