import type { Env } from './types';

export function getAdminToken(request: Request) {
  const authorization = request.headers.get('Authorization');
  if (authorization?.startsWith('Bearer ')) {
    return authorization.slice('Bearer '.length).trim();
  }

  return new URL(request.url).searchParams.get('token') || '';
}

export function isAdminRequest(request: Request, env: Env) {
  const token = getAdminToken(request);
  return Boolean(env.ADMIN_TOKEN && token && token === env.ADMIN_TOKEN);
}

