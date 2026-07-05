import { useState } from 'react';
import { cn } from '../../lib/cn';

interface SmartImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  compactClassName?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
}

export function SmartImage({
  src,
  fallbackSrc,
  alt,
  className,
  compactClassName,
  loading = 'lazy',
  width,
  height,
}: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isCompact, setIsCompact] = useState(false);

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      width={width}
      height={height}
      decoding="async"
      referrerPolicy="no-referrer"
      className={cn('bg-rosewash', isCompact && compactClassName ? compactClassName : className)}
      onLoad={(event) => {
        const image = event.currentTarget;
        setIsCompact(currentSrc === fallbackSrc || image.naturalWidth < 800);
      }}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setIsCompact(true);
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
