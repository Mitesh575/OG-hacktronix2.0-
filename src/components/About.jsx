import { motion } from "framer-motion";
import { FileText, Play } from "lucide-react";
import GlassCard from "./ui/GlassCard";

function TerminalPlaceholder({ label, icon: Icon }) {
  return (
    <GlassCard className="aspect-video flex items-center justify-center p-8 relative overflow-hidden">
      {/* Corner decorations */}
      <div className="absolute top-3 left-3 w-2 h-2 border border-[var(--neon-cyan)] opacity-50" />
      <div className="absolute top-3 right-3 w-2 h-2 border border-[var(--neon-cyan)] opacity-50" />
      <div className="absolute bottom-3 left-3 w-2 h-2 border border-[var(--neon-cyan)] opacity-50" />
      <div className="absolute bottom-3 right-3 w-2 h-2 border border-[var(--neon-cyan)] opacity-50" />

      {/* Terminal header */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-[rgba(0,245,255,0.04)] border-b border-white/5 flex items-center px-4 gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--neon-pink)] opacity-70" />
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--neon-yellow)] opacity-70" />
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--neon-green)] opacity-70" />
        <span className="ml-3 font-mono text-[10px] text-[var(--neon-cyan)] opacity-50">// {label.toLowerCase().replace(/\s+/g, '_')}.media</span>
      </div>

      <div className="text-center mt-4">
        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center opacity-60">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <p className="font-mono text-sm text-[var(--neon-cyan)] opacity-40">{label}</p>
        <div className="mt-2 flex items-center justify-center gap-1">
          <span className="font-mono text-xs text-gray-500 opacity-60">[</span>
          <span className="cursor-blink w-1.5 h-3 bg-[var(--neon-cyan)] opacity-40" />
          <span className="font-mono text-xs text-gray-500 opacity-60">]</span>
        </div>
      </div>
    </GlassCard>
  );
}

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="section-badge mb-4 glitch-text cursor-pointer"
            data-text="About"
          >
            <FileText className="w-4 h-4" />
            About
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 mt-4">
            About <span className="heading-gradient">HACKTRONIX</span>
          </h2>
          <p className="muted max-w-2xl mx-auto text-lg leading-relaxed">
            HACKTRONIX 2.0 is a 24-hour hackathon bringing together the brightest minds in technology
            to solve real-world problems through innovation and collaboration. Join us for an
            unforgettable experience of creativity, coding, and competition.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <TerminalPlaceholder label="Event Image" icon={FileText} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <TerminalPlaceholder label="Video" icon={Play} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
