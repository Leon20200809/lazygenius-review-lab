/**
 * WordPress REST API から復習ノート記事一覧を取得する
 *
 * 目的：
 * - カスタム投稿タイプ review_lessons の記事データを取得する
 * - React側では、この生データを整形担当に渡す
 *
 * 注意：
 * - この関数は「取得担当」
 * - title.rendered などの整形はここではやらない
 * - API URLは公開記事取得用なので、ブラウザから見えても問題ない
 */

const REVIEW_LESSONS_API_URL =
  "https://lazygenius.dev/wp-json/wp/v2/review_lessons?per_page=20&orderby=date&order=asc";

/**
 * WordPress REST API が返す review_lessons の生データ型
 *
 * MVPなので、まず使う項目だけ定義する。
 * 必要になったら featured_media / lesson_chapter / lesson_tag などを追加する。
 */
export type WpReviewLesson = {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
};

/**
 * 復習ノート記事一覧を取得する
 *
 * @returns WordPress REST APIから取得した review_lessons の生データ配列
 * @throws API取得に失敗した場合は Error を投げる
 *
 * @example
 * const lessons = await fetchReviewLessons();
 */
export async function fetchReviewLessons(): Promise<WpReviewLesson[]> {
  const response = await fetch(REVIEW_LESSONS_API_URL);

  if (!response.ok) {
    throw new Error("復習ノート記事の取得に失敗しました");
  }

  return await response.json();
}
