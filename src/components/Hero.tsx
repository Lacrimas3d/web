import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

const ROLES = ["Creative", "Fullstack", "Founder", "Scholar"];
const VIDEO_URL = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(VIDEO_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.error("Video play error:", e));
      });
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = VIDEO_URL;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.error("Video play error:", e));
      });
    }
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(".name-reveal", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, delay: 3.5 }
    )
    .fromTo(".blur-in",
      { opacity: 0, filter: "blur(10px)", y: 20 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 },
      "-=0.8"
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-bg">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <div className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          COLLECTION '26
        </div>
        
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-white mb-6">
          Ali Ertav
        </h1>

        <div className="blur-in mb-8 flex items-center justify-center gap-2 text-xl md:text-2xl text-text-primary/90">
          <span>A</span>
          <div className="relative h-9 min-w-[120px] inline-flex items-center justify-center overflow-hidden">
             <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="font-display italic text-text-primary"
                >
                  {ROLES[roleIndex]}
                </motion.span>
             </AnimatePresence>
          </div>
          <span>lives in Vancouver.</span>
        </div>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12 leading-relaxed">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        <div className="blur-in flex flex-wrap justify-center gap-4">
          {/* See Works */}
          <a href="#work" className="group relative rounded-full px-7 py-3.5 text-sm font-medium transition-all hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-text-primary group-hover:bg-bg transition-colors duration-300" />
            <div className="absolute inset-0 p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <div className="w-full h-full rounded-full accent-gradient-border opacity-50" />
            </div>
            <span className="relative z-10 text-bg group-hover:text-text-primary transition-colors duration-300">See Works</span>
          </a>

          {/* Reach out */}
          <a href="#contact" className="group relative rounded-full px-7 py-3.5 text-sm font-medium transition-all hover:scale-105 border-2 border-stroke bg-bg text-text-primary hover:border-transparent overflow-hidden">
            <div className="absolute inset-0 p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <div className="w-full h-full rounded-full accent-gradient-border" />
            </div>
            <div className="absolute inset-[2px] rounded-full bg-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Reach out...</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
