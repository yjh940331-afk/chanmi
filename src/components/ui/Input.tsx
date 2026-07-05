import type { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'focus-ring min-h-9 w-full rounded-lg border border-ink/20 bg-white px-3 text-sm text-ink placeholder:text-ink/40 disabled:cursor-not-allowed disabled:bg-ink/5',
        className,
      )}
      {...props}
    />
  );
}
