import type { TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'focus-ring min-h-28 w-full resize-y rounded-lg border border-ink/20 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink/40',
        className,
      )}
      {...props}
    />
  );
}
