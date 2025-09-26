import { routeTranslations, type Language } from "./routeTranslations";

export function getLocalizedRoute(route: string, language: Language): string {
  if (!route || route === "") {
    return `/${language}`;
  }

  const translations = routeTranslations[language];
  const translatedRoute =
    translations[route as keyof typeof translations] || route;

  return `/${language}/${translatedRoute}`;
}
