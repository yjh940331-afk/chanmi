export async function isRateLimited(db: D1Database, ipHash: string | null) {
  if (!ipHash) {
    return false;
  }

  const windowStart = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const row = await db
    .prepare(
      `SELECT COUNT(*) AS count
       FROM fan_posts
       WHERE ip_hash = ? AND created_at >= ? AND deleted_at IS NULL`,
    )
    .bind(ipHash, windowStart)
    .first<{ count: number }>();

  return Number(row?.count || 0) >= 3;
}

