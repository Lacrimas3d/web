import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { cn } from '@/src/lib/utils';

const VIDEO_URL = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export default function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(VIDEO_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = VIDEO_URL;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }
  }, []);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    gsap.to(marquee, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });
  }, []);

  const socials = ["Twitter", "LinkedIn", "Dribbble", "GitHub"];

  return (
    <footer id="contact" className="relative bg-bg pt-24 md:pt-40 pb-8 md:pb-12 overflow-hidden">
      {/* Flipped Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Marquee */}
        <div className="border-y border-white/5 py-8 md:py-12 mb-24 md:mb-40 overflow-hidden whitespace-nowrap">
          <div ref={marqueeRef} className="inline-block">
            {Array.from({ length: 15 }).map((_, i) => (
              <span key={i} className="text-4xl md:text-6xl lg:text-8xl font-display italic text-white/20 uppercase tracking-tighter mx-8 md:mx-12">
                Building the Future •
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-40 text-center">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display text-text-primary mb-12">
            Let's create something <span className="italic">extraordinary</span> together.
          </h2>
          <a 
            href="mailto:hello@aliertav.com"
            className="group relative inline-flex rounded-full p-[2px] overflow-hidden transition-transform hover:scale-105"
          >
            <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 transition-opacity animate-gradient-shift" />
            <div className="relative bg-surface rounded-full px-10 py-5 text-lg border border-stroke flex items-center gap-3">
               hello@aliertav.com
               <span className="text-xl">↗</span>
            </div>
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-stroke pt-12">
          <div className="flex gap-6">
            {socials.map((s) => (
              <a key={s} href="#" className="text-sm text-muted hover:text-text-primary transition-colors">{s}</a>
            ))}
          </div>

          <div className="flex items-center gap-3 bg-surface/50 border border-stroke rounded-full px-4 py-2">
            <div className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <span className="text-xs text-text-primary">Available for projects</span>
          </div>

          <div className="text-xs text-muted">
            © 2026 ALI ERTAV. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
