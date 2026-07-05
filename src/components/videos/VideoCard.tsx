import { Play } from 'lucide-react';
import type { VideoItem } from '../../types';
import { Badge } from '../ui/Badge';
import { SmartImage } from '../media/SmartImage';

interface VideoCardProps {
  item: VideoItem;
  variant?: 'landscape' | 'portrait' | 'mini';
}

function formatViews(value?: number) {
  if (!value) return '';
  return new Intl.NumberFormat('ko-KR', { notation: 'compact' }).format(value);
}

export function VideoCard({ item, variant = 'landscape' }: VideoCardProps) {
  const isPortrait = variant === 'portrait';

  return (
    <article className="depth-card group h-full overflow-hidden rounded-xl border border-line bg-paper text-ink shadow-soft">
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
        <div className={isPortrait ? 'relative aspect-[9/16] overflow-hidden bg-rosewash' : 'relative aspect-video overflow-hidden bg-rosewash'}>
          <SmartImage
            src={item.image}
            fallbackSrc={item.fallbackImage}
            alt={`${item.title} 썸네일`}
            loading="lazy"
            className="h-full w-full object-cover saturate-100 transition duration-500 group-hover:scale-[1.04]"
            compactClassName="h-full w-full object-contain p-3 saturate-100"
          />
          <span className="absolute left-1.5 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-paper/85 text-cherry shadow-soft backdrop-blur">
            <Play aria-hidden className="h-2.5 w-2.5 fill-current" />
          </span>
          {item.featured ? (
            <Badge className="absolute bottom-1.5 left-1.5 bg-cherry px-1.5 py-0.5 text-[9px] text-paper">HOT</Badge>
          ) : null}
        </div>
        <div className="p-2">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-blush">{item.platform}</p>
          <h3 className="mt-0.5 line-clamp-2 text-xs font-semibold leading-4 text-ink">{item.title}</h3>
          <p className="mt-1 text-[10px] font-medium text-muted">
            {formatViews(item.views)}
            {item.views ? ' views' : item.kind?.toUpperCase()}
          </p>
        </div>
      </a>
    </article>
  );
}
