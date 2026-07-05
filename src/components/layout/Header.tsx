import { useState } from 'react';
import { ExternalLink, Menu, Radio, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { navItems, site } from '../../content/site';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { BrandMark } from './BrandMark';
import { MobileNav } from './MobileNav';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cherry/20 bg-paper/90 text-ink shadow-[0_8px_30px_rgba(166,90,114,0.08)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cherry/45 to-transparent" />
      <div className="section-shell flex min-h-[56px] items-center justify-between gap-3 lg:pl-20">
        <NavLink to="/" className="focus-ring inline-flex items-center rounded-lg">
          <BrandMark size="md" />
        </NavLink>

        <nav className="hidden items-center gap-1 rounded-lg border border-cherry/10 bg-rosewash/70 p-1 shadow-[0_10px_24px_rgba(166,90,114,0.08)] md:flex" aria-label="주요 내비게이션">
          {navItems.map((item) =>
            item.href.startsWith('/#') ? (
              <a
                key={item.href}
                href={item.href}
                className="focus-ring rounded-lg px-3 py-1.5 text-xs font-semibold text-ink/60 transition hover:bg-paper hover:text-cherry"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'focus-ring rounded-lg px-3 py-1.5 text-xs font-semibold transition',
                    isActive ? 'bg-cherry text-paper shadow-glow' : 'text-ink/60 hover:bg-paper hover:text-cherry',
                  )
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <span className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-cherry/20 bg-paper px-2.5 text-[10px] font-semibold text-cherry shadow-[0_10px_24px_rgba(166,90,114,0.08)]">
            <span className="h-2 w-2 rounded-full bg-cherry pulse-dot" />
            ON AIR
          </span>
          <a
            href={site.links.chzzk}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex min-h-8 items-center justify-center gap-1.5 rounded-lg bg-cherry px-3 text-xs font-semibold text-paper shadow-glow transition hover:bg-blush"
          >
            <Radio aria-hidden className="h-3.5 w-3.5" />
            치지직
            <ExternalLink aria-hidden className="h-3.5 w-3.5" />
          </a>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="md:hidden"
          aria-expanded={open}
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
        </Button>
      </div>
      <MobileNav open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
