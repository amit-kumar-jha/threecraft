"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cursor, useTypewriter } from "react-simple-typewriter";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const HeroSection = () => {
  const [text] = useTypewriter({
    words: ["Three.js Animations", "Creative UI", "3D Interactive Effects"],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="relative overflow-hidden py-20 px-6 bg-white dark:bg-zinc-950 transition-colors duration-500">
      {/* Glowing lights */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-80 h-80 bg-pink-300 dark:bg-[#ff00ff] rounded-full blur-3xl opacity-30 animate-ping-slow top-10 left-[-100px]" />
        <div className="absolute w-80 h-80 bg-cyan-300 dark:bg-[#00ffff] rounded-full blur-3xl opacity-30 animate-ping-slow bottom-10 right-[-100px]" />
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-white transition-colors"
          variants={fadeInUp}
        >
          Explore{" "}
          <span className="text-indigo-500 dark:text-indigo-400">{text}</span>
          <Cursor cursorColor="#a5b4fc" />
        </motion.h1>

        <motion.p
          className="text-lg text-zinc-600 dark:text-zinc-300 transition-colors"
          variants={fadeInUp}
        >
          This app showcases real-time 3D animations with interactive previews
          and source code — all in a clean, intuitive dashboard.
        </motion.p>
      </motion.div>

      {/* Features */}
      <section className="relative z-10 mt-16 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
        {[
          {
            title: "Built with Three.js",
            desc: "Modern 3D rendering in the browser.",
          },
          {
            title: "Source Code Viewer",
            desc: "See how each animation is built.",
          },
          {
            title: "Framer Motion UI",
            desc: "Smooth transitions and page animations.",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-xl shadow hover:shadow-lg transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default HeroSection;
