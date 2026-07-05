import { Heart } from 'lucide-react';
import { formatDate } from '../../lib/dates';
import type { FanPost } from '../../types';

interface FanPostCardProps {
  post: FanPost;
}

export function FanPostCard({ post }: FanPostCardProps) {
  return (
    <article className="rounded-lg border border-ink/10 bg-white p-4 shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-black">{post.nickname}</h3>
          <p className="mt-1 text-xs font-bold text-ink/50">{formatDate(post.createdAt)}</p>
        </div>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blush text-paper">
          <Heart aria-hidden className="h-3.5 w-3.5 fill-current" />
        </span>
      </div>
      <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-ink/70">{post.message}</p>
    </article>
  );
}
