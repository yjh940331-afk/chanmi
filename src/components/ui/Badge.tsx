import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex min-h-6 items-center rounded-lg bg-ink px-2.5 text-[11px] font-bold text-paper',
        className,
      )}
      {...props}
    />
  );
}
