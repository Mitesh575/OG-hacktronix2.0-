import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CircuitBoard, Cpu, Layers3, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Galaxy from "../components/Galaxy";
import TargetCursor from "../components/TargetCursor";
import RegistrationModal from "../components/RegistrationModal";
import GlassCard from "../components/ui/GlassCard";
import AccentCard from "../components/ui/AccentCard";
import { problemStatements } from "../data/problemStatements";

const trackConfig = {
  Software: {
    badge: "Software Track",
    subtitle: "Design systems, AI tools, and digital products that solve real-world friction with speed and clarity.",
    eyeBrow: "Build products with precision",
    accent: "from-blue-500 to-cyan-400",
    icon: Layers3,
    highlights: [
      { title: "Product Thinking", text: "Shape user journeys, workflows, and interfaces that feel launch-ready." },
      { title: "Intelligent Systems", text: "Use automation, AI, and data layers to create smarter experiences." },
      { title: "Execution Velocity", text: "Move from prototype to polished demo within the hackathon window." },
    ],
    story: [
      { title: "See the gap", text: "Start with friction worth solving and turn it into an experience people immediately understand." },
      { title: "Design the engine", text: "Combine product thinking, APIs, AI, and workflow logic into a strong technical core." },
      { title: "Pitch the future", text: "Present a software solution that feels deployable, scalable, and impossible to ignore." },
    ],
  },
  Hardware: {
    badge: "Hardware Track",
    subtitle: "Prototype connected devices, embedded systems, and tangible builds that transform physical-world problems.",
    eyeBrow: "Build systems you can touch",
    accent: "from-orange-500 to-amber-400",
    icon: Cpu,
    highlights: [
      { title: "Real-world Utility", text: "Turn sensing, actuation, and control into meaningful problem-solving hardware." },
      { title: "Embedded Intelligence", text: "Blend firmware, electronics, and data flow into stable working prototypes." },
      { title: "Demo Impact", text: "Show a solution that judges can see, test, and experience instantly." },
    ],
    story: [
      { title: "Sense the problem", text: "Identify a physical-world challenge where devices, automation, or monitoring can make the difference." },
      { title: "Engineer the build", text: "Translate the idea into circuits, components, control logic, and a robust prototype." },
      { title: "Prove the concept", text: "Demonstrate hardware that feels purposeful, usable, and ready for the next stage." },
    ],
  },
};

const trackTheme = {
  Software: {
    panelClass: "sw-panel-stormtrooper",
    accentClass: "border-[var(--sw-armor-dim)]",
    accentGlow: "shadow-[0_0_20px_rgba(0,245,255,0.1)]",
    headingAccent: "text-[var(--neon-cyan)]",
    badgeBg: "bg-[var(--sw-cyan-tactical)]",
    buttonClass: "btn-stormtrooper",
    dividerBg: "linear-gradient(90deg, transparent, var(--sw-cyan-tactical), transparent)",
    cardBg: "bg-[rgba(14,14,20,0.92)]",
    cardBorder: "border-[var(--sw-armor-dim)]",
    cardHoverBorder: "hover:border-[rgba(0,245,255,0.2)]",
    tagBg: "bg-[var(--sw-armor-dim)]",
    tagBorder: "border-[var(--sw-armor-dim)]",
    tagText: "text-gray-300",
    iconBg: "bg-gradient-to-br from-cyan-500 to-blue-500",
    accentStrip: "from-cyan-500 to-blue-400",
    gradient: "from-cyan-500 to-blue-400",
    cursorVariant: "white",
  },
  Hardware: {
    panelClass: "sw-panel-vader",
    accentClass: "border-[var(--sw-red-dim)]",
    accentGlow: "shadow-[0_0_20px_rgba(204,17,34,0.15)]",
    headingAccent: "text-[var(--sw-red)]",
    badgeBg: "bg-[var(--sw-red-dim)]",
    buttonClass: "btn-vader",
    dividerBg: "linear-gradient(90deg, transparent, var(--sw-red-glow), transparent)",
    cardBg: "bg-[var(--sw-sith-dark)]",
    cardBorder: "border-[var(--sw-red-dim)]",
    cardHoverBorder: "hover:border-[var(--sw-red)]",
    tagBg: "bg-[var(--sw-red-dim)]",
    tagBorder: "border-[var(--sw-red-dim)]",
    tagText: "text-[var(--sw-red)]",
    iconBg: "bg-gradient-to-br from-red-600 to-red-800",
    accentStrip: "from-red-600 to-red-400",
    gradient: "from-red-500 to-rose-400",
    cursorVariant: "red",
  },
};

export default function TrackExperiencePage({ track }) {
  const [modalOpen, setModalOpen] = useState(false);
  const config = trackConfig[track];
  const theme = trackTheme[track];
  const Icon = config.icon;
  const statements = useMemo(() => problemStatements[track] || [], [track]);

  return (
    <div className="min-h-screen">
      <TargetCursor variant={theme.cursorVariant} />
      <div className="fixed inset-0 -z-10 opacity-95" style={{ width: "100vw", height: "100vh" }}>
        <Galaxy mouseInteraction={false} density={0.65} glowIntensity={0.2} saturation={0.08} />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/6 bg-[rgba(10,10,14,0.88)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="cursor-target inline-flex items-center gap-3 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-gradient-to-br from-[var(--sw-graphite)] to-[var(--sw-steel)] font-bold text-xs font-mono tracking-widest">HX</span>
            <span className="text-lg font-semibold font-mono tracking-wider" style={{ fontFamily: "'Star Jedi', sans-serif" }}>HACKTRONIX</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/" className="cursor-target inline-flex items-center gap-2 rounded-sm border border-white/8 bg-white/[0.03] px-4 py-2 text-xs text-gray-300 transition hover:text-white font-mono tracking-wider uppercase">
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Link>
            <button onClick={() => setModalOpen(true)} className={`${theme.buttonClass} cursor-target text-sm`}>
              <span>Register for {track}</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pb-28 lg:pt-32">
          <div className="mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className={`section-badge mb-5 ${theme.badgeBg}`}>
                <Sparkles className="h-4 w-4" />
                {config.badge}
              </div>
              <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-4 text-sm uppercase tracking-[0.22em] text-gray-400">
                {config.eyeBrow}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl"
              >
                Build for the <span className={theme.headingAccent}>{track}</span> domain.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-6 max-w-2xl text-lg leading-8 text-gray-300"
              >
                {config.subtitle}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-8 flex flex-wrap gap-4">
                <button onClick={() => setModalOpen(true)} className={`${theme.buttonClass} cursor-target text-base`}>
                  <span>Start registration</span>
                </button>
                <a href="#problem-statements" className="btn-sw-secondary cursor-target inline-flex items-center gap-2 text-base">
                  Explore statements
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </div>

            <div className={`rounded-sm border ${theme.cardBorder} ${theme.cardBg} p-6 md:p-8`}>
              <div className="mb-6 flex items-center justify-between">
                <div className={`section-badge ${theme.badgeBg}`}>Track Brief</div>
                <div className={`flex h-14 w-14 items-center justify-center rounded-sm text-white ${theme.iconBg}`}>
                  <Icon className="h-7 w-7" />
                </div>
              </div>
              <div className="space-y-4">
                {config.highlights.map((item) => (
                  <div key={item.title} className={`rounded-sm border ${theme.cardBorder} ${theme.cardBg} p-4`}>
                    <h3 className="mb-1 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm leading-6 text-gray-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="problem-statements" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-2xl">
              <div className={`section-badge mb-4 ${theme.badgeBg}`}>Problem Statements</div>
              <h2 className="text-3xl font-bold text-white md:text-5xl">Choose a statement worth building around.</h2>
              <p className="mt-4 text-lg leading-8 text-gray-400">Each statement is a starting point. Your edge comes from how clearly you frame the solution and how convincingly you build it.</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {statements.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                >
                  <div className={`h-full rounded-sm border ${theme.cardBorder} ${theme.cardBg} p-6 transition-all duration-300 ${theme.cardHoverBorder} hover:shadow-[0_0_16px_rgba(0,245,255,0.04)]`}>
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className={`rounded-sm border ${theme.tagBorder} px-3 py-1 text-xs font-medium tracking-[0.2em] ${theme.tagText}`}>{item.id}</div>
                      <div className={`h-10 w-10 rounded-sm bg-gradient-to-br ${theme.accentStrip}`} />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="text-sm leading-7 text-gray-400">{item.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className={`rounded-sm border ${theme.tagBorder} ${theme.tagBg} px-3 py-1 text-xs ${theme.tagText}`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-2xl">
              <div className={`section-badge mb-4 ${theme.badgeBg}`}>Storytelling Flow</div>
              <h2 className="text-3xl font-bold text-white md:text-5xl">Present a track narrative that feels inevitable.</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {config.story.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.1, duration: 0.55 }}
                >
                  <div className={`h-full rounded-sm border ${theme.cardBorder} ${theme.cardBg} p-6 transition-all duration-300 ${theme.cardHoverBorder} hover:shadow-[0_0_16px_rgba(0,245,255,0.04)]`}>
                    <div className={`mb-4 text-sm font-medium tracking-[0.2em] ${theme.headingAccent}`}>0{index + 1}</div>
                    <h3 className="mb-3 text-2xl font-semibold text-white">{item.title}</h3>
                    <p className="text-sm leading-7 text-gray-300">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 pt-8 sm:px-6 lg:px-8 lg:pb-32">
          <div className="mx-auto max-w-5xl">
            <div className={`rounded-sm border ${theme.cardBorder} ${theme.cardBg} p-8 md:p-10 text-center`}>
              <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-sm text-white ${theme.iconBg}`}>
                <CircuitBoard className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold text-white md:text-5xl">Ready to build for {track}?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-400">Lock your track, pick a problem statement, and move straight into the team registration flow.</p>
              <div className="mt-8 flex justify-center">
                <button onClick={() => setModalOpen(true)} className={`${theme.buttonClass} cursor-target text-base`}>
                  <span>Continue to registration</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <RegistrationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} initialTrack={track} />
    </div>
  );
}