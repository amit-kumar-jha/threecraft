"use client";

import AboutCreator from "./AboutCreator";
import WhatYoullLearn from "./WhatYouLearn";
import AnimationPreviews from "./AnimationPreviews";
import HeroSection from "./HeroSection";
import Prerequisites from "./Prerequisites";

export default function Layout() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white px-4 md:px-12 lg:px-24 py-12 space-y-16">
      <HeroSection />
      <WhatYoullLearn />
      <Prerequisites />
      <AnimationPreviews />
      <AboutCreator />
    </main>
  );
}
