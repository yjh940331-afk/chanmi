export type SocialKey = 'chzzk' | 'instagram' | 'youtubeNyam' | 'youtubeMain' | 'fanCafe' | 'mail';

export type MediaCategory = 'live' | 'mukbang' | 'daily' | 'fan' | 'brand';

export interface MediaItem {
  id: string;
  title: string;
  alt: string;
  src: string;
  href?: string;
  width: number;
  height: number;
  category: MediaCategory;
  featured: boolean;
  source?: 'youtube' | 'instagram' | 'chzzk' | 'local';
  quality?: 'hero' | 'large' | 'compact';
  orientation?: 'portrait' | 'landscape';
}

export interface VideoItem {
  id: string;
  title: string;
  description?: string;
  platform: 'YouTube' | 'CHZZK' | 'Instagram' | 'Fan Cafe';
  href: string;
  image: string;
  fallbackImage?: string;
  channel?: 'main' | 'nyam' | 'live' | 'social';
  publishedAt?: string;
  views?: number;
  likes?: number;
  kind?: 'shorts' | 'video' | 'live' | 'social';
  featured?: boolean;
  orientation?: 'portrait' | 'landscape';
}

export type FanPostStatus = 'pending' | 'approved' | 'hidden';

export interface FanPost {
  id: string;
  nickname: string;
  message: string;
  imageKey?: string | null;
  status: FanPostStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedFanPosts {
  items: FanPost[];
  page: number;
  limit: number;
  hasMore: boolean;
}
