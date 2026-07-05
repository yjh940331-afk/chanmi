import type { SocialKey } from '../types';

const siteUrl = import.meta.env.VITE_PUBLIC_SITE_URL || 'https://www.chanmi.kr';
const assetBaseUrl = (import.meta.env.VITE_PUBLIC_ASSET_BASE_URL || '').replace(/\/$/, '');

export function mediaAsset(path: string) {
  const normalized = path.replace(/^\//, '');
  return assetBaseUrl ? `${assetBaseUrl}/${normalized}` : `/${normalized}`;
}

export const site = {
  name: '나는 찬미 Official',
  brand: '나는 찬미',
  tagline: '오늘도 찬며드는 중',
  description: '라이브, 먹방, 일상까지. 찬미의 모든 순간을 한 곳에서 만나보세요.',
  intro: '안녕하세요 스트리머 나는 찬미입니다.',
  country: '대한민국',
  email: 'songchanmi360@gmail.com',
  siteUrl,
  assetBaseUrl,
  links: {
    chzzk: 'https://chzzk.naver.com/168220afd14ade3dd2312cd5484f0013',
    instagram: 'https://instagram.com/chanmimimimimi',
    fanCafe: 'https://cafe.naver.com/chanmi94',
    youtubeNyam: 'https://youtube.com/@chanmimimimi_nyam?si=8uHBdt7x2YyEXC94',
    youtubeMain: 'https://www.youtube.com/@chanmimimimi',
    mail: 'mailto:songchanmi360@gmail.com',
  } satisfies Record<SocialKey, string>,
};

export const navItems = [
  { label: '홈', href: '/' },
  { label: '사진', href: '/media' },
  { label: '영상', href: '/videos' },
  { label: '팬월', href: '/fan' },
  { label: '광고', href: '/ads' },
  { label: '문의', href: '/#contact' },
];
