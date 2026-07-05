import { Mail } from 'lucide-react';
import { site } from '../../content/site';
import { businessThumbnail, businessThumbnailFallback } from '../../content/youtube';
import { AnchorButton } from '../ui/Button';
import { SmartImage } from '../media/SmartImage';

export function ContactCTA() {
  return (
    <section id="contact" className="scroll-mt-20 bg-paper py-8">
      <div className="section-shell grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <h2 className="text-2xl font-semibold sm:text-3xl">비즈니스 문의</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-ink/70">광고 / 협찬 / 출연 / 콜라보</p>
          <div className="mt-5">
            <AnchorButton href={site.links.mail} size="lg">
              <Mail aria-hidden className="h-4 w-4" />
              {site.email}
            </AnchorButton>
          </div>
        </div>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-rosewash shadow-lift">
          <SmartImage
            src={businessThumbnail}
            fallbackSrc={businessThumbnailFallback}
            alt="찬미 비즈니스 문의"
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
          />
        </div>
      </div>
    </section>
  );
}
