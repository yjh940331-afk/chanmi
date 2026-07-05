import { useEffect, useState } from 'react';
import { fetchFanPosts } from '../../lib/api';
import type { FanPost } from '../../types';
import { Button } from '../ui/Button';
import { FanPostCard } from './FanPostCard';

const fallbackPosts: FanPost[] = [
  {
    id: 'sample-1',
    nickname: '찬며든 팬',
    message: '오늘도 방송 켜줘서 고마워요. 맛있는 거 먹고 오래오래 즐겁게 방송해요!',
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sample-2',
    nickname: '냠냠단',
    message: '먹방 볼 때마다 하루가 조금 더 좋아지는 느낌이에요. 늘 응원합니다.',
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

interface FanPostListProps {
  limit?: number;
  refreshKey?: number;
}

export function FanPostList({ limit = 9, refreshKey = 0 }: FanPostListProps) {
  const [posts, setPosts] = useState<FanPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    setPage(1);

    fetchFanPosts(1, limit)
      .then((data) => {
        if (cancelled) {
          return;
        }
        setPosts(data.items);
        setHasMore(data.hasMore);
      })
      .catch((requestError: Error) => {
        if (cancelled) {
          return;
        }
        setError(requestError.message);
        setPosts(fallbackPosts.slice(0, Math.min(limit, fallbackPosts.length)));
        setHasMore(false);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [limit, refreshKey]);

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    try {
      const data = await fetchFanPosts(nextPage, limit);
      setPosts((current) => [...current, ...data.items]);
      setHasMore(data.hasMore);
      setPage(nextPage);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : '불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error ? (
        <p className="mb-3 rounded-lg bg-gold/35 px-3 py-2 text-xs font-bold text-ink/70">
          {error}
        </p>
      ) : null}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <FanPostCard key={post.id} post={post} />
        ))}
      </div>
      {!loading && posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-ink/20 bg-white px-4 py-6 text-center">
          <p className="font-semibold">아직 공개된 응원이 없어요.</p>
          <p className="mt-1 text-xs text-ink/60">첫 응원은 관리자 승인 후 이곳에 보여집니다.</p>
        </div>
      ) : null}
      {hasMore ? (
        <div className="mt-4 flex justify-center">
          <Button type="button" variant="secondary" onClick={loadMore} disabled={loading}>
            더 보기
          </Button>
        </div>
      ) : null}
    </div>
  );
}
