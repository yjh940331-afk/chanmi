import { businessThumbnail, channelCards, fanCafeThumbnail, youtubeVideos } from './youtube';
import type { MediaItem, VideoItem } from '../types';

/**
 * Central feed allocator for the home page.
 *
 * Every home section ultimately draws from the same `youtubeVideos` pool, which
 * made the same thumbnails repeat across sections (hero → fan → star → media …).
 * Here we hand out DISTINCT, non-overlapping slices in page order so each
 * section shows different content. Once a video is taken it can't appear again.
 */

const cosplayKeywords = ['코스프레', '메이드', '부산코믹월드', '얼굴 자랑', '나는짭미'];

const used = new Set<string>();

// Reserve the thumbnails that standalone cards (channel links, fan-cafe, business
// CTA) already use, so no scrolling section repeats those same clips — those cards
// stay their sole home.
const reservedImages = new Set<string>([
  ...channelCards.map((card) => card.image),
  businessThumbnail,
  fanCafeThumbnail,
]);
for (const video of youtubeVideos) {
  if (reservedImages.has(video.image)) used.add(video.id);
}

interface TakeOptions {
  prefer?: (item: VideoItem) => boolean;
  /** When true (default), top up with any remaining videos if `prefer` runs short. */
  fill?: boolean;
}

function take(count: number, { prefer, fill = true }: TakeOptions = {}): VideoItem[] {
  const out: VideoItem[] = [];

  const sweep = (test: (item: VideoItem) => boolean) => {
    for (const video of youtubeVideos) {
      if (out.length >= count) break;
      if (used.has(video.id) || !test(video)) continue;
      used.add(video.id);
      out.push(video);
    }
  };

  if (prefer) sweep(prefer);
  if (fill) sweep(() => true);

  return out;
}

function toMedia(video: VideoItem, index: number): MediaItem {
  return {
    id: `feed-${video.id}`,
    title: video.title,
    alt: `${video.title} 영상 썸네일`,
    src: video.image,
    href: video.href,
    width: 1280,
    height: 720,
    category: video.channel === 'nyam' ? 'mukbang' : index % 2 === 0 ? 'daily' : 'live',
    featured: true,
    source: 'youtube',
    quality: 'large',
    orientation: video.orientation,
  } satisfies MediaItem;
}

// Allocation order — cosplay is reserved first so its themed rail is never emptied
// by earlier sections; everything else follows top-to-bottom page order.
export const cosplayFeed = take(6, {
  prefer: (video) => cosplayKeywords.some((keyword) => video.title.includes(keyword)),
  fill: false,
});

export const heroFeed = take(4, { prefer: (video) => Boolean(video.featured) });

export const liveFeed = take(4, { prefer: (video) => video.kind === 'video' });

export const fanFeed = take(4);

const starGrid = take(3, { prefer: (video) => video.orientation === 'portrait' });
export const starWideDrop: VideoItem | undefined =
  take(1, { prefer: (video) => video.orientation !== 'portrait' })[0] ?? starGrid[0];
export const starFeed: MediaItem[] = starGrid.map(toMedia);

export const mediaFeed: MediaItem[] = take(3).map(toMedia);

export const videoFeed = take(youtubeVideos.length);
