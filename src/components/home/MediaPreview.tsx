import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mediaItems } from '../../content/media';
import { MediaCard } from '../media/MediaCard';

export function MediaPreview() {
  const featured = mediaItems.filter((item) => item.featured).slice(0, 10);

  return (
    <section className="section-shell py-7">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blush">Visual</p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight text-ink sm:text-xl">컷으로 보는 찬미</h2>
        </div>
        <Link
          to="/media"
          className="focus-ring inline-flex items-center gap-1.5 text-xs font-semibold text-muted transition hover:text-cherry"
        >
          더 보기
          <ArrowRight aria-hidden className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="rail">
        {featured.map((item) => (
          <div key={item.id} className="h-40 w-32 sm:h-44 sm:w-36">
            <MediaCard item={item} compact />
          </div>
        ))}
      </div>
    </section>
  );
}
