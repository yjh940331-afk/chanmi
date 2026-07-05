import { cn } from '../../lib/cn';

interface BrandMarkProps {
  compact?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const badgeSize = {
  sm: 'h-8 w-8',
  md: 'h-9 w-9',
  lg: 'h-11 w-11',
};

/**
 * Soft heart monogram — cute but restrained. Replaces the old "찬" glyph
 * plus sparkle/heart clutter with a single gradient heart + lowercase wordmark.
 */
export function BrandMark({ compact = false, size = 'md', className }: BrandMarkProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'brand-mark relative inline-flex shrink-0 items-center justify-center rounded-2xl text-paper shadow-soft',
          badgeSize[size],
        )}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-1/2 w-1/2" fill="none" aria-hidden>
          <path
            d="M12 20.5C11.6 20.5 11.2 20.36 10.9 20.08C6.9 16.6 3.5 13.64 3.5 9.9C3.5 7.3 5.5 5.3 8 5.3C9.5 5.3 11 6.05 12 7.35C13 6.05 14.5 5.3 16 5.3C18.5 5.3 20.5 7.3 20.5 9.9C20.5 13.64 17.1 16.6 13.1 20.08C12.8 20.36 12.4 20.5 12 20.5Z"
            fill="currentColor"
          />
          <circle cx="8.6" cy="9.6" r="1.15" fill="#fbf8f6" opacity="0.85" />
        </svg>
      </span>
      {!compact ? (
        <span className="min-w-0 leading-none">
          <span className="block text-[17px] font-semibold tracking-tight text-ink">
            chanmi<span className="text-blush">.</span>
          </span>
          <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.32em] text-muted">
            Official
          </span>
        </span>
      ) : null}
    </span>
  );
}
