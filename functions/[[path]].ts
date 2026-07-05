import type { PagesFunction } from '@cloudflare/workers-types';
import type { Env } from './lib/types';

export const onRequestGet: PagesFunction<Env, 'path'> = async (context) => {
  const response = await context.next();

  if (response.status !== 404) {
    return response;
  }

  const accept = context.request.headers.get('Accept') || '';
  if (!accept.includes('text/html')) {
    return response;
  }

  const url = new URL(context.request.url);
  url.pathname = '/index.html';
  url.search = '';

  return context.env.ASSETS.fetch(new Request(url.toString(), context.request));
};

