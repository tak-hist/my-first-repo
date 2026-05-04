export type League = 'al' | 'nl';

export interface RankingPlayer {
  rank: number;
  player: string;
  team: string;
  homeRuns: number;
  isJapanese: boolean;
}

export interface RankingResponse {
  league: League;
  fetchedAt: string;
  source: 'supabase' | 'fallback';
  rankings: RankingPlayer[];
  japaneseInRanking: boolean;
}
