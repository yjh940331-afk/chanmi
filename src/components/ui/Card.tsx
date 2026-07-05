import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('rounded-lg border border-ink/10 bg-white/80 shadow-lift backdrop-blur', className)}
      {...props}
    />
  );
}

