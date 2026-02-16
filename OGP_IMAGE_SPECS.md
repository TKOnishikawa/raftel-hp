# OGP画像作成仕様書

Phase D-4 で全8ページにOGPメタタグを追加済み。
以下の3つの画像を作成し、`images/`フォルダに配置してください。

---

## 必要な画像ファイル

### 1. `og-home.jpg` (Home用)
- **使用ページ**: `index.html`
- **配置先**: `C:\dev\personal\raftel-hp\images\og-home.jpg`
- **URL**: `https://raftel.co.jp/images/og-home.jpg`

**デザイン内容**:
- RAFTELロゴ
- タグライン: **「想いを、仕組みに。」**
- サブコピー: 「コーチング×コンサル×エンジニアリングの三刀流」

---

### 2. `og-service.jpg` (Service用)
- **使用ページ**:
  - `service/growth-partner.html`
  - `service/index.html`
  - `service/quick-launch.html`
- **配置先**: `C:\dev\personal\raftel-hp\images\og-service.jpg`
- **URL**: `https://raftel.co.jp/images/og-service.jpg`

**デザイン内容**:
- サービス提供のビジュアル表現
- テキスト: 「Growth Partner / Quick Launch」
- サブコピー: 「HP・SNS・集客導線を3ヶ月で構築」

---

### 3. `og-content.jpg` (Content/ナレッジ用)
- **使用ページ**:
  - `content/index.html`
  - `content/ai-hp-guide.html`
  - `content/ai-sns-strategy.html`
  - `content/sns-account-design.html`
- **配置先**: `C:\dev\personal\raftel-hp\images\og-content.jpg`
- **URL**: `https://raftel.co.jp/images/og-content.jpg`

**デザイン内容**:
- ナレッジ/コンテンツ共有のビジュアル
- テキスト: 「Content / Knowledge」
- サブコピー: 「AI活用・データドリブン経営・DX実践ナレッジ」

---

## 共通仕様

### サイズ
- **寸法**: 1200 × 630 px (1.91:1 アスペクト比)
- **フォーマット**: JPG
- **ファイルサイズ**: <300KB/画像
- **セーフゾーン**: テキスト/ロゴを 1200×600px 内に配置（エッジクロップ回避）

### ブランドカラー
- **Accent**: `#d4782f` (オレンジ)
- **Background**: `#f6f3ee` (ベージュ)
- **Text**: `#1a1a24` (ダークグレー)

### フォント
- **英語見出し**: Sora (Bold/ExtraBold)
- **日本語**: Noto Sans JP (Medium/Bold)

---

## 作成方法

### Option A: Canva (推奨)
1. Canva で新規デザイン → カスタムサイズ 1200×630px
2. RAFTELブランドカラーを使用
3. テンプレート: "Facebook Post" または "Twitter Header" を参考
4. JPG形式でダウンロード（品質: 高）

### Option B: Figma
1. 新規フレーム 1200×630px作成
2. ブランドカラー・フォント適用
3. Export → JPG (2x quality)

### Option C: Photoshop
1. 新規ドキュメント 1200×630px、72dpi
2. デザイン作成
3. "Web用に保存" → JPG、品質80-90

---

## 検証方法

### OGPタグバリデーション
1. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - テストURL: `https://raftel.co.jp/`
   - 画像が正しく表示されるか確認

2. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - テストURL: `https://raftel.co.jp/`
   - "Summary Card with Large Image" として表示確認

3. **Slack/Discord**
   - URLをペーストして画像プレビュー確認

---

## 現在の状態

| ファイル | 作成状態 | OGPタグ | 使用ページ |
|---------|---------|---------|-----------|
| `og-home.jpg` | ⏳ 未作成 | ✅ 設定済み | index.html (1ページ) |
| `og-service.jpg` | ⏳ 未作成 | ✅ 設定済み | service/*.html (3ページ) |
| `og-content.jpg` | ⏳ 未作成 | ✅ 設定済み | content/*.html (4ページ) |

**メタタグは全8ページに設定済み** ✅
**画像ファイルは未作成** ⏳

---

## 作成後の配置手順

```bash
# 1. 画像を images/ フォルダに配置
cp og-home.jpg C:\dev\personal\raftel-hp\images\
cp og-service.jpg C:\dev\personal\raftel-hp\images\
cp og-content.jpg C:\dev\personal\raftel-hp\images\

# 2. Gitにコミット
cd C:\dev\personal\raftel-hp
git add images/og-*.jpg
git commit -m "feat: Add OGP images for social media sharing

- og-home.jpg: Home page OGP image
- og-service.jpg: Service pages OGP image
- og-content.jpg: Content pages OGP image

1200x630px, optimized JPG format"

# 3. プッシュ
git push origin main
```

---

## 完了チェックリスト

- [ ] og-home.jpg 作成 (1200×630px, <300KB)
- [ ] og-service.jpg 作成 (1200×630px, <300KB)
- [ ] og-content.jpg 作成 (1200×630px, <300KB)
- [ ] images/ フォルダに配置
- [ ] Facebook Debugger で検証
- [ ] Twitter Card Validator で検証
- [ ] Slack/Discord でプレビュー確認
- [ ] Git commit & push

---

**作成日**: 2026-02-16
**Phase**: D-4 (og:image メタタグ)
**優先度**: MEDIUM（メタタグは設定済み、画像は後から追加可能）
