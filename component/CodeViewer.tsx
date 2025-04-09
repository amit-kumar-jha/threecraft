"use client";

import { usePathname } from "next/navigation";
// import { useState } from "react";
import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";
import { codeMap } from "./data/AnimationsData";

export const CodeViewer = () => {
  const pathname = usePathname();
  const slug = pathname.split("/").pop() || "";
  const code = codeMap[slug] || "// No code available for this animation";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch {
      toast.error("Failed to copy!");
    }
  };

  return (
    <div className="relative h-full max-h-[500px] overflow-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-900 rounded-lg bg-zinc-800 text-white p-4 text-sm whitespace-pre-wrap">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 text-zinc-300 hover:text-white bg-zinc-700 hover:bg-zinc-600 rounded-md p-2 transition"
        aria-label="Copy code"
      >
        <FiCopy />
      </button>

      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};
