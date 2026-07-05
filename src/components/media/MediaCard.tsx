import type { MediaItem } from '../../types';
import { Badge } from '../ui/Badge';
import { SmartImage } from './SmartImage';

interface MediaCardProps {
  item: MediaItem;
  compact?: boolean;
}

export function MediaCard({ item, compact }: MediaCardProps) {
  return (
    <article className="depth-card group h-full overflow-hidden rounded-lg border border-cherry/20 bg-paper text-ink shadow-lift">
      <div className="relative h-full overflow-hidden bg-rosewash">
        {item.href ? (
          <a href={item.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0">
            <SmartImage
              src={item.src}
              fallbackSrc={item.source === 'youtube' ? item.src.replace('maxresdefault', 'hqdefault') : undefined}
              alt={item.alt}
              loading="lazy"
              width={item.width}
              height={item.height}
              className="h-full w-full object-cover saturate-150 transition duration-500 group-hover:scale-[1.05]"
              compactClassName="h-full w-full object-contain p-4 saturate-150 transition duration-500 group-hover:scale-[1.02]"
            />
          </a>
        ) : (
          <SmartImage
            src={item.src}
            alt={item.alt}
            loading="lazy"
            width={item.width}
            height={item.height}
            className="h-full w-full object-cover saturate-150 transition duration-500 group-hover:scale-[1.05]"
            compactClassName="h-full w-full object-contain p-4 saturate-150 transition duration-500 group-hover:scale-[1.02]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-paper/95 via-paper/10 to-transparent" />
        {item.featured ? <Badge className="absolute left-2 top-2 bg-cherry px-2 py-1 text-[10px] text-paper shadow-lift">HOT</Badge> : null}
        <div className={compact ? 'absolute bottom-0 left-0 right-0 p-2.5' : 'absolute bottom-0 left-0 right-0 p-4'}>
          <p className="text-[10px] font-black uppercase text-cherry">{item.category}</p>
          <h3 className="mt-0.5 line-clamp-2 text-xs font-black leading-4 text-ink sm:text-sm">{item.title}</h3>
        </div>
      </div>
    </article>
  );
}
