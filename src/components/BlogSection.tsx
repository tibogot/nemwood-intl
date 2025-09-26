"use client";

import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import BlogPreviewHorizontal from "./BlogPreviewHorizontal";
import AnimatedBorder from "./AnimatedBorder";

interface Post {
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
}

interface BlogSectionProps {
  posts: Post[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories from all posts
  const allCategories = posts.reduce(
    (acc, post) => {
      if (post.categories) {
        post.categories.forEach((category) => {
          if (!acc.find((c) => c._id === category._id)) {
            acc.push(category);
          }
        });
      }
      return acc;
    },
    [] as Array<{ _id: string; title: string }>,
  );

  // Filter posts based on selected category
  const filteredPosts = selectedCategory
    ? posts.filter((post) =>
        post.categories?.some((category) => category._id === selectedCategory),
      )
    : posts;

  return (
    <section className="bg-secondary px-4 md:px-8">
      {/* Category Filter */}
      <div className="pt-16">
        <CategoryFilter
          categories={allCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Filtered Blog Posts */}
      {filteredPosts.map((post) => (
        <AnimatedBorder key={post._id}>
          <BlogPreviewHorizontal post={post} />
        </AnimatedBorder>
      ))}
    </section>
  );
}
