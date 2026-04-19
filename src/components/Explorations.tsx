import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EXPLORATIONS = [
  { id: 1, image: "https://picsum.photos/seed/exp1/600/600", rotation: -5, speed: 0.1 },
  { id: 2, image: "https://picsum.photos/seed/exp2/600/600", rotation: 5, speed: 0.2 },
  { id: 3, image: "https://picsum.photos/seed/exp3/600/600", rotation: -3, speed: 0.15 },
  { id: 4, image: "https://picsum.photos/seed/exp4/600/600", rotation: 4, speed: 0.25 },
  { id: 5, image: "https://picsum.photos/seed/exp5/600/600", rotation: -2, speed: 0.1 },
  { id: 6, image: "https://picsum.photos/seed/exp6/600/600", rotation: 6, speed: 0.3 },
];

export default function Explorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinning the header
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: contentRef.current,
        start: "top top",
        end: "bottom bottom",
        pinSpacing: false,
      });

      // Parallax for images
      const items = gsap.utils.toArray<HTMLElement>('.parallax-item');
      items.forEach((item) => {
        const speed = parseFloat(item.dataset.speed || "0.1");
        gsap.to(item, {
          y: -500 * speed,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[300vh] bg-bg overflow-hidden">
      {/* Pinned Header */}
      <div ref={contentRef} className="h-screen flex items-center justify-center pointer-events-none z-10">
        <div className="text-center max-w-xl px-6 pointer-events-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display text-text-primary mb-8">
            Visual <span className="italic">playground</span>
          </h2>
          <p className="text-muted text-sm md:text-base mb-10">
            Experimenting with form, motion, and interactivity. These are the sparks that ignite larger ideas.
          </p>
          <button className="inline-flex items-center gap-2 group bg-surface border border-stroke rounded-full px-8 py-3.5 hover:bg-white hover:text-bg transition-colors duration-300">
             Follow on Dribbble <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Parallax Gallery */}
      <div ref={galleryRef} className="absolute inset-x-0 top-0 bottom-0 pointer-events-none">
        <div className="max-w-[1400px] mx-auto h-full grid grid-cols-2 gap-12 md:gap-40 px-6 py-40">
           {EXPLORATIONS.map((exp, idx) => (
             <div 
               key={exp.id} 
               className="flex justify-center first:mt-40 last:mb-40"
             >
                <div 
                  className="parallax-item pointer-events-auto"
                  data-speed={exp.speed}
                  style={{ transform: `rotate(${exp.rotation}deg)` }}
                >
                   <div className="aspect-square w-full max-w-[320px] bg-surface border border-stroke rounded-2xl overflow-hidden group cursor-pointer shadow-2xl shadow-black/50">
                      <img 
                        src={exp.image} 
                        alt={`Exploration ${exp.id}`} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                      />
                      <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
