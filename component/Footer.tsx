"use client";

import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full px-6 py-3 bg-zinc-950 border-t border-zinc-800 text-sm text-center text-zinc-400"
    >
      <p>
        &copy; {new Date().getFullYear()} Three.js Showcase. Built with ❤️ by
        You.
      </p>
    </motion.footer>
  );
};
