# Canonical URLs Implementation for Nemwood Website

## ✅ What Has Been Implemented

Your website now has canonical URLs implemented across all pages using Next.js 15's built-in metadata system. Here's what was added:

### 1. **Updated Main Metadata Configuration** (`src/app/metadata.ts`)

- Fixed domain from `https://nemwood.be` to `https://www.nemwood.be`
- Added canonical URL support to the `generateMetadata` function
- Added `alternates.canonical` property to all generated metadata

### 2. **Updated All Page Metadata**

All pages now include canonical URLs:

- **Homepage**: `https://www.nemwood.be/`
- **About**: `https://www.nemwood.be/about`
- **Services**: `https://www.nemwood.be/services`
- **Blog**: `https://www.nemwood.be/blog`
- **Contact**: `https://www.nemwood.be/contact`
- **Service Sub-pages**:
  - `https://www.nemwood.be/services/escaliers`
  - `https://www.nemwood.be/services/garde-robes`
  - `https://www.nemwood.be/services/tables`
  - `https://www.nemwood.be/services/cuisines`
- **Dynamic Blog Posts**: `https://www.nemwood.be/blog/[slug]`

## 🔧 How It Works

### The `generateMetadata` Function

```typescript
export function generateMetadata(
  title?: string,
  description?: string,
  image?: string,
  url?: string,
  canonical?: string, // New parameter for canonical URLs
): Metadata {
  // Generate canonical URL if not provided
  const canonicalUrl = canonical || url || siteMetadata.url;

  return {
    // ... other metadata
    alternates: {
      canonical: canonicalUrl, // This creates the canonical link tag
    },
    // ... rest of metadata
  };
}
```

### Usage in Pages

```typescript
export const metadata: Metadata = generateMetadata(
  "Page Title",
  "Page description",
  "/images/image.webp",
  "https://www.nemwood.be/page-path", // This URL will automatically be used as the canonical URL
);
```

## 📱 What Gets Generated

When you use this system, Next.js automatically generates the following HTML in your page `<head>`:

```html
<link rel="canonical" href="https://www.nemwood.be/page-path" />
```

## 🚀 Benefits of This Implementation

1. **SEO Improvement**: Prevents duplicate content issues
2. **Search Engine Optimization**: Helps consolidate link equity
3. **Clean URLs**: Consistent domain usage across all pages
4. **Maintainable**: Centralized metadata management
5. **Next.js 15 Native**: Uses the latest framework features

## 🛠️ How to Add Canonical URLs to New Pages

When you create new pages, follow this pattern:

```typescript
import type { Metadata } from "next";
import { generateMetadata } from "@/app/metadata";

export const metadata: Metadata = generateMetadata(
  "Page Title | Nemwood",
  "Page description",
  "/images/image.webp",
  "https://www.nemwood.be/new-page", // This URL will automatically be used as the canonical URL
);
```

## 🔍 Testing Your Canonical URLs

1. **View Page Source**: Right-click on any page and "View Page Source"
2. **Search for "canonical"**: Look for `<link rel="canonical" href="...">`
3. **Check Domain Consistency**: Ensure all URLs use `https://www.nemwood.be`

## 📊 Monitoring and Maintenance

- **Regular Checks**: Verify canonical URLs are present on new pages
- **Domain Consistency**: Always use `https://www.nemwood.be` (with www)
- **URL Structure**: Maintain consistent URL patterns
- **SEO Tools**: Use tools like Google Search Console to monitor canonical URL effectiveness

## 🌐 Domain Considerations

- **Primary Domain**: `https://www.nemwood.be` (with www)
- **Redirects**: Ensure your hosting provider redirects `nemwood.be` to `www.nemwood.be`
- **SSL Certificate**: Verify SSL is properly configured for both domains

## 📝 Next Steps

1. **Test the implementation** by viewing page source on your live site
2. **Verify domain redirects** work correctly
3. **Monitor SEO performance** in Google Search Console
4. **Add canonical URLs** to any new pages you create

Your website now has a robust, SEO-friendly canonical URL system that will help improve your search engine rankings and prevent duplicate content issues!
