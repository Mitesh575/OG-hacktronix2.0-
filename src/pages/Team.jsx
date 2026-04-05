import { useRef } from "react";
import { motion } from "framer-motion";
import { GalleryVerticalEnd, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Galaxy from "../components/Galaxy";
import TargetCursor from "../components/TargetCursor";
import GlassCard from "../components/ui/GlassCard";
import AccentCard from "../components/ui/AccentCard";

const teamSections = [
  {
    title: "Organizers",
    color: "from-cyan-500 to-blue-400",
    members: [
      { name: "[Name]", role: "[Role]", email: "[Email]" },
      { name: "[Name]", role: "[Role]", email: "[Email]" },
    ],
  },
  {
    title: "Faculty Advisors",
    color: "from-purple-500 to-fuchsia-400",
    members: [
      { name: "[Name]", role: "[Role]", email: "[Email]" },
      { name: "[Name]", role: "[Role]", email: "[Email]" },
    ],
  },
  {
    title: "Website Development",
    color: "from-orange-500 to-red-400",
    members: [
      { name: "[Name]", role: "[Role]", email: "[Email]" },
      { name: "[Name]", role: "[Role]", email: "[Email]" },
    ],
  },
  {
    title: "Design Team",
    color: "from-emerald-500 to-amber-400",
    members: [
      { name: "[Name]", role: "[Role]", email: "[Email]" },
      { name: "[Name]", role: "[Role]", email: "[Email]" },
    ],
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0.1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

export default function TeamPage() {
  const headerRef = useRef(null);

  return (
    <div className="relative min-h-screen">
      <TargetCursor variant="cyan" />
      <div className="fixed inset-0 -z-10 opacity-80">
        <Galaxy mouseInteraction={false} density={0.65} glowIntensity={0.2} saturation={0.08} />
      </div>

      <nav className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-[rgba(10,10,14,0.72)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-3 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] font-bold">
              HX
            </span>
            <span className="text-lg font-bold text-white">
              HACK<span className="text-[var(--neon-cyan)]">TRONIX</span>
            </span>
          </Link>

          <Link to="/" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 transition hover:text-white">
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-40 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-3xl">
            <div className="section-badge mb-5">
              <GalleryVerticalEnd className="h-4 w-4" />
              Meet the team
            </div>
            <h1 className="text-5xl font-black tracking-tight text-white md:text-7xl">
              The people behind <span className="heading-gradient">HackTronix</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-400">
              A passionate group of organizers, designers, and developers working together to deliver an unforgettable hackathon experience.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Team Sections */}
      <main className="mx-auto max-w-7xl space-y-28 px-4 pb-32 sm:px-6 lg:px-8">
        {teamSections.map((section, si) => (
          <section key={section.title} ref={si === 0 ? headerRef : null}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-10 text-3xl font-bold text-white md:text-4xl"
            >
              {section.title}
            </motion.h2>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {section.members.map((m, mi) => (
                <motion.div
                  key={mi}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: mi * 0.06 }}
                >
                  <AccentCard gradient={section.color} className="p-6">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl font-bold text-white">
                      {m.name[0]}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{m.name}</h3>
                    <p className="mt-1 text-sm text-gray-300">{m.role}</p>
                    {m.email && (
                      <a
                        href={`mailto:${m.email}`}
                        className="mt-3 inline-flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Mail className="h-4 w-4" />
                        {m.email}
                      </a>
                    )}
                  </AccentCard>
                </motion.div>
              ))}

              {/* Empty placeholder card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: section.members.length * 0.06 }}
              >
                <GlassCard className="flex h-full min-h-[200px] items-center justify-center border-dashed border-2 border-white/20 p-6 text-gray-500">
                  <p className="text-center text-sm">
                    Empty slot — add another member here
                  </p>
                </GlassCard>
              </motion.div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}