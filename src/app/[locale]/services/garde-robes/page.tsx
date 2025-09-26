import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { generateMetadata } from "@/app/metadata";
import FAQ from "@/components/FAQ";
import AnimatedText from "@/components/AnimatedText3";
import ParallaxImage from "@/components/ParallaxImage";

export const metadata: Metadata = generateMetadata(
  "Garde-robes en bois sur mesure en Belgique | Nemwood",
  "Fabrication de garde-robes et dressings en bois massif sur mesure en Belgique. Solutions de rangement personnalisées.",
  "/images/wardrobe.webp",
  "https://www.nemwood.be/services/garde-robes",
);

export default function GardeRobesPage() {
  return (
    <main className="bg-secondary text-primary">
      {/* Hero Section */}
      <section className="px-4 py-40 md:px-8 md:py-64">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedText isHero delay={0.0} stagger={0.3}>
            <h1 className="mb-6 text-5xl md:text-7xl">
              Garde-robes en bois sur mesure
            </h1>
            <p className="font-HelveticaNow mx-auto max-w-2xl text-lg">
              Concevez une garde-robe en bois massif qui vous ressemble :
              chaleureuse, fonctionnelle et entièrement personnalisée selon vos
              besoins et votre espace. Solutions de rangement optimales pour
              tous les intérieurs.
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Full Width Image Section with Parallax */}
      <ParallaxImage speed={1.5} className="h-[400px] md:h-[100svh]">
        <Image
          src="/images/wardrobe.webp"
          alt="Garde-robe en bois sur mesure - Artisanat Nemwood"
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
                Garde-robes sur mesure
              </h3>
            </AnimatedText>
            <p className="font-HelveticaNow pt-8 text-lg md:max-w-xl md:pt-60">
              Chaque garde-robe est conçue pour optimiser votre espace de vie.
              Nous intégrons tous types de rangements : étagères, tiroirs,
              cintres, chaussures et accessoires, le tout adapté à vos habitudes
              et contraintes d'espace. En bois massif de qualité supérieure, nos
              garde-robes allient esthétique et fonctionnalité pour un
              investissement durable. Que ce soit pour une chambre, un dressing
              ou un couloir, nous créons la solution parfaite pour organiser
              votre quotidien.
            </p>
          </div>
        </div>
        <div className="right flex flex-col items-end text-left md:w-1/2">
          <div className="relative h-[400px] w-full overflow-hidden bg-amber-400 select-none md:h-[600px]">
            <Image
              src="/images/wardrobe.webp"
              alt="Garde-robe en bois sur mesure - Détail de l'artisanat Nemwood"
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
          <h2 className="mb-6 text-4xl md:text-5xl">Organisez votre espace</h2>
          <p className="font-HelveticaNow mx-auto mb-8 max-w-2xl text-lg">
            Créons ensemble la garde-robe parfaite pour votre quotidien.
            Consultation personnalisée et devis détaillé gratuit.
          </p>

          <Link href="/contact">
            <button className="font-HelveticaNow">
              <div className="border-secondary hover:bg-secondary hover:text-primary flex cursor-pointer items-center border border-solid px-6 py-3 transition-colors duration-300 ease-in-out">
                <span>Planifier ma garde-robe</span>
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
        title="Questions sur les garde-robes"
        description="Découvrez les réponses aux questions les plus courantes sur nos garde-robes en bois sur mesure."
        faqs={[
          {
            question: "Quels types de rangements pouvez-vous intégrer ?",
            answer:
              "Nous intégrons tous types de rangements : étagères, tiroirs, cintres, chaussures, accessoires. Chaque garde-robe est conçue selon vos besoins spécifiques et l'espace disponible.",
          },
          {
            question: "Peut-on adapter une garde-robe à un espace existant ?",
            answer:
              "Absolument ! Nous nous spécialisons dans l'adaptation aux contraintes existantes. Nous prenons les mesures précises et concevons une solution parfaitement adaptée à votre espace.",
          },
          {
            question: "Quel est le délai de fabrication ?",
            answer:
              "Une garde-robe sur mesure prend généralement 3-4 semaines de fabrication, plus le temps d'installation. Nous vous fournissons un planning détaillé lors du devis.",
          },
          {
            question: "Proposez-vous des portes coulissantes ?",
            answer:
              "Oui, nous proposons tous types d'ouverture : portes battantes, coulissantes, ou même sans portes selon vos préférences et contraintes d'espace.",
          },
        ]}
      />
    </main>
  );
}
