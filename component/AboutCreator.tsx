"use client";

import { CREATOR } from "@/public";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import NetworkGraph from "./animations/NetworkGraph";
import { FaImagePortrait } from "react-icons/fa6";

const socialLinks = [
  {
    icon: <FaGithub />,
    url: "https://github.com/amit-kumar-jha",
    label: "GitHub",
  },
  {
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/in/amit-kumar-jha-00405a185/",
    label: "LinkedIn",
  },
  {
    icon: <FaImagePortrait />,
    url: "https://amit-portfolio-six.vercel.app/",
    label: "Portfolio",
  },
];

const AboutCreator = () => {
  const [text] = useTypewriter({
    words: ["Frontend Developer", "Three.js Enthusiast", "Creative Coder"],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <section className="flex flex-col lg:flex-row items-center justify-center px-4 py-16 sm:px-6 lg:px-12 overflow-hidden gap-8">
      {/* Left: 3D Scene */}
      <div className="w-full lg:w-1/3 h-[400px] md:h-[500px] lg:h-[600px] w-">
        {/* <DeveloperWorkspaceScene /> */}
        <NetworkGraph />
      </div>

      {/* Right: Info Panel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full w-60 lg:w-2/3 backdrop-blur-lg bg-white/10 dark:bg-zinc-900/30 border border-zinc-700 rounded-3xl shadow-xl p-8 md:p-10 text-center z-10"
      >
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Image
            src={CREATOR}
            alt="Creator"
            width={120}
            height={120}
            className="rounded-full border-4 border-indigo-500 shadow-lg mx-auto"
          />
        </motion.div>

        {/* Typewriter Heading */}
        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold mt-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hey! I&#39;m a <span className="text-indigo-400">{text}</span>
          <Cursor cursorColor="#a5b4fc" />
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-zinc-300 max-w-xl mx-auto text-base md:text-lg leading-relaxed mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          With over 3 years of experience crafting engaging UIs, 3D web
          animations, and performance-first design systems. This app is my
          playground to share the creative potential of{" "}
          <span className="text-indigo-400">3D graphics</span>,{" "}
          <span className="text-indigo-400">Three.js</span>, and{" "}
          <span className="text-indigo-400">React</span>.
        </motion.p>

        {/* Social Links */}
        <motion.div
          className="flex justify-center space-x-6 text-2xl text-indigo-400 mt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {socialLinks.map(({ icon, url, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hover:text-indigo-500 transition"
            >
              {icon}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutCreator;
