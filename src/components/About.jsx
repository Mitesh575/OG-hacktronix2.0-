import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Code, Users } from "lucide-react";
import GlassCard from "./ui/GlassCard";

export default function About() {
  return (
    <section id="about" className="py-12 md:py-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center" style={{ letterSpacing: "2px" }}>
            About <span className="text-[#ff2d55] font-['Exo_2']">HACKTRONIX</span>
          </h2>

          <GlassCard className="p-6 md:p-8" style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}>
            <p className="text-gray-300 leading-relaxed mb-8 max-w-4xl mx-auto text-center">
              Welcome to Hacktronix 2.0, A 24-hour tech marathon where innovation meets determination. This hackathon helps in pushing boundaries, solving real-world problems, and turning ideas into reality. Whether you're an expert coder, a budding developer, or someone with a big idea, Hacktronix 2.0 is the perfect platform to learn, collaborate, and create something incredible.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                  <Calendar className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-blue-300/70 uppercase tracking-wider font-mono">Date</p>
                  <p className="text-white font-medium">Coming Soon</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                  <Clock className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-xs text-red-300/70 uppercase tracking-wider font-mono">Duration</p>
                  <p className="text-white font-medium">24 Hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                  <MapPin className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-orange-300/70 uppercase tracking-wider font-mono">Location</p>
                  <p className="text-white font-medium">TBA</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="p-6 flex flex-col items-start h-full border border-blue-500/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/30 to-blue-400/10 border border-blue-500/30 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <Code className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Innovative Challenges</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tackle real-world problems with cutting-edge technology and creative solutions.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <GlassCard className="p-6 flex flex-col items-start h-full border border-red-500/20 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600/30 to-orange-500/10 border border-red-500/30 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                <Users className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Networking Opportunities</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Connect with industry leaders, mentors, and fellow innovators.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
