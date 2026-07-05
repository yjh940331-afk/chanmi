import { site } from './site';

export type ScheduleKind = 'live' | 'upload' | 'fan' | 'business';

export interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  title: string;
  copy: string;
  action: string;
  href: string;
  external: boolean;
  kind: ScheduleKind;
}

export const scheduleItems: ScheduleItem[] = [
  {
    id: 'live-check',
    day: 'LIVE',
    time: '치지직 알림',
    title: '라이브 체크',
    copy: '방송이 켜지는 순간 바로 들어갈 수 있게 치지직 알림과 팬카페 공지를 묶어둡니다.',
    action: '알림 켜기',
    href: site.links.chzzk,
    external: true,
    kind: 'live',
  },
  {
    id: 'nyam-upload',
    day: 'NYAM',
    time: '업로드 루트',
    title: '냠냠 업로드',
    copy: '먹방 영상과 리액션 컷은 냠냠 채널로 바로 이어지게 정리했습니다.',
    action: '냠냠 보기',
    href: site.links.youtubeNyam,
    external: true,
    kind: 'upload',
  },
  {
    id: 'fan-talk',
    day: 'FAN',
    time: '상시 오픈',
    title: '팬톡 & 응원',
    copy: '응원글은 접수 후 관리자 승인으로 공개됩니다. 팬들이 남긴 메시지도 같은 공간에서 확인합니다.',
    action: '응원 남기기',
    href: '/fan',
    external: false,
    kind: 'fan',
  },
  {
    id: 'business',
    day: 'AD',
    time: '문의 가능',
    title: '광고 / 협업',
    copy: '먹방, 뷰티, 게임, 코스프레 협업 문의는 비즈니스 메일과 광고 페이지로 연결합니다.',
    action: '광고 보기',
    href: '/ads',
    external: false,
    kind: 'business',
  },
];
