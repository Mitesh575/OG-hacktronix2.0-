import { useRef } from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const timelineEvents = [
  { date: "Apr 4", event: "Registrations Open", description: "Registration period begins for all participants", color: "from-cyan-400 to-blue-500" },
  { date: "Apr 8", event: "Problem Statement Release", description: "Software and hardware tracks revealed", color: "from-blue-500 to-indigo-500" },
  { date: "Apr 12", event: "Team Formation Deadline", description: "Final day to form teams of 2-4 members", color: "from-indigo-500 to-purple-500" },
  { date: "Apr 16", event: "Mentor Connect Round", description: "First round of mentor interactions and guidance", color: "from-purple-500 to-fuchsia-500" },
  { date: "Apr 20", event: "Progress Checkpoint", description: "Mid-event review and feedback session", color: "from-fuchsia-500 to-pink-500" },
  { date: "Apr 24", event: "Submission Window Opens", description: "Teams can start uploading their projects", color: "from-pink-500 to-rose-500" },
  { date: "Apr 27", event: "Final Submission Deadline", description: "Last chance to submit your project", color: "from-rose-500 to-orange-500" },
  { date: "Apr 29", event: "Evaluation & Results", description: "Winners announced and prizes distributed", color: "from-orange-500 to-amber-400" },
];

function TimelineCard({ item, index, side }) {
  const isLeft = side === "left";
  const slideDir = isLeft ? -40 : 40;

  return (
    <motion.div
      initial={{ opacity: 0, x: slideDir, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, type: "spring", stiffness: 100, damping: 18 }}
      className="w-full"
    >
      <div className={`relative group rounded-sm border border-[rgba(0,245,255,0.08)] bg-[rgba(14,14,20,0.92)] backdrop-blur-sm p-5 md:p-6 transition-all duration-300 hover:border-[rgba(0,245,255,0.2)] hover:shadow-[0_0_16px_rgba(0,245,255,0.06)] ${isLeft ? "" : "md:ml-auto"}`}>
        <div className={`absolute top-0 ${isLeft ? "left-0" : "right-0"} w-full h-px bg-gradient-to-r from-transparent via-[rgba(0,245,255,0.3)] to-transparent`} />
        <div className={`absolute ${isLeft ? "left-0" : "right-0"} top-0 w-[3px] h-full bg-gradient-to-b from-[rgba(0,245,255,0.2)] to-transparent opacity-40`} />
        <span className="sw-label">{item.date}</span>
        <h3 className="mt-1.5 text-base font-semibold text-white font-mono tracking-wide group-hover:text-[var(--neon-cyan)] transition-colors">{item.event}</h3>
        <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} id="timeline" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-4">
            <CalendarDays className="w-4 h-4" />
            Timeline
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 mt-4">
            Event <span className="heading-gradient">Schedule</span>
          </h2>
          <p className="muted max-w-xl mx-auto text-lg">
            Key dates and milestones for HackTronix 2.0
          </p>
        </motion.div>

        <div className="relative">
          {/* Shared continuous spine */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[3px] bg-gradient-to-b from-[var(--neon-cyan)] via-[var(--color-primary)] to-[var(--color-secondary)] rounded-sm shadow-[0_0_10px_rgba(0,245,255,0.5),0_0_20px_rgba(99,102,241,0.3)]" />

          {timelineEvents.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={idx} className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-12 last:mb-0">
                {/* Left Column */}
                <div className="flex justify-end pr-4 md:pr-8">
                  {isLeft ? <TimelineCard item={item} index={idx} side="left" /> : null}
                </div>

                {/* Center Rail — dot only */}
                <div className="relative flex flex-col items-center justify-center w-10">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: idx * 0.08 + 0.15, duration: 0.4, type: "spring" }}
                    className="relative z-10 w-4 h-4 rounded-sm bg-[var(--color-bg)] border-2 border-[var(--neon-cyan)] shadow-[0_0_12px_rgba(0,245,255,0.5)]"
                  >
                    <div className="absolute inset-[-6px] rounded-full border border-[rgba(0,245,255,0.25)] animate-neon-pulse-ring" />
                    <div className="absolute inset-[3px] rounded-sm bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--color-primary)]" />
                  </motion.div>
                </div>

                {/* Right Column */}
                <div className="flex justify-start pl-4 md:pl-8">
                  {!isLeft ? <TimelineCard item={item} index={idx} side="right" /> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}