import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '../components/Navbar';
import Globe from '../components/Globe';
import Particles from '../components/Particles';
import CursorGlow from '../components/CursorGlow';
import LoadingScreen from '../components/LoadingScreen';
import {
  HeroSection, ZoomSection, WeatherSection,
  FlightSection, AIInsightsSection, DashboardSection
} from '../components/Sections';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const globeContainerRef = useRef(null);

  // Loading
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // GSAP scroll-pinned globe animation
  useEffect(() => {
    if (isLoading) return;
    if (!globeContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Globe stays pinned, scales and shifts based on scroll
      gsap.to(globeContainerRef.current, {
        scrollTrigger: {
          trigger: '.section-wrapper',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      // Section 2 - Zoom (scale up)
      gsap.fromTo(globeContainerRef.current,
        { scale: 1, x: '0%' },
        {
          scale: 1.3, x: '20%',
          scrollTrigger: {
            trigger: '#zoom-trigger',
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          }
        }
      );

      // Section 3 - Weather (shift left)
      gsap.to(globeContainerRef.current, {
        scale: 1.1, x: '-25%',
        scrollTrigger: {
          trigger: '#weather-trigger',
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        }
      });

      // Section 4 - Flights (shift right)
      gsap.to(globeContainerRef.current, {
        scale: 1.2, x: '25%',
        scrollTrigger: {
          trigger: '#flight-trigger',
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        }
      });

      // Sections 5-6 - hide globe
      gsap.to(globeContainerRef.current, {
        scale: 0.6, x: '0%', opacity: 0,
        scrollTrigger: {
          trigger: '#ai-insights',
          start: 'top center',
          end: 'top top',
          scrub: 1,
        }
      });
    });

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <CursorGlow />
      <Particles />

      <div className="relative min-h-screen noise-bg">
        <Navbar />

        {/* Fixed/pinned 3D Globe (visible across hero → flight sections) */}
        <div
          ref={globeContainerRef}
          className="fixed inset-0 z-0 pointer-events-auto"
          style={{ willChange: 'transform' }}
        >
          <Globe />
        </div>

        {/* Section wrapper */}
        <div className="section-wrapper relative z-10">
          <HeroSection />
          <div id="zoom-trigger"><ZoomSection /></div>
          <div id="weather-trigger"><WeatherSection /></div>
          <div id="flight-trigger"><FlightSection /></div>
          <AIInsightsSection />
          <DashboardSection />
        </div>
      </div>
    </>
  );
}