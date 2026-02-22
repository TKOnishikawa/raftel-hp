/**
 * omoshiku 問い合わせフォーム — Google Apps Script
 *
 * セットアップ手順:
 * 1. Google Sheets「omoshiku 問い合わせ管理」を開く
 *    URL: https://docs.google.com/spreadsheets/d/1QrU2VD4uj80tD7RwNdW3phK3RIvL0jlZrXenGqSQtVg/edit
 * 2. 拡張機能 → Apps Script を開く
 * 3. このコード全体をコピーしてエディタに貼り付け
 * 4. 「デプロイ」→「新しいデプロイ」
 *    - 種類: ウェブアプリ
 *    - 説明: omoshiku contact form
 *    - 次のユーザーとして実行: 自分（nishikawa@omoshiku.jp）
 *    - アクセスできるユーザー: 全員
 * 5. デプロイURLをコピー → main.js の GAS_URL に貼り付け
 *
 * 事前準備:
 * - Gmail設定 → アカウントとインポート → 他のメールアドレスを追加 → info@omoshiku.jp
 *   （これで自動返信を info@omoshiku.jp から送信可能になる）
 */

// ========================================
// Configuration
// ========================================
const CONFIG = {
  ADMIN_EMAIL: 'nishikawa@omoshiku.jp',
  REPLY_FROM: 'info@omoshiku.jp',
  REPLY_FROM_NAME: 'omoshiku',
  SHEETS_URL: 'https://docs.google.com/spreadsheets/d/1QrU2VD4uj80tD7RwNdW3phK3RIvL0jlZrXenGqSQtVg/edit'
};

// ========================================
// Main Handler
// ========================================
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // 1. Sheetsに書き込み
    writeToSheet(data);

    // 2. 管理者通知メール
    sendAdminNotification(data);

    // 3. 自動返信メール
    sendAutoReply(data);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('doPost error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ========================================
// 1. Sheets書き込み
// ========================================
function writeToSheet(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.company || '',
    data.phone || '',
    data.category || '',
    data.message || ''
  ]);
}

// ========================================
// 2. 管理者通知メール
// ========================================
function sendAdminNotification(data) {
  const subject = '【omoshiku】新規お問い合わせ: ' + data.name + '様';

  const htmlBody = [
    '<div style="font-family: sans-serif; color: #333; line-height: 1.8; max-width: 600px;">',
    '<p style="font-size: 15px; font-weight: bold;">新規の問い合わせが入りました。</p>',
    '<table style="width: 100%; border-collapse: collapse; margin: 16px 0;">',
    '<tr><td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; width: 120px; border: 1px solid #ddd;">お名前</td><td style="padding: 8px 12px; border: 1px solid #ddd;">' + escapeHtml(data.name) + '</td></tr>',
    '<tr><td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; border: 1px solid #ddd;">メール</td><td style="padding: 8px 12px; border: 1px solid #ddd;"><a href="mailto:' + escapeHtml(data.email) + '">' + escapeHtml(data.email) + '</a></td></tr>',
    '<tr><td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; border: 1px solid #ddd;">会社名</td><td style="padding: 8px 12px; border: 1px solid #ddd;">' + escapeHtml(data.company || '（未入力）') + '</td></tr>',
    '<tr><td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; border: 1px solid #ddd;">電話番号</td><td style="padding: 8px 12px; border: 1px solid #ddd;">' + escapeHtml(data.phone || '（未入力）') + '</td></tr>',
    '<tr><td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; border: 1px solid #ddd;">カテゴリ</td><td style="padding: 8px 12px; border: 1px solid #ddd;">' + escapeHtml(data.category || '（未選択）') + '</td></tr>',
    '</table>',
    '<div style="background: #f9f9f9; border-left: 4px solid #e8944a; padding: 16px 20px; margin: 16px 0;">',
    '<p style="font-weight: bold; margin: 0 0 8px; color: #e8944a;">ご相談内容</p>',
    '<p style="margin: 0; white-space: pre-wrap;">' + escapeHtml(data.message) + '</p>',
    '</div>',
    '<p style="margin-top: 24px;"><a href="' + CONFIG.SHEETS_URL + '" style="display: inline-block; padding: 10px 24px; background: #e8944a; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold;">スプレッドシートを開く</a></p>',
    '<p style="font-size: 12px; color: #999; margin-top: 24px;">※ このメールは omoshiku.jp の問い合わせフォームから自動送信されています。</p>',
    '</div>'
  ].join('');

  // プレーンテキスト版（フォールバック用）
  const plainBody = [
    '新規の問い合わせが入りました。',
    '',
    'お名前: ' + data.name,
    'メール: ' + data.email,
    '会社名: ' + (data.company || '（未入力）'),
    '電話番号: ' + (data.phone || '（未入力）'),
    'カテゴリ: ' + (data.category || '（未選択）'),
    '',
    '【ご相談内容】',
    data.message,
    '',
    'Sheets: ' + CONFIG.SHEETS_URL
  ].join('\n');

  GmailApp.sendEmail(CONFIG.ADMIN_EMAIL, subject, plainBody, {
    htmlBody: htmlBody
  });
}

// HTMLエスケープ（XSS防止）
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ========================================
// 3. 自動返信メール
// ========================================
function sendAutoReply(data) {
  const subject = '【omoshiku】お問い合わせありがとうございます';

  const body = [
    data.name + ' 様',
    '',
    'omoshiku へのお問い合わせありがとうございます。',
    '以下の内容で承りました。',
    '',
    '━━━━━━━━━━━━━━━━━━',
    'お名前: ' + data.name,
    '会社名: ' + (data.company || '（未入力）'),
    'ご相談カテゴリ: ' + (data.category || '（未選択）'),
    '',
    'ご相談内容:',
    data.message,
    '━━━━━━━━━━━━━━━━━━',
    '',
    '2営業日以内に担当者よりご連絡いたします。',
    'お急ぎの場合は下記までご連絡ください。',
    '',
    '---',
    'omoshiku（オモシク）',
    '代表 西川太雄',
    'Email: nishikawa@omoshiku.jp',
    'Web: https://omoshiku.jp',
    '',
    '※ このメールは自動送信されています。',
    '  本メールへの返信は nishikawa@omoshiku.jp に届きます。'
  ].join('\n');

  const options = {
    name: CONFIG.REPLY_FROM_NAME
  };

  // info@omoshiku.jp が Send as エイリアスとして設定済みの場合のみ有効
  // 未設定の場合は nishikawa@omoshiku.jp から送信される
  try {
    const aliases = GmailApp.getAliases();
    if (aliases.indexOf(CONFIG.REPLY_FROM) !== -1) {
      options.from = CONFIG.REPLY_FROM;
    }
  } catch (e) {
    // エイリアス取得に失敗した場合はデフォルト送信元で送信
    console.log('Alias check skipped:', e);
  }

  GmailApp.sendEmail(data.email, subject, body, options);
}

// ========================================
// テスト用関数（手動実行で動作確認）
// ========================================
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'テスト太郎',
        email: 'nishikawa@omoshiku.jp',
        company: 'テスト株式会社',
        phone: '03-1234-5678',
        category: '月額パートナーについて',
        message: 'これはテスト送信です。問題なく動作していれば、Sheetsにレコードが追加され、通知メールと自動返信が届きます。'
      })
    }
  };

  const result = doPost(testData);
  console.log(result.getContent());
}
