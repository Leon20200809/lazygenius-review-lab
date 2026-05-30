import type { ReviewLesson } from "../types/lesson";

type LessonContentProps = {
  selectedLesson: ReviewLesson | null;
};

export default function LessonContent({ selectedLesson }: LessonContentProps) {

  const contentClassName = [
    "max-w-none min-w-0 overflow-hidden space-y-5 leading-8 text-slate-200",

    // links
    "[&_a]:break-words [&_a]:text-amber-300 [&_a]:underline",

    // headings
    "[&_h2]:mt-10 [&_h2]:break-words [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-50",
    "[&_h3]:mt-8 [&_h3]:break-words [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-100",

    // text
    "[&_p]:break-words [&_p]:leading-8",
    "[&_li]:ml-5 [&_li]:list-disc",
    "[&_hr]:my-8 [&_hr]:border-slate-800",

    // media
    "[&_img]:h-auto [&_img]:max-w-full",

    // code
    "[&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-slate-950 [&_pre]:p-4 [&_pre]:text-sm",
    "[&_pre_code]:max-w-full [&_pre_code]:break-words",

    // table
    "[&_.wp-block-table]:max-w-full [&_.wp-block-table]:overflow-x-auto",
    "[&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto",
    "[&_td]:border [&_td]:border-slate-700 [&_td]:p-3",
    "[&_th]:border [&_th]:border-slate-700 [&_th]:bg-slate-800 [&_th]:p-3",
  ].join(" ");

  if (!selectedLesson) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6">
        <p className="text-slate-400">記事が選択されていません。</p>
      </section>
    );
  }

  return (
    <article className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6">
      <header className="mb-6 border-b border-slate-800 pb-5">
        <p className="mb-3 text-xs font-bold tracking-[0.25em] text-amber-400 uppercase">
          Selected Lesson
        </p>

        <h2 className="text-xl font-bold leading-relaxed text-slate-50 sm:text-2xl">
          {selectedLesson.title}
        </h2>

        <a
          href={selectedLesson.link}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex text-sm font-bold text-amber-300 underline-offset-4 hover:text-amber-200 hover:underline"
        >
          通常の記事ページで開く
        </a>
      </header>

      <div
        className={contentClassName}
        dangerouslySetInnerHTML={{ __html: selectedLesson.contentHtml }}
      />
    </article>
  );
}
