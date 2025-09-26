import type { Metadata } from "next";

export const siteMetadata = {
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
  url: "https://www.nemwood.be", // Updated to include www
  siteName: "Nemwood",
  locale: "fr_BE",
  image: "/images/nem1.png", // Replace with your preferred image
  facebook: {
    appId: "100063674583109",
    pageId: "100063674583109",
    adminId: "1140420250",
    pageUrl: "https://www.facebook.com/p/NemwOod-100063674583109/",
  },
};

// Utility function to generate page-specific metadata
export function generateMetadata(
  title?: string,
  description?: string,
  image?: string,
  url?: string,
  canonical?: string,
): Metadata {
  // Generate canonical URL if not provided
  const canonicalUrl = canonical || url || siteMetadata.url;

  return {
    metadataBase: new URL(siteMetadata.url),
    title: title || siteMetadata.title,
    description: description || siteMetadata.description,
    keywords: siteMetadata.keywords,
    authors: siteMetadata.authors,
    creator: siteMetadata.creator,
    publisher: siteMetadata.publisher,
    robots: siteMetadata.robots,
    // Add canonical URL
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: title || "Nemwood - Meubles en bois sur mesure en Belgique",
      description:
        description ||
        "Fabrication artisanale de meubles en bois massif sur mesure.",
      type: "website",
      locale: siteMetadata.locale,
      siteName: siteMetadata.siteName,
      url: url || siteMetadata.url,
      images: [
        {
          url: image || siteMetadata.image,
          width: 1200,
          height: 630,
          alt: "Nemwood - Meubles en bois sur mesure",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title || "Nemwood - Meubles en bois sur mesure en Belgique",
      description:
        description ||
        "Fabrication artisanale de meubles en bois massif sur mesure.",
      images: [image || siteMetadata.image],
    },
    other: {
      // Facebook meta tags
      "fb:app_id": siteMetadata.facebook.appId,
      "fb:page_id": siteMetadata.facebook.pageId,
      "fb:admins": siteMetadata.facebook.adminId,
      // Additional Facebook meta tags
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:image:type": "image/png",
      "og:image:alt": "Nemwood - Meubles en bois sur mesure",
      // Additional social media optimization
      "og:type": "website",
      "og:locale": siteMetadata.locale,
      "og:site_name": siteMetadata.siteName,
      "og:url": url || siteMetadata.url,
      "og:title": title || "Nemwood - Meubles en bois sur mesure en Belgique",
      "og:description":
        description ||
        "Fabrication artisanale de meubles en bois massif sur mesure.",
      // Facebook page URL
      "og:see_also": siteMetadata.facebook.pageUrl,
    },
  };
}

export const metadata: Metadata = generateMetadata();
