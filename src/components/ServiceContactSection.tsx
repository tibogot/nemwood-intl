import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceContactSectionProps {
  title?: string;
  description?: string;
  serviceName?: string;
}

export default function ServiceContactSection({
  title = "Prêt à commencer votre projet ?",
  description = "Contactez-nous pour discuter de votre projet de menuiserie sur mesure. Devis gratuit et sans engagement.",
  serviceName,
}: ServiceContactSectionProps) {
  const finalTitle = serviceName
    ? `Prêt à créer votre ${serviceName.toLowerCase()} ?`
    : title;

  const finalDescription = serviceName
    ? `Contactez-nous pour discuter de votre projet de ${serviceName.toLowerCase()} sur mesure. Devis gratuit et sans engagement.`
    : description;

  return (
    <section className="bg-primary text-secondary px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-4xl md:text-5xl">{finalTitle}</h2>
        <p className="font-HelveticaNow mx-auto mb-8 max-w-2xl text-lg">
          {finalDescription}
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
    </section>
  );
}
