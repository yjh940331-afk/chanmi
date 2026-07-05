import { useState } from 'react';
import { ArrowRight, Bell, CalendarDays, HeartHandshake, Mail, PlayCircle, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scheduleItems, type ScheduleKind } from '../../content/schedule';
import { cn } from '../../lib/cn';

const kindIcons: Record<ScheduleKind, typeof Radio> = {
  live: Radio,
  upload: PlayCircle,
  fan: HeartHandshake,
  business: Mail,
};

export function ScheduleBoard() {
  const [activeId, setActiveId] = useState(scheduleItems[0].id);
  const active = scheduleItems.find((item) => item.id === activeId) ?? scheduleItems[0];
  const ActiveIcon = kindIcons[active.kind];

  const actionClass =
    'focus-ring inline-flex min-h-8 items-center justify-center gap-1.5 rounded-lg bg-cherry px-3 text-xs font-black text-paper shadow-glow transition hover:bg-blush';

  return (
    <section className="relative overflow-hidden bg-rosewash py-6 text-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(230,0,63,.16),transparent_26%),linear-gradient(135deg,#fffafd_0%,#fff0f5_48%,#ffffff_100%)]" />
      <div className="stage-noise absolute inset-0 opacity-45" />

      <div className="section-shell relative">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="inline-flex min-h-6 items-center gap-1.5 rounded-lg bg-cherry px-2 text-[10px] font-black text-paper shadow-glow">
              <CalendarDays aria-hidden className="h-3.5 w-3.5" />
              WEEKLY ROUTE
            </p>
            <h2 className="mt-2 text-xl font-black leading-tight sm:text-2xl">찬미 스케줄</h2>
          </div>
          <Bell aria-hidden className="hidden h-5 w-5 text-cherry sparkle-badge sm:block" />
        </div>

        <div className="grid gap-2 lg:grid-cols-[0.84fr_1.16fr]">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
            {scheduleItems.map((item) => {
              const Icon = kindIcons[item.kind];
              const selected = active.id === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={cn(
                    'focus-ring depth-card min-h-24 rounded-lg border p-2.5 text-left transition',
                    selected ? 'border-cherry/20 bg-cherry text-paper shadow-glow' : 'border-cherry/20 bg-paper text-ink shadow-lift hover:bg-rosewash',
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={cn('inline-flex h-8 w-8 items-center justify-center rounded-lg', selected ? 'bg-paper text-cherry' : 'bg-rosewash text-cherry')}>
                      <Icon aria-hidden className="h-4 w-4" />
                    </span>
                    <span className={cn('rounded-lg px-2 py-1 text-[9px] font-black', selected ? 'bg-paper/20 text-paper' : 'bg-cherry text-paper')}>
                      {item.day}
                    </span>
                  </div>
                  <p className={cn('mt-2 text-[10px] font-black', selected ? 'text-paper/75' : 'text-cherry')}>{item.time}</p>
                  <h3 className="mt-0.5 text-sm font-black leading-4">{item.title}</h3>
                </button>
              );
            })}
          </div>

          <div className="stream-panel rounded-lg border border-cherry/20 bg-paper/95 p-3 shadow-lift">
            <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
              <div>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-cherry text-paper shadow-glow">
                  <ActiveIcon aria-hidden className="h-5 w-5" />
                </span>
                <p className="mt-3 text-[10px] font-black text-cherry">{active.day} / {active.time}</p>
                <h3 className="mt-1 text-2xl font-black leading-tight text-ink">{active.title}</h3>
                <p className="mt-2 max-w-xl text-sm font-bold leading-5 text-ink/70">{active.copy}</p>
              </div>

              <div className="grid content-between gap-2 rounded-lg bg-rosewash p-3">
                <div className="grid grid-cols-2 gap-1.5 text-center text-[10px] font-black text-cherry">
                  {['LIVE', 'NYAM', 'FAN', 'AD'].map((label) => (
                    <span key={label} className="rounded-lg bg-paper px-2 py-2 shadow-[0_8px_18px_rgba(230,0,63,0.08)]">
                      {label}
                    </span>
                  ))}
                </div>

                {active.external ? (
                  <a href={active.href} target="_blank" rel="noopener noreferrer" className={actionClass}>
                    {active.action}
                    <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <Link to={active.href} className={actionClass}>
                    {active.action}
                    <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
