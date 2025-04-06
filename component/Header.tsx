"use client";

import Link from "next/link";
import { useTheme } from "@/app/theme-provider";
import { Moon, Sun } from "lucide-react";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full px-6 py-4 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold hover:opacity-80 transition"
        >
          🚀 ThreeCraft
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-4 text-sm font-medium">
            <Link href="/animations" className="hover:underline">
              Animations
            </Link>
          </nav>
          <button
            onClick={toggleTheme}
            className="p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};
