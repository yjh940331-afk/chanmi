import { useMemo, useState } from 'react';
import { Camera, Crown, Heart, Play, Radio, ShoppingBag, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { starFeed, starWideDrop } from '../../content/homeFeed';
import { site } from '../../content/site';
import { SmartImage } from '../media/SmartImage';

const starTabs = [
  {
    id: 'stage',
    label: 'STAGE',
    title: '라이브 클럽',
    copy: '방송 알림, 팬톡, 오늘의 하이라이트를 한 번에.',
    href: site.links.chzzk,
    external: true,
    icon: Radio,
  },
  {
    id: 'cos',
    label: 'COS',
    title: '코스프레 커버',
    copy: '세로 컷은 작게, 커버 컷은 크게. 팬이 저장하고 싶은 구도.',
    href: '/media',
    external: false,
    icon: Camera,
  },
  {
    id: 'drop',
    label: 'DROP',
    title: '찬미 컬렉션',
    copy: '광고, 협업, 굿즈 아이디어를 예쁜 선반처럼 정리.',
    href: '/ads',
    external: false,
    icon: ShoppingBag,
  },
];

const starSignals = [
  { label: 'FAN LOVE', value: '94%', icon: Heart },
  { label: 'LIVE HEAT', value: 'ON', icon: Play },
  { label: 'COS PICK', value: 'NEW', icon: Crown },
];

export function GlobalStarRoom() {
  const [activeTab, setActiveTab] = useState(starTabs[0].id);
  const active = starTabs.find((item) => item.id === activeTab) ?? starTabs[0];
  const ActiveIcon = active.icon;

  const visuals = useMemo(() => starFeed, []);

  const wideDrop = starWideDrop;

  return (
    <section className="relative overflow-hidden bg-rosewash py-6 text-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(239,90,136,.16),transparent_24%),linear-gradient(180deg,#fff0f3_0%,#fffbfa_58%,#ffffff_100%)]" />
      <div className="stage-noise absolute inset-0 opacity-45" />

      <div className="section-shell relative">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="inline-flex min-h-6 items-center gap-1.5 rounded-lg bg-cherry px-2 text-[10px] font-semibold text-paper shadow-glow">
              <Sparkles aria-hidden className="h-3.5 w-3.5" />
              STAR ROOM
            </p>
            <h2 className="mt-2 text-xl font-semibold leading-tight sm:text-2xl">월드 팬룸</h2>
          </div>
          <span className="hidden rounded-lg bg-paper px-2 py-1 text-[10px] font-semibold text-cherry shadow-[0_8px_20px_rgba(239,90,136,0.08)] sm:inline-flex">
            LIVE / COS / DROP
          </span>
        </div>

        <div className="grid gap-2 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="global-gloss grid gap-2 rounded-lg border border-cherry/20 bg-paper/90 p-2 shadow-lift sm:grid-cols-[1fr_0.7fr]">
            <div className="relative min-h-[320px] overflow-hidden rounded-lg bg-paper">
              {visuals[0] ? (
                <SmartImage
                  src={visuals[0].src}
                  alt={visuals[0].alt}
                  className="h-full w-full object-cover saturate-100"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-cherry/75 via-transparent to-paper/10" />
              <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-lg bg-paper/95 px-2 py-1 text-[10px] font-semibold text-cherry shadow-glow">
                <Star aria-hidden className="h-3.5 w-3.5 fill-current" />
                COVER PICK
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[10px] font-semibold text-paper/80">CHANMI MAGAZINE</p>
                <h3 className="mt-1 text-2xl font-semibold leading-none text-paper">PINK RED WHITE</h3>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-1">
              {visuals.slice(1, 4).map((item, index) => (
                <a
                  key={item.id}
                  href={item.href || '/media'}
                  target={item.href ? '_blank' : undefined}
                  rel={item.href ? 'noopener noreferrer' : undefined}
                  className="group relative min-h-28 overflow-hidden rounded-lg bg-rosewash sm:min-h-0"
                >
                  <SmartImage
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover saturate-100 transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                  <p className="absolute bottom-2 left-2 rounded-lg bg-paper/95 px-1.5 py-0.5 text-[9px] font-semibold text-cherry">
                    {index === 0 ? 'COS CUT' : index === 1 ? 'SELFIE' : 'FAN PICK'}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <div className="global-gloss rounded-lg border border-cherry/20 bg-paper/95 p-3 shadow-lift">
              <div className="mb-2 grid grid-cols-3 gap-1.5">
                {starTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`focus-ring min-h-8 rounded-lg text-[10px] font-semibold transition ${
                      activeTab === tab.id ? 'bg-cherry text-paper shadow-glow' : 'bg-rosewash text-cherry'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="rounded-lg bg-rosewash p-3">
                <div className="flex items-start gap-2">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cherry text-paper shadow-glow">
                    <ActiveIcon aria-hidden className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold leading-tight text-ink">{active.title}</h3>
                    <p className="mt-1 text-[11px] font-bold leading-4 text-ink/60">{active.copy}</p>
                  </div>
                </div>

                {active.external ? (
                  <a
                    href={active.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring mt-3 inline-flex min-h-8 items-center gap-2 rounded-lg bg-cherry px-3 text-xs font-semibold text-paper shadow-glow"
                  >
                    바로 보기
                    <Play aria-hidden className="h-3.5 w-3.5 fill-current" />
                  </a>
                ) : (
                  <Link
                    to={active.href}
                    className="focus-ring mt-3 inline-flex min-h-8 items-center gap-2 rounded-lg bg-cherry px-3 text-xs font-semibold text-paper shadow-glow"
                  >
                    바로 보기
                    <Play aria-hidden className="h-3.5 w-3.5 fill-current" />
                  </Link>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {starSignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <div key={signal.label} className="global-gloss rounded-lg border border-cherry/20 bg-paper p-2.5 shadow-[0_12px_28px_rgba(239,90,136,0.10)]">
                    <Icon aria-hidden className="h-4 w-4 text-cherry" />
                    <p className="mt-1 text-[9px] font-semibold text-cherry">{signal.label}</p>
                    <p className="mt-0.5 text-lg font-semibold leading-none text-ink">{signal.value}</p>
                  </div>
                );
              })}
            </div>

            <a
              href={wideDrop?.href || site.links.youtubeMain}
              target="_blank"
              rel="noopener noreferrer"
              className="global-gloss group grid grid-cols-[88px_1fr] gap-2 rounded-lg border border-cherry/20 bg-paper p-2 shadow-[0_12px_28px_rgba(239,90,136,0.10)]"
            >
              <span className="relative h-20 overflow-hidden rounded-lg bg-rosewash">
                {wideDrop ? (
                  <SmartImage
                    src={wideDrop.image}
                    fallbackSrc={wideDrop.fallbackImage}
                    alt={`${wideDrop.title} 썸네일`}
                    loading="lazy"
                    className="h-full w-full object-cover saturate-100 transition duration-700 group-hover:scale-105"
                  />
                ) : null}
              </span>
              <span className="min-w-0 self-center">
                <span className="block text-[10px] font-semibold text-cherry">REPLAY DROP</span>
                <span className="mt-0.5 line-clamp-2 block text-sm font-semibold leading-5 text-ink">{wideDrop?.title || '찬미 영상'}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
