"use client";

import React from "react";

const techStack = [
  "Three.js",
  "React",
  "Framer Motion",
  "Tailwind CSS",
  "R3F",
  "TypeScript",
];

const WhatYoullLearn = () => {
  return (
    <section className="py-16 px-4 text-center bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 text-white">
      <h2 className="text-3xl font-bold mb-6">What You&apos;ll Learn</h2>
      <p className="max-w-2xl mx-auto mb-10 text-zinc-300">
        Explore the potential of modern web development by diving into
        animations, 3D scenes, performance optimizations, and creative UI
        design.
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        {techStack.map((tech) => (
          <div
            key={tech}
            className="bg-zinc-800 hover:bg-indigo-500 transition px-6 py-3 rounded-lg shadow text-lg"
          >
            {tech}
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatYoullLearn;
