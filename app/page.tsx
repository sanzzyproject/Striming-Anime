import { getHome, getTop } from '@/lib/scraper';
import { AnimeCard } from '@/components/AnimeCard';
import { Pagination } from '@/components/Pagination';
import { TrendingUp, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage(props: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page as string) : 1;
  const [homeData, topData] = await Promise.all([
    getHome(page),
    getTop(1) // Only show the first page of top rating on home
  ]);

  return (
    <div className="flex flex-col gap-10">
      {/* Top Anime Section (only on page 1) */}
      {page === 1 && topData.items.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
              <TrendingUp className="text-[#ff4e00]" /> Trending Weekly
            </h2>
            <Link href="/top" className="text-xs text-[#ff4e00] hover:underline font-medium uppercase tracking-wider">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 border-b border-white/10 pb-10">
            {topData.items.slice(0, 6).map((anime, i) => (
              <AnimeCard key={`top-${i}`} anime={anime} />
            ))}
          </div>
        </section>
      )}

      {/* Recent / Home List */}
      <section>
        <div className="flex items-center mb-6">
           <h2 className="text-xl font-bold flex items-center gap-2 text-white">
             <Sparkles className="text-[#ff4e00]" /> New Releases
           </h2>
        </div>
        
        {homeData.items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {homeData.items.map((anime, i) => (
              <AnimeCard key={`home-${anime.slug}-${i}`} anime={anime} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-white/40">
            No anime found.
          </div>
        )}

        <Pagination currentPage={homeData.currentPage} hasNext={homeData.hasNext} basePath="/" />
      </section>
    </div>
  );
}
