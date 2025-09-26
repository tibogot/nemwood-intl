"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  description?: string;
  faqs: FAQItem[];
  className?: string;
}

export default function FAQ({
  title = "Questions fréquentes",
  description = "Trouvez les réponses aux questions les plus courantes sur nos services de menuiserie sur mesure.",
  faqs,
  className = "",
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className={`bg-secondary text-primary px-4 py-20 md:px-8 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="font-ITCGaramondN mb-6 text-4xl md:text-6xl">
            {title}
          </h2>
          <p className="font-HelveticaNow text-primary/80 mx-auto max-w-2xl text-lg">
            {description}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border-primary/20 border-b border-solid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="group hover:text-primary/80 flex w-full items-center justify-between py-6 text-left transition-colors duration-300"
              >
                <h3 className="font-ITCGaramondN pr-8 text-xl md:text-2xl">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <ChevronDown
                    size={24}
                    className="text-primary/60 group-hover:text-primary transition-colors duration-300"
                  />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6">
                      <p className="font-HelveticaNow text-primary/80 text-lg leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
