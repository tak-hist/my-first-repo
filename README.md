# Pocket Launch

Base44を使わず、ChatGPTとCodexだけで育てられるスマホ向け1ページWebアプリのスターターです。Next.js App Router + TypeScriptで作成しており、Vercelの無料枠にそのまま公開できます。

## できること

- スマホ幅を前提にした1ページUI
- アプリのアイデアメモ
- 公開までのToDoチェックリスト
- `localStorage`による端末内保存
- Vercel公開手順を画面内に表示

## 必要なもの

- Node.js 18.17以上
- npm
- GitHubアカウント
- Vercelアカウント（無料枠でOK）

## ローカル起動

```bash
npm install
npm run dev
```

ブラウザで <http://localhost:3000> を開きます。

## よく使うコマンド

```bash
npm run dev        # 開発サーバー
npm run typecheck  # TypeScriptチェック
npm run lint       # Next.js lint
npm run build      # 本番ビルド確認
```

## ファイル構成

```text
app/
  globals.css       # 全体スタイル
  layout.tsx        # メタデータ、viewport、共通レイアウト
  page.module.css   # 1ページUIのスタイル
  page.tsx          # 画面本体とlocalStorageの状態管理
public/
  icon.svg          # アプリアイコン
next.config.mjs     # Next.js設定
package.json        # 依存関係とnpm scripts
tsconfig.json       # TypeScript設定
```

## Vercel無料公開手順

1. このリポジトリをGitHubにpushします。
2. Vercelで「Add New Project」を押します。
3. GitHubリポジトリをImportします。
4. Framework Presetが「Next.js」になっていることを確認します。
5. Build Commandは `npm run build`、Output Directoryは未指定のままDeployします。

## ChatGPT/Codexで育てる時の依頼例

- 「このアプリを習慣管理アプリに変えて」
- 「スマホ下部に固定ナビを追加して」
- 「入力内容をSupabaseに保存できるようにして」
- 「Vercel公開前にSEOとOGPを整えて」
