import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MatrixText } from "./MatrixText";

gsap.registerPlugin(ScrollTrigger);

const EVENT_DATE = new Date("2026-06-15T09:00:00");

function useCountdown(targetDate) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
}

function CountdownItem({ value, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center"
    >
      <div className="relative">
        <div className="relative w-16 h-16 md:w-20 md:h-20 glass rounded-xl flex items-center justify-center border border-white/10 overflow-hidden">
          <span className="text-2xl md:text-3xl font-bold text-white font-mono counter-value">
            {String(value).padStart(2, "0")}
          </span>
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--neon-cyan)] opacity-60" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--neon-cyan)] opacity-60" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--neon-cyan)] opacity-60" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--neon-cyan)] opacity-60" />
        </div>
        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--color-primary)] rounded-xl blur opacity-20" />
      </div>
      <span className="mt-3 text-[10px] text-[var(--neon-cyan)] font-mono uppercase tracking-[0.2em]">{label}</span>
    </motion.div>
  );
}

function FloatingOrb({ className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, delay, repeat: Infinity, repeatType: "reverse" }}
      className={`absolute rounded-full blur-3xl ${className}`}
    />
  );
}

export default function Hero({ onRegisterClick }) {
  const countdown = useCountdown(EVENT_DATE);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const frameRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
    );

    gsap.to(containerRef.current, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || frameRef.current) return;

      frameRef.current = requestAnimationFrame(() => {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        containerRef.current?.style.setProperty("--mouse-x", `${x}%`);
        containerRef.current?.style.setProperty("--mouse-y", `${y}%`);
        frameRef.current = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ "--mouse-x": "50%", "--mouse-y": "50%" }}
    >
      {/* Animated Background Orbs */}
      <FloatingOrb className="w-96 h-96 bg-primary/10 -top-48 -left-48" delay={0} />
      <FloatingOrb className="w-80 h-80 bg-secondary/8 top-1/2 right-0" delay={0.5} />
      <FloatingOrb className="w-64 h-64 bg-accent/8 bottom-0 left-1/3" delay={1} />

      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      {/* Radial Gradient Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(99, 102, 241, 0.08) 0%, transparent 50%)`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="section-badge border-glow-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-cyan)] animate-pulse shadow-[0_0_6px_var(--neon-cyan)]" />
              <span className="font-mono">REGISTRATION OPEN</span>
              <span className="opacity-40">//</span>
              <span className="font-mono text-[var(--neon-cyan)]">KIET GROUP OF INSTITUTIONS</span>
            </span>
          </motion.div>

          {/* Main Title */}
          <h1 ref={titleRef} className="mb-6 crt-flicker">
            <span className="block text-5xl md:text-8xl font-extrabold text-white tracking-wider" style={{ fontFamily: "'Star Jedi', sans-serif" }}>
              HAcktronix
            </span>
            <span className="block text-3xl md:text-6xl text-[var(--neon-cyan)] tracking-wider mt-2" style={{ fontFamily: "'Star Jedi', sans-serif", textShadow: "0 0 12px rgba(0,245,255,0.6), 0 0 24px rgba(0,245,255,0.3)" }}>
              2.0
            </span>
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            <span className="font-mono text-[var(--neon-cyan)] opacity-70">$</span> The Ultimate Innovation Hackathon
            <span className="muted-2 text-sm block mt-1">// 24hrs &middot; 5 domains &middot; infinite possibilities<span className="cursor-blink" /></span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <button
              onClick={onRegisterClick}
              className="btn-sw-primary cursor-target text-base"
            >
              <span>Register Now</span>
            </button>
            <a href="/brochure.pdf" download className="btn-sw-secondary cursor-target text-base font-mono">
              Download Brochure
            </a>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex justify-center gap-4 md:gap-8"
          >
            <CountdownItem value={countdown.days} label="Days" />
            <CountdownItem value={countdown.hours} label="Hours" />
            <CountdownItem value={countdown.minutes} label="Minutes" />
            <CountdownItem value={countdown.seconds} label="Seconds" />
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </section>
  );
}
