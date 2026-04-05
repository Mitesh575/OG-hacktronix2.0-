import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal } from "lucide-react";
import AccentCard from "./ui/AccentCard";

const prizes = [
  {
    category: "Software",
    gradient: "from-blue-500 to-cyan-400",
    items: [
      { rank: "1st", amount: "₹50,000", icon: Trophy },
      { rank: "2nd", amount: "₹30,000", icon: Medal },
    ],
  },
  {
    category: "Hardware",
    gradient: "from-purple-500 to-pink-400",
    items: [
      { rank: "1st", amount: "₹40,000", icon: Trophy },
      { rank: "2nd", amount: "₹20,000", icon: Medal },
    ],
  },
];

function useCountUp(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const numericTarget = parseInt(target.replace(/[^0-9]/g, ""), 10);
    const prefix = target.match(/^[^0-9]*/)[0];
    const suffix = target.replace(/^[^0-9]*/, "").replace(/[0-9]/g, "");
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericTarget));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(numericTarget);
    };

    requestAnimationFrame(step);
    return () => {};
  }, [start, target, duration]);

  return `${target.match(/^[^0-9]*/)[0]}${count.toLocaleString()}${target.replace(/^[^0-9]*/, "").replace(/[0-9]/g, "")}`;
}

function PrizeCard({ rank, amount, icon: Icon, gradient, index }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const animatedAmount = useCountUp(amount, 1400, started);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isFirst = rank === "1st";

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative"
    >
      <div className="h-full rounded-sm border border-white/8 bg-[rgba(14,14,20,0.92)] overflow-hidden transition-all duration-300 hover:border-[rgba(0,245,255,0.15)] hover:shadow-[0_0_12px_rgba(0,245,255,0.04)]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,245,255,0.2)] to-transparent" />
        <div className={`absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b ${gradient} opacity-25`} />
        <div className="p-5 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className={`flex h-11 w-11 items-center justify-center rounded-sm bg-gradient-to-r ${gradient}`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            {isFirst && (
              <span
                className="rounded-sm px-3 py-1 text-[10px] font-bold font-mono tracking-wider uppercase"
                style={{ background: "linear-gradient(90deg, var(--neon-yellow), #ffe600)", color: "#000", boxShadow: "0 0 12px rgba(255,230,0,0.4)" }}
              >
                TOP PRIZE
              </span>
            )}
            {!isFirst && (
              <span className="sw-label-warning">
                {rank === "1st" ? "WINNER" : "RUNNER-UP"}
              </span>
            )}
          </div>
          <h3 className="mb-1 text-lg font-semibold text-white font-mono tracking-wide">{rank} Place</h3>
          <p className={`text-2xl font-bold font-mono bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {animatedAmount}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Prizes() {
  return (
    <section id="prizes" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-4">
            <Trophy className="w-4 h-4" />
            Prize Pool
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 mt-4">
            Win Exciting <span className="heading-gradient">Rewards</span>
          </h2>
          <p className="muted max-w-xl mx-auto text-lg">
            Compete across software and hardware tracks for cash prizes and exclusive goodies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {prizes.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative"
            >
              <AccentCard gradient={category.gradient} className="p-6 md:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-sm bg-gradient-to-r ${category.gradient} flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm font-mono">
                      {category.category === "Software" ? "S" : "H"}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white font-mono tracking-wider">{category.category} Track</h3>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {category.items.map((prize) => (
                    <PrizeCard key={prize.rank} {...prize} gradient={category.gradient} />
                  ))}
                </div>
              </AccentCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
