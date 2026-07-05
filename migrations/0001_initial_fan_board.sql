CREATE TABLE IF NOT EXISTS fan_posts (
  id TEXT PRIMARY KEY,
  nickname TEXT NOT NULL,
  message TEXT NOT NULL,
  image_key TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  ip_hash TEXT,
  user_agent_hash TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_fan_posts_status_created_at
ON fan_posts(status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_fan_posts_ip_created_at
ON fan_posts(ip_hash, created_at DESC);

CREATE TABLE IF NOT EXISTS fan_post_reports (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  reporter_hash TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (post_id) REFERENCES fan_posts(id)
);

CREATE INDEX IF NOT EXISTS idx_fan_post_reports_post_id
ON fan_post_reports(post_id);

