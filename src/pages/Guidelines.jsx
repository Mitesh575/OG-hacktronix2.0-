import Galaxy from "../components/Galaxy";
import TargetCursor from "../components/TargetCursor";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const generalRules = [
  "Each team must consist of a minimum of 2 members and a maximum of 4 members.",
  "Teams are allowed to select and work on only one problem statement.",
  "Inter-college teams: Allowed. Team members can be from the different colleges.",
  "Inter-specialization teams: Allowed. Team members can be from different specializations within the same college.",
  "All solutions must be submitted before the specified deadline.",
  "Any form of plagiarism will result in immediate disqualification of the team.",
  "At least two participants from the registered team must be physically present for the grand finale round.",
  "Mentors are not considered part of the team.",
  "Participants are responsible for the safety and security of their personal belongings.",
  "Participants must maintain cleanliness, follow a proper dress code, and uphold discipline at the venue.",
  "Travel expenses must be borne by the participants.",
  "The event will take place from 8:00 AM on April 7th to 3:00 PM on April 8th IST. Participants should plan accordingly.",
  "If the chosen problem statement requires hardware components, participants must bring their own as the organizing team will not provide any hardware.",
  "College students must bring their college ID card (a photocopy is acceptable) for verification at the grand finale.",
  "All project work must be completed during the Hackathon, and the code repository must be initialized at the start of the event.",
  "Teams are permitted to use libraries, frameworks, and open-source code, but pre-developed projects or open-sourced solutions specifically created for this event are not allowed.",
  "Product development must cease once the allotted time is over. Minor debugging and fixes are permitted post-deadline.",
  "The organizers reserve the right to disqualify any team for violating rules, displaying unsporting behavior, or breaching the code of conduct.",
  "The Hackathon judging criteria will be disclosed one hour before the event begins.",
  "In case of any disputes, the final decision will rest with the organizers.",
  "Participants must follow the official social media channels to stay updated and qualify for the grand finale.",
];

const hackTronixRules = [
  "Teams must upload the problem statement PPT and obtain approval during registration.",
  "Any form of plagiarism will lead to immediate disqualification.",
  "Sharing project-related information outside the team is strictly prohibited. Violations may result in disqualification.",
  "Teams or individuals may bring a faculty member (optional).",
  "Participants may select a mentor (optional).",
  "All project phases must be completed and submitted within the given deadlines.",
  "Communication must only occur via the registered email ID.",
  "From all registered teams, the top 30 teams will advance to the grand finale.",
  "Bonus points will be awarded for proper version control on GitHub.",
  "Teams must follow the provided PPT template for submissions.",
  "Participants must regularly check the HackTronix 1.0 website for updates.",
  "Teams interested in donating their projects for public use are welcome to do so.",
];

const complianceRules = [
  "Failure to adhere to the above rules may result in warnings, penalties, or disqualification.",
  "The organizing committee reserves the right to modify the rules if necessary, with prior notification to the participants.",
  "Participants must acknowledge and accept these rules before registering for the event.",
];

export default function GuidelinesPage() {
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
            <a href="/team" className="cursor-target inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 transition hover:text-white">
              Team
            </a>
            <Link to="/" className="cursor-target inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 transition hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Link>
          </div>
        </div>
      </header>

      <main className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="section-badge mb-6">Rules</div>
          <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
            Guidelines
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            The following rules apply to all participants and teams. Please read them carefully before the event.
          </p>

          {/* General Rules Section */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-white">General Rules</h2>
            <div className="space-y-4">
              {generalRules.map((rule, idx) => (
                <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 rounded-full bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--color-primary)] p-2.5 text-sm font-bold text-white">{idx + 1}</span>
                    <p className="text-sm leading-7 text-gray-300">{rule}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HackTronix 1.0 Rules Section */}
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-white">HackTronix 1.0 Rules</h2>
            <div className="space-y-4">
              {hackTronixRules.map((rule, idx) => (
                <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 rounded-full bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--color-primary)] p-2.5 text-sm font-bold text-white">{idx + 1}</span>
                    <p className="text-sm leading-7 text-gray-300">{rule}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance and Enforcement Section */}
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-white">Compliance and Enforcement</h2>
            <div className="space-y-4">
              {complianceRules.map((rule, idx) => (
                <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 rounded-full bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--color-primary)] p-2.5 text-sm font-bold text-white">{idx + 1}</span>
                    <p className="text-sm leading-7 text-gray-300">{rule}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Link to="/" className="btn-secondary cursor-target inline-flex items-center gap-2 text-base">
              <ArrowLeft className="h-4 w-4" />
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
