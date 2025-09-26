"use client";

import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="border-primary/20 bg-secondary/80 hover:border-primary/40 hover:bg-primary/10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="text-primary h-5 w-5" />
      ) : (
        <Sun className="text-primary h-5 w-5" />
      )}
    </button>
  );
}
