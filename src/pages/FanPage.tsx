import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { FanPostForm } from '../components/fan/FanPostForm';
import { FanPostList } from '../components/fan/FanPostList';
import type { FanPost } from '../types';

export default function FanPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [pendingPost, setPendingPost] = useState<FanPost | null>(null);

  useEffect(() => {
    document.title = 'Fan Wall | 나는 찬미 Official';
  }, []);

  return (
    <main className="bg-rosewash">
      <section className="section-shell py-6 text-ink">
      <div className="mb-5 max-w-3xl">
        <p className="inline-flex min-h-7 items-center gap-2 rounded-lg bg-cherry px-2.5 text-[11px] font-semibold text-paper shadow-glow">
          <Heart aria-hidden className="h-3.5 w-3.5 fill-current" />
          Fan Wall
        </p>
        <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">응원 월</h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="grid gap-3">
          <FanPostForm
            onCreated={(post) => {
              setPendingPost(post);
              setRefreshKey((value) => value + 1);
            }}
          />
          {pendingPost ? (
            <article className="rounded-lg border border-cherry/20 bg-paper p-3 text-ink shadow-lift">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black text-cherry">승인 대기</p>
                  <h2 className="mt-1 text-sm font-black">{pendingPost.nickname}</h2>
                </div>
                <span className="rounded-lg bg-rosewash px-2 py-1 text-[10px] font-black text-cherry">PENDING</span>
              </div>
              <p className="mt-2 whitespace-pre-wrap break-words text-sm font-bold leading-5 text-ink/70">{pendingPost.message}</p>
              <p className="mt-2 text-[11px] font-bold text-ink/50">관리자 승인 후 공개 팬월에 표시됩니다.</p>
            </article>
          ) : null}
        </div>
        <FanPostList refreshKey={refreshKey} />
      </div>
      </section>
    </main>
  );
}
