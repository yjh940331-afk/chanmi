import { useEffect, useMemo, useState } from 'react';
import { Instagram, Radio, Sparkles, Utensils } from 'lucide-react';
import { heroVideos } from '../../content/videos';
import { site } from '../../content/site';
import { AnchorButton } from '../ui/Button';
import { SmartImage } from '../media/SmartImage';

export function HeroSection() {
  const [active, setActive] = useState(0);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const heroPool = useMemo(() => heroVideos.slice(0, 8), []);
  const current = heroPool[active % heroPool.length];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % heroPool.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, [heroPool.length]);

  return (
    <section
      className="relative min-h-[62svh] overflow-hidden bg-rosewash text-ink"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: Math.round(((event.clientX - rect.left) / rect.width) * 100),
          y: Math.round(((event.clientY - rect.top) / rect.height) * 100),
        });
      }}
      style={{
        background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(255,79,147,.26), transparent 24%), linear-gradient(135deg, #fffafd 0%, #fff0f5 44%, #ffffff 100%)`,
      }}
    >
      <div className="absolute inset-0 grid grid-cols-4 gap-1 opacity-70 sm:grid-cols-6 lg:grid-cols-8">
        {heroPool.map((item, index) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative min-h-24 overflow-hidden"
            aria-label={`${item.title} 보기`}
          >
            <SmartImage
              src={item.image}
              fallbackSrc={item.fallbackImage}
              alt=""
              loading={index < 4 ? 'eager' : 'lazy'}
              className="h-full w-full object-cover opacity-86 saturate-150 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper/75 via-paper/10 to-transparent" />
          </a>
        ))}
      </div>
      <div className="stage-noise absolute inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,250,253,.95)_0%,rgba(255,240,245,.78)_45%,rgba(255,250,253,.26)_100%)]" />
      <div className="scanline absolute inset-0" />

      <div className="section-shell relative flex min-h-[62svh] items-end pb-8 pt-16">
        <div className="grid w-full gap-5 lg:grid-cols-[0.64fr_1fr] lg:items-end">
          <div className="max-w-xl">
            <p className="inline-flex min-h-7 rotate-[-1deg] items-center gap-2 rounded-lg bg-cherry px-2.5 text-[11px] font-black text-paper shadow-glow">
              <Sparkles aria-hidden className="h-3.5 w-3.5 text-paper" />
              LIVE / NYAM / COS
            </p>
            <h1 className="mt-3 pb-1 text-3xl font-black leading-tight text-ink sm:text-4xl">나는 찬미</h1>
            <p className="mt-2 max-w-md text-xs font-bold leading-5 text-ink/70 sm:text-sm">
              오늘 올라온 컷, 귀여운 순간, 먹방까지 바로 보기.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <AnchorButton href={site.links.chzzk} external size="sm" variant="dark">
                <Radio aria-hidden className="h-3.5 w-3.5" />
                치지직
              </AnchorButton>
              <AnchorButton href={site.links.instagram} external size="sm" variant="dark">
                <Instagram aria-hidden className="h-3.5 w-3.5" />
                인스타
              </AnchorButton>
              <AnchorButton href={site.links.youtubeNyam} external size="sm" variant="dark">
                <Utensils aria-hidden className="h-3.5 w-3.5" />
                냠냠
              </AnchorButton>
            </div>
          </div>

          <a
            href={current.href}
            target="_blank"
            rel="noopener noreferrer"
            className="float-soft group hidden rotate-[1deg] overflow-hidden rounded-lg border border-cherry/20 bg-paper p-1.5 shadow-glow md:block"
          >
            <div className="relative aspect-video overflow-hidden rounded-lg bg-rosewash">
              <SmartImage
                src={current.image}
                fallbackSrc={current.fallbackImage}
                alt={`${current.title} 썸네일`}
                loading="eager"
                className="h-full w-full object-cover saturate-150 transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-[10px] font-black text-paper">NOW CUT</p>
                <h2 className="mt-1 line-clamp-1 text-lg font-black">{current.title}</h2>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div className="marquee absolute bottom-0 left-0 right-0 border-y border-cherry/20 bg-paper/75 py-1.5 text-[11px] font-black text-cherry backdrop-blur">
        <div>
          {heroPool.map((item) => (
            <span key={item.id}> {item.title} / </span>
          ))}
          {heroPool.map((item) => (
            <span key={`${item.id}-clone`}> {item.title} / </span>
          ))}
        </div>
      </div>
    </section>
  );
}
