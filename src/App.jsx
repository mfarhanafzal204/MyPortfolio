import { useEffect, useState, lazy, Suspense } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap, ScrollTrigger } from './utils/gsapConfig';
import { ThemeProvider } from './context/ThemeContext';
import './styles/index.css';
import './styles/animations.css';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import Hero from './components/Hero';
import InstallBanner from './components/InstallBanner';

const About          = lazy(() => import('./components/About'));
const Skills         = lazy(() => import('./components/Skills'));
const Projects       = lazy(() => import('./components/Projects'));
const Services       = lazy(() => import('./components/Services'));
const Timeline       = lazy(() => import('./components/Timeline'));
const Certifications = lazy(() => import('./components/Certifications'));
const Highlights     = lazy(() => import('./components/Highlights'));
const Contact        = lazy(() => import('./components/Contact'));
const Footer         = lazy(() => import('./components/Footer'));

function SectionFallback() {
  return (
    <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '24px', height: '2px', background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))', borderRadius: '2px' }} />
    </div>
  );
}

function AppInner() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.globalTimeline.timeScale(100);
    }
  }, []);

  const handlePreloaderDone = () => {
    setPreloaderDone(true);
    setTimeout(() => ScrollTrigger.refresh(), 150);
  };

  return (
    <>
      <CustomCursor />
      <NoiseOverlay />
      <InstallBanner />
      {!preloaderDone && <Preloader onComplete={handlePreloaderDone} />}
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}><About /></Suspense>
        <Suspense fallback={<SectionFallback />}><Skills /></Suspense>
        <Suspense fallback={<SectionFallback />}><Projects /></Suspense>
        <Suspense fallback={<SectionFallback />}><Services /></Suspense>
        <Suspense fallback={<SectionFallback />}><Timeline /></Suspense>
        <Suspense fallback={<SectionFallback />}><Certifications /></Suspense>
        <Suspense fallback={<SectionFallback />}><Highlights /></Suspense>
        <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
