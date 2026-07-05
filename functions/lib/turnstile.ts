import type { Env } from './types';

interface TurnstileResponse {
  success: boolean;
  'error-codes'?: string[];
}

export async function verifyTurnstile(env: Env, token: string | undefined, remoteIp: string) {
  if (env.TURNSTILE_DEV_BYPASS === 'true') {
    return { ok: true };
  }

  if (!env.TURNSTILE_SECRET_KEY) {
    return { ok: false, error: 'Turnstile secret이 설정되지 않았습니다.' };
  }

  if (!token) {
    return { ok: false, error: '봇 방지 확인을 완료해주세요.' };
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: remoteIp || undefined,
      idempotency_key: crypto.randomUUID(),
    }),
  });

  if (!response.ok) {
    return { ok: false, error: '봇 방지 확인을 검증하지 못했습니다.' };
  }

  const data = (await response.json()) as TurnstileResponse;

  if (!data.success) {
    return { ok: false, error: '봇 방지 확인이 만료되었거나 올바르지 않습니다.' };
  }

  return { ok: true };
}

