'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { League, RankingResponse } from '@/lib/types';

export default function HomePage() {
  const [league, setLeague] = useState<League>('al');
  const [data, setData] = useState<RankingResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/rankings?league=${league}`);
        const json = (await res.json()) as RankingResponse;
        if (mounted) setData(json);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    void load();
    return () => {
      mounted = false;
    };
  }, [league]);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>MLBホームランランキング</h1>
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${league === 'al' ? styles.tabActive : ''}`} onClick={() => setLeague('al')}>ア・リーグ</button>
        <button className={`${styles.tab} ${league === 'nl' ? styles.tabActive : ''}`} onClick={() => setLeague('nl')}>ナ・リーグ</button>
      </div>

      {loading && <p className={`${styles.notice} ${styles.loading}`}>最新情報に更新しています。和田より</p>}
      {data?.source === 'fallback' && <p className={`${styles.notice} ${styles.fallback}`}>現在、最新ランキングを取得できません。前回取得した情報を表示しています。</p>}

      <section className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr><th>順位</th><th>選手名</th><th>チーム</th><th>本塁打数</th></tr>
          </thead>
          <tbody>
            {data?.rankings.map((item) => (
              <tr key={`${item.rank}-${item.player}`} className={item.isJapanese ? styles.jpRow : ''}>
                <td>{item.rank}</td><td>{item.player}</td><td>{item.team}</td><td>{item.homeRuns}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {data && !data.japaneseInRanking && <p className={styles.footer}>日本人選手は現在ランキング外です</p>}
      {data && <p className={styles.updated}>最終更新: {new Date(data.fetchedAt).toLocaleString('ja-JP')}</p>}
    </main>
  );
}
