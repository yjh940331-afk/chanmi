import { useEffect, useState } from 'react';
import { Camera, Heart, Play, Radio, Sparkles, Star, Ticket } from 'lucide-react';
import { cn } from '../../lib/cn';

const scenes = [
  { id: 'hero', label: 'TOP', icon: Sparkles },
  { id: 'studio', label: 'LIVE', icon: Radio },
  { id: 'pass', label: 'PASS', icon: Ticket },
  { id: 'star', label: 'STAR', icon: Star },
  { id: 'media', label: 'CUT', icon: Camera },
  { id: 'play', label: 'PLAY', icon: Play },
  { id: 'fan', label: 'FAN', icon: Heart },
];

export function SceneQuickNav() {
  const [activeScene, setActiveScene] = useState(scenes[0].id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('scene-ready');

    const sceneObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveScene(visible.target.id);
        }
      },
      { rootMargin: '-28% 0px -56% 0px', threshold: [0.12, 0.28, 0.5] },
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    scenes.forEach((scene) => {
      const element = document.getElementById(scene.id);
      if (element) {
        sceneObserver.observe(element);
      }
    });

    document.querySelectorAll('.scene-reveal').forEach((element) => {
      revealObserver.observe(element);
    });

    let frame = 0;
    const updateProgress = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0);
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      sceneObserver.disconnect();
      revealObserver.disconnect();
      root.classList.remove('scene-ready');
    };
  }, []);

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <nav className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-1 rounded-lg border border-cherry/20 bg-paper/90 p-1.5 shadow-glow backdrop-blur-xl lg:flex" aria-label="장면 이동">
        <div className="mb-1 h-16 w-1 overflow-hidden rounded-full bg-rosewash">
          <span className="block w-full rounded-full bg-gradient-to-b from-cherry via-blush to-candy" style={{ height: `${progress}%` }} />
        </div>
        {scenes.map((scene) => {
          const Icon = scene.icon;
          const active = activeScene === scene.id;

          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => jumpTo(scene.id)}
              className={cn(
                'focus-ring group relative inline-flex h-9 w-9 items-center justify-center rounded-lg transition',
                active ? 'bg-cherry text-paper shadow-glow' : 'text-cherry hover:bg-rosewash',
              )}
              aria-label={scene.label}
            >
              <Icon aria-hidden className={cn('h-4 w-4', scene.id === 'fan' && 'fill-current')} />
              <span className="pointer-events-none absolute right-11 top-1/2 hidden -translate-y-1/2 rounded-lg bg-cherry px-2 py-1 text-[10px] font-semibold text-paper shadow-glow group-hover:block">
                {scene.label}
              </span>
            </button>
          );
        })}
      </nav>

      <nav className="hide-scrollbar fixed inset-x-3 bottom-20 z-40 flex gap-1 overflow-x-auto rounded-lg border border-cherry/20 bg-paper/90 p-1.5 shadow-glow backdrop-blur-xl md:hidden" aria-label="장면 이동">
        {scenes.slice(0, 6).map((scene) => {
          const Icon = scene.icon;
          const active = activeScene === scene.id;

          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => jumpTo(scene.id)}
              className={cn(
                'focus-ring inline-flex min-h-8 min-w-14 flex-1 items-center justify-center gap-1 rounded-lg px-1.5 text-[9px] font-semibold transition',
                active ? 'bg-cherry text-paper shadow-glow' : 'text-cherry hover:bg-rosewash',
              )}
              aria-label={scene.label}
            >
              <Icon aria-hidden className="h-3.5 w-3.5" />
              {scene.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}
