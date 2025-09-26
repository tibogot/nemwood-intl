import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo3";

export default function Footer() {
  return (
    <footer className="bg-secondary text-primary font-HelveticaNow relative flex min-h-svh w-full flex-col px-4 py-8 md:h-svh md:px-8">
      {/* Top Section */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left Side - Navigation */}

        {/* Right Side - Content */}
        <div className="right flex w-full flex-col md:w-1/2">
          <p className="font-ITCGaramondN mt-8 text-3xl leading-tight md:mt-20 md:text-4xl lg:text-5xl">
            Inscrivez-vous à notre newsletter
          </p>
          <p className="font-HelveticaNow mt-4 max-w-xl text-left text-lg">
            En soumettant ce formulaire, vous acceptez d'être contacté par notre
            équipe concernant votre projet.
          </p>

          {/* Newsletter Subscription */}
          <div className="mt-6 md:mt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
              <input
                type="email"
                placeholder="Votre adresse e-mail"
                className="focus:ring-primary flex-1 rounded-md border border-gray-300 px-4 py-3 text-base focus:border-transparent focus:ring-2 focus:outline-none"
              />
              <button className="rounded-md bg-black px-6 py-3 text-white transition-colors hover:bg-gray-800 sm:whitespace-nowrap">
                Confirmer
              </button>
            </div>
          </div>

          {/* Contact and Social Columns */}
          <div className="mt-24 flex flex-col gap-8 md:flex-row md:gap-24">
            {/* CONTACT Column */}
            <div className="flex flex-col">
              {/* <h3 className="text-primary font-HelveticaNow mb-4 text-xl font-semibold">
                CONTACT
              </h3> */}
              <div className="text-primary flex flex-col space-y-1">
                <Link
                  href="tel:+33123456789"
                  className="font-HelveticaNow text-primary cursor-pointer text-xl transition-colors"
                >
                  +32 489 33 05 44
                </Link>
                <Link
                  href="mailto:contact@nemwood.be"
                  className="text-primary font-HelveticaNow cursor-pointer text-xl transition-colors"
                >
                  contact@nemwood.be
                </Link>
              </div>
            </div>

            {/* SOCIAL Column */}
            <div className="flex flex-col">
              {/* <h3 className="font-HelveticaNow text-primary mb-4 text-xl font-semibold">
                SOCIAL
              </h3> */}
              <div className="flex flex-col space-y-1">
                <Link
                  href="https://instagram.com/nem_wood"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary font-HelveticaNow text-primary text-xl transition-colors"
                >
                  Instagram
                </Link>
                <Link
                  href="https://www.facebook.com/p/NemwOod-100063674583109/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary font-HelveticaNow text-primary text-xl transition-colors"
                >
                  Facebook
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="mt-8 border-t border-gray-300 pt-6 md:border-none md:pt-4">
        <div className="text-primary flex flex-row space-y-4 text-sm md:flex-row md:items-end md:justify-between md:space-y-0">
          <div className="flex flex-col space-y-3 md:flex-row md:items-baseline md:space-y-0 md:space-x-6">
            {/* Logo in bottom section */}
            <div
              className="flex items-end"
              style={{ transform: "translateY(4px)" }}
            >
              <Logo width={220} height={52} className="text-primary" />
            </div>
            <div className="mt-4 flex flex-col space-y-1 md:mt-4">
              <span>© 2025 Tous droits réservés</span>
              {/* <div className="flex flex-col space-y-1">
                <span>+33 1 23 45 67 89</span>
                <span>contact@exemple.fr</span>
              </div> */}
            </div>
          </div>

          {/* Legal Links */}
          {/* <div className="invisible flex flex-col space-y-2 text-left md:visible md:flex-row md:space-y-0 md:space-x-6 md:text-right">
            <Link
              href="/mentions-legales"
              className="transition-opacity hover:opacity-70"
            >
              Mentions légales
            </Link>
            <Link
              href="/privacy"
              className="transition-opacity hover:opacity-70"
            >
              Confidentialité
            </Link>
            <Link href="/cgv" className="transition-opacity hover:opacity-70">
              CGV
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
