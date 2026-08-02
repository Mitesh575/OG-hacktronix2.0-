import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Clock, Users, Terminal, Bot, ChevronDown } from "lucide-react";
import TargetCursor from "../components/TargetCursor";
import Galaxy from "../components/Galaxy";
import GlassCard from "../components/ui/GlassCard";
import { shortlistedTeams, waitingListTeams } from "../data/finalists";

/* ── Team Card ── */
function TeamCard({ team, index, variant = "confirmed" }) {
  const isHardware = team.track === "Hardware";
  const accentColor = isHardware ? "var(--sw-red)" : "var(--neon-cyan)";
  const trackBadgeBg = isHardware
    ? "bg-red-600/15 text-red-400 border-red-600/30"
    : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
  const TrackIcon = isHardware ? Bot : Terminal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.45 }}
    >
      <GlassCard
        interactive
        className="h-full p-5 md:p-6 relative group"
      >
        {/* Top accent strip */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          }}
        />

        {/* Header: Team name + Track badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3
            className="text-lg md:text-xl font-black uppercase tracking-wide text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all"
            style={{ fontFamily: "'Exo 2', sans-serif" }}
          >
            {team.teamName}
          </h3>
          <span
            className={`shrink-0 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${trackBadgeBg}`}
          >
            <TrackIcon className="h-3 w-3" />
            {team.track}
          </span>
        </div>

        {/* Info rows */}
        <div className="space-y-2.5">
          <div className="flex items-start gap-2.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 w-20 shrink-0 pt-0.5">
              Project
            </span>
            <span className="text-sm text-gray-300 leading-snug font-medium">
              {team.problemStatement}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 w-20 shrink-0">
              Team ID
            </span>
            <span
              className="text-sm font-mono font-bold tracking-wider"
              style={{ color: accentColor }}
            >
              {team.teamId}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 w-20 shrink-0">
              Lead
            </span>
            <span className="text-sm text-white font-medium">
              {team.teamLead}
            </span>
          </div>
        </div>

        {/* Bottom corner accent */}
        <div
          className="absolute bottom-0 right-0 w-12 h-12 opacity-[0.06] pointer-events-none"
          style={{
            background: `radial-gradient(circle at bottom right, ${accentColor}, transparent 70%)`,
          }}
        />
      </GlassCard>
    </motion.div>
  );
}

/* ── Section Header ── */
function SectionHeader({ icon: Icon, title, subtitle, accentColor, count }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-10 md:mb-14"
    >
      <div className="flex justify-center mb-5">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full border-2"
          style={{
            borderColor: accentColor,
            boxShadow: `0 0 20px ${accentColor}33, inset 0 0 10px ${accentColor}15`,
          }}
        >
          <Icon className="h-6 w-6" style={{ color: accentColor }} />
        </div>
      </div>
      <h2
        className="text-3xl md:text-5xl font-black uppercase tracking-[0.06em] text-white mb-3"
        style={{ fontFamily: "'Exo 2', sans-serif" }}
      >
        {title}{" "}
        <span
          className="drop-shadow-lg"
          style={{ color: accentColor, filter: `drop-shadow(0 0 12px ${accentColor}55)` }}
        >
          Teams
        </span>
      </h2>
      <div
        className="mx-auto mb-4 h-[2px] w-24"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          opacity: 0.5,
        }}
      />
      <p className="text-gray-400 font-mono text-sm tracking-wide">
        {subtitle}{" "}
        <span className="font-bold text-white">{count} teams</span>
      </p>
    </motion.div>
  );
}

/* ── Track Filter Tabs ── */
function TrackFilter({ active, onChange }) {
  const tabs = [
    { key: "all", label: "All Teams", icon: Users },
    { key: "Software", label: "Software", icon: Terminal },
    { key: "Hardware", label: "Hardware", icon: Bot },
  ];

  return (
    <div className="flex justify-center mb-10">
      <div className="inline-flex gap-2 p-1 rounded-lg border border-white/6 bg-[rgba(14,14,20,0.7)] backdrop-blur-md">
        {tabs.map((tab) => {
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`cursor-target inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-widest font-mono transition-all duration-300 ${
                isActive
                  ? "bg-[var(--neon-cyan)]/15 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/30 shadow-[0_0_12px_rgba(0,245,255,0.1)]"
                  : "text-gray-500 hover:text-gray-300 border border-transparent"
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main Results Page ── */
export default function Results() {
  const [trackFilter, setTrackFilter] = useState("all");

  const filterTeams = (teams) =>
    trackFilter === "all"
      ? teams
      : teams.filter((t) => t.track === trackFilter);

  const filteredShortlisted = filterTeams(shortlistedTeams);
  const filteredWaiting = filterTeams(waitingListTeams);

  return (
    <div className="min-h-screen relative">
      <TargetCursor variant="cyan" />
      <div
        className="fixed inset-0 -z-10 opacity-95"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Galaxy
          mouseInteraction={false}
          density={0.65}
          glowIntensity={0.2}
          saturation={0.08}
        />
      </div>

      {/* Hero */}
      <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5"
        >
          <span className="section-badge">
            <span className="sw-status-dot" />
            SHORTLISTED TEAMS
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-[0.08em] text-white mb-4"
          style={{ fontFamily: "'Exo 2', sans-serif" }}
        >
          HACKTRONIX{" "}
          <span className="text-[var(--neon-cyan)] drop-shadow-[0_0_20px_rgba(0,245,255,0.4)]">
            2.0
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-400 font-mono text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-4"
        >
          Congratulations to all shortlisted teams! Here are the teams that made
          it to the grand finale.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600">
              Scroll for results
            </span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* Track filter */}
      <section className="px-4 pt-8">
        <TrackFilter active={trackFilter} onChange={setTrackFilter} />
      </section>

      {/* Shortlisted Teams Section */}
      <section className="relative px-4 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            icon={Shield}
            title="Shortlisted"
            subtitle="Teams advancing to the grand finale —"
            accentColor="var(--neon-cyan)"
            count={filteredShortlisted.length}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={trackFilter + "-shortlisted"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            >
              {filteredShortlisted.map((team, i) => (
                <TeamCard key={team.teamId} team={team} index={i} variant="confirmed" />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredShortlisted.length === 0 && (
            <p className="text-center text-gray-500 font-mono text-sm py-12">
              No shortlisted teams in this track.
            </p>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--sw-red)] to-transparent opacity-30" />
      </div>

      {/* Waiting List Section */}
      <section className="relative px-4 pt-16 pb-20 md:pt-20 md:pb-28">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            icon={Clock}
            title="Waiting List"
            subtitle="Teams on standby — stay prepared! —"
            accentColor="#ff2d55"
            count={filteredWaiting.length}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={trackFilter + "-waiting"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            >
              {filteredWaiting.map((team, i) => (
                <TeamCard key={team.teamId} team={team} index={i} variant="waiting" />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredWaiting.length === 0 && (
            <p className="text-center text-gray-500 font-mono text-sm py-12">
              No waiting list teams in this track.
            </p>
          )}
        </div>
      </section>

      {/* Footer note */}
      <section className="pb-16 text-center px-4">
        <p className="text-xs font-mono text-gray-600 max-w-lg mx-auto leading-relaxed">
          Results are final and binding. For any queries, reach out via the official WhatsApp group.
          All shortlisted teams must confirm their participation.
        </p>
      </section>
    </div>
  );
}
