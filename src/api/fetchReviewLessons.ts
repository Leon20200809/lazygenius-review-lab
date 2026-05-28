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
  "https://lazygenius.dev/wp-json/wp/v2/review_lessons?per_page=30&orderby=date&order=asc";

import type { WpReviewLesson } from "../types/lesson";

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
