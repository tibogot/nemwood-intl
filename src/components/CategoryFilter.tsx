"use client";

import { useState } from "react";

interface Category {
  _id: string;
  title: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {/* "Tout" option */}
      <button
        onClick={() => onCategoryChange(null)}
        className={`font-HelveticaNow cursor-pointer rounded-full px-4 py-2 text-sm transition-all duration-300 ${
          selectedCategory === null
            ? "bg-primary text-secondary"
            : "bg-primary/10 text-primary hover:bg-primary/20"
        }`}
      >
        Tout
      </button>

      {/* Category options */}
      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() => onCategoryChange(category._id)}
          className={`font-HelveticaNow cursor-pointer rounded-full px-4 py-2 text-sm transition-all duration-300 ${
            selectedCategory === category._id
              ? "bg-primary text-secondary"
              : "bg-primary/10 text-primary hover:bg-primary/20"
          }`}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
}
