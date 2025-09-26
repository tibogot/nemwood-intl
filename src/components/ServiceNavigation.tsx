"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

const services = [
  { name: "Escaliers", slug: "escaliers", image: "/images/stairs.webp" },
  { name: "Gardes-robes", slug: "garde-robes", image: "/images/wardrobe.webp" },
  { name: "Tables", slug: "tables", image: "/images/table.webp" },
  { name: "Cuisines", slug: "cuisines", image: "/images/kitchen.webp" },
  {
    name: "Bibliothèque",
    slug: "bibliotheque",
    image: "/images/wardrobe.webp",
  },
  { name: "Bureau", slug: "bureau", image: "/images/table.webp" },
  {
    name: "Salle de bain",
    slug: "salle-de-bain",
    image: "/images/kitchen.webp",
  },
];

export default function ServiceNavigation() {
  const pathname = usePathname();

  // Get current service index
  const currentServiceIndex = services.findIndex(
    (service) => pathname === `/services/${service.slug}`,
  );

  // If not found, don't render navigation
  if (currentServiceIndex === -1) return null;

  // Get previous and next services
  const previousService =
    currentServiceIndex > 0
      ? services[currentServiceIndex - 1]
      : services[services.length - 1]; // Wrap to last service

  const nextService =
    currentServiceIndex < services.length - 1
      ? services[currentServiceIndex + 1]
      : services[0]; // Wrap to first service

  return (
    <section className="bg-secondary px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl border-t border-gray-200 pt-8">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Previous Service */}
          <Link
            href={`/services/${previousService.slug}`}
            className="group flex-1 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm">
                <Image
                  src={previousService.image}
                  alt={previousService.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="80px"
                />
              </div>
              <div className="flex-1">
                <p className="font-HelveticaNow mb-1 text-sm text-gray-500">
                  Service précédent
                </p>
                <h3 className="font-ITCGaramondN group-hover:text-primary/70 text-lg leading-tight transition-colors">
                  {previousService.name}
                </h3>
              </div>
            </div>
          </Link>

          {/* Back to Services Button */}
          <div className="flex items-center justify-center">
            <Link
              href="/services"
              className="font-HelveticaNow border-primary hover:bg-primary hover:text-secondary flex cursor-pointer items-center border border-solid px-6 py-3 transition-colors duration-300 ease-in-out"
            >
              <span>Retour aux services</span>
            </Link>
          </div>

          {/* Next Service */}
          <Link
            href={`/services/${nextService.slug}`}
            className="group flex-1 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="flex-1 text-right">
                <p className="font-HelveticaNow mb-1 text-sm text-gray-500">
                  Service suivant
                </p>
                <h3 className="font-ITCGaramondN group-hover:text-primary/70 text-lg leading-tight transition-colors">
                  {nextService.name}
                </h3>
              </div>
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm">
                <Image
                  src={nextService.image}
                  alt={nextService.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="80px"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
