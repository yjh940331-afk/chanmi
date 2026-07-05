import type { FanPostStatus } from './types';

const nicknameMin = 2;
const nicknameMax = 16;
const messageMin = 5;
const messageMax = 360;
const blockedKeywords = ['카지노', '도박', '대출', '성인', 'http://', 'https://', 'www.'];

export interface FanPostInput {
  nickname: string;
  message: string;
  imageKey?: string;
  turnstileToken?: string;
}

export function normalizeText(value: unknown) {
  return typeof value === 'string' ? value.trim().replace(/\s{3,}/g, ' ') : '';
}

export function validateFanPostInput(input: Partial<FanPostInput>) {
  const nickname = normalizeText(input.nickname);
  const message = normalizeText(input.message);
  const imageKey = normalizeText(input.imageKey) || null;

  if (nickname.length < nicknameMin || nickname.length > nicknameMax) {
    return { ok: false as const, error: '닉네임은 2자 이상 16자 이하로 입력해주세요.' };
  }

  if (message.length < messageMin || message.length > messageMax) {
    return { ok: false as const, error: '응원 메시지는 5자 이상 360자 이하로 입력해주세요.' };
  }

  const lowered = `${nickname} ${message}`.toLowerCase();
  if (blockedKeywords.some((keyword) => lowered.includes(keyword.toLowerCase()))) {
    return { ok: false as const, error: '응원 메시지에 사용할 수 없는 문구가 포함되어 있습니다.' };
  }

  return { ok: true as const, value: { nickname, message, imageKey } };
}

export function isFanPostStatus(value: unknown): value is FanPostStatus {
  return value === 'pending' || value === 'approved' || value === 'hidden';
}

