# RAFTEL HP ページフォーマット統一ガイド

## 目的

このドキュメントは、ページカテゴリごとの統一フォーマットを定義し、以下を実現します:

- **デザイン一貫性**: カテゴリ内でのレイアウト・スタイル統一
- **保守性向上**: 同じカテゴリのページは同じテンプレートで管理
- **ユーザー体験の向上**: 予測可能なナビゲーション・レイアウト

---

## ページカテゴリ一覧

| カテゴリ | 対象ページ | 用途 |
|---------|-----------|------|
| **Landing Page** | `index.html` | トップページ（独自デザイン） |
| **Service Pages** | `service/*.html` | サービス紹介・詳細ページ |
| **Content Pages** | `content/*.html` | ブログ・記事コンテンツ |

---

## 1. Service Pages フォーマット

**対象**: `service/growth-sprint.html`, `service/quick-launch.html`, `service/growth-partner.html` (将来追加予定)

### 1.1 必須要素

| 要素 | 仕様 | 実装例 |
|------|------|--------|
| **Breadcrumb** | `RAFTEL > Service > [Page Name]` | `<nav class="breadcrumb">...</nav>` |
| **FV (First View)** | 画像背景 + オーバーレイ + 中央寄せタイトル | `.article-hero` |
| **Problem Section** | 3列グリッド → モバイル1列 | `.problem-cards` |
| **Solution Section** | 3列グリッド → モバイル1列 | `.solution-pillars` |
| **RTB (Reason to Believe)** | 実績・比較表 | `.rtb-table` |
| **CTA Section** | 価格 + 説明 + ボタン | `.article-cta` |
| **Footer** | 共通フッター | `<footer>` |

### 1.2 レイアウト仕様

```css
/* Max-width */
.container {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 24px;
}

/* FV Hero */
.article-hero {
  position: relative;
  padding: 80px 24px 120px;
  background-size: cover;
  background-position: center;
}

.article-hero-inner {
  max-width: 860px;
  margin: 0 auto;
}

/* モバイル: 中央寄せ */
@media (max-width: 768px) {
  .article-hero-inner {
    text-align: center;
  }

  .article-tag::before {
    display: none; /* 左線を非表示 */
  }

  .hero-cta {
    margin-left: auto;
    margin-right: auto;
  }
}
```

### 1.3 Problem/Solution Grid

```css
.problem-cards,
.solution-pillars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 56px;
}

@media (max-width: 768px) {
  .problem-cards,
  .solution-pillars {
    grid-template-columns: 1fr;
  }
}
```

### 1.4 CTA Section

**固定フォーマット**: 価格 + 説明 + ボタン

```html
<section class="article-cta">
  <div class="cta-inner">
    <p class="cta-price">&yen;200,000/月 &times; 3ヶ月</p>
    <h3 class="cta-title">想いを、仕組みに。3ヶ月で事業の土台を整える。</h3>
    <a href="#contact" class="btn btn--primary">お問い合わせ</a>
  </div>
</section>
```

---

## 2. Content Pages フォーマット

**対象**: `content/*.html` (ブログ記事・ガイド類)

### 2.1 必須要素

| 要素 | 仕様 | 実装例 |
|------|------|--------|
| **Breadcrumb** | `RAFTEL > Content > [Category] > [Title]` | `<nav class="breadcrumb">...</nav>` |
| **FV (First View)** | 画像背景 + タイトル + タグ | `.content-hero` |
| **Article Body** | 読みやすいタイポグラフィ | `.article-body` |
| **Related Articles CTA** | 関連サービスへの誘導 | `.related-cta` |
| **Footer** | 共通フッター | `<footer>` |

### 2.2 レイアウト仕様

```css
/* Max-width */
.article-body {
  max-width: 860px;
  margin: 0 auto;
  padding: 80px 24px 120px;
}

/* FV Hero */
.content-hero {
  position: relative;
  padding: 80px 24px 120px;
  background-size: cover;
  background-position: center;
}

/* モバイル: 中央寄せ */
@media (max-width: 768px) {
  .content-hero-inner {
    text-align: center;
  }
}
```

### 2.3 タイポグラフィ

```css
.article-body h2 {
  font-family: var(--font-head);
  font-size: clamp(1.5rem, 3vw, 1.8rem);
  margin-top: 80px;
  margin-bottom: 24px;
  border-left: 4px solid var(--accent);
  padding-left: 16px;
}

.article-body h3 {
  font-family: var(--font-head);
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  margin-top: 56px;
  margin-bottom: 20px;
}

.article-body p {
  font-size: 1rem;
  line-height: 2;
  margin-bottom: 24px;
}

.article-body ul,
.article-body ol {
  margin-left: 24px;
  margin-bottom: 24px;
}

.article-body li {
  margin-bottom: 12px;
  line-height: 1.9;
}
```

### 2.4 記事末尾CTA

**固定フォーマット**: サービスへの誘導

```html
<section class="related-cta">
  <div class="related-cta-inner">
    <h3>このガイドを実装したい方へ</h3>
    <p>RAFTELでは、HP制作からSNS構築、集客導線まで一気通貫でサポートしています。</p>
    <a href="../service/growth-sprint.html" class="btn btn--primary">Growth Partnerを見る</a>
  </div>
</section>
```

---

## 3. Landing Page (index.html) フォーマット

**対象**: `index.html`のみ

### 3.1 構造

Landing Pageは独自デザインのため、共通テンプレートは適用しません。ただし、以下の要素は統一します:

| 要素 | 仕様 |
|------|------|
| **Service Cards** | カード全体をクリッカブル（`<a>`でラップ） |
| **Profile Section** | 最新の実績・メッセージを反映 |
| **RTB Table** | Service Pagesと同じスタイル |
| **Footer** | 共通フッター |

---

## 4. 共通要素の統一仕様

### 4.1 Breadcrumb

**全ページ共通**:

```html
<nav class="breadcrumb">
  <div class="breadcrumb-inner">
    <a href="../index.html">RAFTEL</a>
    <span class="breadcrumb-separator">/</span>
    <a href="./index.html">Service</a>
    <span class="breadcrumb-separator">/</span>
    <span class="breadcrumb-current">Growth Partner</span>
  </div>
</nav>
```

**CSS**:
```css
.breadcrumb {
  background: var(--bg-light);
  border-bottom: 1px solid var(--border);
  padding: 20px 24px;
}

.breadcrumb-inner {
  max-width: 1200px;
  margin: 0 auto;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.breadcrumb a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb a:hover {
  color: var(--accent);
}

.breadcrumb-separator {
  margin: 0 8px;
}

.breadcrumb-current {
  color: var(--text);
}
```

---

### 4.2 Footer

**全ページ共通** (現在はナビゲーションのみ。将来的に拡張可能):

```html
<footer class="footer">
  <nav class="footer-nav">
    <a href="../index.html">Home</a>
    <a href="./index.html">Service</a>
    <a href="../content/index.html">Content</a>
    <a href="#contact">Contact</a>
  </nav>
  <p class="footer-copy">&copy; 2026 RAFTEL. All rights reserved.</p>
</footer>
```

---

### 4.3 Max-width設定

**全ページ共通**:

| 要素 | Max-width | 用途 |
|------|-----------|------|
| `.container` | 1200px | 標準コンテナ |
| `.article-body` | 860px | 記事本文 |
| `.article-hero-inner` | 860px | Hero内コンテンツ |

---

## 5. 実装方針

### 5.1 `_page-templates.css` の作成

カテゴリ別のテンプレートCSSを一元管理:

```css
/* ========================================
   Service Page Template
   ======================================== */
.service-page .article-hero {
  /* FV仕様 */
}

.service-page .problem-cards {
  /* Problem grid仕様 */
}

/* ========================================
   Content Page Template
   ======================================== */
.content-page .article-body {
  /* Article body仕様 */
}

.content-page .related-cta {
  /* CTA仕様 */
}
```

### 5.2 各ページへの適用

**Service Pageの例**:

```html
<!DOCTYPE html>
<html lang="ja" class="service-page">
<head>
  <link rel="stylesheet" href="../css/_variables.css">
  <link rel="stylesheet" href="../css/_components.css">
  <link rel="stylesheet" href="../css/_page-templates.css">
  <link rel="stylesheet" href="../css/_utilities.css">
</head>
<body>
  <!-- Breadcrumb -->
  <nav class="breadcrumb">...</nav>

  <!-- Hero -->
  <section class="article-hero">...</section>

  <!-- Problem -->
  <section class="content-section">
    <div class="problem-cards">...</div>
  </section>

  <!-- Solution -->
  <section class="content-section">
    <div class="solution-pillars">...</div>
  </section>

  <!-- RTB -->
  <section class="content-section">
    <table class="rtb-table">...</table>
  </section>

  <!-- CTA -->
  <section class="article-cta">...</section>

  <!-- Footer -->
  <footer class="footer">...</footer>
</body>
</html>
```

---

## 6. モバイル対応の統一ルール

### 6.1 全カテゴリ共通

| 要素 | Desktop | Mobile (≤768px) |
|------|---------|-----------------|
| **FV テキスト配置** | 左寄せ | 中央寄せ |
| **Grid レイアウト** | 3列 | 1列 |
| **Padding** | 80px 0 | 60px 0 |
| **Font Size** | clamp(1rem, 2vw, 1.1rem) | 1rem (固定) |

### 6.2 モバイル専用調整

```css
@media (max-width: 768px) {
  /* Hero: 中央寄せ */
  .article-hero-inner {
    text-align: center;
  }

  /* Tag: 左線を非表示 */
  .article-tag::before {
    display: none;
  }

  /* CTA: 中央配置 */
  .hero-cta {
    margin-left: auto;
    margin-right: auto;
  }

  /* Grid: 1列化 */
  .problem-cards,
  .solution-pillars {
    grid-template-columns: 1fr;
  }

  /* Font Size: 視認性向上 */
  .content-section p {
    font-size: 1rem;
    line-height: 2.05;
  }
}
```

---

## 7. 適用チェックリスト

### Service Pageチェックリスト

- [ ] Breadcrumb実装（RAFTEL > Service > [Name]）
- [ ] FV Hero: 画像背景 + オーバーレイ + 中央寄せ（モバイル）
- [ ] Problem Section: 3列グリッド → 1列（モバイル）
- [ ] Solution Section: 3列グリッド → 1列（モバイル）
- [ ] RTB Table: 共通スタイル適用
- [ ] CTA Section: 価格 + 説明 + ボタン
- [ ] Footer: 共通フッター
- [ ] Max-width: 860px
- [ ] モバイル対応: FV中央寄せ、Grid 1列化

### Content Pageチェックリスト

- [ ] Breadcrumb実装（RAFTEL > Content > [Category] > [Title]）
- [ ] FV Hero: 画像背景 + タイトル + タグ
- [ ] Article Body: タイポグラフィ統一
- [ ] Related Articles CTA: サービス誘導
- [ ] Footer: 共通フッター
- [ ] Max-width: 860px
- [ ] モバイル対応: FV中央寄せ

---

## 8. 今後の改善項目

- [ ] **ダークモード対応**: ページテンプレートでのカラー変数切り替え
- [ ] **SEO最適化**: 各カテゴリのメタタグテンプレート
- [ ] **OGP統一**: SNSシェア時の画像・テキストフォーマット
- [ ] **アクセシビリティ**: ARIA属性の統一、キーボードナビゲーション
- [ ] **パフォーマンス**: 画像遅延読み込み、CSS最適化

---

## 参考資料

- DESIGN_SYSTEM.md - コンポーネント共通化ガイド
- skills/raftel-design-guide.md - デザインルール詳細
