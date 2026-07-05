import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { latestVideos } from '../../content/videos';
import { VideoCard } from '../videos/VideoCard';

export function VideoPreview() {
  const featured = latestVideos.slice(0, 12);

  return (
    <section className="bg-paper py-7 text-ink">
      <div className="section-shell">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blush">Latest</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">방금 뜬 컷</h2>
          </div>
          <Link
            to="/videos"
            className="focus-ring inline-flex items-center gap-1.5 text-xs font-semibold text-muted transition hover:text-cherry"
          >
            전부 보기
            <ArrowRight aria-hidden className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="rail">
          {featured.map((item) => (
            <div key={item.id} className={item.orientation === 'portrait' ? 'w-32 sm:w-36' : 'w-52 sm:w-60'}>
              <VideoCard item={item} variant={item.orientation === 'portrait' ? 'portrait' : 'landscape'} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
