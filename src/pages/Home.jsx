import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Scrollytelling from "../components/Scrollytelling";
import Prizes from "../components/Prizes";
import Sponsors from "../components/Sponsors";
import FAQ from "../components/FAQ";
import WhyJoinUs from "../components/WhyJoinUs";
import Timeline from "../components/Timeline";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Galaxy from "../components/Galaxy";
import TargetCursor from "../components/TargetCursor";
import TrackSelectorModal from "../components/TrackSelectorModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 -z-10 opacity-95" style={{ width: "100vw", height: "100vh" }}>
        <Galaxy mouseInteraction={false} density={0.85} glowIntensity={0.28} saturation={0.1} />
      </div>
      <TargetCursor />
      <Navbar />
      <Hero onRegisterClick={() => setModalOpen(true)} />
      <About />
      <Scrollytelling />
      <Prizes />
      <Sponsors />
      <WhyJoinUs />
      <Timeline />
      <FAQ />
      <Contact />
      <Footer />
      <TrackSelectorModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
