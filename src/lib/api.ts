import type { FanPost, FanPostStatus, PaginatedFanPosts } from '../types';

interface ApiErrorBody {
  error?: string;
}

async function requestJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    let body: ApiErrorBody = {};
    try {
      body = (await response.json()) as ApiErrorBody;
    } catch {
      body = {};
    }
    throw new Error(body.error || '요청을 처리하지 못했습니다.');
  }

  return response.json() as Promise<T>;
}

export function fetchFanPosts(page = 1, limit = 12) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  return requestJson<PaginatedFanPosts>(`/api/fan-posts?${params.toString()}`);
}

export function createFanPost(input: {
  nickname: string;
  message: string;
  imageKey?: string;
  turnstileToken?: string;
}) {
  return requestJson<{ item: FanPost; message: string }>('/api/fan-posts', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function fetchAdminFanPosts(token: string, status?: FanPostStatus | 'all') {
  const params = new URLSearchParams();
  if (status && status !== 'all') {
    params.set('status', status);
  }
  const suffix = params.toString() ? `?${params.toString()}` : '';

  return requestJson<{ items: FanPost[] }>(`/api/admin/fan-posts${suffix}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updateAdminFanPost(token: string, id: string, status: FanPostStatus) {
  return requestJson<{ item: FanPost }>(`/api/admin/fan-posts/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
}

export function deleteAdminFanPost(token: string, id: string) {
  return requestJson<{ ok: true }>(`/api/admin/fan-posts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

