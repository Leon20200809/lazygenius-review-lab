// App.tsx

import { useEffect, useState } from "react";
import {
  fetchReviewLessons,
  type WpReviewLesson
} from "./api/fetchReviewLessons";

function App() {
  const [lessons, setLessons] = useState<WpReviewLesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadReviewLessons() {
      try {
        const jsonData = await fetchReviewLessons();

        console.log(JSON.stringify(jsonData, null, 2));

        setLessons(jsonData);
      } catch (error) {
        console.error(error);
        setErrorMessage("復習ノート記事の取得に失敗しました");
      } finally {
        setIsLoading(false);
      }
    }

    loadReviewLessons();
  }, []);

  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-100">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold">LazyGenius Review Lab</h1>

        <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm">
          {JSON.stringify(lessons, null, 2)}
        </pre>
      </div>
    </main>
  );
}

export default App;
