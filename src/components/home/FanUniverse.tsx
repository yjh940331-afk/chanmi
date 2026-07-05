import { useState } from 'react';
import {
  Bell,
  CalendarDays,
  Camera,
  ChevronRight,
  Crown,
  Flame,
  Gift,
  Heart,
  HeartHandshake,
  Lock,
  MessageCircle,
  Radio,
  ScanLine,
  Send,
  ShoppingBag,
  Sparkles,
  Star,
  Ticket,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { site } from '../../content/site';
import { fanFeed } from '../../content/homeFeed';
import { SmartImage } from '../media/SmartImage';

const fanTools = [
  {
    icon: CalendarDays,
    label: 'SCHEDULE',
    title: '오늘의 찬미',
    copy: '라이브, 업로드, 팬카페 흐름을 한눈에.',
    meta: 'LIVE / NYAM / NOTICE',
    tone: 'bg-cherry text-paper',
  },
  {
    icon: ScanLine,
    label: 'PASSPORT',
    title: '팬 스탬프',
    copy: '방송 보고, 댓글 남기고, 오늘도 출석.',
    meta: '4 STAMPS',
    tone: 'bg-paper text-cherry',
  },
  {
    icon: Camera,
    label: 'PHOTO',
    title: '포토카드 컷',
    copy: '코스프레와 셀카 무드를 카드처럼 모아보기.',
    meta: 'COS / DAILY',
    tone: 'bg-paper text-cherry',
  },
  {
    icon: ShoppingBag,
    label: 'BRAND',
    title: '광고 패키지',
    copy: '먹방, 뷰티, 게임 협업을 예쁘게 연결.',
    meta: 'MAIL OPEN',
    tone: 'bg-cherry text-paper',
  },
];

const missions = [
  { label: 'LIVE CHECK', value: '치지직 알림 켜기', icon: Radio },
  { label: 'FAN POST', value: '응원글 남기기', icon: HeartHandshake },
  { label: 'DROP SAVE', value: '최애 컷 저장', icon: Star },
];

const fanRoutes = [
  { label: '방송', title: '라이브 입장', href: site.links.chzzk, external: true, icon: Radio, tone: 'bg-cherry text-paper' },
  { label: '컷', title: '최애 사진', href: '/media', external: false, icon: Camera, tone: 'bg-paper text-cherry' },
  { label: '응원', title: '팬월 쓰기', href: '/fan', external: false, icon: Heart, tone: 'bg-paper text-cherry' },
  { label: '먹방', title: '냠냠 보기', href: site.links.youtubeNyam, external: true, icon: Gift, tone: 'bg-cherry text-paper' },
];

const moodTabs = [
  {
    id: 'live',
    label: 'LIVE',
    title: '라이브 달리는 날',
    copy: '치지직 알림 켜고, 팬월에 오늘의 한마디 남기기.',
    cta: '방송 입장',
    href: site.links.chzzk,
    external: true,
    icon: Radio,
  },
  {
    id: 'nyam',
    label: 'NYAM',
    title: '냠냠 저장소',
    copy: '먹방 컷, 리액션, 썸네일까지 빠르게 모아보기.',
    cta: '냠냠 보기',
    href: site.links.youtubeNyam,
    external: true,
    icon: Gift,
  },
  {
    id: 'cos',
    label: 'COS',
    title: '코스프레 무드',
    copy: '세로 컷과 포토카드를 골라 팬심 앨범처럼 보기.',
    cta: '사진 보기',
    href: '/media',
    external: false,
    icon: Sparkles,
  },
];

const bubbleMessages = [
  { role: 'chanmi', text: '오늘 라이브는 빨간 조명으로 갈게요.', meta: 'LIVE 9:20' },
  { role: 'fan', text: '알림 켜두고 기다리는 중', meta: 'READ' },
  { role: 'chanmi', text: '냠냠 편집본 먼저 올려둘게요.', meta: 'NEW' },
];

const supporterTiers = [
  { name: 'PINK', perk: '월간 편지', detail: '팬톡 / 알림', icon: MessageCircle },
  { name: 'RED', perk: '선공개 컷', detail: '포토 / 메이킹', icon: Lock },
  { name: 'WHITE', perk: '후원 리워드', detail: '광고 / 이벤트', icon: Crown },
];

export function FanUniverse() {
  const [activeMood, setActiveMood] = useState(moodTabs[0].id);
  const mainDrop = fanFeed[0];
  const miniDrops = fanFeed.slice(1, 5);
  const lockedDrops = fanFeed.slice(2, 5);
  const mood = moodTabs.find((item) => item.id === activeMood) ?? moodTabs[0];
  const MoodIcon = mood.icon;

  return (
    <section className="relative overflow-hidden bg-paper py-6 text-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,134,172,.18),transparent_28%),linear-gradient(120deg,#fffbfa_0%,#fff0f3_48%,#ffffff_100%)]" />
      <div className="stage-noise absolute inset-0 opacity-55" />

      <div className="section-shell relative">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex min-h-6 items-center gap-1.5 rounded-lg bg-cherry px-2 text-[10px] font-semibold text-paper shadow-glow">
              <Sparkles aria-hidden className="h-3.5 w-3.5" />
              OFFICIAL FAN HUB
            </p>
            <h2 className="mt-2 text-xl font-semibold leading-tight text-ink sm:text-2xl">찬미 패스포트</h2>
          </div>
          <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-cherry">
            {['PINK', 'RED', 'WHITE'].map((item) => (
              <span key={item} className="rounded-lg border border-cherry/20 bg-paper/80 px-2 py-1 shadow-[0_8px_20px_rgba(239,90,136,0.08)]">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-2 grid gap-2 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="fan-ticket rounded-lg border border-cherry/20 bg-paper/95 p-3 shadow-lift">
            <div className="mb-2 flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] font-semibold text-cherry">TODAY ROUTE</p>
                <h3 className="text-lg font-semibold leading-tight text-ink">오늘의 덕질 루트</h3>
              </div>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-cherry text-paper shadow-glow">
                <Flame aria-hidden className="h-5 w-5" />
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
              {fanRoutes.map((route) => {
                const Icon = route.icon;
                const content = (
                  <>
                    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${route.tone}`}>
                      <Icon aria-hidden className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[9px] font-semibold text-cherry">{route.label}</span>
                      <span className="block text-xs font-semibold leading-4 text-ink">{route.title}</span>
                    </span>
                    <ChevronRight aria-hidden className="ml-auto h-3.5 w-3.5 text-cherry" />
                  </>
                );

                return route.external ? (
                  <a
                    key={route.label}
                    href={route.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring idol-shine inline-flex min-h-16 items-center gap-2 rounded-lg border border-cherry/20 bg-rosewash px-2 shadow-[0_10px_22px_rgba(239,90,136,0.08)]"
                  >
                    {content}
                  </a>
                ) : (
                  <Link
                    key={route.label}
                    to={route.href}
                    className="focus-ring idol-shine inline-flex min-h-16 items-center gap-2 rounded-lg border border-cherry/20 bg-rosewash px-2 shadow-[0_10px_22px_rgba(239,90,136,0.08)]"
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="fan-ticket rounded-lg border border-cherry/20 bg-paper/95 p-3 shadow-lift">
            <div className="mb-2 flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] font-semibold text-cherry">MY PICK</p>
                <h3 className="text-lg font-semibold leading-tight text-ink">내 최애 모드</h3>
              </div>
              <span className="sparkle-badge inline-flex min-h-8 items-center gap-1.5 rounded-lg bg-cherry px-2 text-[10px] font-semibold text-paper shadow-glow">
                <Heart aria-hidden className="h-3.5 w-3.5 fill-current" />
                FAN
              </span>
            </div>
            <div className="mb-2 grid grid-cols-3 gap-1.5">
              {moodTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveMood(tab.id)}
                  className={`focus-ring min-h-8 rounded-lg text-[10px] font-semibold transition ${
                    activeMood === tab.id ? 'bg-cherry text-paper shadow-glow' : 'bg-rosewash text-cherry'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="rounded-lg bg-rosewash p-2.5">
              <div className="flex items-start gap-2">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-paper text-cherry shadow-[0_8px_20px_rgba(239,90,136,0.10)]">
                  <MoodIcon aria-hidden className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-ink">{mood.title}</h4>
                  <p className="mt-0.5 text-[11px] font-bold leading-4 text-ink/60">{mood.copy}</p>
                </div>
              </div>
              {mood.external ? (
                <a
                  href={mood.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-2 inline-flex min-h-7 items-center gap-1.5 rounded-lg bg-cherry px-2 text-[10px] font-semibold text-paper shadow-glow"
                >
                  {mood.cta}
                  <ChevronRight aria-hidden className="h-3.5 w-3.5" />
                </a>
              ) : (
                <Link
                  to={mood.href}
                  className="focus-ring mt-2 inline-flex min-h-7 items-center gap-1.5 rounded-lg bg-cherry px-2 text-[10px] font-semibold text-paper shadow-glow"
                >
                  {mood.cta}
                  <ChevronRight aria-hidden className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-2 lg:grid-cols-[0.82fr_1.18fr]">
          <a
            href={mainDrop?.href || site.links.chzzk}
            target="_blank"
            rel="noopener noreferrer"
            className="depth-card idol-shine group grid overflow-hidden rounded-lg border border-cherry/20 bg-paper shadow-lift sm:grid-cols-[0.92fr_1.08fr]"
          >
            <div className="relative h-40 overflow-hidden bg-rosewash sm:h-auto sm:min-h-full">
              {mainDrop ? (
                <SmartImage
                  src={mainDrop.image}
                  fallbackSrc={mainDrop.fallbackImage}
                  alt={`${mainDrop.title} 썸네일`}
                  className="h-full w-full object-cover saturate-100 transition duration-700 group-hover:scale-105"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-cherry/65 via-transparent to-paper/10" />
              <div className="absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-lg bg-paper/90 px-2 py-1 text-[10px] font-semibold text-cherry shadow-glow">
                <span className="h-2 w-2 rounded-full bg-cherry pulse-dot" />
                LIVE SIGNAL
              </div>
            </div>

            <div className="relative p-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cherry text-paper shadow-glow">
                  <Ticket aria-hidden className="h-4 w-4" />
                </span>
                <span className="rounded-lg bg-rosewash px-2 py-1 text-[10px] font-semibold text-cherry">CHANMI 94</span>
              </div>
              <p className="text-[10px] font-semibold text-cherry">PASSPORT</p>
              <h3 className="mt-1 text-xl font-semibold leading-none text-ink">I AM CHANMI</h3>
              <p className="mt-2 text-[11px] font-bold leading-4 text-ink/60">라이브, 먹방, 코스프레, 팬심을 한 장의 패스로 모으는 공식 허브.</p>

              <div className="mt-3 grid grid-cols-4 gap-1.5">
                {['LIVE', 'NYAM', 'COS', 'FAN'].map((stamp) => (
                  <span
                    key={stamp}
                    className="grid min-h-10 place-items-center rounded-lg border border-cherry/20 bg-rosewash text-[10px] font-semibold text-cherry"
                  >
                    {stamp}
                  </span>
                ))}
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-rosewash">
                <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-cherry via-blush to-candy" />
              </div>
            </div>
          </a>

          <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
            {fanTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.label} className="depth-card idol-shine rounded-lg border border-cherry/20 bg-paper p-2.5 shadow-[0_14px_34px_rgba(239,90,136,0.10)]">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${tool.tone}`}>
                      <Icon aria-hidden className="h-4 w-4" />
                    </span>
                    <span className="text-[10px] font-semibold text-cherry">{tool.label}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-ink">{tool.title}</h3>
                  <p className="mt-1 min-h-8 text-[11px] font-bold leading-4 text-ink/60">{tool.copy}</p>
                  <p className="mt-2 rounded-lg bg-rosewash px-2 py-1 text-[10px] font-semibold text-cherry">{tool.meta}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-2 grid gap-2 lg:grid-cols-[0.74fr_1.26fr]">
          <div className="grid grid-cols-3 gap-2">
            {missions.map((mission) => {
              const Icon = mission.icon;
              return (
                <Link
                  key={mission.label}
                  to={mission.label === 'FAN POST' ? '/fan' : '/videos'}
                  className="focus-ring depth-card rounded-lg border border-cherry/20 bg-paper px-2 py-2.5 text-center shadow-[0_10px_24px_rgba(239,90,136,0.08)]"
                >
                  <Icon aria-hidden className="mx-auto h-4 w-4 text-cherry" />
                  <p className="mt-1 text-[9px] font-semibold text-cherry">{mission.label}</p>
                  <p className="mt-0.5 text-[11px] font-semibold leading-4 text-ink">{mission.value}</p>
                </Link>
              );
            })}
          </div>

          <div className="marquee rounded-lg border border-cherry/20 bg-cherry py-2 text-paper shadow-glow">
            <div className="gap-2 px-2">
              {[...miniDrops, ...miniDrops].map((item, index) => (
                <a
                  key={`${item.id}-${index}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-w-[210px] items-center gap-2 rounded-lg bg-paper/95 px-2 py-1.5 text-ink"
                >
                  <span className="relative h-11 w-16 overflow-hidden rounded-lg bg-rosewash">
                    <SmartImage
                      src={item.image}
                      fallbackSrc={item.fallbackImage}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover saturate-100"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[9px] font-semibold text-cherry">NEW DROP</span>
                    <span className="line-clamp-1 text-xs font-semibold">{item.title}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="hide-scrollbar mt-2 flex snap-x gap-2 overflow-x-auto pb-1 lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:overflow-visible lg:pb-0">
          <div className="depth-card idol-shine min-w-[300px] snap-start rounded-lg border border-cherry/20 bg-paper p-3 shadow-[0_14px_34px_rgba(239,90,136,0.10)] lg:min-w-0">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="inline-flex min-h-7 items-center gap-1.5 rounded-lg bg-cherry px-2 text-[10px] font-semibold text-paper shadow-glow">
                <MessageCircle aria-hidden className="h-3.5 w-3.5" />
                찬미톡
              </span>
              <span className="text-[10px] font-semibold text-cherry">PRIVATE MOOD</span>
            </div>
            <div className="space-y-1.5">
              {bubbleMessages.map((message) => (
                <div
                  key={`${message.role}-${message.text}`}
                  className={`flex ${message.role === 'fan' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] rounded-lg px-2.5 py-2 shadow-[0_8px_18px_rgba(239,90,136,0.08)] ${
                      message.role === 'fan' ? 'bg-cherry text-paper' : 'bg-rosewash text-ink'
                    }`}
                  >
                    <p className="text-[11px] font-semibold leading-4">{message.text}</p>
                    <p className={`mt-0.5 text-[9px] font-semibold ${message.role === 'fan' ? 'text-paper/70' : 'text-cherry'}`}>
                      {message.meta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-2 rounded-lg border border-cherry/20 bg-rosewash px-2 py-1.5">
              <span className="min-w-0 flex-1 text-[10px] font-bold text-ink/50">찬미에게 보내는 오늘의 한마디</span>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-cherry text-paper">
                <Send aria-hidden className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>

          <div className="depth-card idol-shine min-w-[332px] snap-start rounded-lg border border-cherry/20 bg-paper p-3 shadow-[0_14px_34px_rgba(239,90,136,0.10)] lg:min-w-0">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="inline-flex min-h-7 items-center gap-1.5 rounded-lg bg-cherry px-2 text-[10px] font-semibold text-paper shadow-glow">
                <Lock aria-hidden className="h-3.5 w-3.5" />
                서포터 룸
              </span>
              <span className="text-[10px] font-semibold text-cherry">MEMBER DROP</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {supporterTiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <div key={tier.name} className="rounded-lg border border-cherry/20 bg-rosewash p-2">
                    <Icon aria-hidden className="h-3.5 w-3.5 text-cherry" />
                    <p className="mt-1 text-[10px] font-semibold text-cherry">{tier.name}</p>
                    <p className="mt-0.5 text-[11px] font-semibold leading-4 text-ink">{tier.perk}</p>
                    <p className="mt-0.5 text-[9px] font-bold text-ink/45">{tier.detail}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {lockedDrops.map((item, index) => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative min-h-24 overflow-hidden rounded-lg bg-rosewash"
                >
                  <SmartImage
                    src={item.image}
                    fallbackSrc={item.fallbackImage}
                    alt={`${item.title} 선공개 컷`}
                    loading="lazy"
                    className="h-full w-full object-cover saturate-100 transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cherry/80 via-cherry/10 to-transparent" />
                  <div className="absolute left-1.5 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-paper/95 text-cherry">
                    <Lock aria-hidden className="h-3 w-3" />
                  </div>
                  <p className="absolute bottom-1.5 left-1.5 right-1.5 line-clamp-2 text-[10px] font-semibold leading-3 text-paper">
                    {index === 0 ? '선공개 컷' : index === 1 ? '메이킹' : '월간 포토'}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          <a
            href={site.links.mail}
            className="focus-ring inline-flex min-h-8 items-center gap-2 rounded-lg bg-cherry px-3 text-xs font-semibold text-paper shadow-glow"
          >
            <Gift aria-hidden className="h-4 w-4" />
            광고 문의
          </a>
          <a
            href={site.links.chzzk}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex min-h-8 items-center gap-2 rounded-lg bg-paper px-3 text-xs font-semibold text-cherry shadow-[0_10px_24px_rgba(239,90,136,0.12)]"
          >
            <Bell aria-hidden className="h-4 w-4" />
            라이브 알림
          </a>
        </div>
      </div>
    </section>
  );
}
