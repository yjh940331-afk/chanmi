import { site } from './site';
import type { SocialKey } from '../types';

export interface SocialItem {
  key: SocialKey;
  label: string;
  eyebrow: string;
  description: string;
  href: string;
  cta: string;
}

export const socials: SocialItem[] = [
  {
    key: 'chzzk',
    label: '치지직',
    eyebrow: 'Live',
    description: '실시간으로 만나는 찬미의 방송 시간.',
    href: site.links.chzzk,
    cta: '보러가기',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    eyebrow: 'Daily',
    description: '사진, 일상, 짧은 순간들을 가장 빠르게.',
    href: site.links.instagram,
    cta: '팔로우',
  },
  {
    key: 'youtubeNyam',
    label: '먹방 YouTube',
    eyebrow: 'Mukbang',
    description: '맛있는 순간들을 모아둔 찬미 먹방 채널.',
    href: site.links.youtubeNyam,
    cta: '구독하기',
  },
  {
    key: 'fanCafe',
    label: '팬카페',
    eyebrow: 'Community',
    description: '팬들과 함께 오래 남길 수 있는 공간.',
    href: site.links.fanCafe,
    cta: '입장하기',
  },
];

