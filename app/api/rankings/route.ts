import { NextRequest, NextResponse } from 'next/server';
import { getFallbackData } from '@/lib/fallbackData';
import { fetchYahooRankings } from '@/lib/scrapeYahoo';
import { League, RankingResponse } from '@/lib/types';

function isLeague(value: string | null): value is League {
  return value === 'al' || value === 'nl';
}

export async function GET(request: NextRequest) {
  const leagueParam = request.nextUrl.searchParams.get('league');
  const league: League = isLeague(leagueParam) ? leagueParam : 'al';

  try {
    const rankings = await fetchYahooRankings(league);
    const payload: RankingResponse = {
      league,
      fetchedAt: new Date().toISOString(),
      source: 'live',
      japaneseInRanking: rankings.some((item) => item.isJapanese),
      rankings
    };
    return NextResponse.json(payload, { status: 200 });
  } catch {
    const rankings = getFallbackData(league);
    const payload: RankingResponse = {
      league,
      fetchedAt: new Date().toISOString(),
      source: 'fallback',
      japaneseInRanking: rankings.some((item) => item.isJapanese),
      rankings
    };
    return NextResponse.json(payload, { status: 200 });
  }
}
