import { motion } from 'motion/react';

const STATS = [
  { label: "Years Experience", value: "20+" },
  { label: "Projects Done", value: "95+" },
  { label: "Satisfied Clients", value: "200%" }
];

export default function Stats() {
  return (
    <section id="resume" className="bg-bg py-16 md:py-32 border-y border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <span className="text-6xl md:text-7xl lg:text-8xl font-display text-text-primary mb-4 tabular-nums group-hover:text-gradient transition-all duration-500">
                {stat.value}
              </span>
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
