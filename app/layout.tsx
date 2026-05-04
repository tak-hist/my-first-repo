import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MLBホームランランキング',
  description: 'ア・リーグ、ナ・リーグの本塁打ランキング'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
