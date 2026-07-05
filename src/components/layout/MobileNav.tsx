import { NavLink } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { navItems, site } from '../../content/site';
import { cn } from '../../lib/cn';
import { BrandMark } from './BrandMark';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <div
      className={cn(
        'fixed inset-x-0 top-[56px] z-40 border-b border-cherry/20 bg-paper/95 px-4 py-3 text-ink shadow-lift backdrop-blur-xl transition md:hidden',
        open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0',
      )}
    >
      <div className="mb-3 flex items-center justify-between rounded-lg bg-rosewash p-2">
        <BrandMark size="sm" />
        <span className="rounded-lg bg-paper px-2 py-1 text-[10px] font-semibold text-cherry">FAN HUB</span>
      </div>
      <nav className="grid grid-cols-2 gap-2" aria-label="모바일 내비게이션">
        {navItems.map((item) =>
          item.href.startsWith('/#') ? (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="focus-ring rounded-lg bg-rosewash px-3 py-2 text-sm font-semibold text-ink hover:bg-cherry/10"
            >
              {item.label}
            </a>
          ) : (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'focus-ring rounded-lg px-3 py-2 text-sm font-semibold hover:bg-cherry/10',
                  isActive ? 'bg-cherry text-paper' : 'bg-rosewash text-ink',
                )
              }
            >
              {item.label}
            </NavLink>
          ),
        )}
        <a
          href={site.links.chzzk}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring col-span-2 inline-flex min-h-9 items-center justify-center gap-2 rounded-lg bg-cherry px-4 text-sm font-semibold text-paper shadow-glow"
        >
          치지직
          <ExternalLink aria-hidden className="h-4 w-4" />
        </a>
      </nav>
    </div>
  );
}
