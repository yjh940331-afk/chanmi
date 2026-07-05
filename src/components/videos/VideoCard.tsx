import { ExternalLink, Play } from 'lucide-react';
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
    <article className="depth-card overflow-hidden rounded-lg border border-cherry/20 bg-paper text-ink shadow-lift">
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="group block">
        <div className={isPortrait ? 'relative aspect-[9/16] overflow-hidden bg-rosewash' : 'relative aspect-video overflow-hidden bg-rosewash'}>
          <SmartImage
            src={item.image}
            fallbackSrc={item.fallbackImage}
            alt={`${item.title} 썸네일`}
            loading="lazy"
            className="h-full w-full object-cover opacity-95 saturate-125 transition duration-500 group-hover:scale-[1.06]"
            compactClassName="h-full w-full object-cover opacity-95 saturate-125 transition duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute left-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-paper text-cherry shadow-lift">
            <Play aria-hidden className="h-3.5 w-3.5 fill-current" />
          </span>
          {item.featured ? <Badge className="absolute bottom-2 left-2 bg-blush px-2 py-1 text-[10px]">HOT</Badge> : null}
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-paper/80 to-transparent" />
        </div>
        <div className={isPortrait ? 'p-2' : 'p-2.5'}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] font-black uppercase text-cherry">{item.platform}</p>
            <ExternalLink aria-hidden className="h-3.5 w-3.5 text-ink/45" />
          </div>
          <h3 className={isPortrait ? 'mt-0.5 line-clamp-2 text-xs font-black leading-4' : 'mt-0.5 line-clamp-2 text-xs font-black leading-4 sm:text-sm'}>
            {item.title}
          </h3>
          <p className="mt-1 text-[11px] font-bold text-ink/50">
            {formatViews(item.views)}
            {item.views ? ' views' : item.kind?.toUpperCase()}
          </p>
        </div>
      </a>
    </article>
  );
}
