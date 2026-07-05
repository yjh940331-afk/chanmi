import { Sparkles } from 'lucide-react';
import { youtubeVideos } from '../../content/youtube';
import { SmartImage } from '../media/SmartImage';

const keywords = ['코스프레', '메이드', '부산코믹월드', '얼굴 자랑', '나는짭미'];

export function CosplayRail() {
  const items = youtubeVideos
    .filter((item) => keywords.some((keyword) => item.title.includes(keyword)))
    .slice(0, 5);

  return (
    <section className="section-shell py-4 text-ink">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-black text-cherry">COSPLAY MODE</p>
          <h2 className="mt-0.5 text-xl font-black sm:text-2xl">캐릭터 컷</h2>
        </div>
        <Sparkles aria-hidden className="h-5 w-5 text-blush" />
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring depth-card group relative min-h-40 overflow-hidden rounded-lg border border-cherry/20 bg-paper shadow-lift"
          >
            <SmartImage
              src={item.image}
              fallbackSrc={item.fallbackImage}
              alt={`${item.title} 썸네일`}
              className="absolute inset-0 h-full w-full object-cover saturate-150 transition duration-500 group-hover:scale-[1.06]"
              compactClassName="absolute inset-0 h-full w-full object-contain p-4 saturate-150 transition duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper/95 via-paper/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-2.5">
              <p className="text-[10px] font-black text-cherry">{item.kind?.toUpperCase()}</p>
              <h3 className="mt-0.5 line-clamp-1 text-sm font-black text-ink">{item.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
