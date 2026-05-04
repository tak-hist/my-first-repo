# MLBホームランランキングアプリ

Next.js App Router + TypeScriptで作成した、ア・リーグ/ナ・リーグの本塁打ランキング表示アプリです。

## セットアップ

```bash
npm install
npm run dev
```

## 構成

- `app/page.tsx`: トップページUI
- `app/api/rankings/route.ts`: Yahoo! MLB統計を取得するAPI Route
- `lib/scrapeYahoo.ts`: スクレイピング処理
- `lib/fallbackData.ts`: 取得失敗時のサンプルデータ

## Vercel公開

1. GitHubへpush
2. VercelでImport
3. Build Command: `npm run build`
4. Framework: Next.js

## Supabase拡張案

1. `rankings_history` テーブル追加（league, payload, fetched_at）
2. API Routeで取得成功時にupsert
3. 取得失敗時はDBの最新レコードを返す
