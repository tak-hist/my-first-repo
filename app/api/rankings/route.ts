import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getFallbackData } from '@/lib/fallbackData';
import { League, RankingPlayer, RankingResponse } from '@/lib/types';
import { createClient } from '@/utils/supabase/server';

function isLeague(value: string | null): value is League {
  return value === 'al' || value === 'nl';
}

export async function GET(request: NextRequest) {
  const leagueParam = request.nextUrl.searchParams.get('league');
  const league: League = isLeague(leagueParam) ? leagueParam : 'al';

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('rankings')
    .select('league, data, updated_at')
    .eq('league', league)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ message: 'Failed to load rankings from Supabase.' }, { status: 500 });
  }

  const rankings = (data?.data as RankingPlayer[] | null) ?? null;

  if (rankings && rankings.length > 0) {
    const payload: RankingResponse = {
      league,
      fetchedAt: data?.updated_at ?? new Date().toISOString(),
      source: 'supabase',
      japaneseInRanking: rankings.some((item) => item.isJapanese),
      rankings
    };
    return NextResponse.json(payload, { status: 200 });
  }

  const fallbackRankings = getFallbackData(league);
  const fallbackPayload: RankingResponse = {
    league,
    fetchedAt: new Date().toISOString(),
    source: 'fallback',
    japaneseInRanking: fallbackRankings.some((item) => item.isJapanese),
    rankings: fallbackRankings
  };

  return NextResponse.json(fallbackPayload, { status: 200 });
}
