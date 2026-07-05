import type { PagesFunction } from '@cloudflare/workers-types';
import { isAdminRequest } from '../../lib/auth';
import { mapFanPost } from '../../lib/db';
import { error, json, optionsResponse } from '../../lib/response';
import type { Env, FanPostRow } from '../../lib/types';
import { isFanPostStatus } from '../../lib/validators';

export const onRequestOptions: PagesFunction<Env> = async () => optionsResponse();

export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
  if (!isAdminRequest(request, env)) {
    return error('관리자 권한이 필요합니다.', 401);
  }

  const url = new URL(request.url);
  const status = url.searchParams.get('status');

  try {
    const statement = isFanPostStatus(status)
      ? env.DB.prepare(
          `SELECT id, nickname, message, image_key, status, ip_hash, user_agent_hash, created_at, updated_at, deleted_at
           FROM fan_posts
           WHERE status = ? AND deleted_at IS NULL
           ORDER BY created_at DESC
           LIMIT 100`,
        ).bind(status)
      : env.DB.prepare(
          `SELECT id, nickname, message, image_key, status, ip_hash, user_agent_hash, created_at, updated_at, deleted_at
           FROM fan_posts
           WHERE deleted_at IS NULL
           ORDER BY created_at DESC
           LIMIT 100`,
        );

    const result = await statement.all<FanPostRow>();

    return json({
      items: (result.results || []).map(mapFanPost),
    });
  } catch {
    return error('관리자 목록을 불러오지 못했습니다.', 500);
  }
};

