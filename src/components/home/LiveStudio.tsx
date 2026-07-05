import { BarChart3, Bell, Clapperboard, Flame, Heart, MessageCircle, Mic2, Radio, Sparkles, Zap } from 'lucide-react';
import { latestVideos } from '../../content/videos';
import { site } from '../../content/site';
import { SmartImage } from '../media/SmartImage';

const chatLines = [
  { name: 'Fan94', text: '오늘 조명 진짜 찬미랑 찰떡', tone: 'bg-paper text-ink' },
  { name: 'Nyam', text: '먹방 알림 켰다', tone: 'bg-cherry text-paper' },
  { name: 'CosPick', text: '다음 코스프레 컷 기다리는 중', tone: 'bg-paper text-ink' },
];

const studioStats = [
  { label: 'LIVE HEAT', value: 'ON', icon: Radio },
  { label: 'CHAT', value: 'FAST', icon: MessageCircle },
  { label: 'CLIP', value: 'NEW', icon: Clapperboard },
  { label: 'LOVE', value: '94%', icon: Heart },
];

export function LiveStudio() {
  const main = latestVideos[0];
  const clips = latestVideos.slice(1, 4);

  return (
    <section className="relative overflow-hidden bg-paper py-6 text-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_16%,rgba(255,79,147,.24),transparent_26%),linear-gradient(135deg,#fffafd_0%,#fff0f5_46%,#ffffff_100%)]" />
      <div className="stage-noise absolute inset-0 opacity-45" />

      <div className="section-shell relative">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="inline-flex min-h-6 items-center gap-1.5 rounded-lg bg-cherry px-2 text-[10px] font-black text-paper shadow-glow">
              <Radio aria-hidden className="h-3.5 w-3.5" />
              LIVE STUDIO
            </p>
            <h2 className="mt-2 text-xl font-black leading-tight sm:text-2xl">찬미 방송국</h2>
          </div>
          <a
            href={site.links.chzzk}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring hidden min-h-8 items-center gap-2 rounded-lg bg-cherry px-3 text-xs font-black text-paper shadow-glow sm:inline-flex"
          >
            <Bell aria-hidden className="h-3.5 w-3.5" />
            알림 켜기
          </a>
        </div>

        <div className="grid gap-2 xl:grid-cols-[1.18fr_0.82fr]">
          <a
            href={main?.href || site.links.chzzk}
            target="_blank"
            rel="noopener noreferrer"
            className="stream-panel group grid overflow-hidden rounded-lg border border-cherry/20 bg-paper/95 p-2 shadow-lift lg:grid-cols-[1fr_220px]"
          >
            <div className="relative min-h-[300px] overflow-hidden rounded-lg bg-rosewash">
              {main ? (
                <SmartImage
                  src={main.image}
                  fallbackSrc={main.fallbackImage}
                  alt={`${main.title} 방송 프리뷰`}
                  className="h-full w-full object-cover saturate-150 transition duration-700 group-hover:scale-105"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-cherry/75 via-transparent to-paper/10" />
              <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                <span className="inline-flex min-h-7 items-center gap-1.5 rounded-lg bg-cherry px-2 text-[10px] font-black text-paper shadow-glow">
                  <span className="h-2 w-2 rounded-full bg-paper pulse-dot" />
                  ON AIR
                </span>
                <span className="inline-flex min-h-7 items-center gap-1.5 rounded-lg bg-paper/95 px-2 text-[10px] font-black text-cherry">
                  <Mic2 aria-hidden className="h-3.5 w-3.5" />
                  TALK / NYAM / COS
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[10px] font-black text-paper/75">NOW STREAMING</p>
                <h3 className="mt-1 line-clamp-2 max-w-xl text-2xl font-black leading-tight text-paper">{main?.title || '나는 찬미 라이브'}</h3>
              </div>
              <div className="stream-equalizer absolute bottom-3 right-3 hidden items-end gap-1 rounded-lg bg-paper/90 px-2 py-1.5 sm:flex">
                {[1, 2, 3, 4, 5].map((bar) => (
                  <span key={bar} style={{ animationDelay: `${bar * 90}ms` }} />
                ))}
              </div>
            </div>

            <div className="mt-2 grid gap-2 lg:ml-2 lg:mt-0">
              {chatLines.map((chat, index) => (
                <div key={chat.name} className={`stream-chat-lane rounded-lg px-2.5 py-2 shadow-[0_8px_20px_rgba(230,0,63,0.08)] ${chat.tone}`} style={{ animationDelay: `${index * 180}ms` }}>
                  <p className="text-[10px] font-black text-cherry">{chat.name}</p>
                  <p className="mt-0.5 text-[11px] font-black leading-4">{chat.text}</p>
                </div>
              ))}
              <div className="rounded-lg bg-cherry p-2 text-paper shadow-glow">
                <p className="text-[10px] font-black text-paper/75">DONATION HEART</p>
                <p className="mt-1 text-sm font-black">방송 텐션 올라가는 순간</p>
              </div>
            </div>
          </a>

          <div className="grid gap-2">
            <div className="grid grid-cols-4 gap-2">
              {studioStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="stream-panel rounded-lg border border-cherry/20 bg-paper/95 p-2.5 shadow-[0_12px_28px_rgba(230,0,63,0.10)]">
                    <Icon aria-hidden className="h-4 w-4 text-cherry" />
                    <p className="mt-1 text-[9px] font-black text-cherry">{stat.label}</p>
                    <p className="mt-0.5 text-sm font-black text-ink">{stat.value}</p>
                  </div>
                );
              })}
            </div>

            <div className="stream-panel rounded-lg border border-cherry/20 bg-paper/95 p-3 shadow-lift">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[10px] font-black text-cherry">STREAM DECK</p>
                <Sparkles aria-hidden className="h-4 w-4 text-cherry sparkle-badge" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['LIVE START', 'NYAM CUT', 'COS PICK', 'FAN TALK'].map((label, index) => (
                  <span
                    key={label}
                    className={`grid min-h-12 place-items-center rounded-lg text-[10px] font-black shadow-[0_8px_18px_rgba(230,0,63,0.08)] ${
                      index % 2 === 0 ? 'bg-cherry text-paper' : 'bg-rosewash text-cherry'
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {clips.map((clip, index) => (
                <a key={clip.id} href={clip.href} target="_blank" rel="noopener noreferrer" className="group relative min-h-28 overflow-hidden rounded-lg bg-rosewash shadow-[0_12px_28px_rgba(230,0,63,0.10)]">
                  <SmartImage
                    src={clip.image}
                    fallbackSrc={clip.fallbackImage}
                    alt={`${clip.title} 클립`}
                    loading="lazy"
                    className="h-full w-full object-cover saturate-150 transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cherry/75 via-transparent to-transparent" />
                  <p className="absolute bottom-1.5 left-1.5 right-1.5 line-clamp-2 text-[10px] font-black leading-3 text-paper">
                    {index === 0 ? '핫클립' : index === 1 ? '리액션' : '다시보기'}
                  </p>
                </a>
              ))}
            </div>

            <div className="stream-panel rounded-lg border border-cherry/20 bg-cherry p-3 text-paper shadow-glow">
              <div className="flex items-center gap-2">
                <Flame aria-hidden className="h-5 w-5" />
                <p className="text-sm font-black">지금 찬미 방송 모드</p>
              </div>
              <div className="mt-2 flex gap-1.5">
                {[BarChart3, Zap, Heart].map((Icon, index) => (
                  <span key={index} className="inline-flex h-8 flex-1 items-center justify-center rounded-lg bg-paper/20">
                    <Icon aria-hidden className="h-4 w-4" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
