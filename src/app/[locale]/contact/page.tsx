import { Metadata } from "next";
import AnimatedText from "@/components/AnimatedText3";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ParallaxImage from "@/components/ParallaxImage";
import { generateMetadata } from "@/app/metadata";
import ContactForm from "@/components/ContactForm";
import FlipBoard from "@/components/FlipBoard";

export const metadata: Metadata = generateMetadata(
  "Contact Nemwood | Menuisier Artisan en Belgique - Devis Gratuit",
  "Contactez Nemwood pour vos projets de menuiserie sur mesure en Belgique. Spécialiste en tables, escaliers, garde-robes et cuisines. Devis gratuit et conseil personnalisé.",
  "/images/stairs.webp",
  "https://www.nemwood.be/contact",
);

export default function Contact() {
  return (
    <div className="bg-secondary text-primary">
      {/* Hero Section */}
      <section className="px-4 py-40 md:px-8 md:py-64">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedText isHero delay={0.0} stagger={0.3}>
            <h1 className="mb-6 text-5xl md:text-7xl">Contactez-nous</h1>
            <p className="font-HelveticaNow mx-auto max-w-2xl text-lg">
              Chaque création commence par une conversation. Partagez-nous votre
              vision et découvrons ensemble comment donner vie à vos idées en
              bois.
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="px-4 pb-20 md:px-8 md:pb-40">
        <div className="">
          <div className="flex w-full flex-col gap-10 md:flex-row">
            {/* Left Side - Image and Info */}
            <div className="space-y-8 md:w-1/2">
              <div className="relative h-[400px] overflow-hidden rounded-sm md:h-[600px]">
                <Image
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  src="/images/stairs.webp"
                  alt="Atelier Nemwood - Artisan menuisier au travail"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={95}
                  priority
                />
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="text-primary md:w-1/2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 md:px-8">
        <p className="font-HelveticaNow text-primary max-w-xl text-lg">
          Depuis 2016, Nemwood transforme vos idées en créations uniques en
          bois. Chaque projet est une collaboration entre votre vision et notre
          savoir-faire artisanal. Que ce soit pour une table sur mesure, des
          escaliers, une garde-robe ou une cuisine, nous nous engageons à créer
          des pièces qui s'intègrent parfaitement dans votre quotidien.
        </p>
      </section>
      <section className="text-primary w-full px-4 py-20 md:px-8 md:py-60">
        <div className="text-center">
          <h2 className="font-ITCGaramondN text-4xl md:text-6xl lg:text-9xl">
            contact@nemwood.be
          </h2>
          <h2 className="font-ITCGaramondN mt-4 text-4xl md:text-6xl lg:text-9xl">
            0489 33 05 44
          </h2>
        </div>
      </section>

      {/* Full Width Image Section with Parallax */}
      <ParallaxImage speed={1.5} className="h-[400px] md:h-[100svh]">
        <Image
          src="/images/nemohero.webp"
          alt="Nemwood artisan woodworking"
          fill
          className="object-cover"
          sizes="100vw"
          quality={95}
          priority
        />
      </ParallaxImage>
      {/* <FlipBoard /> */}
    </div>
  );
}
