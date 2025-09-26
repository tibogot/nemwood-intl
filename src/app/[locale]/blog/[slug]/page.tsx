import type { Metadata } from "next";
import client from "@/sanityClient";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import AnimatedText from "@/components/AnimatedText3";
import { generateMetadata as generatePageMetadata } from "@/app/metadata";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";

// Force revalidation every 60 seconds to match blog page
export const revalidate = 60;

// Initialize Sanity image URL builder
const builder = imageUrlBuilder(client);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      description,
      body,
      mainImage {
        asset->{url}
      },
      publishedAt
    }`,
    { slug },
    { cache: "no-store" }, // Force fresh data every time
  );

  if (!post) return generatePageMetadata();

  // Use dedicated description field or fallback to first paragraph
  const description =
    post.description ||
    (() => {
      const firstParagraph = post.body?.[0]?.children?.[0]?.text || "";
      return firstParagraph.length > 160
        ? firstParagraph.substring(0, 160) + "..."
        : firstParagraph;
    })();

  return generatePageMetadata(
    `${post.title} | Blog Nemwood`,
    description,
    post.mainImage?.asset?.url || "/images/nemohero.webp",
    `https://www.nemwood.be/blog/${slug}`,
  );
}

// Removed generateStaticParams to force server-side rendering
// This ensures immediate updates from Sanity

// PortableText components configuration
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      // Handle Sanity image references
      const imageUrl = value?.asset
        ? builder.image(value.asset).url()
        : value?.url;
      const altText = value?.alt || value?.caption || "Blog image";

      // Don't render if no image URL
      if (!imageUrl) {
        return null;
      }

      return (
        <div className="my-8">
          <img
            src={imageUrl}
            alt={altText}
            className="w-full rounded-sm object-cover"
            loading="lazy"
          />
          {value.caption && (
            <p className="mt-2 text-center text-sm text-gray-500">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    // Handle normal paragraphs with proper spacing
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    // Handle headings - 3 consistent sizes regardless of what user picks in CMS
    h1: ({ children }: any) => (
      <h2 className="font-ITCGaramondN mt-8 mb-6 text-5xl">{children}</h2>
    ),
    h2: ({ children }: any) => (
      <h3 className="font-ITCGaramondN mt-6 mb-4 text-4xl leading-tight">
        {children}
      </h3>
    ),
    h3: ({ children }: any) => (
      <h4 className="font-ITCGaramondN mt-5 mb-3 text-3xl leading-tight">
        {children}
      </h4>
    ),
    h4: ({ children }: any) => (
      <h4 className="font-ITCGaramondN mt-5 mb-3 text-2xl leading-tight">
        {children}
      </h4>
    ),
    // Handle blockquotes
    blockquote: ({ children }: any) => (
      <blockquote className="border-primary border-l-4 pl-4 text-gray-600 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    // Handle text formatting
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    // Handle links
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : "_self"}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-primary hover:text-primary/70 underline transition-colors"
      >
        {children}
      </a>
    ),
    // Handle strikethrough
    strike: ({ children }: any) => (
      <span className="line-through">{children}</span>
    ),
    // Handle underline
    underline: ({ children }: any) => (
      <span className="underline">{children}</span>
    ),
  },
  list: {
    // Handle bullet lists
    bullet: ({ children }: any) => (
      <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
    ),
    // Handle numbered lists
    number: ({ children }: any) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
    ),
  },
  listItem: {
    // Handle list items
    bullet: ({ children }: any) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
};

export default async function BlogPostPage(props: any) {
  const { slug } = await props.params;
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      description,
      body,
      mainImage {
        asset->{url}
      },
      publishedAt,
      _createdAt
    }`,
    { slug },
    { cache: "no-store" }, // Force fresh data every time
  );

  // Check if post exists first
  if (!post) return notFound();

  // Fetch previous, next, and related posts only if post exists
  const [prevPost, nextPost, relatedPosts] = await Promise.all([
    client.fetch(
      `*[_type == "post" && _createdAt < $createdAt]|order(_createdAt desc)[0]{
        title,
        slug,
        mainImage {
          asset->{url}
        },
        publishedAt
      }`,
      { createdAt: post._createdAt },
      { cache: "no-store" },
    ),
    client.fetch(
      `*[_type == "post" && _createdAt > $createdAt]|order(_createdAt asc)[0]{
        title,
        slug,
        mainImage {
          asset->{url}
        },
        publishedAt
      }`,
      { createdAt: post._createdAt },
      { cache: "no-store" },
    ),
    client.fetch(
      `*[_type == "post" && slug.current != $currentSlug]|order(_createdAt desc)[0...3]{
        title,
        slug,
        description,
        mainImage {
          asset->{url}
        },
        publishedAt,
        body
      }`,
      { currentSlug: slug },
      { cache: "no-store" },
    ),
  ]);

  return (
    <main className="bg-secondary text-primary px-4 pb-20 md:px-8">
      <div className="mx-auto py-60 text-center">
        <AnimatedText isHero delay={0.0} stagger={0.3}>
          <h1 className="font-ITCGaramondN mx-auto mb-6 max-w-4xl text-6xl md:text-8xl">
            {post.title}
          </h1>
          {post.description && (
            <p className="font-HelveticaNow mx-auto max-w-2xl text-lg">
              {post.description}
            </p>
          )}
        </AnimatedText>
      </div>
      {post.publishedAt && (
        <p className="mb-6 text-center text-sm text-gray-400">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
      )}
      {post.mainImage && (
        <img
          src={post.mainImage.asset.url}
          alt={post.title}
          className="mb-8 max-h-[620px] w-full rounded-sm object-cover"
        />
      )}
      <div className="font-HelveticaNow mx-auto mt-20 max-w-6xl text-xl">
        <PortableText value={post.body} components={portableTextComponents} />
      </div>

      {/* Share Buttons */}
      <ShareButtons
        title={post.title}
        url={`https://www.nemwood.be/blog/${slug}`}
      />

      {/* Related Articles Section */}
      {relatedPosts && relatedPosts.length > 0 && (
        <div className="mx-auto mt-16 max-w-6xl">
          <div className="border-t border-gray-200 pt-8">
            <h2 className="font-ITCGaramondN mb-12 text-3xl md:text-6xl">
              Articles similaires
            </h2>
            <ul className="grid gap-8 md:grid-cols-3 md:gap-6">
              {relatedPosts.map((relatedPost: any) => (
                <li
                  key={relatedPost.slug.current}
                  className="flex flex-col overflow-hidden"
                >
                  <Link
                    href={`/blog/${relatedPost.slug.current}`}
                    className="group block cursor-pointer"
                  >
                    {relatedPost.mainImage && (
                      <div className="bg-secondary relative h-[400px] w-full overflow-hidden">
                        <Image
                          src={relatedPost.mainImage.asset.url}
                          alt={relatedPost.title}
                          fill
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col justify-between pt-4 pb-6">
                      <div>
                        {relatedPost.publishedAt && (
                          <p className="font-HelveticaNow mb-2 text-xs">
                            {new Date(
                              relatedPost.publishedAt,
                            ).toLocaleDateString()}
                          </p>
                        )}
                        <h3 className="font-ITCGaramondN mb-2 text-4xl md:text-4xl">
                          {relatedPost.title}
                        </h3>

                        <div className="font-HelveticaNow mb-2 line-clamp-3 text-base md:max-w-md md:text-lg">
                          {relatedPost.description ||
                            (relatedPost.body && (
                              <PortableText
                                value={relatedPost.body.slice(0, 1)}
                              />
                            ))}
                        </div>
                      </div>
                      <span className="font-HelveticaNow mt-2 inline-block text-base">
                        Read more →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Navigation Section */}
      <div className="mx-auto mt-16 max-w-6xl border-t border-gray-200 pt-8">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Previous Post */}
          {prevPost && (
            <Link
              href={`/blog/${prevPost.slug.current}`}
              className="group flex-1 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm">
                  <img
                    src={prevPost.mainImage?.asset?.url}
                    alt={prevPost.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-HelveticaNow mb-1 text-sm text-gray-500">
                    Article précédent
                  </p>
                  <h3 className="font-ITCGaramondN group-hover:text-primary/70 text-lg leading-tight transition-colors">
                    {prevPost.title}
                  </h3>
                  {prevPost.publishedAt && (
                    <p className="font-HelveticaNow mt-1 text-xs text-gray-400">
                      {new Date(prevPost.publishedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          )}

          {/* Back to Blog Button */}
          <div className="flex items-center justify-center">
            <Link
              href="/blog"
              className="font-HelveticaNow border-primary hover:bg-primary hover:text-secondary flex cursor-pointer items-center border border-solid px-6 py-3 transition-colors duration-300 ease-in-out"
            >
              <span>Retour au blog</span>
            </Link>
          </div>

          {/* Next Post */}
          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug.current}`}
              className="group flex-1 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="flex-1 text-right">
                  <p className="font-HelveticaNow mb-1 text-sm text-gray-500">
                    Article suivant
                  </p>
                  <h3 className="font-ITCGaramondN group-hover:text-primary/70 text-lg leading-tight transition-colors">
                    {nextPost.title}
                  </h3>
                  {nextPost.publishedAt && (
                    <p className="font-HelveticaNow mt-1 text-xs text-gray-400">
                      {new Date(nextPost.publishedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm">
                  <img
                    src={nextPost.mainImage?.asset?.url}
                    alt={nextPost.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
