# LightTag PR

GitHubのプルリクエストコメントに「観点ラベル」や「温度感ラベル」などのラベルを簡単に挿入できるChrome拡張機能です。
JSONで設定をImport,Exportできるので、チーム内で設定を共有することでコードレビューの質と効率を向上させます。

## 機能

- GitHubのPRコメント入力欄にラベル追加ボタンを表示
- 複数ラベルを同時付与可能（例：`[設計][FYI] コメント内容`）
- ラベルにマウスオーバーでツールチップ表示
- カスタムラベルのJSON設定とチーム内共有

## インストール方法

### 開発版をインストール

1. このリポジトリをクローン
   ```
   git clone https://github.com/ユーザー名/lighttag-pr.git
   ```

2. 依存パッケージをインストール
   ```
   npm install
   ```

3. 拡張機能をビルド
   ```
   npm run build
   ```

4. Chromeで拡張機能をインストール
   - Chromeで `chrome://extensions` を開く
   - 「デベロッパーモード」を有効にする
   - 「パッケージ化されていない拡張機能を読み込む」をクリック
   - `lighttag-pr/lighttag-pr` フォルダを選択

### Chrome Web Storeからインストール

https://chromewebstore.google.com/detail/ccpienongmajbkedjgimfhondmfelenb?utm_source=item-share-cb

## 使い方

1. GitHubのプルリクエスト画面を開く
2. コメント入力欄の上に表示される「ラベルを追加」ボタンをクリック
3. 表示されるドロップダウンから適切なラベルを選択（複数選択可能）
4. 「挿入」ボタンをクリックすると、選択したラベルがコメント先頭に追加される
5. 通常通りコメントを入力して送信

## カスタム設定

拡張機能のオプション画面で以下の設定が可能です：

- ラベルの追加・削除・編集
- JSONファイルによるインポート/エクスポート
- ラベルタイプ（観点・温度感）の管理

### JSON設定例

```json
{
  "labels": [
    {
      "type": "観点",
      "items": [
        { "label": "設計", "description": "設計や仕様に合っているか" },
        { "label": "可読性", "description": "コードが読みやすいか" }
      ]
    },
    {
      "type": "温度感",
      "items": [
        { "label": "要修正", "description": "修正が必要な指摘" },
        { "label": "Q", "description": "質問・確認" },
        { "label": "FYI", "description": "参考情報（対応不要）" }
      ]
    }
  ]
}
```

## 開発

- ビルド: `npm run build` (content、options、popupを一括ビルド)
- 開発モード（変更監視）: `npm run dev` (変更を監視して自動ビルド)
- コード整形: `npm run format:fix` (Biomeでコードフォーマット修正)
- リント: `npm run lint:fix` (Biomeでコードリント修正)
- ドキュメント生成: `npm run docs:build` (ドキュメントHTMLを生成)
- ドキュメントサーバー: `npm run docs:server` (ローカルでドキュメントを表示)
- 配布用ファイル作成: `npm run create-publish` (ビルドとZIP作成)

## 動作環境

- Chrome ブラウザ
- GitHub.com のプルリクエスト画面

## ライセンス

MIT

## おまけ

<details>
<summary>おすすめの充実した設定ファイル</summary>

```json
{
  "labels": [
    {
      "items": [
        {
          "description": "設計や仕様に沿っているか、全体の構造が適切か",
          "label": "設計"
        },
        {
          "description": "コードが読みやすく、理解しやすいか",
          "label": "可読性"
        },
        {
          "description": "将来的な修正や拡張がしやすいか、メンテナンス性が高いか",
          "label": "保守性"
        },
        {
          "description": "処理速度やリソース効率に問題がないか",
          "label": "パフォーマンス"
        },
        {
          "description": "セキュリティ上のリスクや脆弱性がないか",
          "label": "セキュリティ"
        },
        {
          "description": "テストが十分に書かれているか、テストケースが網羅されているか",
          "label": "テスト"
        }
      ],
      "type": "観点"
    },
    {
      "items": [
        {
          "description": "修正が必要な指摘です",
          "label": "要修正"
        },
        {
          "description": "検討や議論が必要な点です",
          "label": "要検討"
        },
        {
          "description": "質問です。意図や理由の確認など",
          "label": "Q"
        },
        {
          "description": "参考情報として共有します（対応不要）",
          "label": "FYI"
        },
        {
          "description": "些細な指摘です。修正は必須ではありません",
          "label": "NIT"
        }
      ],
      "type": "温度感"
    },
    {
      "items": [
        {
          "description": "注意が必要な点です。見落としやすい問題やリスクなど",
          "label": "WARNING"
        },
        {
          "description": "既知の不具合や修正が必要な箇所です",
          "label": "FIXME"
        },
        {
          "description": "一時的な対応や理想的でない実装です。将来的な改善が望まれます",
          "label": "HACK"
        }
      ],
      "type": "注意・警告"
    }
  ]
}
```

</details>