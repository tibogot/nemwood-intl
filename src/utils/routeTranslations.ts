export const routeTranslations = {
  fr: {
    "over-ons": "about", // Dutch "over-ons" maps to French "about"
    diensten: "services", // Dutch "diensten" maps to French "services"
    // Other routes stay the same for both languages
    contact: "contact",
    services: "services",
    blog: "blog",
  },
  nl: {
    about: "over-ons", // French "about" maps to Dutch "over-ons"
    services: "diensten", // French "services" maps to Dutch "diensten"
    // Other routes stay the same for both languages
    contact: "contact",
    blog: "blog",
  },
};

export const locales = ["fr", "nl"] as const;
export const defaultLocale = "fr" as const;
export type Language = (typeof locales)[number];
