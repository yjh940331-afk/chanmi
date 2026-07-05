import type { MediaItem, VideoItem } from '../types';

const mainChannel = 'https://www.youtube.com/@chanmimimimimi';
const nyamChannel = 'https://www.youtube.com/@chanmimimimi_nyam';

export function youtubeThumbnail(videoId: string, quality: 'max' | 'hq' = 'max') {
  return `https://i.ytimg.com/vi/${videoId}/${quality === 'max' ? 'maxresdefault' : 'hqdefault'}.jpg`;
}

// Real high-res photos used by standalone UI cards (business CTA, fan-cafe link).
// These replace the old AI-looking placeholder SVGs and are reserved out of the
// home feed rotation (see homeFeed.ts) so they don't repeat across sections.
export const businessThumbnail = youtubeThumbnail('JRpz4mmVoEg');
export const businessThumbnailFallback = youtubeThumbnail('JRpz4mmVoEg', 'hq');
export const fanCafeThumbnail = youtubeThumbnail('1N4gKcN0S4U');
export const fanCafeThumbnailFallback = youtubeThumbnail('1N4gKcN0S4U', 'hq');

const mainVideos: VideoItem[] = [
  ['BLLz176m5io', '가슴이 좋은거잖아', 'shorts', 35159, 894, '2026-06-29'],
  ['QaSxvPZvD-g', '변태 여캠', 'shorts', 21559, 599, '2026-06-26'],
  ['nhSWuIaT5hs', '나는찬미 코스프레 월드컵', 'video', 5264, 140, '2026-06-24'],
  ['xeXZ3hJOkKo', '나는짭미', 'video', 585, 5, '2026-06-23'],
  ['PvNqYG_H6GQ', '모에모에 큥♥ 일일 메이드 체험', 'video', 5606, 163, '2026-06-20'],
  ['0GsWaGRQYXI', '찬미스테리', 'video', 2168, 62, '2026-06-09'],
  ['1N4gKcN0S4U', '260517 부산코믹월드', 'shorts', 28522, 534, '2026-05-28'],
  ['gXsOGk3xuKc', '나랑 같이 씻을래..?', 'shorts', 69613, 1035, '2026-05-26'],
  ['g2O_CWTf920', '육수들에게 쓰는 편지', 'shorts', 22997, 423, '2026-05-24'],
  ['Wr94qgvrLVA', '방송 중 레전드 순간', 'shorts', 11489, 200, '2026-05-21'],
  ['uFQ30r6p5TI', '악플러가 돼버린 전남친', 'video', 9665, 220, '2026-05-18'],
  ['VA_AWH0XzKU', '고자가 취향인사람', 'shorts', 18628, 287, '2026-05-06'],
  ['JRpz4mmVoEg', '꼬우면 니들도 화장하던가', 'shorts', 39383, 466, '2026-04-22'],
  ['8md1v71kg4Q', '얼굴 자랑하려고 올리는 영상', 'shorts', 49897, 498, '2026-04-18'],
  ['8_DDMKcz96E', '나 93년생 아니라고..', 'shorts', 40068, 527, '2026-04-14'],
].map(([id, title, kind, views, likes, publishedAt]) => {
  const videoId = String(id);
  const videoKind = kind as 'shorts' | 'video';
  return {
    id: `main-${videoId}`,
    title: String(title),
    platform: 'YouTube',
    href:
      videoKind === 'shorts'
        ? `https://www.youtube.com/shorts/${videoId}`
        : `https://www.youtube.com/watch?v=${videoId}`,
    image: youtubeThumbnail(videoId, 'max'),
    fallbackImage: youtubeThumbnail(videoId, 'hq'),
    channel: 'main',
    publishedAt: String(publishedAt),
    views: Number(views),
    likes: Number(likes),
    kind: videoKind,
    orientation: videoKind === 'shorts' ? 'portrait' : 'landscape',
    featured: ['gXsOGk3xuKc', '8md1v71kg4Q', 'nhSWuIaT5hs', 'BLLz176m5io'].includes(videoId),
  } satisfies VideoItem;
});

const nyamVideos: VideoItem[] = [
  ['XNYUfiLD6Uo', '다이어트 둘째 날', 1365, 2, '2026-07-04'],
  ['LWz94AnfWCg', '다이어트 첫째 날', 2023, 1, '2026-07-04'],
  ['dxmWuhoc2q4', '소금빵빵', 775, 9, '2026-06-15'],
  ['drWJwf1JTSo', '두유 만들기', 1910, 8, '2026-06-12'],
  ['ztTJpRjPl6Q', '버섯전골', 1516, 8, '2026-06-10'],
  ['4_adbR4N-nM', '팬미팅 때 받은 쿠키', 108, 3, '2026-06-08'],
  ['NO_Kl5cxhxA', '❤', 871, 9, '2026-06-08'],
  ['j7_P9D0bdWM', '마라엽떡', 1229, 10, '2026-06-05'],
  ['X7U8D4kWx9s', '후르츠산도 휘낭시에 불닭', 1719, 15, '2026-06-02'],
  ['CzoHMpFgrFc', '생일케이쿠', 994, 12, '2026-06-01'],
  ['LuwcKu9Q1L8', '킹타이거새우장', 1374, 12, '2026-05-31'],
  ['RxoCAqfwCx4', '크림중당 킬바사', 1134, 19, '2026-05-22'],
  ['eSQpMVIo6Sg', '콜라땅콩', 376, 7, '2026-05-22'],
  ['JbyBDyDofX4', '허대빵 사빠딸 베이글 산도', 469, 8, '2026-05-21'],
  ['iScX-GVxb5U', '허대빵 두바이샌드 먹뱅', 905, 6, '2026-05-19'],
].map(([id, title, views, likes, publishedAt]) => {
  const videoId = String(id);
  return {
    id: `nyam-${videoId}`,
    title: String(title),
    platform: 'YouTube',
    href: `https://www.youtube.com/shorts/${videoId}`,
    image: youtubeThumbnail(videoId, 'max'),
    fallbackImage: youtubeThumbnail(videoId, 'hq'),
    channel: 'nyam',
    publishedAt: String(publishedAt),
    views: Number(views),
    likes: Number(likes),
    kind: 'shorts',
    orientation: 'portrait',
    featured: ['XNYUfiLD6Uo', 'LWz94AnfWCg', 'X7U8D4kWx9s', 'RxoCAqfwCx4'].includes(videoId),
  } satisfies VideoItem;
});

export const youtubeVideos = [...mainVideos, ...nyamVideos].sort(
  (a, b) => new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime(),
);

export const featuredVisuals = youtubeVideos
  .filter((item) => item.featured)
  .slice(0, 8)
  .map(
    (item, index) =>
      ({
        id: `visual-${item.id}`,
        title: item.title,
        alt: `${item.title} 영상 썸네일`,
        src: item.image,
        href: item.href,
        width: 1280,
        height: 720,
        category: item.channel === 'nyam' ? 'mukbang' : index % 2 === 0 ? 'daily' : 'live',
        featured: index < 4,
        source: 'youtube',
        quality: index < 4 ? 'hero' : 'large',
        orientation: item.orientation,
      }) satisfies MediaItem,
  );

export const channelCards: VideoItem[] = [
  {
    id: 'channel-chzzk',
    title: '치지직 LIVE',
    platform: 'CHZZK',
    href: 'https://chzzk.naver.com/168220afd14ade3dd2312cd5484f0013',
    image: youtubeThumbnail('gXsOGk3xuKc', 'max'),
    fallbackImage: youtubeThumbnail('gXsOGk3xuKc', 'hq'),
    channel: 'live',
    kind: 'live',
    featured: true,
    orientation: 'portrait',
  },
  {
    id: 'channel-instagram',
    title: 'Instagram 146K',
    platform: 'Instagram',
    href: 'https://instagram.com/chanmimimimimi',
    image: youtubeThumbnail('8md1v71kg4Q', 'max'),
    fallbackImage: youtubeThumbnail('8md1v71kg4Q', 'hq'),
    channel: 'social',
    kind: 'social',
    featured: true,
    orientation: 'portrait',
  },
  {
    id: 'channel-main',
    title: '나는찬미 YouTube',
    platform: 'YouTube',
    href: mainChannel,
    image: youtubeThumbnail('nhSWuIaT5hs', 'max'),
    fallbackImage: youtubeThumbnail('nhSWuIaT5hs', 'hq'),
    channel: 'main',
    kind: 'video',
    featured: true,
    orientation: 'landscape',
  },
  {
    id: 'channel-nyam',
    title: '나는찬미 냠냠',
    platform: 'YouTube',
    href: nyamChannel,
    image: youtubeThumbnail('XNYUfiLD6Uo', 'max'),
    fallbackImage: youtubeThumbnail('XNYUfiLD6Uo', 'hq'),
    channel: 'nyam',
    kind: 'shorts',
    featured: true,
    orientation: 'portrait',
  },
];
