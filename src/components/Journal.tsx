import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const ENTRIES = [
  {
    title: "The nuance of digital interactions",
    date: "March 12, 2026",
    time: "4 min",
    image: "https://picsum.photos/seed/journal1/400/400"
  },
  {
    title: "Minimalism as a design philosophy",
    date: "Feb 28, 2026",
    time: "6 min",
    image: "https://picsum.photos/seed/journal2/400/400"
  },
  {
    title: "Building scalable animation systems",
    date: "Jan 15, 2026",
    time: "8 min",
    image: "https://picsum.photos/seed/journal3/400/400"
  },
  {
    title: "The future of HLS video on web",
    date: "Dec 05, 2025",
    time: "5 min",
    image: "https://picsum.photos/seed/journal4/400/400"
  }
];

export default function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24">
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
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-text-primary mb-6">
              Recent <span className="italic">thoughts</span>
            </h2>
            <p className="text-muted text-sm md:text-base max-w-sm">
              Exploring the intersections of technology, design, and motion.
            </p>
          </div>

          <button className="hidden md:inline-flex items-center gap-2 group">
             <div className="relative rounded-full px-6 py-2.5 border border-stroke overflow-hidden transition-all duration-300">
                <div className="relative z-10 flex items-center gap-2 text-sm">
                   View all journal <ArrowUpRight className="w-4 h-4" />
                </div>
             </div>
          </button>
        </motion.div>

        <div className="flex flex-col gap-4">
          {ENTRIES.map((entry, idx) => (
            <motion.div
              key={entry.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[32px] sm:rounded-full transition-colors duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={entry.image} 
                  alt={entry.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                />
              </div>

              <div className="flex-1 min-w-0">
                 <h3 className="text-lg md:text-xl font-medium text-text-primary truncate">
                    {entry.title}
                 </h3>
              </div>

              <div className="flex items-center gap-6 text-xs text-muted">
                 <span className="hidden md:block">{entry.time} READ</span>
                 <span>{entry.date}</span>
                 <div className="w-10 h-10 rounded-full border border-stroke flex items-center justify-center group-hover:bg-text-primary group-hover:text-bg transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
