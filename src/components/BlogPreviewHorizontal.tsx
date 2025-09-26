import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import AnimatedText from "./AnimatedText3";

interface BlogPreviewHorizontalProps {
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    description?: string;
    mainImage?: any;
    publishedAt?: string;
    body?: any;
    categories?: Array<{
      _id: string;
      title: string;
    }>;
  };
}

export default function BlogPreviewHorizontal({
  post,
}: BlogPreviewHorizontalProps) {
  // Try to get the image URL safely (Sanity image may be deeply nested) - SAME AS ORIGINAL
  let imageUrl = "";
  if (post.mainImage) {
    if (post.mainImage.asset && post.mainImage.asset.url) {
      imageUrl = post.mainImage.asset.url;
    } else if (typeof post.mainImage === "string") {
      imageUrl = post.mainImage;
    }
  }
  if (!imageUrl) imageUrl = "/logo.svg"; // fallback to your logo

  return (
    <article className="group hover:bg-secondary/50 py-8 transition-all duration-300">
      <Link href={`/blog/${post.slug.current}`} className="block">
        <div className="flex flex-col gap-12 md:flex-row md:items-stretch">
          {/* Image - Horizontal layout */}
          <div className="relative h-48 w-full flex-shrink-0 overflow-hidden rounded-sm md:h-[300px] md:w-[300px]">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 192px"
              loading="lazy"
            />
          </div>

          {/* Content - Horizontal layout */}
          <div className="flex flex-1 flex-col justify-between md:min-h-[300px]">
            <div>
              {/* Date */}
              {post.publishedAt && (
                <p className="font-HelveticaNow text-primary/70 mb-2 text-xs">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              )}

              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <span
                      key={category._id}
                      className="font-HelveticaNow bg-primary/10 text-primary rounded-full px-3 py-1 text-xs"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <AnimatedText className="overflow-visible py-2">
                <h3 className="font-ITCGaramondN text-primary mb-2 text-2xl leading-none transition-colors duration-300 md:max-w-4xl md:text-5xl">
                  {post.title}
                </h3>
              </AnimatedText>

              {/* Description - SAME AS ORIGINAL */}
              {/* <div className="font-HelveticaNow text-primary/80 mb-2 line-clamp-3 text-base md:max-w-md md:text-lg">
                {post.description ||
                  (post.body && <PortableText value={post.body.slice(0, 1)} />)}
              </div> */}
            </div>

            {/* Read more link */}
            {/* <span className="font-HelveticaNow text-primary mt-2 inline-block text-base transition-colors duration-300">
              Read more →
            </span> */}
          </div>
        </div>
      </Link>
    </article>
  );
}
