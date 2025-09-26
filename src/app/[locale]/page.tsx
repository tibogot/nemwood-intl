"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

import HorizScroll from "@/components/HorizScroll8";
import CardsScroll from "@/components/CardsScroll5";
import { ArrowRight, ChevronDown } from "lucide-react";
import Testimonial from "@/components/Testimonial";
import AnimatedText from "@/components/AnimatedText3";
import BlurryTextReveal from "@/components/TextReveal";
import ReverseCards from "@/components/ReverseCards2";
import BlogPreview from "@/components/BlogPreview";
import FAQ from "@/components/FAQ";
import AnimatedBorderLines from "@/components/AnimatedBorderLines";
import HeroCanvas from "@/components/HeroCanvas";
import SimpleHeroCanvas from "@/components/SimpleHeroCanvas";
import GLBHeroCanvas from "@/components/GLBHeroCanvas";

export default function Home() {
  const { t } = useTranslation();
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const bigImgRef = useRef<HTMLDivElement>(null);

  // GSAP animation for big image scale on scroll
  useGSAP(
    () => {
      if (!bigImgRef.current) return;

      // Reset to initial state first to prevent jump on navigation
      gsap.set(bigImgRef.current, { scale: 0.5 });

      // Delay ScrollTrigger setup to avoid conflict with scroll-to-top navigation
      const timeoutId = setTimeout(() => {
        // Create scroll-triggered scale animation
        const animation = gsap.to(bigImgRef.current, {
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bigImgRef.current,
            start: "top 80%",
            end: "bottom 80%",
            scrub: 1,
            // Use a unique id to avoid conflicts with other ScrollTriggers
            id: "big-img-scale",
            // markers: true,
          },
        });

        // Store animation reference for cleanup
        (bigImgRef.current as any).scrollAnimation = animation;
      }, 100); // Small delay to let scroll-to-top complete

      // Cleanup function
      return () => {
        clearTimeout(timeoutId);
        if (bigImgRef.current && (bigImgRef.current as any).scrollAnimation) {
          (bigImgRef.current as any).scrollAnimation.kill();
        }
        ScrollTrigger.getById("big-img-scale")?.kill();
      };
    },
    { scope: bigImgRef },
  );

  useEffect(() => {
    // Fetch blog posts for preview
    const fetchBlogPosts = async () => {
      try {
        const client = (await import("@/sanityClient")).default;
        const posts = await client.fetch(
          `*[_type == "post"]|order(_createdAt desc)[0...3]{
            _id,
            title,
            slug,
            description,
            mainImage {
              asset->{url}
            },
            publishedAt,
            body
          }`,
        );
        setBlogPosts(posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setBlogPosts([]);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <main className="wrapper bg-secondary">
      {/* Hero Section */}
      <section className="relative flex h-[100svh] flex-col items-center justify-end px-4 py-20 md:px-8 md:py-40">
        {/* Hero 3D Canvas - GLB Model */}
        {/* <GLBHeroCanvas /> */}

        {/* Hero background image - commented out */}
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/wood-work.webp"
          alt="Nemwood - Artisan menuisier en Belgique - Mobilier sur mesure en bois massif"
          fill
          sizes="100vw"
          quality={90}
          priority
        />

        {/* <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/images/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}

        {/* Hero text */}
        {/* <h4 className="font-ITCGaramondN relative z-10 text-4xl text-white opacity-0 md:text-6xl">
          Meubles en bois sur mesure
        </h4> */}
        <AnimatedText
          isHero
          delay={0.0}
          stagger={0.3}
          translationKey="home.title"
        >
          <h4 className="font-ITCGaramondN relative z-10 text-4xl text-white md:text-6xl">
            {t("home.title")}
          </h4>
        </AnimatedText>
      </section>

      <section className="text-primary section2 px-4 md:px-8">
        {/* <div className="mx-auto py-20 text-center md:py-40">
          <AnimatedText delay={0.0} stagger={0.3}>
            <h1 className="mb-6">Meubles en bois sur mesure</h1>
            <p className="font-HelveticaNow mx-auto max-w-2xl text-lg">
{t("home.description")}
            </p>
            <p className="font-HelveticaNow text-primary/70 mx-auto mt-4 max-w-2xl text-sm leading-tight">
              En activité depuis 2016 en Belgique.
            </p>
          </AnimatedText>
        </div> */}

        <section className="text-primary bg-secondary intro mx-auto px-4 py-20 text-center md:px-8 md:py-20">
          <AnimatedText delay={0.0} stagger={0.3}>
            <h1 className="font-ITCGaramondN mx-auto mb-6 max-w-4xl text-6xl">
              {t("home.title")}
            </h1>
            <p className="font-HelveticaNow mx-auto max-w-2xl text-lg">
              {t("home.description")}
            </p>
          </AnimatedText>
        </section>

        {/* Big Image */}
        <div
          ref={bigImgRef}
          className="big-img flex w-full justify-center pb-20"
        >
          <div className="relative h-[600px] w-full md:h-[800px] md:w-4/5">
            <Image
              src="/images/wood-work.webp"
              alt="Nemwood furniture showcase"
              fill
              className="rounded-sm object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              // loading="lazy"
              quality={90}
            />
          </div>
        </div>
      </section>
      {/* <ReverseCards /> */}
      <section className="border-primary text-primary flex w-full flex-col border-y px-4 py-10 pb-20 md:flex-row md:px-8 md:py-20 md:pb-40">
        <div className="left md:w-1/2">
          <div>
            <AnimatedText delay={0.0} stagger={0.3}>
              {/* <h4 className="font-HelveticaNow text-primary/70 text-sm">
                A PROPOS
              </h4> */}
              <h2 className="mt-8 md:max-w-xl">{t("home.expertise")}</h2>
              <p className="font-HelveticaNow mt-8 text-lg md:max-w-xl">
                {t("home.expertise_description")}
              </p>
            </AnimatedText>

            <Link href="/about">
              <button className="font-HelveticaNow mt-10">
                <div className="border-primary hover:bg-primary hover:text-secondary flex cursor-pointer items-center border border-solid px-4 py-2 transition-colors duration-300 ease-in-out">
                  <span>En savoir plus</span>
                  <div className="mt-0.5 ml-1">
                    <ArrowRight size={18} strokeWidth={1.5} />
                  </div>
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div className="left mt-8 flex flex-col items-center justify-center text-center md:mt-0 md:w-1/2">
          <div className="w-full md:max-w-xl">
            <AnimatedBorderLines
              stagger={0.15}
              duration={0.6}
              delay={0.2}
              start="top 85%"
            >
              {[
                t("home.features.quality"),
                t("home.features.sustainability"),
                "Solutions Personnalisées",
                "Design & fonctionnalité",
              ].map((text, index) => (
                <div
                  key={index}
                  className="border-primary/50 mt-4 border-t pt-4"
                >
                  <div className="flex items-center justify-start gap-3">
                    <span className="text-primary relative top-[1px] text-3xl leading-none">
                      •
                    </span>

                    <p className="font-HelveticaNow text-left text-lg">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </AnimatedBorderLines>
          </div>
        </div>
      </section>

      <HorizScroll />

      <section className="text-primary border-primary mx-auto border-y px-4 py-20 text-center md:px-8 md:py-40">
        {/* <h1 className="font-ITCGaramondN mb-6 text-6xl">
          Creativity to design
        </h1> */}
        <AnimatedText>
          <p className="font-HelveticaNow mx-auto text-lg md:max-w-2xl">
            Basés en Belgique, nous valorisons le travail du bois local, la
            précision des finitions, et un accompagnement sur-mesure tout au
            long du projet. Chaque meuble est conçu en étroite collaboration
            avec nos clients, pour répondre parfaitement à leurs attentes.
          </p>
        </AnimatedText>
      </section>
      <CardsScroll />

      <section className="text-primary flex w-full flex-col gap-6 px-4 py-10 md:flex-row-reverse md:gap-20 md:px-8 md:py-20">
        <div className="left relative h-[400px] md:h-[700px] md:w-1/2">
          <Image
            src="/images/nem1.png"
            alt="Random from Picsum"
            fill
            className="rounded-sm object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
        </div>

        <div className="right flex flex-col justify-between md:h-[700px] md:w-1/2">
          <div>
            <AnimatedText delay={0.0} stagger={0.3}>
              <h2 className="font-ITCGaramondN text-4xl leading-none md:max-w-xl md:text-6xl">
                {t("home.subtitle")}
              </h2>
              <p className="font-HelveticaNow mt-8 max-w-xl text-lg">
                {t("home.description")}
              </p>
            </AnimatedText>
          </div>

          <div className="mt-10">
            <button className="font-HelveticaNow">
              <div className="border-primary hover:bg-primary hover:text-secondary inline-flex items-center border border-solid px-4 py-2 transition-colors duration-300 ease-in-out">
                <span>En savoir plus</span>
                <div className="mt-0.5 ml-1">
                  <ArrowRight size={18} strokeWidth={1.5} />
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      <section className="border-primary border-t py-40 md:py-80">
        <BlurryTextReveal />
      </section>

      <Testimonial />

      {/* FAQ Section */}
      <FAQ
        title={t("home.faq.title")}
        description={t("home.faq.description")}
        translationKey="home.faq.title"
        faqs={[
          {
            question: t("home.faq.questions.quotes"),
            answer: t("home.faq.answers.quotes"),
          },
          {
            question: t("home.faq.questions.wood"),
            answer: t("home.faq.answers.wood"),
          },
          {
            question: t("home.faq.questions.timing"),
            answer: t("home.faq.answers.timing"),
          },
          {
            question: t("home.faq.questions.belgium"),
            answer: t("home.faq.answers.belgium"),
          },
        ]}
      />

      {/* Blog Previews Section */}
      <section className="border-primary border-y px-4 py-10 md:px-8 md:py-20">
        <div className="flex w-full">
          <AnimatedText delay={0.0} stagger={0.3}>
            <h2 className="font-ITCGaramondN text-primary text-5xl md:text-7xl">
              {t("home.news.title")}
            </h2>
          </AnimatedText>
        </div>

        {/* Mobile: Horizontal Scroll Carousel */}
        <div className="mt-8 md:hidden">
          <ul className="scrollbar-hide flex list-none gap-6 overflow-x-auto p-0">
            {blogPosts.map((post, index) => (
              <div
                key={post._id}
                className={`${index === 0 ? "ml-0" : ""} ${index === blogPosts.length - 1 ? "mr-0" : ""}`}
              >
                <BlogPreview post={post} />
              </div>
            ))}
          </ul>
        </div>

        {/* Desktop: Regular Grid Layout */}
        <ul className="mt-8 hidden list-none flex-row justify-center gap-6 p-0 md:mt-20 md:flex">
          {blogPosts.map((post) => (
            <BlogPreview key={post._id} post={post} />
          ))}
        </ul>
        <div className="mt-3 md:mt-6">
          <Link
            href="/blog"
            className="font-HelveticaNow text-primary font-medium underline"
          >
            Voir tous les articles
          </Link>
        </div>
      </section>
    </main>
  );
}
