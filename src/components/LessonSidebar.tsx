import type { ReviewLesson } from "../types/lesson";

type LessonSidebarProps = {
  lessons: ReviewLesson[];
  selectedLessonId: number | null;
  onSelectLesson: (lesson: ReviewLesson) => void;
};

export default function LessonSidebar({ lessons, selectedLessonId, onSelectLesson }: LessonSidebarProps) {

  return (
    <aside className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
      <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-amber-400 uppercase">
        Lessons
      </h2>

      <nav aria-label="復習ノート記事一覧">
        <ul className="space-y-2">
          {lessons.map((lesson) => {
            const isSelected = lesson.id === selectedLessonId;

            return (
              <li key={lesson.id}>
                <button
                  type="button"
                  onClick={() => onSelectLesson(lesson)}
                  aria-current={isSelected ? "page" : undefined}
                  className={[
                    "w-full rounded-xl border px-4 py-3 text-left text-sm leading-relaxed transition cursor-pointer",
                    isSelected
                      ? "border-amber-400 bg-amber-400/10 text-amber-100 shadow-[0_0_0_1px_rgba(251,191,36,0.25)]"
                      : "border-slate-800 bg-slate-950/70 text-slate-200 hover:border-amber-400 hover:bg-slate-800 hover:text-amber-200",
                  ].join(" ")}
                >
                  {lesson.title}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}