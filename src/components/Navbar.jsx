import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Prizes", href: "#prizes" },
    { label: "Timeline", href: "#timeline" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
    { label: "Team", href: "/team" },
    { label: "Guidelines", href: "/guidelines" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(10,10,14,0.88)] backdrop-blur-xl shadow-[0_0_30px_rgba(0,245,255,0.03)] border-b border-[rgba(0,245,255,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="cursor-target flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-sm flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, var(--sw-graphite), var(--sw-steel))" }}>
              <span className="text-white font-bold text-xs font-mono relative z-10 tracking-widest">HX</span>
              <div className="absolute inset-0 rounded-sm bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--color-primary)] opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300" />
            </div>
            <span className="text-lg font-bold text-white font-mono tracking-wider" style={{ fontFamily: "'Star Jedi', sans-serif" }}>
              HACK<span className="text-[var(--neon-cyan)]">TRONIX</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="cursor-target relative px-4 py-2 text-gray-400 hover:text-[var(--neon-cyan)] transition-all text-xs font-medium font-mono tracking-wider uppercase group"
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </motion.a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-[var(--neon-cyan)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[rgba(10,10,14,0.95)] backdrop-blur-xl border-t border-white/6"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-gray-400 hover:text-[var(--neon-cyan)] hover:bg-white/5 rounded-sm transition-colors font-mono text-xs tracking-wider uppercase"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}