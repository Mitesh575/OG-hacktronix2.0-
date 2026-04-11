import { motion } from "framer-motion";

export default function ExternalRegistration() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-bg">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1
            className="text-4xl md:text-6xl font-black tracking-[0.08em] text-white"
            style={{ fontFamily: "'Exo 2', sans-serif" }}
          >
            EXTERNAL REGISTRATION
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 font-mono tracking-wide">
            Coming Soon...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
