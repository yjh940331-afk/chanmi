export function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json; charset=utf-8');

  return new Response(JSON.stringify(data), {
    ...init,
    headers,
  });
}

export function error(message: string, status = 400) {
  return json({ error: message }, { status });
}

export function optionsResponse() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: 'GET, POST, PATCH, DELETE, OPTIONS',
    },
  });
}

