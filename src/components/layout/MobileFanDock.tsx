import { Camera, Heart, Mail, Radio } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { site } from '../../content/site';
import { cn } from '../../lib/cn';

const dockItems = [
  { label: '방송', href: site.links.chzzk, external: true, icon: Radio },
  { label: '사진', href: '/media', external: false, icon: Camera },
  { label: '응원', href: '/fan', external: false, icon: Heart },
  { label: '문의', href: site.links.mail, external: true, icon: Mail },
];

export function MobileFanDock() {
  const location = useLocation();

  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 rounded-lg border border-cherry/20 bg-paper/95 px-2 py-1.5 shadow-glow backdrop-blur-xl md:hidden" aria-label="덕질 빠른바">
      <div className="grid grid-cols-4 gap-1">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const active = !item.external && location.pathname === item.href;
          const className = cn(
            'focus-ring inline-flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-lg text-[10px] font-semibold transition',
            active ? 'bg-cherry text-paper shadow-glow' : 'text-cherry hover:bg-rosewash',
          );

          const content = (
            <>
              <Icon aria-hidden className={cn('h-4 w-4', item.label === '응원' && 'fill-current')} />
              <span>{item.label}</span>
            </>
          );

          return item.external ? (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className={className}
              aria-label={item.label}
            >
              {content}
            </a>
          ) : (
            <Link key={item.label} to={item.href} className={className} aria-label={item.label}>
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
