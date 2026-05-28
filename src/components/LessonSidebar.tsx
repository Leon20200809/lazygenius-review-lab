import type { ReviewLesson } from "../types/lesson";

type LessonSidebarProps = {
  lessons: ReviewLesson[];
  onSelectLesson: (lesson: ReviewLesson) => void;
};

export default function LessonSidebar({ lessons, onSelectLesson }: LessonSidebarProps) {

  return (
    <aside className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
      <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-amber-400 uppercase">
        Lessons
      </h2>

      <nav aria-label="復習ノート記事一覧">
        <ul className="space-y-2">
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <button
                type="button"
                onClick={() => onSelectLesson(lesson)}
                className="cursor-pointer w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-left text-sm leading-relaxed text-slate-200 transition hover:border-amber-400 hover:bg-slate-800 hover:text-amber-200"
              >
                {lesson.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}