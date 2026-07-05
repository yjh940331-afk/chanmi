import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { FanPostForm } from '../components/fan/FanPostForm';
import { FanPostList } from '../components/fan/FanPostList';

export default function FanPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    document.title = 'Fan Wall | 나는 찬미 Official';
  }, []);

  return (
    <main className="bg-rosewash">
      <section className="section-shell py-6 text-ink">
      <div className="mb-5 max-w-3xl">
        <p className="inline-flex min-h-7 items-center gap-2 rounded-lg bg-cherry px-2.5 text-[11px] font-black text-paper shadow-glow">
          <Heart aria-hidden className="h-3.5 w-3.5 fill-current" />
          Fan Wall
        </p>
        <h1 className="mt-3 text-2xl font-black sm:text-3xl">응원 월</h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <FanPostForm onCreated={() => setRefreshKey((value) => value + 1)} />
        <FanPostList refreshKey={refreshKey} />
      </div>
      </section>
    </main>
  );
}
