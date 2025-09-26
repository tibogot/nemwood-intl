"use client";

import Link from "next/link";
import { getLocalizedNavigationItems } from "@/data/menu";
import { getLocalizedRoute } from "@/utils/navigation";
import { useTranslation } from "@/hooks/useTranslation";

export default function Navigation7() {
  const { t, language, toggleLanguage, isLoading } = useTranslation();
  const localizedNavItems = getLocalizedNavigationItems(language);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between bg-white p-4 shadow-md">
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
        disabled={isLoading}
        className={`rounded-md px-3 py-1 text-sm font-medium transition-colors duration-200 ${
          isLoading
            ? "cursor-not-allowed bg-gray-200 text-gray-400"
            : "cursor-pointer bg-gray-100 hover:bg-gray-200"
        }`}
      >
        {isLoading ? "..." : language === "fr" ? "NL" : "FR"}
      </button>
    </nav>
  );
}
