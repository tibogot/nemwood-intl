import { Metadata } from "next";
import AnimatedText from "@/components/AnimatedText3";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Nemwood | Menuisier Artisan en Belgique - Devis Gratuit",
  description:
    "Contactez Nemwood pour vos projets de menuiserie sur mesure en Belgique. Spécialiste en tables, escaliers, garde-robes et cuisines. Devis gratuit et conseil personnalisé.",
  keywords:
    "contact menuisier belgique, devis menuiserie, artisan bois sur mesure, consultation menuiserie, nemwood contact",
  openGraph: {
    title: "Contact Nemwood | Menuisier Artisan en Belgique",
    description:
      "Contactez notre équipe d'artisans menuisiers pour discuter de votre projet sur mesure. Devis gratuit et conseil personnalisé.",
    type: "website",
    locale: "fr_BE",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function Contact() {
  return (
    <div className="bg-secondary text-primary">
      {/* Hero Section */}
      <section className="px-4 py-20 md:px-8 md:py-64">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl md:text-7xl">Contactez-nous</h1>
          <p className="font-HelveticaNow mx-auto max-w-2xl text-lg">
            Chaque création commence par une conversation. Partagez-nous votre
            vision et découvrons ensemble comment donner vie à vos idées en
            bois.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="px-4 pb-20 md:px-8 md:pb-40">
        <div className="">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8">
            {/* Left Side - Image and Info */}
            <div className="space-y-8">
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

              {/* Contact Info */}
              <div className="text-primary space-y-6">
                <h3 className="font-ITCGaramondN text-3xl md:text-4xl">
                  Nos coordonnées
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="text-primary/70 h-5 w-5 flex-shrink-0" />
                    <a
                      href="mailto:hello@nemwood.be"
                      className="font-HelveticaNow hover:text-primary/80 transition-colors"
                    >
                      hello@nemwood.be
                    </a>
                  </div>

                  <div className="flex items-center gap-4">
                    <Phone className="text-primary/70 h-5 w-5 flex-shrink-0" />
                    <a
                      href="tel:+32123456789"
                      className="font-HelveticaNow hover:text-primary/80 transition-colors"
                    >
                      +32 123 45 67 89
                    </a>
                  </div>

                  <div className="flex items-center gap-4">
                    <MapPin className="text-primary/70 h-5 w-5 flex-shrink-0" />
                    <span className="font-HelveticaNow">Belgique</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <Clock className="text-primary/70 h-5 w-5 flex-shrink-0" />
                    <div className="font-HelveticaNow">
                      <p>Lun - Ven: 8h - 18h</p>
                      <p className="text-primary/70">Sam: Sur rendez-vous</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="text-primary">
              <div className="bg-primary/5 rounded-sm p-8 md:p-10">
                <h2 className="font-ITCGaramondN mb-6 text-3xl md:text-4xl">
                  Demande de devis
                </h2>
                <p className="font-HelveticaNow text-primary/80 mb-8">
                  Remplissez ce formulaire et nous vous recontacterons sous 24h
                  pour discuter de votre projet.
                </p>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="font-HelveticaNow mb-2 block text-sm font-medium"
                      >
                        Prénom *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="border-primary/20 bg-secondary focus:ring-primary/20 focus:border-primary/40 w-full rounded-sm border px-4 py-3 transition-colors focus:ring-2 focus:outline-none"
                        placeholder="Votre prénom"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="font-HelveticaNow mb-2 block text-sm font-medium"
                      >
                        Nom *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="border-primary/20 bg-secondary focus:ring-primary/20 focus:border-primary/40 w-full rounded-sm border px-4 py-3 transition-colors focus:ring-2 focus:outline-none"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="font-HelveticaNow mb-2 block text-sm font-medium"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="border-primary/20 bg-secondary focus:ring-primary/20 focus:border-primary/40 w-full rounded-sm border px-4 py-3 transition-colors focus:ring-2 focus:outline-none"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="font-HelveticaNow mb-2 block text-sm font-medium"
                    >
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="border-primary/20 bg-secondary focus:ring-primary/20 focus:border-primary/40 w-full rounded-sm border px-4 py-3 transition-colors focus:ring-2 focus:outline-none"
                      placeholder="+32 123 45 67 89"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="projectType"
                      className="font-HelveticaNow mb-2 block text-sm font-medium"
                    >
                      Type de projet *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      className="border-primary/20 bg-secondary focus:ring-primary/20 focus:border-primary/40 w-full rounded-sm border px-4 py-3 transition-colors focus:ring-2 focus:outline-none"
                    >
                      <option value="">Sélectionnez un type de projet</option>
                      <option value="table">Table sur mesure</option>
                      <option value="cuisine">Cuisine équipée</option>
                      <option value="escalier">Escalier</option>
                      <option value="garde-robe">Garde-robe</option>
                      <option value="bibliotheque">Bibliothèque</option>
                      <option value="autre">Autre projet</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="budget"
                      className="font-HelveticaNow mb-2 block text-sm font-medium"
                    >
                      Budget approximatif
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      className="border-primary/20 bg-secondary focus:ring-primary/20 focus:border-primary/40 w-full rounded-sm border px-4 py-3 transition-colors focus:ring-2 focus:outline-none"
                    >
                      <option value="">Sélectionnez une fourchette</option>
                      <option value="1000-3000">1 000€ - 3 000€</option>
                      <option value="3000-5000">3 000€ - 5 000€</option>
                      <option value="5000-10000">5 000€ - 10 000€</option>
                      <option value="10000+">Plus de 10 000€</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="font-HelveticaNow mb-2 block text-sm font-medium"
                    >
                      Décrivez votre projet *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="border-primary/20 bg-secondary focus:ring-primary/20 focus:border-primary/40 w-full resize-none rounded-sm border px-4 py-3 transition-colors focus:ring-2 focus:outline-none"
                      placeholder="Décrivez votre projet en détail : dimensions, style souhaité, contraintes particulières, délais..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-primary text-secondary font-HelveticaNow hover:bg-primary/90 w-full rounded-sm px-6 py-4 font-medium transition-colors duration-300"
                  >
                    Envoyer ma demande
                  </button>

                  <p className="font-HelveticaNow text-primary/60 text-center text-sm">
                    En soumettant ce formulaire, vous acceptez d'être contacté
                    par notre équipe concernant votre projet.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="border-primary/20 border-t px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <AnimatedText>
            <h2 className="font-ITCGaramondN text-primary mb-12 text-4xl md:text-5xl">
              Pourquoi choisir Nemwood ?
            </h2>
          </AnimatedText>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-primary">
              <h3 className="font-ITCGaramondN mb-4 text-2xl">
                Artisanat traditionnel
              </h3>
              <p className="font-HelveticaNow text-primary/80">
                Techniques ancestrales combinées aux outils modernes pour une
                qualité exceptionnelle.
              </p>
            </div>

            <div className="text-primary">
              <h3 className="font-ITCGaramondN mb-4 text-2xl">
                Sur mesure uniquement
              </h3>
              <p className="font-HelveticaNow text-primary/80">
                Chaque pièce est conçue spécifiquement pour votre espace et vos
                besoins.
              </p>
            </div>

            <div className="text-primary">
              <h3 className="font-ITCGaramondN mb-4 text-2xl">
                Accompagnement complet
              </h3>
              <p className="font-HelveticaNow text-primary/80">
                De la conception à l'installation, nous vous accompagnons à
                chaque étape.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
