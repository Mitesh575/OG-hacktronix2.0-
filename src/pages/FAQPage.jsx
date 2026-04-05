import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FAQ from "../components/FAQ";
import Galaxy from "../components/Galaxy";
import TargetCursor from "../components/TargetCursor";

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <TargetCursor variant="cyan" />
      <div className="fixed inset-0 -z-10 opacity-95" style={{ width: "100vw", height: "100vh" }}>
        <Galaxy mouseInteraction={false} density={0.65} glowIntensity={0.2} saturation={0.08} />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(10,10,14,0.72)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="cursor-target inline-flex items-center gap-3 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary font-bold">HX</span>
            <span className="text-lg font-semibold">HACKTRONIX</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/guidelines" className="cursor-target inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 transition hover:text-white">
              Guidelines
            </Link>
            <Link to="/" className="cursor-target inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 transition hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Link>
          </div>
        </div>
      </header>

      <main className="px-4 py-20 sm:px-6 lg:px-8">
        <FAQ isFullPage={true} />
      </main>
    </div>
  );
}