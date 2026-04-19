import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ["Home", "Work", "Resume"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 3 }}
        className={cn(
          "inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 pointer-events-auto transition-shadow duration-300",
          isScrolled && "shadow-md shadow-black/20"
        )}
      >
        {/* Logo */}
        <a href="#home" className="relative group cursor-pointer">
          <div className="w-9 h-9 rounded-full p-[1px] accent-gradient overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
             <div className="w-full h-full rounded-full bg-bg flex items-center justify-center">
                <span className="font-display italic text-[13px] text-text-primary">AE</span>
             </div>
          </div>
          <div className="absolute -inset-[1px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-[2px]" />
        </a>

        <div className="w-px h-5 bg-stroke mx-2 hidden md:block" />

        {/* Nav Links */}
        <div className="flex gap-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setActiveTab(link)}
              className={cn(
                "relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-300",
                activeTab === link 
                  ? "text-text-primary bg-stroke/50" 
                  : "text-muted hover:text-text-primary hover:bg-stroke/30"
              )}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="w-px h-5 bg-stroke mx-2" />

        {/* Action Button */}
        <a href="#contact" className="relative group rounded-full overflow-hidden">
          <div className="absolute inset-0 p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-full h-full rounded-full accent-gradient" />
          </div>
          <div className="relative bg-surface rounded-full px-4 py-1.5 sm:py-2 text-xs sm:text-sm flex items-center gap-1.5 transition-all duration-300 m-[1px]">
            <span>Say hi</span>
            <span className="text-[10px]">↗</span>
          </div>
        </a>
      </motion.div>
    </nav>
  );
}
