"use client";

import React from "react";
import { motion } from "framer-motion";
import { CUBE, GALAXY, SPHERE, WAVES } from "@/public";
import Link from "next/link";
import Image from "next/image";

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
];

function AnimationPreviews() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="relative mb-8">
        {/* Centered heading */}
        <h2 className="text-2xl font-semibold text-center">
          Explore Animations
        </h2>

        {/* Right-aligned "View more" */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/animations"
            className="text-indigo-600 dark:text-indigo-400 font-medium underline-offset-4 hover:underline transition"
          >
            <span className="hidden md:inline">View more</span>
            <span>→</span>
          </Link>
        </motion.div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {animations.map((animation) => (
          <motion.div
            key={animation.slug}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow"
          >
            <Link href={`/animations/${animation.slug}`}>
              <Image
                src={animation.preview}
                alt={animation.title}
                width={400}
                height={250}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{animation.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {animation.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default AnimationPreviews;
