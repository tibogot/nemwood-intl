"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedText from "./AnimatedText3";

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
      <div className="flex flex-col gap-8 md:flex-row md:gap-12">
        {/* Left Column - Title and Description */}
        <div className="w-full md:w-1/2">
          <AnimatedText delay={0.0} stagger={0.3}>
            <h2 className="font-ITCGaramondN mb-6 text-5xl leading-none md:max-w-lg md:text-7xl">
              {title}
            </h2>
            <p className="font-HelveticaNow text-primary/80 text-lg md:max-w-lg">
              {description}
            </p>
          </AnimatedText>
        </div>

        {/* Right Column - FAQ Items */}
        <div className="w-full md:w-1/2">
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
                  className="group hover:text-primary/80 flex w-full cursor-pointer items-center justify-between py-6 text-left transition-colors duration-300"
                >
                  <h3 className="font-HelveticaNow pr-8 text-xl">
                    {faq.question}
                  </h3>
                  <div className="relative h-6 w-6 flex-shrink-0">
                    {/* Horizontal line - stays fixed */}
                    <div className="text-primary/60 group-hover:text-primary absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 transform bg-current transition-colors duration-300" />

                    {/* Vertical line - rotates 45 degrees */}
                    <motion.div
                      className="text-primary/60 group-hover:text-primary absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 transform bg-current transition-colors duration-300"
                      animate={{ rotate: openIndex === index ? 90 : 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                        y: -10,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        y: -10,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                      }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        className="pb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.1,
                          ease: "easeInOut",
                        }}
                      >
                        <p className="font-HelveticaNow text-primary/80 text-lg leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
