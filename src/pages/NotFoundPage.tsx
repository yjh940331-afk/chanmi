import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = '페이지를 찾을 수 없습니다 | 나는 찬미 Official';
  }, []);

  return (
    <main className="section-shell flex min-h-[58vh] items-center py-16">
      <div>
        <p className="text-sm font-semibold text-blush">404</p>
        <h1 className="mt-3 text-4xl font-semibold">페이지를 찾을 수 없습니다.</h1>
        <Link
          to="/"
          className="focus-ring mt-7 inline-flex min-h-11 items-center gap-2 rounded-lg bg-cherry px-4 text-sm font-semibold text-paper shadow-glow"
        >
          <ArrowLeft aria-hidden className="h-4 w-4" />
          홈으로
        </Link>
      </div>
    </main>
  );
}
