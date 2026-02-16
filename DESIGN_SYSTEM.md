# RAFTEL HP デザインシステム

## 目的

このドキュメントは、RAFTEL HPの一貫性を保ち、保守性を向上させるためのデザインシステムガイドです。コンポーネントの共通化、CSS変数の活用、命名規則の統一により、以下を実現します:

- **CSS重複の削減**: 現状20-25%のCSS bloatを解消
- **デザイン一貫性**: ページ間でのスタイル統一
- **保守性向上**: 一箇所の変更で全体に反映
- **開発効率**: 新規ページ作成時のコピペ削減

---

## 1. CSS変数の拡張

### 1.1 Overlay Gradients

Hero画像やカードの背景オーバーレイを統一:

```css
:root {
  /* Overlay Gradients */
  --overlay-light: linear-gradient(180deg, rgba(11,11,18,0.2) 0%, rgba(11,11,18,0.6) 100%);
  --overlay-dark: linear-gradient(180deg, rgba(11,11,18,0.3) 0%, rgba(11,11,18,0.7) 100%);
  --overlay-hero: linear-gradient(180deg, rgba(11,11,18,0.1) 0%, rgba(11,11,18,0.5) 100%);
}
```

**適用箇所**: `.hero-overlay`, `.service-card-header-overlay`, `.content-hero-overlay`

**使用例**:
```css
.hero-overlay {
  background: var(--overlay-dark);
}
```

---

### 1.2 Spacing Scale

padding/marginの統一規格:

```css
:root {
  /* Spacing Scale */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;
  --space-2xl: 56px;
  --space-3xl: 80px;

  /* Section Spacing */
  --section-padding-y: 120px;
  --section-padding-y-mobile: 60px;
}
```

**使用例**:
```css
.section {
  padding: var(--section-padding-y) 0;
}

@media (max-width: 768px) {
  .section {
    padding: var(--section-padding-y-mobile) 0;
  }
}
```

---

### 1.3 Breakpoints

レスポンシブデザインの基準値:

```css
:root {
  /* Breakpoints */
  --bp-mobile: 768px;
  --bp-tablet: 1024px;
  --bp-desktop: 1440px;
}
```

**使用例**:
```css
@media (max-width: 768px) { /* var(--bp-mobile) */ }
```

---

## 2. Component統一命名規則

### 2.1 Card Components

**Base**: `.card` + variant modifier

| Component | Class名 | 用途 |
|-----------|---------|------|
| Problem Card | `.card--problem` | 課題提示カード |
| Service Card | `.card--service` | サービス紹介カード |
| Content Card | `.card--content` | コンテンツ一覧カード |
| Stats Card | `.card--stats` | 実績数値カード |

**構造例**:
```html
<div class="card card--service">
  <div class="card__header">...</div>
  <div class="card__body">...</div>
  <div class="card__footer">...</div>
</div>
```

**CSS設計**:
```css
/* Base */
.card {
  background: var(--surface);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.1);
}

/* Variants */
.card--service {
  cursor: pointer;
}

.card--problem {
  border: 1px solid var(--border);
}
```

---

### 2.2 Button Components

**Base**: `.btn` + variant

| Component | Class名 | 用途 |
|-----------|---------|------|
| Primary Button | `.btn--primary` | メインCTA |
| Secondary Button | `.btn--secondary` | サブCTA |
| CTA Link | `.btn--cta` | 詳細リンク（矢印付き） |

**構造例**:
```html
<a href="#" class="btn btn--primary">お問い合わせ</a>
<span class="btn btn--cta">
  詳しく見る
  <svg>...</svg>
</span>
```

**CSS設計**:
```css
/* Base */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-family: var(--font-head);
  font-weight: 700;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

/* Variants */
.btn--primary {
  background: var(--accent);
  color: #fff;
}

.btn--primary:hover {
  background: var(--accent-dark);
}

.btn--cta {
  background: transparent;
  color: var(--accent);
  padding: 0;
}

.btn--cta:hover svg {
  transform: translateX(4px);
}
```

---

### 2.3 Grid Components

**Base**: `.grid` + column pattern

| Pattern | Class名 | レイアウト |
|---------|---------|-----------|
| 3列→1列 | `.grid-3-1` | Desktop 3列、Mobile 1列 |
| 2列→1列 | `.grid-2-1` | Desktop 2列、Mobile 1列 |
| 4列→2列→1列 | `.grid-4-2-1` | Desktop 4列、Tablet 2列、Mobile 1列 |

**CSS設計**:
```css
.grid-3-1 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

@media (max-width: 768px) {
  .grid-3-1 {
    grid-template-columns: 1fr;
  }
}
```

---

## 3. 共通コンポーネントライブラリ

### 3.1 ファイル構成案

```
raftel-hp/
├── css/
│   ├── _variables.css      # CSS変数定義
│   ├── _components.css     # 共通コンポーネント
│   ├── _utilities.css      # ユーティリティクラス
│   └── _page-templates.css # ページ別テンプレート
├── index.html
├── service/
│   ├── growth-sprint.html
│   └── quick-launch.html
└── content/
    └── *.html
```

---

### 3.2 `_components.css` の内容

```css
/* ========================================
   Card Components
   ======================================== */
.card {
  background: var(--surface);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.1);
}

.card__header {
  position: relative;
  padding: var(--space-xl);
}

.card__body {
  padding: var(--space-xl);
}

.card__footer {
  padding: var(--space-lg) var(--space-xl);
  border-top: 1px solid var(--border);
}

/* ========================================
   Button Components
   ======================================== */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-family: var(--font-head);
  font-weight: 700;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn--primary {
  background: var(--accent);
  color: #fff;
}

.btn--primary:hover {
  background: var(--accent-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(212, 120, 47, 0.3);
}

.btn--cta {
  background: transparent;
  color: var(--accent);
  padding: 0;
  font-size: 0.95rem;
}

.btn--cta:hover svg {
  transform: translateX(4px);
}

/* ========================================
   Grid Layouts
   ======================================== */
.grid-3-1 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

@media (max-width: 768px) {
  .grid-3-1 {
    grid-template-columns: 1fr;
  }
}

.grid-2-1 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
}

@media (max-width: 768px) {
  .grid-2-1 {
    grid-template-columns: 1fr;
  }
}
```

---

### 3.3 `_utilities.css` の内容

```css
/* ========================================
   Spacing Utilities
   ======================================== */
.mt-xs { margin-top: var(--space-xs); }
.mt-sm { margin-top: var(--space-sm); }
.mt-md { margin-top: var(--space-md); }
.mt-lg { margin-top: var(--space-lg); }
.mt-xl { margin-top: var(--space-xl); }

.mb-xs { margin-bottom: var(--space-xs); }
.mb-sm { margin-bottom: var(--space-sm); }
.mb-md { margin-bottom: var(--space-md); }
.mb-lg { margin-bottom: var(--space-lg); }
.mb-xl { margin-bottom: var(--space-xl); }

.p-xs { padding: var(--space-xs); }
.p-sm { padding: var(--space-sm); }
.p-md { padding: var(--space-md); }
.p-lg { padding: var(--space-lg); }
.p-xl { padding: var(--space-xl); }

/* ========================================
   Text Utilities
   ======================================== */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.text-accent { color: var(--accent); }
.text-muted { color: var(--text-muted); }
.text-secondary { color: var(--text-secondary); }

/* ========================================
   Reveal Animations
   ======================================== */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
```

---

## 4. 移行ガイドライン

### 4.1 段階的適用の推奨順序

1. **Phase 1**: CSS変数の追加（既存CSSと共存）
2. **Phase 2**: 新規ページで共通コンポーネントを試験導入
3. **Phase 3**: 既存ページを段階的にリファクタリング
4. **Phase 4**: 重複CSS削除・クリーンアップ

### 4.2 適用チェックリスト

- [ ] `_variables.css` を作成
- [ ] `_components.css` を作成
- [ ] `_utilities.css` を作成
- [ ] 新規ページで動作確認
- [ ] `index.html` にリンク追加
- [ ] モバイル表示確認
- [ ] 既存ページを1つずつ移行
- [ ] 重複CSS削除

---

## 5. 重要な注意事項

### 5.1 後方互換性

- CSS変数の追加は既存スタイルと共存する
- 既存ページは段階的に移行（一括変更しない）
- 各変更後にデザイン崩れがないか確認

### 5.2 命名規則の厳守

- BEM風の命名（Block__Element--Modifier）を推奨
- クラス名は英語（日本語はNG）
- 省略形は避け、意味が明確な名前を使用

### 5.3 パフォーマンス

- CSS変数はパフォーマンスに影響しない（むしろ改善）
- 共通化によりファイルサイズが削減される
- CSSキャッシュ効率が向上

---

## 6. 今後の改善項目

- [ ] **Dark Mode対応**: CSS変数でライト/ダークの切り替え
- [ ] **アニメーションライブラリ**: scroll reveal, hover effectsの統一
- [ ] **フォームコンポーネント**: input, textarea, selectの共通化
- [ ] **アイコンシステム**: SVGスプライト or icon fontの検討
- [ ] **タイポグラフィスケール**: heading/body textのサイズ体系化

---

## 参考資料

- [BEM Methodology](http://getbem.com/)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [CUBE CSS](https://cube.fyi/)
