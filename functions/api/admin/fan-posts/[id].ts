import type { PagesFunction } from '@cloudflare/workers-types';
import { isAdminRequest } from '../../../lib/auth';
import { mapFanPost } from '../../../lib/db';
import { error, json, optionsResponse } from '../../../lib/response';
import type { Env, FanPostRow } from '../../../lib/types';
import { isFanPostStatus } from '../../../lib/validators';

type RouteParams = 'id';

function getId(value: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export const onRequestOptions: PagesFunction<Env, RouteParams> = async () => optionsResponse();

export const onRequestPatch: PagesFunction<Env, RouteParams> = async ({ env, request, params }) => {
  if (!isAdminRequest(request, env)) {
    return error('관리자 권한이 필요합니다.', 401);
  }

  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return error('요청 형식이 올바르지 않습니다.', 400);
  }

  if (!isFanPostStatus(body.status)) {
    return error('변경할 수 없는 상태입니다.', 400);
  }

  const now = new Date().toISOString();
  const id = getId(params.id);

  try {
    await env.DB.prepare(
      `UPDATE fan_posts
       SET status = ?, updated_at = ?
       WHERE id = ? AND deleted_at IS NULL`,
    )
      .bind(body.status, now, id)
      .run();

    const row = await env.DB.prepare(
      `SELECT id, nickname, message, image_key, status, ip_hash, user_agent_hash, created_at, updated_at, deleted_at
       FROM fan_posts
       WHERE id = ? AND deleted_at IS NULL`,
    )
      .bind(id)
      .first<FanPostRow>();

    if (!row) {
      return error('메시지를 찾을 수 없습니다.', 404);
    }

    return json({ item: mapFanPost(row) });
  } catch {
    return error('메시지 상태를 변경하지 못했습니다.', 500);
  }
};

export const onRequestDelete: PagesFunction<Env, RouteParams> = async ({ env, request, params }) => {
  if (!isAdminRequest(request, env)) {
    return error('관리자 권한이 필요합니다.', 401);
  }

  const now = new Date().toISOString();
  const id = getId(params.id);

  try {
    await env.DB.prepare(
      `UPDATE fan_posts
       SET status = 'hidden', deleted_at = ?, updated_at = ?
       WHERE id = ? AND deleted_at IS NULL`,
    )
      .bind(now, now, id)
      .run();

    return json({ ok: true });
  } catch {
    return error('메시지를 삭제하지 못했습니다.', 500);
  }
};
