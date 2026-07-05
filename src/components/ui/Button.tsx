import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'bg-cherry text-paper shadow-glow hover:bg-blush',
  secondary: 'bg-paper text-ink ring-1 ring-cherry/20 hover:bg-rosewash',
  ghost: 'bg-transparent text-ink hover:bg-cherry/10',
  dark: 'bg-paper text-cherry ring-1 ring-cherry/20 hover:bg-rosewash',
};

const sizes: Record<Size, string> = {
  sm: 'min-h-8 px-2.5 text-xs',
  md: 'min-h-9 px-3 text-sm',
  lg: 'min-h-10 px-4 text-sm',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'focus-ring inline-flex items-center justify-center gap-2 rounded-lg font-bold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export interface AnchorButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  external?: boolean;
  children: ReactNode;
}

export function AnchorButton({
  className,
  variant = 'primary',
  size = 'md',
  external,
  children,
  ...props
}: AnchorButtonProps) {
  return (
    <a
      className={cn(
        'focus-ring inline-flex items-center justify-center gap-2 rounded-lg font-bold transition duration-200',
        variants[variant],
        sizes[size],
        className,
      )}
      target={external ? '_blank' : props.target}
      rel={external ? 'noopener noreferrer' : props.rel}
      {...props}
    >
      {children}
      {external ? <ExternalLink aria-hidden className="h-4 w-4" /> : null}
    </a>
  );
}
