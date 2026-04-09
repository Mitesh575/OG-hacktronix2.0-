import { Link } from "react-router-dom";
import FAQ from "../components/FAQ";
import Galaxy from "../components/Galaxy";
import TargetCursor from "../components/TargetCursor";
import hackLogo from "../images/hack-logo.png";

export default function FAQPage() {
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
          <Link to="/guidelines" className="cursor-target inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 transition hover:text-white">
              Guidelines
            </Link>
        </div>
      </header>

      <main className="px-4 py-20 sm:px-6 lg:px-8">
        <FAQ isFullPage={true} />
      </main>
    </div>
  );
}