import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import AnimatedText from "@/components/AnimatedText3";
import ParallaxImage from "@/components/ParallaxImage";
import StickyStackScroll from "@/components/StickyStackScroll4";
import { generateMetadata } from "@/app/metadata";

export const metadata: Metadata = generateMetadata(
  "À propos de Nemwood - Artisan menuisier en Belgique | Nemwood",
  "Découvrez Nemwood, artisan menuisier belge spécialisé dans la fabrication de meubles en bois sur mesure : tables, garde-robes, escaliers et cuisines.",
  "/images/wardrobe.webp",
  "https://www.nemwood.be/about",
);

export default function About() {
  return (
    <div className="wrapper bg-secondary text-primary">
      <section className="px-4 py-40 md:px-8 md:py-64">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedText isHero delay={0.0} stagger={0.3}>
            <h1 className="mb-6 text-5xl md:text-7xl">A propos</h1>
            <p className="font-HelveticaNow mx-auto max-w-2xl text-lg">
              Vous cherchez un artisan menuisier en Belgique pour créer des
              meubles en bois sur mesure ? Nemwood est spécialisé dans la
              fabrication artisanale de tables, chaises, garde-robes, escaliers
              et même de décors pour le cinéma.
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Full Width Image Section with Parallax */}
      <ParallaxImage speed={1.5} className="h-[400px] md:h-[100svh]">
        <Image
          src="/images/wardrobe.webp"
          alt="Nemwood woodworking craftsmanship"
          fill
          className="object-cover"
          sizes="100vw"
          quality={95}
          priority
        />
      </ParallaxImage>

      <section className="border-b-primary flex w-full flex-col gap-10 border-b border-solid px-4 py-20 md:flex-row md:px-8 md:py-40">
        <div className="left md:w-1/2">
          <div>
            <AnimatedText>
              {/* <h4 className="font-HelveticaNow text-primary/70 text-sm">
                FROM IDEA TO IMPACT
              </h4> */}
              <h3 className="font-ITCGaramondN text-6xl leading-none md:max-w-xl">
                A propos
              </h3>
            </AnimatedText>
            <p className="font-HelveticaNow pt-8 text-lg md:max-w-xl md:pt-60">
              Mobilier sur mesure : quand l’espace et le style s’accordent
              parfaitement Vous cherchez un mobilier qui s’adapte vraiment à
              votre intérieur ? Le sur mesure est la solution. Chaque pièce est
              conçue selon les dimensions exactes de votre espace pour optimiser
              chaque recoin. Plus qu’un simple meuble, c’est une création unique
              qui reflète votre style grâce au choix des matériaux, finitions et
              détails personnalisés. Pratique et ergonomique, il répond à vos
              besoins précis : rangements intelligents, solutions
              multifonctionnelles, agencements uniques… tout est possible.
              Fabriqué par des artisans passionnés, votre mobilier allie
              solidité, durabilité et esthétique. Résultat : un intérieur
              harmonieux et fonctionnel, qui prend de la valeur avec le temps.
            </p>
          </div>
        </div>
        <div className="right flex flex-col items-end text-left md:w-1/2">
          <div className="relative h-[400px] w-full overflow-hidden bg-amber-400 select-none md:h-[600px]">
            <Image
              src="/images/kitchen.webp"
              alt="Kitchen design by Nemwood - Cuisine sur mesure en bois"
              fill
              className="object-cover transition-transform duration-500 ease-out hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
              quality={85}
            />
          </div>
        </div>
      </section>
      {/* <section className="text-primary mx-auto px-4 py-30 text-center md:px-8">
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
      </section> */}
      {/* <section className="relative flex h-[100svh] flex-col items-center justify-between bg-amber-200 pt-20 pb-10">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/loft.webp"
          alt="Hero Image"
          fill
          sizes="100vw"
          quality={100}
          priority
        />
        <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
      </section> */}
      {/* <section className="text-primary border-b-primary flex w-full flex-col gap-10 border-b border-solid px-4 pt-40 pb-20 md:flex-row-reverse md:px-8">
        <div className="left md:w-1/2">
          <div>
            <AnimatedText>
              <h4 className="font-HelveticaNow text-primary/70 text-sm">
                FROM IDEA TO IMPACT
              </h4>
              <h3 className="font-ITCGaramondN text-6xl leading-none md:max-w-xl">
                A propos
              </h3>
            </AnimatedText>
            <p className="font-HelveticaNow pt-8 text-lg md:max-w-xl md:pt-60">
              Vous cherchez un artisan menuisier en Belgique pour créer des
              meubles en bois sur mesure ? Nemwood est spécialisé dans la
              fabrication artisanale de tables, chaises, garde-robes, escaliers
              et même de décors pour le cinéma.
            </p>
          </div>
        </div>
        <div className="right flex flex-col items-end text-left md:w-1/2">
          <div className="h-[600px] w-full bg-amber-400 select-none">
            <Image
              src="/images/loft.webp"
              alt="Atelier Nemwood - Menuisier artisan spécialisé dans les meubles en bois sur mesure en Belgique"
              width={1000}
              height={800}
              className="h-full w-[160%] object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              priority
            />
          </div>
        </div>
      </section> */}
      {/* <section className="text-primary border-primary mx-auto border-b px-4 py-30 text-center md:px-8">
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
      </section> */}

      {/* Sticky Stack Scroll Section */}
      <StickyStackScroll />

      <section className="flex w-full flex-col items-center justify-center px-4 py-20 md:px-8 md:py-20">
        <ParallaxImage speed={0.5} className="h-[400px] w-full md:h-[600px]">
          <Image
            src="/images/loft.webp"
            alt="Savoir-faire artisanal Nemwood - Création de mobilier en bois massif sur mesure"
            fill
            className="rounded-sm object-cover"
            sizes="100vw"
            quality={95}
            priority
          />
        </ParallaxImage>
      </section>
      <section className="text-primary bg-secondary intro mx-auto px-4 py-20 text-center md:px-8 md:py-20">
        <AnimatedText delay={0.0} stagger={0.3}>
          <h3 className="font-ITCGaramondN mx-auto mb-6 max-w-4xl text-6xl">
            Creativity to design
          </h3>
          <p className="font-HelveticaNow mx-auto max-w-2xl text-lg">
            Vous cherchez un artisan menuisier en Belgique pour créer des
            meubles en bois sur mesure ? Nemwood est spécialisé dans la
            fabrication artisanale de tables, chaises, garde-robes, escaliers et
            même de décors pour le cinéma.
          </p>
        </AnimatedText>
      </section>
    </div>
  );
}
