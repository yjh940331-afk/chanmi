import { Home, Image, Instagram, Mail, Megaphone, Play, Radio, Sparkles, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { site } from '../../content/site';
import { cn } from '../../lib/cn';
import { BrandMark } from './BrandMark';

const pageLinks = [
  { label: '홈', href: '/', icon: Home },
  { label: '사진', href: '/media', icon: Image },
  { label: '영상', href: '/videos', icon: Play },
  { label: '팬월', href: '/fan', icon: Users },
  { label: '광고', href: '/ads', icon: Megaphone },
];

const socialLinks = [
  { label: 'Chzzk', href: site.links.chzzk, icon: Radio },
  { label: 'Instagram', href: site.links.instagram, icon: Instagram },
  { label: 'Business', href: site.links.mail, icon: Mail },
];

export function Sidebar() {
  return (
    <aside className="fixed bottom-0 left-0 top-[56px] z-40 hidden w-[72px] border-r border-cherry/20 bg-paper/90 text-ink shadow-[8px_0_30px_rgba(239,90,136,0.08)] backdrop-blur-xl lg:flex lg:flex-col lg:items-center lg:justify-between lg:py-3">
      <div className="flex flex-col items-center gap-3">
        <NavLink to="/" className="focus-ring rounded-lg" aria-label={site.brand}>
          <BrandMark compact size="sm" />
        </NavLink>
        <nav className="flex flex-col gap-1 rounded-lg border border-cherry/10 bg-rosewash/70 p-1" aria-label="사이드 내비게이션">
        {pageLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              title={item.label}
              aria-label={item.label}
              className={({ isActive }) =>
                cn(
                  'focus-ring group relative inline-flex h-10 w-10 items-center justify-center rounded-lg transition',
                  isActive ? 'bg-cherry text-paper shadow-glow' : 'text-ink/60 hover:bg-cherry/10 hover:text-cherry',
                )
              }
            >
              <Icon aria-hidden className="h-4 w-4" />
              <span className="pointer-events-none absolute left-12 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-cherry px-2 py-1 text-[10px] font-semibold text-paper shadow-glow group-hover:block">
                {item.label}
              </span>
            </NavLink>
          );
        })}
        </nav>
      </div>

      <div className="flex flex-col items-center gap-2 rounded-lg border border-cherry/10 bg-paper p-2 shadow-[0_10px_24px_rgba(239,90,136,0.08)]">
        <Sparkles aria-hidden className="h-4 w-4 text-cherry sparkle-badge" />
        <div className="h-14 w-px bg-gradient-to-b from-cherry via-blush to-transparent" />
        <span className="-rotate-90 whitespace-nowrap text-[9px] font-semibold text-cherry">CHANMI</span>
      </div>

      <nav className="flex flex-col gap-1 rounded-lg border border-cherry/10 bg-rosewash/70 p-1" aria-label="소셜 바로가기">
        {socialLinks.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.href}
              href={item.href}
              target={item.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              title={item.label}
              aria-label={item.label}
              className="focus-ring group relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink/60 transition hover:bg-blush hover:text-paper"
            >
              <Icon aria-hidden className="h-4 w-4" />
              <span className="pointer-events-none absolute left-12 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-cherry px-2 py-1 text-[10px] font-semibold text-paper shadow-glow group-hover:block">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
