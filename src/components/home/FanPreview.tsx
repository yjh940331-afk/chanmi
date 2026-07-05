import { ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FanPostList } from '../fan/FanPostList';

export function FanPreview() {
  return (
    <section className="section-shell py-6 text-ink">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex min-h-7 items-center gap-2 rounded-lg bg-cherry px-2.5 text-[11px] font-semibold text-paper shadow-glow">
            <Heart aria-hidden className="h-3.5 w-3.5 fill-current" />
            Fan Wall
          </p>
          <h2 className="mt-2 text-xl font-semibold sm:text-2xl">응원만 짧게</h2>
        </div>
        <Link
          to="/fan"
          className="focus-ring inline-flex min-h-8 items-center gap-2 self-start rounded-lg bg-cherry px-3 text-xs font-semibold text-paper shadow-glow"
        >
          남기기
          <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>
      <FanPostList limit={3} />
    </section>
  );
}
