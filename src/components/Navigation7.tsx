"use client";

import Link from "next/link";
import { getLocalizedNavigationItems } from "@/data/menu";
import { getLocalizedRoute } from "@/utils/navigation";
import { useTranslation } from "@/hooks/useTranslation";

export default function Navigation7() {
  const { t, language, toggleLanguage } = useTranslation();
  const localizedNavItems = getLocalizedNavigationItems(language);

  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow-md">
      {/* Logo with localized home link */}
      <Link
        href={getLocalizedRoute("", language)}
        className="flex items-center"
      >
        <img src="/logonav.svg" alt="Logo" className="h-8 w-auto" />
      </Link>

      {/* Navigation items */}
      <div className="flex items-center space-x-6">
        {localizedNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-gray-700 transition-colors duration-200 hover:text-gray-900"
          >
            {t(item.labelKey)}
          </Link>
        ))}
      </div>

      {/* Language switcher */}
      <button
        onClick={toggleLanguage}
        className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium transition-colors duration-200 hover:bg-gray-200"
      >
        {language.toUpperCase()}
      </button>
    </nav>
  );
}
