import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ParallaxImage from "@/components/ParallaxImage";
import AnimatedText from "@/components/AnimatedText3";
import { generateMetadata } from "@/app/metadata";
import ManyServices from "@/components/ManyServices";

export const metadata: Metadata = generateMetadata(
  "Services de menuiserie sur mesure en Belgique | Nemwood",
  "Découvrez nos services de menuiserie : escaliers, garde-robes, tables et cuisines en bois sur mesure. Artisanat belge de qualité.",
  "/images/wood-work.webp",
  "https://www.nemwood.be/services",
);

export default function ServicesPage() {
  const services = [
    {
      title: "Escaliers",
      slug: "escaliers",
      description:
        "Escaliers en bois sur mesure alliant robustesse, esthétique et finition artisanale.",
      image: "/images/stairs.webp",
    },
    {
      title: "Garde-robes",
      slug: "garde-robes",
      description:
        "Garde-robes en bois massif personnalisées selon vos besoins et votre espace.",
      image: "/images/wardrobe.webp",
    },
    {
      title: "Tables",
      slug: "tables",
      description:
        "Tables en bois sur mesure, pièces centrales uniques et durables.",
      image: "/images/table.webp",
    },
    {
      title: "Cuisines",
      slug: "cuisines",
      description:
        "Cuisines en bois massif chaleureuses et entièrement personnalisées.",
      image: "/images/kitchen.webp",
    },
  ];

  return (
    <main className="bg-secondary text-primary">
      {/* Hero Section */}
      <section className="px-4 py-40 md:px-8 md:py-64">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedText isHero delay={0.0} stagger={0.3}>
            <h1 className="mb-6 text-5xl md:text-7xl">Nos Services</h1>
            <p className="font-HelveticaNow mx-auto max-w-2xl text-lg">
              Découvrez notre gamme complète de services de menuiserie sur
              mesure en Belgique. Chaque création est pensée pour s'harmoniser
              parfaitement avec votre intérieur.
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Full Width Image Section with Parallax */}
      <ParallaxImage speed={1.5} className="h-[400px] md:h-[100svh]">
        <Image
          src="/images/wood-work.webp"
          alt="Nemwood craftsmanship showcase"
          fill
          className="object-cover"
          sizes="100vw"
          quality={95}
          priority
        />
      </ParallaxImage>

      {/* Services Grid */}
      {/* <section className="px-4 py-20 md:px-8 md:py-40">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <article
                key={service.slug}
                className="group cursor-pointer overflow-hidden rounded-sm"
              >
                <Link href={`/services/${service.slug}`}>
                  <div className="relative h-[400px] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                      <h2 className="mb-3 text-3xl md:text-4xl">
                        {service.title}
                      </h2>
                      <p className="font-HelveticaNow mb-4 text-sm opacity-90">
                        {service.description}
                      </p>

                      <div className="inline-flex items-center text-sm">
                        <span>En savoir plus</span>
                        <ArrowRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="bg-primary text-secondary px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl md:text-5xl">
            Prêt à commencer votre projet ?
          </h2>
          <p className="font-HelveticaNow mx-auto mb-8 max-w-2xl text-lg">
            Contactez-nous pour discuter de votre projet de menuiserie sur
            mesure. Devis gratuit et sans engagement.
          </p>

          <Link href="/contact">
            <button className="font-HelveticaNow">
              <div className="border-secondary hover:bg-secondary hover:text-primary flex cursor-pointer items-center border border-solid px-6 py-3 transition-colors duration-300 ease-in-out">
                <span>Nous contacter</span>
                <div className="ml-2">
                  <ArrowRight size={18} strokeWidth={1.5} />
                </div>
              </div>
            </button>
          </Link>
        </div>
      </section> */}
      <ManyServices />
      <section className="text-primary intro border-primary mx-auto border-t border-b border-solid px-4 py-20 text-center md:px-8 md:py-30">
        <AnimatedText>
          <h3 className="font-ITCGaramondN mb-6 text-6xl">
            Creativity to design
          </h3>

          <p className="font-HelveticaNow mx-auto text-lg md:max-w-xl">
            Vous cherchez un artisan menuisier en Belgique pour créer des
            meubles en bois sur mesure ? Nemwood est spécialisé dans la
            fabrication artisanale de tables, chaises, garde-robes, escaliers et
            même de décors pour le cinéma.
          </p>
        </AnimatedText>
      </section>
      <section className="flex w-full flex-col items-center justify-center px-4 py-20 md:px-8 md:py-64">
        <ParallaxImage speed={0.5} className="h-[400px] w-full md:h-[600px]">
          <Image
            src="/images/loft.webp"
            alt="Aménagement de loft avec meubles en bois sur mesure - Escalier et bibliothèque par Nemwood"
            fill
            className="rounded-sm object-cover"
            sizes="100vw"
            quality={95}
            priority
          />
        </ParallaxImage>
      </section>
    </main>
  );
}
