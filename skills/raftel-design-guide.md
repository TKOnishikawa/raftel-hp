# RAFTEL HP デザインガイド

## 目的

このガイドは、RAFTEL HPの一貫したビジュアルデザインを維持するためのルールを定義します。

---

## 1. カラーパレット

### 1.1 Primary Colors

| 色名 | 変数名 | カラーコード | 用途 |
|------|--------|------------|------|
| **Accent (オレンジ)** | `--accent` | `#d4782f` | CTA、強調、リンクhover |
| **Accent Dark** | `--accent-dark` | `#b8651f` | Accentのhover状態 |
| **Accent2 (グリーン)** | `--accent2` | `#2d7a3e` | チェックマーク、成功表示 |

**使用ルール**:
- **CTA**: 必ず `--accent` を使用（ボタン、重要リンク）
- **強調**: 太字と組み合わせて使用（`<strong>` + `color: var(--accent)`）
- **Badge**: 背景を `--accent`、テキストを `#fff`

---

### 1.2 Neutral Colors

| 色名 | 変数名 | カラーコード | 用途 |
|------|--------|------------|------|
| **Background (オフホワイト)** | `--bg` | `#f6f3ee` | ページ背景 |
| **Surface (白)** | `--surface` | `#ffffff` | カード、モーダル |
| **Dark Background** | `--bg-dark` | `#0b0b12` | Dark sectionの背景 |
| **Border** | `--border` | `rgba(26,26,36,0.1)` | 区切り線、カード枠 |

---

### 1.3 Text Colors

| 色名 | 変数名 | カラーコード | 用途 |
|------|--------|------------|------|
| **Text (黒)** | `--text` | `#1a1a24` | 本文テキスト |
| **Text Secondary** | `--text-secondary` | `#4a4a5a` | サブテキスト、説明文 |
| **Text Muted** | `--text-muted` | `#8a8a9a` | 補足、Breadcrumb |
| **Text on Dark** | `--text-on-dark` | `#f6f3ee` | Dark背景上のテキスト |

---

## 2. タイポグラフィ

### 2.1 フォントファミリー

```css
:root {
  --font-head: "Noto Sans JP", "Yu Gothic", "Meiryo", sans-serif;
  --font-body: "Noto Sans JP", "Yu Gothic", "Meiryo", sans-serif;
}
```

**使用ルール**:
- **見出し**: `font-family: var(--font-head); font-weight: 700;`
- **本文**: `font-family: var(--font-body); font-weight: 400;`

---

### 2.2 フォントサイズ

#### Desktop

| 要素 | サイズ | line-height | 用途 |
|------|-------|-------------|------|
| **H1** | `clamp(2rem, 4vw, 3rem)` | 1.3 | Hero タイトル |
| **H2** | `clamp(1.5rem, 3vw, 1.8rem)` | 1.4 | Section タイトル |
| **H3** | `clamp(1.25rem, 2.5vw, 1.5rem)` | 1.5 | Subsection タイトル |
| **Body** | `1rem` (16px) | 2 | 本文 |
| **Small** | `0.95rem` | 1.8 | 補足、ラベル |

#### Mobile (≤768px)

| 要素 | サイズ | 変更点 |
|------|-------|--------|
| **H1** | `clamp` 最小値に収束 | 2rem前後 |
| **H2** | `clamp` 最小値に収束 | 1.5rem前後 |
| **Body** | `1rem` (固定) | 視認性向上のため固定 |

---

### 2.3 clamp() の使用基準

**推奨パターン**:
```css
font-size: clamp(最小値, 可変値, 最大値);
```

**例**:
```css
h1 {
  font-size: clamp(2rem, 4vw, 3rem);
}
```

**ルール**:
- **最小値**: モバイルでの最小サイズ（通常1rem〜2rem）
- **可変値**: ビューポート幅の2〜4%
- **最大値**: デスクトップでの最大サイズ

---

## 3. スペーシング

### 3.1 Spacing Scale

```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;
  --space-2xl: 56px;
  --space-3xl: 80px;
}
```

**使用ルール**:
- **要素間**: `--space-lg` (24px) が標準
- **セクション間**: `--space-3xl` (80px) 〜 120px
- **カード内**: `--space-xl` (40px) が標準

---

### 3.2 Section Padding

| Section | Padding (Desktop) | Padding (Mobile) |
|---------|------------------|------------------|
| **Hero** | 80px 24px 120px | 60px 24px 80px |
| **Content** | 120px 0 | 60px 0 |
| **CTA** | 80px 24px | 60px 24px |

**CSS例**:
```css
.section {
  padding: 120px 0;
}

@media (max-width: 768px) {
  .section {
    padding: 60px 0;
  }
}
```

---

## 4. レイアウト

### 4.1 Max-width

| 要素 | Max-width | 用途 |
|------|-----------|------|
| **Container** | 1200px | 標準コンテナ |
| **Article Body** | 860px | 記事本文 |
| **Hero Inner** | 860px | Hero内コンテンツ |

---

### 4.2 Grid レイアウト

**3列グリッド** (Problem Cards, Solution Pillars):
```css
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .grid-3 {
    grid-template-columns: 1fr;
  }
}
```

**2列グリッド** (Stats Cards):
```css
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
}
```

---

## 5. コンポーネントスタイル

### 5.1 Buttons

#### Primary Button

```css
.btn--primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--accent);
  color: #fff;
  font-family: var(--font-head);
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn--primary:hover {
  background: var(--accent-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(212, 120, 47, 0.3);
}
```

#### CTA Link (矢印付き)

```css
.btn--cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--accent);
  font-family: var(--font-head);
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn--cta:hover svg {
  transform: translateX(4px);
}
```

---

### 5.2 Cards

#### Base Card

```css
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
```

#### Service Card (クリッカブル)

```css
a.service-path-card {
  display: block;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

a.service-path-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}
```

---

### 5.3 Badges

```css
.badge {
  display: inline-block;
  padding: 8px 18px;
  background: var(--accent);
  color: #fff;
  font-family: var(--font-head);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 4px;
}
```

**HTML例**:
```html
<span class="badge">For Founders</span>
```

---

## 6. アニメーション

### 6.1 Reveal Animation (Scroll Reveal)

```css
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

**使用ルール**:
- **Section見出し**: `.reveal`
- **カード**: `.reveal .reveal-delay-1`, `.reveal-delay-2` etc.
- **最大遅延**: 0.3s（それ以上は体感が悪い）

---

### 6.2 Hover Effects

| 要素 | Transform | Box-shadow |
|------|-----------|-----------|
| **Card** | `translateY(-4px)` | `0 12px 40px rgba(0,0,0,0.1)` |
| **Button** | `translateY(-2px)` | `0 4px 12px rgba(212,120,47,0.3)` |
| **Arrow Icon** | `translateX(4px)` | なし |

**transition設定**:
```css
transition: all 0.2s ease;  /* Button, Icon */
transition: transform 0.25s ease, box-shadow 0.25s ease;  /* Card */
```

---

## 7. レスポンシブデザイン

### 7.1 Breakpoints

```css
/* Mobile */
@media (max-width: 768px) { ... }

/* Tablet */
@media (max-width: 1024px) { ... }

/* Desktop */
@media (min-width: 1025px) { ... }
```

---

### 7.2 モバイル対応の統一ルール

| 要素 | Desktop | Mobile (≤768px) |
|------|---------|-----------------|
| **FV テキスト配置** | 左寄せ | 中央寄せ |
| **Grid レイアウト** | 3列 | 1列 |
| **Padding** | 80px 0 | 60px 0 |
| **Font Size** | clamp() | 固定 (1rem) |
| **Hero CTA** | 左寄せ | 中央 (margin: 0 auto) |

**CSS例**:
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

## 8. 背景・オーバーレイ

### 8.1 Gradient Overlays

```css
:root {
  --overlay-light: linear-gradient(180deg, rgba(11,11,18,0.2) 0%, rgba(11,11,18,0.6) 100%);
  --overlay-dark: linear-gradient(180deg, rgba(11,11,18,0.3) 0%, rgba(11,11,18,0.7) 100%);
  --overlay-hero: linear-gradient(180deg, rgba(11,11,18,0.1) 0%, rgba(11,11,18,0.5) 100%);
}
```

**使用例**:
```css
.hero-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: var(--overlay-dark);
}
```

---

### 8.2 背景画像

**推奨設定**:
```css
.hero {
  background-image: url('...');
  background-size: cover;
  background-position: center;
  background-color: #1a2030;  /* フォールバック */
}
```

**画像選定基準**:
- **解像度**: 最低1920x1080px
- **アスペクト比**: 16:9 推奨
- **色調**: オーバーレイを考慮した明るめ or 暗めの画像
- **ソース**: Unsplash推奨

---

## 9. アイコン・SVG

### 9.1 SVG Icon設定

```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="..."/>
</svg>
```

**ルール**:
- **stroke="currentColor"**: 親要素の色を継承
- **width/height**: 24px が標準（CTA矢印は14px）
- **stroke-width**: 1.5 が標準

---

### 9.2 よく使うアイコン

| 用途 | アイコン | サイズ |
|------|---------|-------|
| **矢印（右）** | `<path d="M5 12h14M12 5l7 7-7 7"/>` | 14x14 |
| **チェックマーク** | `&#9675;` (HTML Entity) | - |
| **バツ** | `&times;` (HTML Entity) | - |
| **三角** | `&#9651;` (HTML Entity) | - |

---

## 10. デザインチェックリスト

新規ページ・コンポーネント作成時のチェックリスト:

- [ ] カラーはCSS変数（`--accent`, `--text` etc.）を使用しているか
- [ ] フォントサイズは `clamp()` でレスポンシブ対応しているか
- [ ] スペーシングは `--space-*` 変数を使用しているか
- [ ] Buttonは `.btn--primary` or `.btn--cta` を使用しているか
- [ ] Cardは hover時の `transform` と `box-shadow` があるか
- [ ] モバイルでFVが中央寄せになっているか
- [ ] Gridが3列→1列に変化しているか
- [ ] SVGアイコンは `stroke="currentColor"` を使用しているか
- [ ] 背景画像にはオーバーレイがあるか
- [ ] Reveal animationの遅延は0.3s以内か

---

## 参考資料

- DESIGN_SYSTEM.md - コンポーネント共通化ガイド
- PAGE_FORMAT_GUIDE.md - ページフォーマット統一指針
- skills/raftel-writing-guide.md - ライティングルール
