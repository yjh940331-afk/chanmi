import { Instagram, Mail, Radio, Sparkles, Utensils } from 'lucide-react';
import { site } from '../../content/site';
import { BrandMark } from './BrandMark';

export function Footer() {
  const links = [
    { label: '치지직', href: site.links.chzzk, icon: Radio },
    { label: 'Instagram', href: site.links.instagram, icon: Instagram },
    { label: '먹방 YouTube', href: site.links.youtubeNyam, icon: Utensils },
    { label: '문의', href: site.links.mail, icon: Mail },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-cherry/20 bg-paper text-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,79,147,.16),transparent_26%),linear-gradient(135deg,#fffafd_0%,#fff0f5_52%,#ffffff_100%)]" />
      <div className="stage-noise absolute inset-0 opacity-35" />

      <div className="section-shell relative grid gap-4 py-6 md:grid-cols-[1.05fr_1.25fr_0.7fr] md:items-center">
        <div className="rounded-lg border border-cherry/20 bg-paper/90 p-3 shadow-[0_14px_34px_rgba(230,0,63,0.10)]">
          <BrandMark size="lg" />
          <p className="mt-2 max-w-md text-xs font-bold leading-5 text-ink/60">{site.description}</p>
          <p className="mt-2 inline-flex min-h-6 items-center gap-1.5 rounded-lg bg-rosewash px-2 text-[10px] font-black text-cherry">
            <Sparkles aria-hidden className="h-3.5 w-3.5" />
            OFFICIAL FAN HUB
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="focus-ring idol-shine inline-flex min-h-16 flex-col items-start justify-center gap-1 rounded-lg border border-cherry/20 bg-paper/90 px-3 text-xs font-black text-ink shadow-[0_10px_24px_rgba(230,0,63,0.08)] hover:bg-rosewash"
              >
                <Icon aria-hidden className="h-4 w-4 text-cherry" />
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="rounded-lg bg-cherry p-3 text-paper shadow-glow">
          <p className="text-[10px] font-black text-paper/80">BUSINESS</p>
          <p className="mt-1 text-sm font-black leading-5">찬미와 어울리는 브랜드를 기다려요.</p>
          <a
            href={site.links.mail}
            className="focus-ring mt-3 inline-flex min-h-8 items-center gap-2 rounded-lg bg-paper px-3 text-xs font-black text-cherry"
          >
            <Mail aria-hidden className="h-3.5 w-3.5" />
            문의하기
          </a>
        </div>
      </div>
    </footer>
  );
}
