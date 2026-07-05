import { useEffect } from 'react';
import { ContactCTA } from '../components/home/ContactCTA';
import { CosplayRail } from '../components/home/CosplayRail';
import { FanUniverse } from '../components/home/FanUniverse';
import { FanPreview } from '../components/home/FanPreview';
import { GlobalStarRoom } from '../components/home/GlobalStarRoom';
import { HeroSection } from '../components/home/HeroSection';
import { LiveStudio } from '../components/home/LiveStudio';
import { MediaPreview } from '../components/home/MediaPreview';
import { SceneQuickNav } from '../components/home/SceneQuickNav';
import { SocialCards } from '../components/home/SocialCards';
import { VideoPreview } from '../components/home/VideoPreview';

export default function HomePage() {
  useEffect(() => {
    document.title = '나는 찬미 Official';

    const scrollToHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;

      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    };

    const frame = window.requestAnimationFrame(scrollToHash);
    const timer = window.setTimeout(scrollToHash, 420);

    window.addEventListener('hashchange', scrollToHash);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  return (
    <main className="bg-rosewash">
      <SceneQuickNav />

      <div id="hero" className="home-scene scene-reveal is-visible">
        <HeroSection />
      </div>

      <div id="studio" className="home-scene scene-reveal">
        <LiveStudio />
      </div>

      <div id="pass" className="home-scene scene-reveal">
        <FanUniverse />
      </div>

      <div id="star" className="home-scene scene-reveal">
        <GlobalStarRoom />
      </div>

      <section id="links" className="home-scene scene-reveal section-shell py-6">
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-black text-cherry">CHANNELS</p>
            <h2 className="mt-0.5 text-xl font-black text-ink sm:text-2xl">바로 꽂히는 링크</h2>
          </div>
          <p className="hidden text-xs font-bold text-ink/40 sm:block">CHZZK / IG / YT / FAN</p>
        </div>
        <SocialCards />
      </section>

      <div id="cosplay" className="home-scene scene-reveal">
        <CosplayRail />
      </div>

      <div id="media" className="home-scene scene-reveal">
        <MediaPreview />
      </div>

      <div id="play" className="home-scene scene-reveal">
        <VideoPreview />
      </div>

      <div id="fan" className="home-scene scene-reveal">
        <FanPreview />
      </div>

      <div id="contact" className="home-scene scene-reveal">
        <ContactCTA />
      </div>
    </main>
  );
}
