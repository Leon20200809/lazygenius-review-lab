// App.tsx

import { useEffect, useState } from "react";
import { fetchReviewLessons } from "./api/fetchReviewLessons";
import { normalizeReviewLessons } from "./utils/normalizeReviewLessons";
import type { ReviewLesson } from "./types/lesson";
import LessonSidebar from "./components/LessonSidebar";

export default function App() {
  const [lessons, setLessons] = useState<ReviewLesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<ReviewLesson | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadReviewLessons() {
      try {
        const wpLessons = await fetchReviewLessons();
        const normalizedLessons = normalizeReviewLessons(wpLessons);

        console.log(JSON.stringify(normalizedLessons, null, 2));

        setLessons(normalizedLessons);
        setSelectedLesson(normalizedLessons[0] ?? null);
      } catch (error) {
        console.error(error);
        setErrorMessage("復習ノート記事の取得に失敗しました");
      } finally {
        setIsLoading(false);
      }
    }

    loadReviewLessons();
  }, []);

  function handleSelectLesson(lesson: ReviewLesson) {
    setSelectedLesson(lesson);
  }

  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
          <p className="mb-2 text-xs font-bold tracking-[0.25em] text-amber-400 uppercase">
            WordPress REST API × React
          </p>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            LazyGenius Review Lab
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">
            WordPressの復習ノート記事をReactで再表示する学習ビュー。
            記事一覧から選ぶと、表示内容が切り替わります。
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* スマホ用：折りたたみ記事一覧 */}
          <details className="lg:hidden">
            <summary className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm font-bold tracking-[0.2em] text-amber-400 uppercase">
              記事一覧を開く
            </summary>

            <div className="mt-4 max-h-[60vh] overflow-y-auto pr-1">
              <LessonSidebar
                lessons={lessons}
                onSelectLesson={handleSelectLesson}
              />
            </div>
          </details>

          {/* PC用：左固定目次 */}
          <div className="hidden lg:block lg:sticky lg:top-6 lg:self-start">
            <LessonSidebar
              lessons={lessons}
              onSelectLesson={handleSelectLesson}
            />
          </div>

          {/* 右ペイン */}
          <section className="min-h-[420px] rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6">
            <p className="mb-3 text-xs font-bold tracking-[0.25em] text-amber-400 uppercase">
              Selected Lesson
            </p>

            {selectedLesson ? (
              <h2 className="text-xl font-bold leading-relaxed sm:text-2xl">
                {selectedLesson.title}
              </h2>
            ) : (
              <p className="text-slate-400">記事が選択されていません。</p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
