"use client";

import { motion } from "framer-motion";
import { FaNpm, FaClipboard, FaCheck } from "react-icons/fa";
import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const packages = [
  { name: "three", description: "Core Three.js library for 3D rendering" },
  { name: "@react-three/fiber", description: "React renderer for Three.js" },
  { name: "@react-three/drei", description: "Helper components for R3F" },
  { name: "framer-motion", description: "Animation library for React" },
  { name: "react-simple-typewriter", description: "Typing animation library" },
  { name: "tailwindcss", description: "Utility-first CSS framework" },
];

const installCommand = `npm install three @react-three/fiber @react-three/drei framer-motion react-simple-typewriter tailwindcss`;

const Prerequisites = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 text-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Prerequisites
        </motion.h2>
        <motion.p
          className="text-zinc-400 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Make sure you have these NPM packages installed to build animations
          with Three.js in your Next.js or React project:
        </motion.p>

        {/* Animated Terminal Command */}
        <motion.div
          className="bg-zinc-800 rounded-lg p-4 text-left font-mono text-sm relative mb-10 overflow-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="text-green-400">$ </span>
          <span className="text-zinc-100">
            <Typewriter
              words={[installCommand]}
              cursor
              typeSpeed={30}
              delaySpeed={1500}
            />
          </span>
          <button
            onClick={handleCopy}
            className="absolute top-4 right-2 bg-zinc-700 hover:bg-indigo-600 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1 transition"
          >
            {copied ? (
              <>
                <FaCheck className="text-green-400" />
                Copied
              </>
            ) : (
              <>
                <FaClipboard />
                Copy
              </>
            )}
          </button>
        </motion.div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              className="bg-zinc-800 p-4 rounded-lg shadow-md flex items-start gap-4 transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FaNpm className="text-red-500 text-2xl mt-1" />
              <div>
                <h3 className="text-lg font-semibold">{pkg.name}</h3>
                <p className="text-sm text-zinc-300">{pkg.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Prerequisites;
