import { RankingPlayer, League } from './types';

const fallback: Record<League, RankingPlayer[]> = {
  al: [
    { rank: 1, player: 'Aaron Judge', team: 'NYY', homeRuns: 18, isJapanese: false },
    { rank: 2, player: 'Gunnar Henderson', team: 'BAL', homeRuns: 15, isJapanese: false },
    { rank: 3, player: 'Yordan Alvarez', team: 'HOU', homeRuns: 14, isJapanese: false },
    { rank: 4, player: 'Rafael Devers', team: 'BOS', homeRuns: 13, isJapanese: false },
    { rank: 5, player: 'Adley Rutschman', team: 'BAL', homeRuns: 12, isJapanese: false }
  ],
  nl: [
    { rank: 1, player: 'Shohei Ohtani', team: 'LAD', homeRuns: 16, isJapanese: true },
    { rank: 2, player: 'Pete Alonso', team: 'NYM', homeRuns: 15, isJapanese: false },
    { rank: 3, player: 'Marcell Ozuna', team: 'ATL', homeRuns: 14, isJapanese: false },
    { rank: 4, player: 'Kyle Schwarber', team: 'PHI', homeRuns: 13, isJapanese: false },
    { rank: 5, player: 'Christian Walker', team: 'AZ', homeRuns: 12, isJapanese: false }
  ]
};

export function getFallbackData(league: League): RankingPlayer[] {
  return fallback[league];
}
