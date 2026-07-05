import { cosplayFeed } from '../../content/homeFeed';
import { SmartImage } from '../media/SmartImage';

export function CosplayRail() {
  const items = cosplayFeed;

  if (!items.length) return null;

  return (
    <section className="section-shell py-7 text-ink">
      <div className="mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blush">Cosplay</p>
        <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">캐릭터 컷</h2>
      </div>

      <div className="rail">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring depth-card group relative h-44 w-32 overflow-hidden rounded-xl border border-line bg-paper shadow-soft sm:w-36"
          >
            <SmartImage
              src={item.image}
              fallbackSrc={item.fallbackImage}
              alt={`${item.title} 썸네일`}
              className="absolute inset-0 h-full w-full object-cover saturate-100 transition duration-500 group-hover:scale-[1.05]"
              compactClassName="absolute inset-0 h-full w-full object-contain p-4 saturate-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/72 via-ink/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-2.5">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-paper/70">{item.kind?.toUpperCase()}</p>
              <h3 className="mt-0.5 line-clamp-2 text-xs font-semibold leading-4 text-paper">{item.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
