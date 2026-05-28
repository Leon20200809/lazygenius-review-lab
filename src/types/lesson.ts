/**
 * WordPress REST API が返す review_lessons の生データ型
 *
 * 目的：
 * - APIから取得した直後の形を表す
 * - title.rendered / content.rendered のようなWordPress特有の構造をそのまま持つ
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
 * React表示用に整形した復習ノート記事型
 *
 * 目的：
 * - コンポーネント側で扱いやすい形にする
 * - WordPress特有の title.rendered / content.rendered を隠す
 * - 表示担当がシンプルに使えるようにする
 */
export type ReviewLesson = {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: string;
  contentHtml: string;
};