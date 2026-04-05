import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const sponsors = [
  {
    name: "Sponsor 1",
    logo: "/sponsors/sponsor-1.png",
    glow: "from-cyan-400/30 via-blue-500/20 to-transparent",
  },
  {
    name: "Sponsor 2",
    logo: "/sponsors/sponsor-2.png",
    glow: "from-pink-400/30 via-fuchsia-500/20 to-transparent",
  },
  {
    name: "Sponsor 3",
    logo: "/sponsors/sponsor-3.png",
    glow: "from-emerald-400/30 via-green-500/20 to-transparent",
  },
];

function SponsorCard({ sponsor, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="relative flex flex-col items-center"
    >
      <div className={`absolute inset-6 rounded-full bg-gradient-to-br ${sponsor.glow} blur-3xl`} />

      <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-white/15 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),rgba(10,10,15,0.92)_65%)] p-6 shadow-[0_0_40px_rgba(0,245,255,0.08)] sm:h-48 sm:w-48 md:h-52 md:w-52">
        <div className="absolute inset-2 rounded-full border border-white/10" />
        <div className="absolute -top-px left-1/2 h-px w-20 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent" />

        <img
          src={sponsor.logo}
          alt={sponsor.name}
          className="relative z-10 max-h-20 w-auto object-contain"
          onError={(event) => {
            event.currentTarget.style.display = "none";
            event.currentTarget.nextElementSibling.style.display = "flex";
          }}
        />

        <div className="relative z-10 hidden h-24 w-24 items-center justify-center rounded-full border border-dashed border-white/20 bg-white/5 px-4 text-center font-mono text-sm uppercase tracking-[0.18em] text-[var(--neon-cyan)]">
          {sponsor.name}
        </div>
      </div>

      <p className="mt-5 font-mono text-xs uppercase tracking-[0.28em] text-white/65">
        {sponsor.name}
      </p>
    </motion.div>
  );
}

export default function Sponsors() {
  return (
    <section id="sponsors" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute left-8 bottom-10 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute right-8 top-16 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="section-badge mb-4">
            <Sparkles className="h-4 w-4" />
            Sponsors
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
            Backed By Our <span className="heading-gradient">Partners</span>
          </h2>
          <p className="muted mx-auto mt-4 max-w-2xl text-lg">
            Add your sponsor logos inside these circular cards to showcase the brands supporting the event.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {sponsors.map((sponsor, index) => (
            <SponsorCard key={sponsor.name} sponsor={sponsor} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
