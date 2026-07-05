import { useEffect, useMemo, useState } from 'react';
import { Image } from 'lucide-react';
import { MediaGrid } from '../components/media/MediaGrid';
import { mediaCategories, mediaItems } from '../content/media';
import { cn } from '../lib/cn';
import type { MediaCategory } from '../types';

type CategoryFilter = MediaCategory | 'all';

export default function MediaPage() {
  const [category, setCategory] = useState<CategoryFilter>('all');

  useEffect(() => {
    document.title = 'Media | 나는 찬미 Official';
  }, []);

  const filteredItems = useMemo(() => {
    if (category === 'all') {
      return mediaItems;
    }

    return mediaItems.filter((item) => item.category === category);
  }, [category]);

  return (
    <main className="bg-rosewash">
      <section className="section-shell py-6 text-ink">
      <div className="mb-4 max-w-3xl">
        <p className="inline-flex min-h-7 items-center gap-2 rounded-lg bg-cherry px-2.5 text-[11px] font-semibold text-paper shadow-glow">
          <Image aria-hidden className="h-3.5 w-3.5 text-paper" />
          MEDIA
        </p>
        <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">비주얼 월</h1>
      </div>

      <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1" role="tablist" aria-label="미디어 필터">
        {mediaCategories.map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={category === item.value}
            onClick={() => setCategory(item.value)}
            className={cn(
              'focus-ring min-h-8 shrink-0 rounded-lg px-3 text-xs font-semibold transition',
              category === item.value
                ? 'bg-cherry text-paper shadow-glow'
                : 'bg-paper text-ink ring-1 ring-cherry/20 hover:bg-cherry/10',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <MediaGrid items={filteredItems} />
      </section>
    </main>
  );
}
