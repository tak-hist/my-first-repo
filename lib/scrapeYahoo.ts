import * as cheerio from 'cheerio';
import { League, RankingPlayer } from './types';

const urls: Record<League, string> = {
  al: 'https://baseball.yahoo.co.jp/mlb/stats/batter?gameKindId=1001&type=hr',
  nl: 'https://baseball.yahoo.co.jp/mlb/stats/batter?gameKindId=1002&type=hr'
};

const browserLikeHeaders = {
  'User-Agent': 'Mozilla/5.0'
};

const japanesePlayers = ['Shohei Ohtani', 'Seiya Suzuki', 'Masataka Yoshida', 'Yoshinobu Yamamoto', 'Yu Darvish'];

function toNumber(value: string): number {
  const n = Number(value.replace(/,/g, '').trim());
  return Number.isNaN(n) ? 0 : n;
}

export async function fetchYahooRankings(league: League): Promise<RankingPlayer[]> {
  const response = await fetch(urls[league], {
    headers: browserLikeHeaders,
    next: { revalidate: 1800 }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch rankings: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);
  const rows = $('table tbody tr');
  const rankings: RankingPlayer[] = [];

  rows.each((index, element) => {
    if (index > 14) return;
    const cols = $(element).find('td');
    const rank = toNumber($(cols[0]).text());
    const player = $(cols[1]).text().replace(/\s+/g, ' ').trim();
    const team = $(cols[2]).text().replace(/\s+/g, ' ').trim();
    const homeRuns = toNumber($(cols[3]).text());

    if (!rank || !player) return;

    rankings.push({
      rank,
      player,
      team,
      homeRuns,
      isJapanese: japanesePlayers.some((p) => player.includes(p))
    });
  });

  if (rankings.length === 0) {
    throw new Error('No ranking rows parsed');
  }

  return rankings;
}
