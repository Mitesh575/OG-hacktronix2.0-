import { useRef } from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import Galaxy from "../components/Galaxy";
import TargetCursor from "../components/TargetCursor";
import GlassCard from "../components/ui/GlassCard";
import hackLogo from "../images/hack-logo.png";

const problemStatements = [
  {
    id: 1,
    title: "[Problem Statement Title]",
    description: "[Add your problem statement description here. Describe the challenge, its relevance, and what participants need to solve.]",
    tags: ["[Tag 1]", "[Tag 2]", "[Tag 3]"],
  },
  {
    id: 2,
    title: "[Problem Statement Title]",
    description: "[Add your problem statement description here. Describe the challenge, its relevance, and what participants need to solve.]",
    tags: ["[Tag 1]", "[Tag 2]", "[Tag 3]"],
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0.1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

export default function ProblemStatementPage() {
  return (
    <div className="min-h-screen">
      <TargetCursor variant="cyan" />
      <div className="fixed inset-0 -z-10 opacity-95" style={{ width: "100vw", height: "100vh" }}>
        <Galaxy mouseInteraction={false} density={0.65} glowIntensity={0.2} saturation={0.08} />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(10,10,14,0.72)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="cursor-target">
              <img src={hackLogo} alt="HACKTRONIX" className="h-16 w-auto md:h-20 shrink-0 object-contain" />
            </Link>
          <div className="flex items-center gap-3">
            <Link to="/team" className="cursor-target inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 transition hover:text-white">
              Team
            </Link>
            <Link to="/guidelines" className="cursor-target inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 transition hover:text-white">
              Guidelines
            </Link>
          </div>
        </div>
      </header>

      <main className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="section-badge mb-6">
              <Lightbulb className="h-4 w-4" />
              Challenge
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
              Problem <span className="text-[#ff2d55] font-['Exo_2']">Statements</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              Choose your challenge. Each problem statement presents a unique opportunity to innovate and create impactful solutions.
            </p>
          </motion.div>

          <div className="mt-16 space-y-8">
            {problemStatements.map((ps, idx) => (
              <motion.div
                key={ps.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <GlassCard className="p-6 md:p-8 rounded-sm">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 rounded-sm bg-cyan-500/10 flex items-center justify-center text-sm font-bold text-cyan-400 border border-cyan-500/20">
                      {ps.id}
                    </span>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-white mb-3">{ps.title}</h2>
                      <p className="text-gray-300 leading-relaxed mb-4">{ps.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {ps.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-mono tracking-wider text-gray-400 border border-white/10 bg-white/[0.02] rounded-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-gray-500 text-sm">
              More problem statements coming soon. Check back for updates.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}