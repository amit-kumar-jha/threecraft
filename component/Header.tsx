"use client";

import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full px-6 py-4 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold mb-2 md:text-xl md:mb-0 md:mr-auto text-center w-full md:w-auto"
        >
          🚀 ThreeCraft
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-4 text-sm font-medium">
            <Link href="/animations" className="hover:underline">
              Animations
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
