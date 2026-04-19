import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const PROJECTS = [
  {
    title: "Automotive Motion",
    category: "Development",
    image: "https://picsum.photos/seed/auto/1200/800",
    colSpan: "md:col-span-7",
    aspect: "aspect-[16/9] md:aspect-auto"
  },
  {
    title: "Urban Architecture",
    category: "Design",
    image: "https://picsum.photos/seed/urban/800/1000",
    colSpan: "md:col-span-5",
    aspect: "aspect-[4/5] md:aspect-auto"
  },
  {
    title: "Human Perspective",
    category: "Strategy",
    image: "https://picsum.photos/seed/human/800/1000",
    colSpan: "md:col-span-5",
    aspect: "aspect-[4/5] md:aspect-auto"
  },
  {
    title: "Brand Identity",
    category: "Branding",
    image: "https://picsum.photos/seed/brand/1200/800",
    colSpan: "md:col-span-7",
    aspect: "aspect-[16/9] md:aspect-auto"
  }
];

export default function SelectedWorks() {
  return (
    <section id="work" className="bg-bg py-12 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-8"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-text-primary mb-6">
              Featured <span className="italic">projects</span>
            </h2>
            <p className="text-muted text-sm md:text-base max-w-sm">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>

          <button className="hidden md:inline-flex items-center gap-2 group">
             <div className="relative rounded-full px-6 py-2.5 border border-stroke overflow-hidden transition-all duration-300">
                <div className="absolute inset-0 p-[1px] opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-full h-full rounded-full accent-gradient" />
                </div>
                <div className="relative z-10 flex items-center gap-2 text-sm">
                   View all work <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
             </div>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative bg-surface border border-stroke rounded-3xl overflow-hidden cursor-pointer",
                project.colSpan,
                project.aspect,
                "h-[400px] md:h-[500px]"
              )}
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Halftone Overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" 
                style={{ 
                  backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                  backgroundSize: '4px 4px'
                }} 
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-bg/70 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                 <div className="relative">
                    <div className="absolute -inset-[1px] rounded-full accent-gradient animate-gradient-shift blur-sm" />
                    <div className="relative bg-white text-bg px-6 py-2 rounded-full font-medium text-sm flex items-center gap-2">
                       View — <span className="font-display italic">{project.title}</span>
                    </div>
                 </div>
              </div>

              {/* Mobile Info */}
              <div className="absolute bottom-6 left-6 md:hidden group-hover:opacity-0 transition-opacity">
                 <span className="text-xs text-white/60 mb-1 block uppercase tracking-wider">{project.category}</span>
                 <h3 className="text-2xl font-display italic text-white">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
