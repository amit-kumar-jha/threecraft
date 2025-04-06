import { CodeViewer } from "@/component/CodeViewer";
import { TemplateSwitcher } from "@/component/TemplateSwitcher";
import { ThreePreview } from "@/component/ThreePreview";

export default function AnimationPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <main className="min-h-screen p-6 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
      <TemplateSwitcher />
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 min-h-150 p-4 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-700">
          <ThreePreview slug={params?.slug} />
        </div>
        <div className="w-full md:w-1/2 p-4 overflow-y-auto">
          <CodeViewer />
        </div>
      </div>
    </main>
  );
}
