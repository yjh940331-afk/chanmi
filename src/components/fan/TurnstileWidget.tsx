import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'compact' | 'flexible';
        },
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

const scriptId = 'cloudflare-turnstile-script';

interface TurnstileWidgetProps {
  onTokenChange: (token: string) => void;
}

export function TurnstileWidget({ onTokenChange }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [ready, setReady] = useState(false);
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

  useEffect(() => {
    if (!siteKey) {
      onTokenChange('');
      return;
    }

    const existing = document.getElementById(scriptId);
    if (existing) {
      setReady(true);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => setReady(true);
    document.head.appendChild(script);
  }, [onTokenChange, siteKey]);

  useEffect(() => {
    if (!siteKey || !ready || !containerRef.current || !window.turnstile || widgetIdRef.current) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: 'light',
      size: 'flexible',
      callback: onTokenChange,
      'expired-callback': () => onTokenChange(''),
      'error-callback': () => onTokenChange(''),
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [onTokenChange, ready, siteKey]);

  if (!siteKey) {
    return (
      <div className="rounded-lg border border-ink/10 bg-ink/5 px-4 py-3 text-sm font-bold text-ink/60">
        확인 완료
      </div>
    );
  }

  return <div ref={containerRef} className="min-h-[65px]" />;
}
