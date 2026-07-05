import { featuredVisuals, youtubeVideos } from './youtube';
import type { MediaItem } from '../types';

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

export const mediaItems: MediaItem[] = [...featuredVisuals, ...rssVisuals];

export const mediaCategories = [
  { value: 'all', label: 'ALL' },
  { value: 'live', label: 'LIVE' },
  { value: 'mukbang', label: 'NYAM' },
  { value: 'daily', label: 'CUT' },
  { value: 'fan', label: 'FAN' },
  { value: 'brand', label: 'BRAND' },
] as const;
