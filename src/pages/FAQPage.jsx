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

      <main className="px-4 py-20 sm:px-6 lg:px-8">
        <FAQ isFullPage={true} />
      </main>
    </div>
  );
}