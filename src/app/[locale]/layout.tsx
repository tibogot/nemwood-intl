import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { TranslationProvider } from "@/hooks/useTranslation";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ClientLayout from "@/components/ClientLayout";
import { Analytics } from "@vercel/analytics/next";
// import CookieConsent from "@/components/CookieConsent";
// import ScrollProgress from "@/components/ScrollProgress";

const ITCGaramondStdLtNarrow = localFont({
  src: [
    {
      path: "../../fonts/ITCGaramondStd-LtNarrow.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-ITCGaramondStdLtNarrow",
  display: "swap",
  preload: true,
  fallback: ["serif"],
});
const ITCGaramondStdLtNarrowIta = localFont({
  src: [
    {
      path: "../../fonts/ITCGaramondStd-LtNarrowIta.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-ITCGaramondStdLtNarrowIta",
  display: "swap",
  preload: true,
  fallback: ["serif"],
});
const HelveticaNow = localFont({
  src: [
    {
      path: "../../fonts/helvetica-now-display.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-HelveticaNow",
  display: "swap",
  preload: true,
  fallback: ["sans-serif"],
});

// const neueHaasDisplay = localFont({
//   src: [
//     {
//       path: "../fonts/NeueHaasDisplay-Roman.ttf",
//       weight: "400",
//       style: "normal",
//     },
//   ],
//   variable: "--font-neue-haas-display",
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "Nemwood | Meubles en bois sur mesure en Belgique",
  description:
    "Artisan menuisier en Belgique spécialisé dans la fabrication de meubles en bois sur mesure : escaliers, garde-robes, tables, cuisines. Devis gratuit.",
  keywords: [
    "menuisier belgique",
    "meubles bois sur mesure",
    "escaliers bois belgique",
    "garde-robe sur mesure",
    "table bois massif",
    "cuisine bois belgique",
  ],
  authors: [{ name: "Nemwood" }],
  creator: "Nemwood",
  publisher: "Nemwood",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.nemwood.be",
  },
  openGraph: {
    title: "Nemwood - Meubles en bois sur mesure en Belgique",
    description: "Fabrication artisanale de meubles en bois massif sur mesure.",
    type: "website",
    locale: "fr_BE",
    siteName: "Nemwood",
    url: "https://www.nemwood.be",
    images: [
      {
        url: "/images/nem1.png",
        width: 1200,
        height: 630,
        alt: "Nemwood - Meubles en bois sur mesure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nemwood - Meubles en bois sur mesure en Belgique",
    description: "Fabrication artisanale de meubles en bois massif sur mesure.",
    images: ["/images/nem1.png"],
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <head>
        {/* Hreflang tags for multilingual SEO */}
        <link rel="alternate" hrefLang="fr" href="https://www.nemwood.be/fr" />
        <link rel="alternate" hrefLang="nl" href="https://www.nemwood.be/nl" />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.nemwood.be/fr"
        />

        {/* Next.js automatically handles font preloading and optimization */}

        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Nemwood",
              description:
                "Artisan menuisier en Belgique spécialisé dans la fabrication de meubles en bois sur mesure",
              url: "https://www.nemwood.be",
              telephone: "+32 489 33 05 44",
              email: "contact@nemwood.be",
              address: {
                "@type": "PostalAddress",
                addressCountry: "BE",
                addressLocality: "Belgique",
              },
              geo: {
                "@type": "GeoCoordinates",
                addressCountry: "BE",
              },
              openingHours: "Mo-Fr 09:00-18:00",
              priceRange: "€€",
              currenciesAccepted: "EUR",
              paymentAccepted: "Cash, Credit Card, Bank Transfer",
              areaServed: "Belgique",
              serviceType: [
                "Menuiserie sur mesure",
                "Fabrication de meubles",
                "Installation d'escaliers",
                "Rénovation de cuisines",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Services de menuiserie",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Escaliers sur mesure",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Garde-robes sur mesure",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Tables en bois massif",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Cuisines sur mesure",
                    },
                  },
                ],
              },
              sameAs: [
                "https://www.facebook.com/p/NemwOod-100063674583109/",
                "https://instagram.com/nem_wood",
              ],
            }),
          }}
        />

        {/* Additional Meta Tags for Better SEO */}
        {/* <meta name="theme-color" content="#8B4513" />
        <meta name="msapplication-TileColor" content="#8B4513" /> */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nemwood" />
        <meta name="application-name" content="Nemwood" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Facebook and Open Graph meta tags are now handled by the metadata system */}

        {/* Google Analytics Component */}
        <GoogleAnalytics />

        {/* Immediate FOUC prevention styles */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* CRITICAL: Immediate full-screen overlay to prevent any FOUC */
            html {
              background-color: var(--color-primary) !important;
              margin: 0;
              padding: 0;
              overflow-x: hidden;
            }
            
            body {
              background-color: var(--color-primary) !important;
              margin: 0;
              padding: 0;
              overflow-x: hidden;
            }
            
            /* Immediate full-screen overlay - appears before ANY content */
            body::before {
              content: '';
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background-color: var(--color-primary);
              z-index: 999999;
              pointer-events: none;
            }
            
            /* Remove the overlay once PageLoader is ready */
            .page-loader-ready body::before {
              display: none;
            }
            
            /* Ensure PageLoader is always on top during loading */
            .page-loader-active {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 9999;
            }
          `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${ITCGaramondStdLtNarrow.variable} ${ITCGaramondStdLtNarrowIta.variable} ${HelveticaNow.variable} bg-primary antialiased`}
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <TranslationProvider>
          <ClientLayout>{children}</ClientLayout>
        </TranslationProvider>
        {/* <CookieConsent /> */}
        <Analytics />
      </body>
    </html>
  );
}
