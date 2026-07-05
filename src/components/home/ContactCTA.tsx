import { Mail, Sparkles } from 'lucide-react';
import { site } from '../../content/site';
import { AnchorButton } from '../ui/Button';

export function ContactCTA() {
  return (
    <section id="contact" className="scroll-mt-20 bg-paper py-6">
      <div className="section-shell grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="inline-flex min-h-7 items-center gap-2 rounded-lg bg-cherry px-2.5 text-xs font-semibold text-paper shadow-glow">
            <Sparkles aria-hidden className="h-3.5 w-3.5 text-paper" />
            Business
          </p>
          <h2 className="mt-3 text-xl font-semibold sm:text-2xl">비즈니스 문의</h2>
          <p className="mt-2 max-w-xl text-sm leading-5 text-ink/70">광고 / 협찬 / 출연 / 콜라보</p>
          <div className="mt-4">
            <AnchorButton href={site.links.mail} size="md">
              <Mail aria-hidden className="h-4 w-4" />
              {site.email}
            </AnchorButton>
          </div>
        </div>
        <img
          src="/visuals/chanmi-contact.svg"
          alt="찬미 비즈니스 문의 브랜드 이미지"
          loading="lazy"
          className="max-h-64 w-full rounded-lg border border-cherry/20 object-cover shadow-lift"
        />
      </div>
    </section>
  );
}
