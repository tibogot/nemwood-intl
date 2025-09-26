import type { Metadata } from "next";
import AnimatedText from "@/components/AnimatedText3";
import client from "@/sanityClient";
import BlogSection from "@/components/BlogSection";
import ParallaxImage from "@/components/ParallaxImage";
import Image from "next/image";
import { generateMetadata } from "@/app/metadata";

// Force revalidation every 60 seconds (optional)
export const revalidate = 60;

export const metadata: Metadata = generateMetadata(
  "Blog Nemwood - Actualités et conseils menuiserie | Nemwood",
  "Découvrez nos dernières actualités et conseils pour améliorer votre intérieur. Conseils d'experts en menuiserie sur mesure.",
  "/images/nemohero.webp",
  "https://www.nemwood.be/blog",
);

export default async function BlogPage() {
  // Force fresh data - no caching
  const posts = await client.fetch(
    `*[_type == "post"]|order(_createdAt desc){
      _id,
      title,
      slug,
      description,
      mainImage {
        asset->{url}
      },
      publishedAt,
      body,
      categories[]->{
        _id,
        title
      }
    }`,
    {},
    { cache: "no-store" }, // Force fresh data every time
  );

  return (
    <>
      <main className="text-primary bg-secondary px-4 md:px-8">
        <section className="border-primary mx-auto border-b py-40 text-center md:py-64">
          <AnimatedText isHero delay={0.0} stagger={0.3}>
            <h1 className="font-ITCGaramondN mb-6 text-6xl md:text-8xl">
              Nos dernières actualités
            </h1>
            <p className="font-HelveticaNow mx-auto max-w-2xl text-lg">
              Découvrez nos dernières actualités et conseils pour améliorer
              votre intérieur.
            </p>
          </AnimatedText>
        </section>
        {/* Responsive blog grid with proper wrapping */}
        {/* <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
            <BlogPreview key={post._id} post={post} layout="grid" />
          ))}
        </ul> */}
        {/* <div className="h-[30vh]"></div> */}
      </main>

      {/* Blog section with category filtering */}
      <BlogSection posts={posts} />
      <section className="bg-secondary relative w-full">
        <div className="md:pt-40">
          <ParallaxImage speed={1.5} className="h-[400px] md:h-[100svh]">
            <Image
              src="/images/nemohero.webp"
              alt="Nemwood artisan woodworking"
              fill
              className="object-cover"
              sizes="100vw"
              quality={95}
              priority
            />
          </ParallaxImage>
        </div>
      </section>
    </>
  );
}
