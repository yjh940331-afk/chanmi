import type { MediaItem } from '../../types';
import { cn } from '../../lib/cn';
import { MediaCard } from './MediaCard';

interface MediaGridProps {
  items: MediaItem[];
}

export function MediaGrid({ items }: MediaGridProps) {
  return (
    <div className="grid auto-rows-[150px] grid-cols-2 gap-2 md:auto-rows-[160px] md:grid-cols-5 xl:grid-cols-8">
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            item.quality === 'hero' && 'col-span-2 row-span-2',
            item.quality === 'large' && 'col-span-2',
            item.orientation === 'portrait' && item.quality !== 'hero' && 'row-span-2',
          )}
        >
          <MediaCard item={item} compact />
        </div>
      ))}
    </div>
  );
}
