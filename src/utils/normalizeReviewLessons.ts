import type { ReviewLesson, WpReviewLesson } from "../types/lesson";

/**
 * WordPress REST API の生データ1件を、React表示用データに変換する
 *
 * 目的：
 * - title.rendered を title にする
 * - content.rendered を contentHtml にする
 * - 表示担当がWordPress特有の深い構造を意識しなくて済むようにする
 *
 * @param wpLesson WordPress REST API から取得した review_lessons 1件分の生データ
 * @returns React表示用に整形した復習ノート記事データ
 */
export function normalizeReviewLesson( wpLesson: WpReviewLesson): ReviewLesson {
  return {
    id: wpLesson.id,
    date: wpLesson.date,
    slug: wpLesson.slug,
    link: wpLesson.link,
    title: wpLesson.title.rendered,
    contentHtml: wpLesson.content.rendered,
  };
}

/**
 * WordPress REST API の生データ配列を、React表示用データ配列に変換する
 *
 * 目的：
 * - fetchReviewLessons() で取得した WpReviewLesson[] を
 *   コンポーネントで扱いやすい ReviewLesson[] に変換する
 *
 * @param wpLessons WordPress REST API から取得した review_lessons の生データ配列
 * @returns React表示用に整形した復習ノート記事データ配列
 */
export function normalizeReviewLessons( wpLessons: WpReviewLesson[] ): ReviewLesson[] {
  return wpLessons.map((wpLesson) => normalizeReviewLesson(wpLesson));
}