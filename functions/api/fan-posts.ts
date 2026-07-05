import type { PagesFunction } from '@cloudflare/workers-types';
import { clampNumber, mapFanPost } from '../lib/db';
import { getClientIp, sha256 } from '../lib/hash';
import { isRateLimited } from '../lib/rate-limit';
import { error, json, optionsResponse } from '../lib/response';
import { verifyTurnstile } from '../lib/turnstile';
import type { Env, FanPostRow } from '../lib/types';
import { validateFanPostInput } from '../lib/validators';

export const onRequestOptions: PagesFunction<Env> = async () => optionsResponse();

export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
  const url = new URL(request.url);
  const page = clampNumber(url.searchParams.get('page'), 1, 1, 1000);
  const limit = clampNumber(url.searchParams.get('limit'), 12, 1, 30);
  const offset = (page - 1) * limit;

  try {
    const result = await env.DB.prepare(
      `SELECT id, nickname, message, image_key, status, ip_hash, user_agent_hash, created_at, updated_at, deleted_at
       FROM fan_posts
       WHERE status = 'approved' AND deleted_at IS NULL
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
    )
      .bind(limit + 1, offset)
      .all<FanPostRow>();

    const rows = result.results || [];
    const items = rows.slice(0, limit).map(mapFanPost);

    return json({
      items,
      page,
      limit,
      hasMore: rows.length > limit,
    });
  } catch {
    return error('팬 응원 목록을 불러오지 못했습니다.', 500);
  }
};

export const onRequestPost: PagesFunction<Env> = async ({ env, request }) => {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return error('요청 형식이 올바르지 않습니다.', 400);
  }

  const validation = validateFanPostInput(body);
  if (!validation.ok) {
    return error(validation.error, 400);
  }

  const ip = getClientIp(request);
  const salt = env.ADMIN_TOKEN || env.PUBLIC_SITE_URL || 'chanmi';
  const ipHash = ip ? await sha256(ip, salt) : null;
  const userAgent = request.headers.get('User-Agent') || '';
  const userAgentHash = userAgent ? await sha256(userAgent, salt) : null;

  if (await isRateLimited(env.DB, ipHash)) {
    return error('잠시 후 다시 응원을 남겨주세요.', 429);
  }

  const turnstile = await verifyTurnstile(env, String(body.turnstileToken || ''), ip);
  if (!turnstile.ok) {
    return error(turnstile.error || '봇 방지 확인에 실패했습니다.', 403);
  }

  const now = new Date().toISOString();
  const id = crypto.randomUUID();

  try {
    await env.DB.prepare(
      `INSERT INTO fan_posts
       (id, nickname, message, image_key, status, ip_hash, user_agent_hash, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'pending', ?, ?, ?, ?)`,
    )
      .bind(
        id,
        validation.value.nickname,
        validation.value.message,
        validation.value.imageKey,
        ipHash,
        userAgentHash,
        now,
        now,
      )
      .run();

    return json(
      {
        message: '응원이 접수되었습니다. 관리자 확인 후 공개됩니다.',
        item: {
          id,
          nickname: validation.value.nickname,
          message: validation.value.message,
          imageKey: validation.value.imageKey,
          status: 'pending',
          createdAt: now,
          updatedAt: now,
        },
      },
      { status: 201 },
    );
  } catch {
    return error('응원을 저장하지 못했습니다.', 500);
  }
};

