import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { MobileFanDock } from '../components/layout/MobileFanDock';
import { Sidebar } from '../components/layout/Sidebar';

function RouteFallback() {
  return (
    <main className="mx-auto flex min-h-[52vh] w-full max-w-7xl items-center justify-center px-5 py-24">
      <div className="h-10 w-10 animate-pulse rounded-lg bg-blush" aria-label="페이지 로딩 중" />
    </main>
  );
}

export function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      target?.scrollIntoView({ block: 'start' });
      return;
    }

    window.scrollTo({ top: 0 });
  }, [location.hash, location.pathname]);

  return (
    <div className="min-h-screen bg-rosewash text-ink">
      <Header key={location.pathname} />
      <Sidebar />
      <div className="pb-16 md:pb-0 lg:pl-[72px]">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
        <Footer />
      </div>
      <MobileFanDock />
    </div>
  );
}
