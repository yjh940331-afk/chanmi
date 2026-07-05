import { Coffee, Instagram, Radio, Users, Utensils } from 'lucide-react';
import { channelCards, fanCafeThumbnail, fanCafeThumbnailFallback } from '../../content/youtube';
import { site } from '../../content/site';
import { SmartImage } from '../media/SmartImage';

const iconMap = {
  CHZZK: Radio,
  Instagram,
  YouTube: Utensils,
  'Fan Cafe': Users,
};

export function SocialCards() {
  const cards = [
    ...channelCards,
    {
      id: 'fan-cafe',
      title: 'Fan Cafe',
      platform: 'Fan Cafe' as const,
      href: site.links.fanCafe,
      image: fanCafeThumbnail,
      fallbackImage: fanCafeThumbnailFallback,
      channel: 'social' as const,
      kind: 'social' as const,
    },
  ];

  return (
    <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-5">
      {cards.map((item) => {
        const Icon = iconMap[item.platform] || Coffee;
        return (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring depth-card group relative min-h-36 overflow-hidden rounded-lg border border-cherry/20 bg-paper text-ink shadow-lift sm:min-h-40"
          >
            <SmartImage
              src={item.image}
              fallbackSrc={item.fallbackImage}
              alt={`${item.title} 썸네일`}
              className="absolute inset-0 h-full w-full object-cover opacity-76 saturate-100 transition duration-500 group-hover:scale-110 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/40 to-transparent" />
            <div className="absolute left-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cherry text-paper shadow-glow">
              <Icon aria-hidden className="h-3.5 w-3.5" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2.5">
              <p className="text-[10px] font-semibold uppercase text-cherry">{item.platform}</p>
              <h3 className="mt-0.5 line-clamp-1 text-sm font-semibold text-ink">{item.title}</h3>
            </div>
          </a>
        );
      })}
    </div>
  );
}
