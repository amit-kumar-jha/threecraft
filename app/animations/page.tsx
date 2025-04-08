"use client";

import { AnimationCard } from "@/component/AnimationCard";
import {
  CUBE,
  DEVELOPERWORKSPACE,
  GALAXY,
  MORPHINGBLOBSCENE,
  MYSTICORBITALS,
  SPHERE,
  WAVES,
} from "@/public";
import { motion } from "framer-motion";

const animations = [
  {
    title: "Galaxy Particles",
    slug: "galaxy",
    description: "A mesmerizing particles animation",
    preview: GALAXY,
  },
  {
    title: "3D Cube",
    slug: "cube",
    description: "A rotating cube in Three.js",
    preview: CUBE,
  },
  {
    title: "Waves",
    slug: "waves",
    description: "Animated ocean waves",
    preview: WAVES,
  },
  {
    title: "Bouncing Sphere",
    slug: "sphere",
    description: "Animated bouncing sphere motion",
    preview: SPHERE,
  },

  {
    title: "MorphingBlob",
    slug: "morphingBlobScene",
    description: "Animated morphingBlob motion",
    preview: MORPHINGBLOBSCENE,
  },

  {
    title: "DeveloperWorkspace",
    slug: "developerWorkspace",
    description: "Animated developerWorkspace motion",
    preview: DEVELOPERWORKSPACE,
  },
  {
    title: "MysticOrbitals",
    slug: "mysticOrbitals",
    description: "Animated MysticOrbitals motion",
    preview: MYSTICORBITALS,
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-6 pb-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        🎨 Animations
      </motion.h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {animations.map((anim) => (
          <AnimationCard key={anim.slug} animation={anim} />
        ))}
      </div>
    </main>
  );
}
