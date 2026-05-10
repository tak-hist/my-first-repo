import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pocket Launch | スマホWebアプリ雛形',
  description: 'ChatGPTとCodexだけで育てる、Vercel公開向けの1ページ構成スマホWebアプリです。',
  applicationName: 'Pocket Launch',
  appleWebApp: {
    capable: true,
    title: 'Pocket Launch',
    statusBarStyle: 'black-translucent'
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#111827'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
