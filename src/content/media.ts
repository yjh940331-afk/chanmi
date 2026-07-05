import { mediaAsset } from './site';
import { featuredVisuals, youtubeVideos } from './youtube';
import type { MediaItem } from '../types';

const localMood: MediaItem[] = [
  {
    id: 'brand-live-card',
    title: 'LIVE',
    alt: '찬미 라이브 브랜드 그래픽',
    src: mediaAsset('visuals/chanmi-live.svg'),
    width: 1200,
    height: 1500,
    category: 'live',
    featured: false,
    source: 'local',
    quality: 'compact',
    orientation: 'portrait',
  },
  {
    id: 'brand-nyam-card',
    title: 'NYAM',
    alt: '찬미 먹방 브랜드 그래픽',
    src: mediaAsset('visuals/chanmi-nyam.svg'),
    width: 1200,
    height: 1000,
    category: 'mukbang',
    featured: false,
    source: 'local',
    quality: 'compact',
    orientation: 'landscape',
  },
];

const rssVisuals: MediaItem[] = youtubeVideos.slice(0, 18).map((item, index) => ({
  id: `rss-${item.id}`,
  title: item.title,
  alt: `${item.title} 영상 썸네일`,
  src: item.image,
  href: item.href,
  width: 1280,
  height: 720,
  category: item.channel === 'nyam' ? 'mukbang' : index % 3 === 0 ? 'live' : 'daily',
  featured: index < 6,
  source: 'youtube',
  quality: index < 6 ? 'large' : 'compact',
  orientation: item.orientation,
}));

export const mediaItems: MediaItem[] = [...featuredVisuals, ...rssVisuals, ...localMood];

export const mediaCategories = [
  { value: 'all', label: 'ALL' },
  { value: 'live', label: 'LIVE' },
  { value: 'mukbang', label: 'NYAM' },
  { value: 'daily', label: 'CUT' },
  { value: 'fan', label: 'FAN' },
  { value: 'brand', label: 'BRAND' },
] as const;
