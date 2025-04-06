"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

type Props = {
  animation: {
    title: string;
    slug: string;
    description: string;
    preview: string | StaticImageData;
  };
};

export const AnimationCard = ({ animation }: Props) => {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onClick={() => router.push(`/animations/${animation.slug}`)}
      className="cursor-pointer rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 transition"
    >
      <Image
        src={animation.preview}
        alt={animation.title}
        width={400}
        height={250}
        className="w-full object-cover h-80"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-1">{animation.title}</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {animation.description}
        </p>
      </div>
    </motion.div>
  );
};
