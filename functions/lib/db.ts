import type { FanPostRow } from './types';

export function mapFanPost(row: FanPostRow) {
  return {
    id: row.id,
    nickname: row.nickname,
    message: row.message,
    imageKey: row.image_key,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function clampNumber(value: string | null, fallback: number, min: number, max: number) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(Math.max(Math.trunc(parsed), min), max);
}

