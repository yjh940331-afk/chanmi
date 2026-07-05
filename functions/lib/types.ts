export interface Env {
  DB: D1Database;
  MEDIA_BUCKET?: R2Bucket;
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_DEV_BYPASS?: string;
  ADMIN_TOKEN?: string;
  PUBLIC_SITE_URL?: string;
  PUBLIC_ASSET_BASE_URL?: string;
}

export type FanPostStatus = 'pending' | 'approved' | 'hidden';

export interface FanPostRow {
  id: string;
  nickname: string;
  message: string;
  image_key: string | null;
  status: FanPostStatus;
  ip_hash: string | null;
  user_agent_hash: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

