import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface AboutMeProps {
  onBack: () => void;
}

export default function AboutMe({ onBack }: AboutMeProps) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Track viewport width to detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cursor tracking setup (for desktop)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const translateX = useTransform(mouseX, [0, 1], ["-50%", "-50%"]);
  const translateY = useTransform(mouseY, [0, 1], ["-50%", "-50%"]);

  useEffect(() => {
    if (isMobile) return;
    const handleMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };
    const el = ref.current;
    if (el) {
      el.addEventListener("mousemove", handleMove);
      return () => el.removeEventListener("mousemove", handleMove);
    }
  }, [isMobile, mouseX, mouseY]);

  // Tap toggle for mobile
  const handleTap = () => {
    if (isMobile) setActive((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8 relative">
      {/* Image Card Hover / Tap */}
      <motion.div
        ref={ref}
        className="relative overflow-hidden rounded-2xl w-[90vw] sm:w-[400px] h-[60vh] sm:h-[500px] group"
        onHoverStart={() => !isMobile && setActive(true)}
        onHoverEnd={() => !isMobile && setActive(false)}
        onClick={handleTap}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04"
          alt="notfound.exe creator"
          className="absolute w-full h-full object-cover transition-transform duration-700"
          animate={{ scale: active ? 1.08 : 1 }}
        />

        {/* Overlay text */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-void/90 to-transparent flex items-end p-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: active ? 1 : 0, y: active ? 0 : 40 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div>
            <motion.h2
              className="text-existential text-2xl sm:text-3xl font-semibold tracking-tight mb-2"
              whileHover={!isMobile ? { x: 5 } : {}}
            >
              notfound.exe
            </motion.h2>
            <p className="text-muted-foreground font-mono text-sm">
              creator of chaos & existential dread
            </p>
          </div>
        </motion.div>

        {/* Cursor follower (Desktop only) */}
        {!isMobile && (
          <motion.div
            className="absolute top-0 left-0 w-20 h-20 rounded-full bg-primary/10 border border-primary/30 pointer-events-none mix-blend-difference"
            style={{ x: translateX, y: translateY }}
            animate={{
              opacity: active ? 1 : 0,
              scale: active ? 1 : 0.5,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          />
        )}
      </motion.div>

      {/* Navigation Links */}
      <div className="absolute bottom-10 text-existential text-base sm:text-lg space-x-6 sm:space-x-8 flex flex-wrap justify-center w-full">
        {["Home", "Work", "Studio", "Contact"].map((item) => (
          <div
            key={item}
            className="inline-block group relative my-1 cursor-pointer"
          >
            <span className="group-hover:text-chaos-pink transition-colors duration-300 font-mono">
              {item}
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-chaos-pink transition-all duration-300 group-hover:w-full"></span>
          </div>
        ))}
      </div>

      <button 
        onClick={onBack} 
        className="absolute top-8 left-8 underline opacity-70 hover:opacity-100 font-mono text-sm"
      >
        back
      </button>
    </div>
  );
}
