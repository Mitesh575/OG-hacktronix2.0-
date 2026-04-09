import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Network, Lightbulb, Code2, Users, Award, Layers, Clock } from "lucide-react";

const features = [
  {
    title: "Networking",
    description: "Connect with industry experts and fellow innovators",
    icon: Network,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    title: "Mentorship",
    description: "Get guidance from experienced professionals",
    icon: Lightbulb,
    gradient: "from-purple-500 to-pink-400",
  },
  {
    title: "Experience",
    description: "Hands-on learning with cutting-edge technologies",
    icon: Code2,
    gradient: "from-amber-500 to-orange-400",
  },
];

const stats = [
  { value: "200+", label: "Participants", icon: Users, gradient: "from-primary to-secondary" },
  { value: "₹30,000", label: "Prize Pool", icon: Award, gradient: "from-green-500 to-emerald-400" },
  { value: "5", label: "Domains", icon: Layers, gradient: "from-blue-500 to-cyan-400" },
  { value: "24", label: "Hours", icon: Clock, gradient: "from-purple-500 to-pink-400" },
];

function useCountUp(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const numericMatch = target.match(/^([^0-9]*)([0-9,]+)(.*)$/);
    if (!numericMatch) { setCount(target); return; }
    const prefix = numericMatch[1];
    const numStr = numericMatch[2].replace(/,/g, "");
    const suffix = numericMatch[3];
    const numericTarget = parseInt(numStr, 10);
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * numericTarget);
      setCount(`${prefix}${current.toLocaleString()}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };

    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

function FeatureCard({ title, description, icon: Icon, gradient, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r opacity-20 group-hover:opacity-50 transition-opacity duration-300 rounded-2xl blur" style={{ background: `linear-gradient(90deg, var(--neon-cyan), var(--color-primary))` }} />
      <div className="relative glass rounded-2xl p-8 border border-white/10 group-hover:border-[rgba(0,245,255,0.2)] transition-colors group-hover:shadow-[0_0_24px_rgba(0,245,255,0.06)]">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-5 shadow-lg`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 font-mono">{title}</h3>
        <p className="muted text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function StatCard({ value, label, icon: Icon, gradient, index }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const animatedValue = useCountUp(value, 1400, started);

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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-2xl p-6 text-center border border-white/10 hover:border-[rgba(0,245,255,0.15)] transition-colors"
    >
      <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <p className={`text-3xl md:text-4xl font-bold font-mono bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}>
        {animatedValue}
      </p>
      <p className="muted text-sm font-mono uppercase tracking-widest">{label}</p>
    </motion.div>
  );
}

export default function WhyJoinUs() {
  return (
    <section id="why-join" className="py-12 md:py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 mt-4">
            Level Up Your <span className="text-[#ff2d55] font-['Exo_2']">Skills</span>
          </h2>
          <p className="muted max-w-xl mx-auto text-lg">
            Join HACKTRONIX 2.0 and accelerate your journey in tech innovation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, idx) => (
            <FeatureCard key={feature.title} {...feature} index={idx} />
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <StatCard key={stat.label} {...stat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
