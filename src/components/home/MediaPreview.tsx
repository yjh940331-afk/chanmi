import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mediaItems } from '../../content/media';
import { MediaCard } from '../media/MediaCard';

export function MediaPreview() {
  const featured = mediaItems.filter((item) => item.featured).slice(0, 8);

  return (
    <section className="section-shell py-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-black text-cherry">VISUAL</p>
          <h2 className="mt-0.5 text-xl font-black text-ink sm:text-2xl">컷으로 보는 찬미</h2>
        </div>
        <Link
          to="/media"
          className="focus-ring inline-flex min-h-8 items-center gap-2 self-start rounded-lg bg-cherry px-3 text-xs font-black text-paper shadow-glow"
        >
          더 보기
          <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid auto-rows-[140px] grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-8">
        {featured.map((item) => (
          <MediaCard key={item.id} item={item} compact />
        ))}
      </div>
    </section>
  );
}
