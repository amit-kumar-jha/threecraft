"use client";

import { usePathname } from "next/navigation";
// import { useState } from "react";
import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";
// import { codeMap } from "./data/AnimationsData";
import { useEffect, useState } from "react";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const CodeViewer = () => {
  const pathname = usePathname();
  const slug = pathname.split("/").pop() || "";

  const [animaData, setAnimaData] = useState<DocumentData | null>(null);

  const fetchAnimaData = async () => {
    console.log("Function called ✅");

    try {
      const docRef = doc(db, "AnimationsData", "anima");
      const docSnap = await getDoc(docRef);

      console.log("docSnap received:", docSnap);

      if (docSnap.exists()) {
        console.log("Data:", docSnap.data());
        return docSnap.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching anima data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchAnimaData();
      setAnimaData(data);
    };

    fetch();
  }, []);

  console.log(animaData);

  const code = animaData?.[slug] || "Loading...";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch {
      toast.error("Failed to copy!");
    }
  };

  return (
    <div className="relative h-150 overflow-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-900 rounded-lg bg-zinc-800 text-white p-4 text-sm whitespace-pre-wrap">
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
