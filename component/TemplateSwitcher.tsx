"use client";

import { useRouter, usePathname } from "next/navigation";

const templates = [
  "galaxy",
  "cube",
  "waves",
  "sphere",
  "morphingBlobScene",
  "developerWorkspace",
  "mysticOrbitals",
  "orbitPulse",
  "cardVerse",
  "bot",
  "holoCore",
  "neuralNetworkPulse",
  "timeVortex",
];

export const TemplateSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const current = pathname.split("/").pop();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/animations/${e.target.value}`);
  };

  return (
    <div className="flex justify-end mb-4">
      <select
        value={current}
        onChange={handleChange}
        className="p-2 rounded-md border dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm"
      >
        {templates.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};
