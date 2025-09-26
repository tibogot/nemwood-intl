import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

interface BlogPreviewProps {
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    description?: string;
    mainImage?: any;
    publishedAt?: string;
    body?: any;
  };
  layout?: "horizontal-scroll" | "grid";
}

export default function BlogPreview({
  post,
  layout = "horizontal-scroll",
}: BlogPreviewProps) {
  // Try to get the image URL safely (Sanity image may be deeply nested)
  let imageUrl = "";
  if (post.mainImage) {
    if (post.mainImage.asset && post.mainImage.asset.url) {
      imageUrl = post.mainImage.asset.url;
    } else if (typeof post.mainImage === "string") {
      imageUrl = post.mainImage;
    }
  }
  if (!imageUrl) imageUrl = "/logo.svg"; // fallback to your logo

  // Different responsive classes based on layout
  const responsiveClasses =
    layout === "grid"
      ? "text-primary mb-6 md:mb-10"
      : "text-primary w-80 flex-shrink-0 md:mb-0 md:w-1/3 md:flex-shrink";

  return (
    <li className={responsiveClasses}>
      <Link href={`/blog/${post.slug.current}`} className="group block h-full">
        <div className="flex h-full flex-col items-stretch overflow-hidden">
          <div className="relative h-[300px] w-full overflow-hidden md:h-[400px]">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between py-4 md:py-6">
            <div>
              {post.publishedAt && (
                <p className="font-HelveticaNow mb-2 text-xs">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              )}
              <h3 className="font-ITCGaramondN mb-2 text-4xl leading-none md:text-4xl">
                {post.title}
              </h3>

              <div className="font-HelveticaNow mb-2 line-clamp-3 text-base md:max-w-md md:text-lg">
                {post.description ||
                  (post.body && <PortableText value={post.body.slice(0, 1)} />)}
              </div>
            </div>
            <span className="font-HelveticaNow mt-2 inline-block text-base md:text-base">
              En savoir plus →
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
