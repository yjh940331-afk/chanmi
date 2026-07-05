import { useEffect, useMemo, useState } from 'react';
import { Play } from 'lucide-react';
import { VideoCard } from '../components/videos/VideoCard';
import { videoItems } from '../content/videos';
import { cn } from '../lib/cn';

const filters = [
  { value: 'all', label: 'ALL' },
  { value: 'main', label: 'MAIN' },
  { value: 'nyam', label: 'NYAM' },
  { value: 'live', label: 'LIVE' },
] as const;

export default function VideosPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]['value']>('all');

  useEffect(() => {
    document.title = 'Videos | 나는 찬미 Official';
  }, []);

  const items = useMemo(() => {
    if (filter === 'all') return videoItems;
    return videoItems.filter((item) => item.channel === filter);
  }, [filter]);

  const portraitItems = useMemo(() => items.filter((item) => item.orientation === 'portrait'), [items]);
  const landscapeItems = useMemo(() => items.filter((item) => item.orientation !== 'portrait'), [items]);

  return (
    <main className="bg-rosewash">
      <section className="section-shell py-6 text-ink">
        <div className="mb-4 max-w-3xl">
          <p className="inline-flex min-h-7 items-center gap-2 rounded-lg bg-cherry px-2.5 text-[11px] font-black text-paper shadow-glow">
            <Play aria-hidden className="h-3.5 w-3.5 fill-current text-paper" />
            VIDEOS
          </p>
          <h1 className="mt-3 text-2xl font-black sm:text-3xl">영상 몰아보기</h1>
        </div>

        <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={cn(
                'focus-ring min-h-8 shrink-0 rounded-lg px-3 text-xs font-black transition',
                filter === item.value
                  ? 'bg-cherry text-paper shadow-glow'
                  : 'bg-paper text-ink ring-1 ring-cherry/20 hover:bg-cherry/10',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {landscapeItems.length ? (
          <section className="mb-6">
            <div className="mb-2 flex items-center justify-between gap-3">
              <h2 className="text-sm font-black text-ink">와이드 / 채널</h2>
              <span className="text-[11px] font-bold text-ink/40">{landscapeItems.length} clips</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
              {landscapeItems.map((item) => (
                <VideoCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ) : null}

        {portraitItems.length ? (
          <section>
            <div className="mb-2 flex items-center justify-between gap-3">
              <h2 className="text-sm font-black text-ink">세로 쇼츠</h2>
              <span className="text-[11px] font-bold text-ink/40">{portraitItems.length} shorts</span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {portraitItems.map((item) => (
                <VideoCard key={item.id} item={item} variant="portrait" />
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
