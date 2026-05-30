# lazygenius-review-lab

WordPressのカスタム投稿タイプで管理している復習ブログ記事を、ReactでSPA風に表示する学習ビューです。

WordPress側では記事管理・通常記事ページ・SEO用の個別URLを担当し、React側では記事一覧・記事選択・本文表示・スクロール制御など、読みやすい閲覧体験を担当します。

## 概要

このアプリは、WordPress REST APIから `review_lessons` の記事データを取得し、React上で左ペインの記事一覧と右ペインの記事本文に分けて表示します。

PCでは左右2ペイン構成、スマホでは記事一覧を `details` タグで折りたたむ構成にしています。

WordPressテーマ側では専用テンプレート `page-review-lab.php` にマウント先の `div` を用意し、ViteでビルドしたJS/CSSを読み込んで表示します。

## 主な機能

* WordPress REST API から記事一覧を取得
* カスタム投稿タイプ `review_lessons` の記事を表示
* WordPressの生JSONをReact表示用データへ整形
* 左ペインに記事一覧を表示
* 記事クリックで右ペイン本文を切り替え
* 選択中の記事を強調表示
* PCでは左右ペインを独立スクロール
* 記事選択時に右ペインの先頭へスクロール
* スマホでは `details` タグで記事一覧を折りたたみ
* スマホで記事選択後に記事一覧を閉じる
* WordPress本文HTMLをReact上で表示
* Prism / Highlighting Code Block の再ハイライトに対応
* Vite manifest を使ったWordPress側のビルドファイル読み込みに対応

## 技術構成

* React
* TypeScript
* Vite
* Tailwind CSS
* WordPress REST API
* WordPress カスタム投稿タイプ
* Prism.js
* Highlighting Code Block
* Git / GitHub

## WordPress側の役割

WordPress側では、主に以下を担当します。

```text
記事管理
通常の個別記事ページ
SEO用URL
REST APIによるJSON提供
Reactアプリのマウント先
Viteビルド成果物の読み込み
```

## React側の役割

React側では、主に以下を担当します。

```text
記事データの取得
データ整形
記事一覧表示
選択状態の管理
本文表示
スクロール制御
スマホ用UI制御
コードハイライト再実行
```

## ディレクトリ構成

```text
src/
├─ api/
│  └─ fetchReviewLessons.ts
│
├─ components/
│  ├─ LessonContent.tsx
│  └─ LessonSidebar.tsx
│
├─ types/
│  └─ lesson.ts
│
├─ utils/
│  └─ normalizeReviewLessons.ts
│
├─ App.tsx
├─ index.css
└─ main.tsx
```

## 各ディレクトリの役割

### api/

WordPress REST APIへリクエストを送る処理を担当します。

```text
fetchReviewLessons.ts
→ review_lessons の記事データを取得する
```

### utils/

WordPress REST APIから返ってきた生データを、Reactで扱いやすい形へ変換します。

```text
normalizeReviewLessons.ts
→ title.rendered / content.rendered などを title / contentHtml に整形する
```

### types/

記事データの型定義を管理します。

```text
WpReviewLesson
→ WordPress REST APIの生データ型

ReviewLesson
→ React表示用に整形したデータ型
```

### components/

画面表示用のReactコンポーネントを管理します。

```text
LessonSidebar.tsx
→ 左ペインの記事一覧

LessonContent.tsx
→ 右ペインの記事本文
```

## 設計方針

### 取る・整える・表示する

このアプリでは、処理の責務を以下のように分けています。

```text
api/
→ データを取る

utils/
→ データを整える

components/
→ データを表示する

App.tsx
→ 全体の状態管理と各部品への受け渡し
```

WordPress REST APIの生データをそのまま表示コンポーネントへ渡さず、一度 `ReviewLesson` 型へ整形してから扱います。

これにより、表示担当のコンポーネントがWordPress特有の `title.rendered` や `content.rendered` を意識しなくて済むようにしています。

## Reactコンポーネントの書き方

Reactコンポーネントは、Next.js風に `export default function` で書く方針です。

```tsx
export default function ComponentName() {
  // state

  // ref

  // 変数

  // 処理関数

  // 条件分岐

  return (
    <>
      ...
    </>
  );
}
```

画面を返す `return` は最後に置き、上を準備、下を表示として読みやすくすることを意識しています。

## WordPress組み込み時の注意

このReactアプリは、Vite単体の開発環境だけでなく、WordPressテーマ内へ組み込むことを前提にしています。

そのため、Tailwind CSSのリセットや既存テーマCSSとの衝突に注意が必要です。

今回の構成では、WordPressテーマ側に専用ページテンプレートを用意し、以下のようなマウント先にReactを描画します。

```html
<div id="review-lessons-app"></div>
```

React側の `main.tsx` でも、同じIDを参照して描画します。

## Vite manifest について

Viteでビルドすると、JS/CSSにはハッシュ付きファイル名が付与されます。

```text
index-xxxxx.js
index-yyyyy.css
```

ファイル名を毎回WordPress側に手動で書き換えるのは手間が大きいため、Viteの `manifest.json` を使って、現在のビルド成果物をWordPress側で自動取得する方針にしています。

```text
manifest.json
→ Viteが生成するビルド成果物の住所録
```

WordPress側では `isEntry: true` の項目を探し、対応するJS/CSSを読み込みます。

## コードハイライトについて

WordPress記事本文内のコードブロックには、Highlighting Code Block / Prism.js のHTMLが含まれます。

Reactでは本文HTMLを後から差し込むため、ページ読み込み時のPrism初期化だけではハイライトが反映されない場合があります。

そのため、記事本文の描画後に `window.Prism?.highlightAll()` を実行し、コードハイライトを再適用します。

## 今後の改善案

* コピーボタンの再初期化対応
* 章・タグによる記事フィルター
* 記事検索機能
* 現在表示中の記事に応じたURL同期
* REST APIレスポンスのキャッシュ戦略
* Cloudflare Cache Rulesの検証
* Tailwind CSSとWordPressテーマCSSの共存設計の整理
* ビルド・デプロイ手順の自動化

## 学習メモ

このプロジェクトでは、React単体の実装だけでなく、WordPress本番テーマにReactを組み込む際の実務的な課題も扱っています。

特に以下の点を学習対象としています。

```text
WordPress REST API
Reactでの状態管理
propsによる親子コンポーネント連携
useRefによるDOM参照
Viteビルド
manifest.jsonの利用
WordPress enqueue
Tailwind CSSと既存CSSの衝突
Prism.jsの再実行
```

単なるReact練習ではなく、WordPressをCMSとして活かしながら、一部の閲覧体験をReactで拡張するための実験プロジェクトです。
