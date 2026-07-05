import { useEffect } from 'react';
import { ArrowRight, Instagram, Mail, Megaphone, Play, Radio, Sparkles } from 'lucide-react';
import { site } from '../content/site';

const adSlots = [
  {
    title: 'Live Read',
    meta: 'CHZZK',
    icon: Radio,
    copy: '방송 흐름 안에서 짧고 자연스럽게.',
  },
  {
    title: 'Shorts Cut',
    meta: 'YT / Reels',
    icon: Play,
    copy: '세로 영상에 맞춘 임팩트 컷.',
  },
  {
    title: 'Instagram',
    meta: '146K',
    icon: Instagram,
    copy: '비주얼 중심의 소셜 노출.',
  },
  {
    title: 'Package',
    meta: 'Mix',
    icon: Sparkles,
    copy: '라이브와 숏폼을 작게 묶어서.',
  },
];

export default function AdsPage() {
  useEffect(() => {
    document.title = 'Ads | 나는 찬미 Official';
  }, []);

  return (
    <main className="min-h-[calc(100vh-52px)] bg-rosewash text-ink">
      <section className="section-shell py-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex min-h-7 items-center gap-2 rounded-lg bg-cherry px-2.5 text-[11px] font-black text-paper shadow-glow">
              <Megaphone aria-hidden className="h-3.5 w-3.5 text-paper" />
              AD
            </p>
            <h1 className="mt-3 text-2xl font-black sm:text-3xl">광고 문의</h1>
            <p className="mt-2 max-w-xl text-sm font-bold leading-5 text-ink/60">방송 흐름에 맞춰 부담 없이, 예쁘게.</p>
          </div>
          <a
            href={site.links.mail}
            className="focus-ring inline-flex min-h-9 items-center justify-center gap-2 rounded-lg bg-cherry px-3 text-sm font-black text-paper shadow-glow"
          >
            <Mail aria-hidden className="h-4 w-4" />
            메일
            <ArrowRight aria-hidden className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {adSlots.map((slot) => {
            const Icon = slot.icon;
            return (
              <article key={slot.title} className="depth-card rounded-lg border border-cherry/20 bg-paper p-3 shadow-lift">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black text-cherry">{slot.meta}</p>
                    <h2 className="mt-1 text-base font-black">{slot.title}</h2>
                  </div>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cherry text-paper shadow-glow">
                    <Icon aria-hidden className="h-3.5 w-3.5" />
                  </span>
                </div>
                <p className="mt-3 text-xs font-bold leading-5 text-ink/60">{slot.copy}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-3 rounded-lg border border-cherry/20 bg-paper px-3 py-2 text-xs font-bold text-ink/70 shadow-lift">
          문의: {site.email}
        </div>
      </section>
    </main>
  );
}
