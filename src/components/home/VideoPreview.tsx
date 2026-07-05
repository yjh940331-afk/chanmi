import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { latestVideos } from '../../content/videos';
import { VideoCard } from '../videos/VideoCard';

export function VideoPreview() {
  const featured = latestVideos.slice(0, 12);

  return (
    <section className="bg-paper py-6 text-ink">
      <div className="section-shell">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-black text-cherry">LATEST</p>
            <h2 className="mt-0.5 text-xl font-black sm:text-2xl">방금 뜬 컷</h2>
          </div>
          <Link
            to="/videos"
            className="focus-ring inline-flex min-h-8 items-center gap-2 self-start rounded-lg bg-cherry px-3 text-xs font-black text-paper shadow-glow"
          >
            전부 보기
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {featured.map((item) => (
            <VideoCard key={item.id} item={item} variant={item.orientation === 'portrait' ? 'portrait' : 'landscape'} />
          ))}
        </div>
      </div>
    </section>
  );
}
