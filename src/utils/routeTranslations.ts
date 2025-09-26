export const routeTranslations = {
  fr: {
    "over-ons": "about", // Dutch "over-ons" maps to French "about"
    // Other routes stay the same for both languages
    contact: "contact",
    services: "services",
    blog: "blog",
  },
  nl: {
    about: "over-ons", // French "about" maps to Dutch "over-ons"
    // Other routes stay the same for both languages
    contact: "contact",
    services: "services",
    blog: "blog",
  },
};

export const locales = ["fr", "nl"] as const;
export const defaultLocale = "fr" as const;
export type Language = (typeof locales)[number];
