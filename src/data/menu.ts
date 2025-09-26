import { getLocalizedRoute } from "@/utils/navigation";
import type { Language } from "@/utils/routeTranslations";

export interface MenuItem {
  route: string; // Base route without language prefix
  labelKey: string;
}

export const navigationItems: MenuItem[] = [
  { route: "", labelKey: "nav.home" },
  { route: "about", labelKey: "nav.about" }, // Will become /fr/about or /nl/over-ons
  { route: "services", labelKey: "nav.services" }, // Will become /fr/services or /nl/services
  { route: "contact", labelKey: "nav.contact" }, // Will become /fr/contact or /nl/contact
  { route: "blog", labelKey: "nav.blog" }, // Will become /fr/blog or /nl/blog
];

export function getLocalizedNavigationItems(
  language: Language,
): Array<MenuItem & { href: string }> {
  return navigationItems.map((item) => ({
    ...item,
    href: getLocalizedRoute(item.route, language),
  }));
}
