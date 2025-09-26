// hooks/useTranslation.tsx

"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  routeTranslations,
  defaultLocale,
  type Language,
} from "@/utils/routeTranslations";

interface TranslationContextType {
  t: (key: string) => string;
  language: Language;
  changeLanguage: (newLanguage: Language) => void;
  toggleLanguage: () => void;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined,
);

export function TranslationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [language, setLanguage] = useState<Language>(() => {
    // Try localStorage first, then URL, then default
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("preferred-language") as Language;
      if (saved && (saved === "fr" || saved === "nl")) {
        return saved;
      }
    }
    const currentLocale = pathname?.split("/")[1] as Language;
    return currentLocale || defaultLocale;
  });

  const [translations, setTranslations] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const loadTranslations = async (lang: Language) => {
    setIsLoading(true);
    try {
      const response = await import(`@/locales/${lang}.json`);
      setTranslations(response.default);
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update language when URL changes
  useEffect(() => {
    const urlLocale = pathname?.split("/")[1] as Language;
    if (urlLocale && (urlLocale === "fr" || urlLocale === "nl")) {
      if (urlLocale !== language) {
        setLanguage(urlLocale);
        if (typeof window !== "undefined") {
          localStorage.setItem("preferred-language", urlLocale);
        }
      }
    }
  }, [pathname, language]);

  useEffect(() => {
    loadTranslations(language);
  }, [language]);

  const t = (key: string): string => {
    // If translations are loading, return a placeholder or the key
    if (isLoading && Object.keys(translations).length === 0) {
      return key;
    }

    const keys = key.split(".");
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  };

  const translateRoute = (
    currentPath: string,
    targetLang: Language,
  ): string => {
    const pathWithoutLocale = currentPath?.replace(/^\/[a-z]{2}/, "") || "/";
    const segments = pathWithoutLocale.split("/").filter(Boolean);

    if (segments.length === 0) {
      return `/${targetLang}`;
    }

    const mainRoute = segments[0];
    const translations = routeTranslations[targetLang];
    const translatedRoute =
      translations[mainRoute as keyof typeof translations] || mainRoute;

    const remainingSegments = segments.slice(1);
    const newPath = `/${targetLang}/${translatedRoute}${remainingSegments.length > 0 ? "/" + remainingSegments.join("/") : ""}`;

    return newPath;
  };

  const changeLanguage = async (newLanguage: Language) => {
    // Prevent multiple rapid language changes
    if (newLanguage === language) return;

    const newPath = translateRoute(pathname || "/", newLanguage);

    // Update localStorage first
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", newLanguage);
    }

    // Use Next.js router to navigate, which will trigger page transitions
    router.push(newPath);
  };

  const toggleLanguage = async () => {
    const newLang = language === "fr" ? "nl" : "fr";
    changeLanguage(newLang);
  };

  return (
    <TranslationContext.Provider
      value={{ t, language, changeLanguage, toggleLanguage, isLoading }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
