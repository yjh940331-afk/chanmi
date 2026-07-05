import { Heart, Sparkles } from 'lucide-react';
import { site } from '../../content/site';
import { cn } from '../../lib/cn';

interface BrandMarkProps {
  compact?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClass = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-9 w-9 text-base',
  lg: 'h-12 w-12 text-xl',
};

export function BrandMark({ compact = false, size = 'md', className }: BrandMarkProps) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span
        className={cn(
          'brand-mark relative inline-flex shrink-0 items-center justify-center rounded-lg bg-cherry font-black text-paper shadow-glow',
          sizeClass[size],
        )}
        aria-hidden
      >
        <span className="relative z-10">찬</span>
        <Sparkles className="absolute right-0.5 top-0.5 h-3 w-3 text-paper" />
        <Heart className="absolute bottom-0.5 left-0.5 h-2.5 w-2.5 fill-current text-paper/80" />
      </span>
      {!compact ? (
        <span className="min-w-0">
          <span className="block text-sm font-black leading-none text-ink">{site.brand}</span>
          <span className="mt-0.5 block text-[10px] font-black leading-none text-cherry">PINK RED WHITE</span>
        </span>
      ) : null}
    </span>
  );
}
