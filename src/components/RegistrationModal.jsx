import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ArrowLeft, Check, ChevronRight, Cpu, Layers3, Sparkles, Wrench } from "lucide-react";
import { db } from "../lib/firebase";
import { sendConfirmationEmail } from "../lib/emailjs";
import GlassCard from "./ui/GlassCard";
import { problemStatements } from "../data/problemStatements";

const modalTheme = {
  neutral: {
    accent: "var(--neon-cyan)",
    accentBg: "rgba(0,245,255,0.12)",
    accentBorder: "rgba(0,245,255,0.3)",
    accentGlow: "rgba(0,245,255,0.15)",
    focusBorder: "var(--neon-cyan)",
    buttonClass: "btn-sw-primary",
    dotBg: "var(--neon-cyan)",
  },
  Software: {
    accent: "var(--neon-cyan)",
    accentBg: "rgba(0,245,255,0.12)",
    accentBorder: "rgba(0,245,255,0.3)",
    accentGlow: "rgba(0,245,255,0.15)",
    focusBorder: "var(--neon-cyan)",
    buttonClass: "btn-stormtrooper",
    dotBg: "var(--neon-cyan)",
  },
  Hardware: {
    accent: "var(--sw-red)",
    accentBg: "rgba(204,17,34,0.12)",
    accentBorder: "rgba(204,17,34,0.3)",
    accentGlow: "rgba(204,17,34,0.15)",
    focusBorder: "var(--sw-red)",
    buttonClass: "btn-vader",
    dotBg: "var(--sw-red)",
  },
};

const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  college: z.string().min(2, "College name is required"),
  teamName: z.string().min(2, "Team name is required"),
  track: z.enum(["Software", "Hardware"], {
    errorMap: () => ({ message: "Please select a track" }),
  }),
  problemStatement: z.string().min(1, "Please select a problem statement"),
  problemStatementId: z.string().min(1, "Please select a problem statement"),
  teamSize: z.number().min(2).max(5),
});

function ModalShell({ children, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    const el = modalRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.stopPropagation();
      const isAtTop = el.scrollTop <= 0;
      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      const scrollingUp = e.deltaY < 0;
      const scrollingDown = e.deltaY > 0;
      if ((isAtTop && scrollingUp) || (isAtBottom && scrollingDown)) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e) => {
      e.stopPropagation();
      const isAtTop = el.scrollTop <= 0;
      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      const scrollingUp = e.touches[0].clientY > (el._lastTouchY || 0);
      const scrollingDown = e.touches[0].clientY < (el._lastTouchY || 0);
      el._lastTouchY = e.touches[0].clientY;
      if ((isAtTop && scrollingUp) || (isAtBottom && scrollingDown)) {
        e.preventDefault();
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div ref={modalRef} className="w-full max-w-4xl max-h-[92vh] overflow-y-auto overscroll-contain rounded-sm border border-[rgba(0,245,255,0.08)] bg-[rgba(14,14,20,0.96)] shadow-2xl shadow-black/60 backdrop-blur-xl" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(0,245,255,0.2) transparent" }}>
          {children}
        </div>
      </motion.div>
    </>
  );
}

function StepBadge({ index, label, active, complete, theme }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={[
          "flex h-8 w-8 items-center justify-center rounded-sm border text-sm font-semibold transition-all",
          complete
            ? "text-white"
            : active
              ? "text-white"
              : "border-white/10 bg-bg text-gray-500",
        ].join(" ")}
        style={complete ? { borderColor: theme.accentBorder, backgroundColor: theme.accentBg } : active ? { borderColor: theme.accentBorder, backgroundColor: theme.accentBg } : {}}
      >
        {complete ? <Check className="h-4 w-4" /> : index}
      </div>
      <span className={active || complete ? "text-white" : "text-gray-500"}>{label}</span>
    </div>
  );
}

function TrackCard({ title, description, bullets, icon: Icon, active, onClick, theme }) {
  return (
    <GlassCard
      as="button"
      type="button"
      onClick={onClick}
      className={[
        "cursor-target group w-full p-6 text-left shadow-lg shadow-black/10",
        active
          ? "shadow-[0_0_16px_rgba(0,245,255,0.08)]"
          : "hover:border-[rgba(0,245,255,0.15)] hover:shadow-[0_0_12px_rgba(0,245,255,0.05)]",
      ].join(" ")}
      interactive
    >
      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-sm text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${theme.accent}, rgba(0,0,0,0.4))`, boxShadow: `0 0 12px ${theme.accentGlow}` }}>
            <Icon className="h-6 w-6" />
          </div>
          {active && (
            <div className="rounded-sm px-3 py-1 text-xs font-medium tracking-wider uppercase" style={{ borderColor: theme.accentBorder, backgroundColor: theme.accentBg, color: theme.accent, border: `1px solid ${theme.accentBorder}` }}>
              Selected
            </div>
          )}
        </div>
        <h3 className="mb-2 text-2xl font-semibold text-white">{title}</h3>
        <p className="mb-5 text-sm leading-6 text-gray-400">{description}</p>
        <div className="space-y-2">
          {bullets.map((bullet) => (
            <div key={bullet} className="flex items-center gap-2 text-sm text-gray-300">
              <span className="h-1.5 w-1.5 rounded-sm" style={{ backgroundColor: theme.dotBg }} />
              {bullet}
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

function ProblemCard({ item, active, onSelect, theme }) {
  return (
    <GlassCard
      as="button"
      type="button"
      onClick={onSelect}
      className={[
        "cursor-target group w-full p-5 text-left shadow-lg shadow-black/10",
        active
          ? "shadow-[0_0_16px_rgba(0,245,255,0.08)]"
          : "hover:border-[rgba(0,245,255,0.15)] hover:shadow-[0_0_12px_rgba(0,245,255,0.05)]",
      ].join(" ")}
      interactive
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex rounded-sm px-3 py-1 text-xs font-medium tracking-wide" style={{ borderColor: theme.accentBorder, backgroundColor: theme.accentBg, color: theme.accent, border: `1px solid ${theme.accentBorder}` }}>
            {item.id}
          </div>
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
        </div>
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border transition-all"
          style={active ? { borderColor: theme.accentBorder, backgroundColor: theme.accent, color: "#fff" } : { borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.03)", color: "#6b7280" }}
        >
          {active ? <Check className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </div>
      </div>
      <p className="mb-4 text-sm leading-6 text-gray-400">{item.summary}</p>
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={tag} className="rounded-sm px-3 py-1 text-xs" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.03)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.06)" }}>
            {tag}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      {children}
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </div>
  );
}

function SummaryPill({ label, value, theme }) {
  return (
    <GlassCard className="p-4 md:p-5">
      <p className="mb-1 text-xs uppercase tracking-[0.2em] text-gray-500">{label}</p>
      <p className="text-sm font-medium" style={{ color: theme?.accent || "#fff" }}>{value}</p>
    </GlassCard>
  );
}

function TeamSizeSelector({ value, onChange, error, theme }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [2, 3, 4, 5];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">Team Size</label>
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full rounded-sm border border-white/8 bg-white/[0.03] px-4 py-3 text-white text-left flex items-center justify-between transition hover:border-white/15"
          style={{ borderColor: open ? theme.accentBorder : undefined }}
        >
          <span>{value} {value === 1 ? "member" : "members"}</span>
          <svg className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 w-full bottom-full mb-1 rounded-sm border border-white/8 bg-[rgba(14,14,20,0.98)] backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden"
            >
              {options.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => { onChange(n); setOpen(false); }}
                  className="w-full px-4 py-3 text-left text-sm text-gray-300 transition-colors hover:bg-white/5 flex items-center justify-between"
                  style={n === value ? { backgroundColor: theme.accentBg, color: "#fff" } : {}}
                >
                  <span>{n} {n === 1 ? "member" : "members"}</span>
                  {n === value && <Check className="w-4 h-4" style={{ color: theme.accent }} />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </div>
  );
}

export default function RegistrationModal({ isOpen, onClose, initialTrack = null }) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [regId, setRegId] = useState("");
  const [step, setStep] = useState("track");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      teamSize: 2,
      track: undefined,
      problemStatement: "",
      problemStatementId: "",
    },
  });

  const selectedTrack = watch("track");
  const selectedProblemStatement = watch("problemStatement");
  const currentProblems = useMemo(
    () => (selectedTrack ? problemStatements[selectedTrack] : []),
    [selectedTrack]
  );

  useEffect(() => {
    if (!isOpen) {
      setSuccess(false);
      setRegId("");
      setStep(initialTrack ? "problem" : "track");
      reset({
        name: "",
        email: "",
        phone: "",
        college: "",
        teamName: "",
        teamSize: 2,
        track: initialTrack || undefined,
        problemStatement: "",
        problemStatementId: "",
      });
    }
  }, [isOpen, reset, initialTrack]);

  useEffect(() => {
    if (!isOpen) return;
    if (initialTrack) {
      setValue("track", initialTrack, { shouldDirty: false, shouldValidate: true });
      setStep("problem");
    } else {
      setStep("track");
    }
  }, [initialTrack, isOpen, setValue]);

  const chooseTrack = (track) => {
    setValue("track", track, { shouldDirty: true, shouldValidate: true });
    setValue("problemStatement", "", { shouldDirty: true, shouldValidate: false });
    setValue("problemStatementId", "", { shouldDirty: true, shouldValidate: false });
    setStep("problem");
  };

  const chooseProblemStatement = async (item) => {
    setValue("problemStatement", item.title, { shouldDirty: true, shouldValidate: true });
    setValue("problemStatementId", item.id, { shouldDirty: true, shouldValidate: true });
    await trigger(["track", "problemStatement", "problemStatementId"]);
    setStep("form");
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const generatedRegId = `HX${Date.now().toString(36).toUpperCase()}`;

      await addDoc(collection(db, "registrations"), {
        ...data,
        regId: generatedRegId,
        status: "pending",
        hackathonYear: "2.0",
        createdAt: serverTimestamp(),
      });

      // Send confirmation email — silently fail so registration still succeeds
      sendConfirmationEmail({ ...data, regId: generatedRegId }).catch((e) =>
        console.warn("Email send failed:", e)
      );

      setRegId(generatedRegId);
      setSuccess(true);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const stepNumber = step === "track" ? 1 : step === "problem" ? 2 : 3;
  const showTrackStep = !initialTrack;
  const theme = modalTheme[selectedTrack] || modalTheme.neutral;

  return (
    <AnimatePresence>
      {isOpen ? (
        <ModalShell onClose={onClose}>
          {success ? (
            <div className="p-8 md:p-10 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-sm text-green-400" style={{ backgroundColor: "rgba(34,197,94,0.15)" }}>
                <Check className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">Registration Successful</h3>
              <p className="mb-4 text-gray-400">Your registration ID is</p>
              <p className="mb-6 text-2xl font-bold font-mono" style={{ color: theme.accent }}>{regId}</p>
              <p className="mx-auto mb-8 max-w-md text-sm leading-6 text-gray-400">
                Save this ID for future reference. You can always replace the placeholder problem statements later.
              </p>
              <button onClick={onClose} className={`${theme.buttonClass} cursor-target text-sm`}>
                <span>Close</span>
              </button>
            </div>
          ) : (
            <div className="p-6 md:p-8">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <div className="section-badge mb-4">
                    <Sparkles className="h-4 w-4" />
                    Team Registration
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Register for HACKTRONIX</h2>
                  <p className="mt-2 max-w-2xl text-sm md:text-base text-gray-400">
                    Pick your track, choose a problem statement, then complete your team registration.
                  </p>
                </div>
                <button onClick={onClose} className="cursor-target rounded-sm border border-white/8 bg-white/[0.03] p-2 text-gray-400 transition hover:text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-8 flex flex-wrap gap-4">
                {showTrackStep ? <StepBadge index={1} label="Track" active={step === "track"} complete={stepNumber > 1} theme={theme} /> : null}
                <StepBadge
                  index={showTrackStep ? 2 : 1}
                  label="Problem Statement"
                  active={step === "problem"}
                  complete={showTrackStep ? stepNumber > 2 : step === "form"}
                  theme={theme}
                />
                <StepBadge index={showTrackStep ? 3 : 2} label="Team Details" active={step === "form"} complete={false} theme={theme} />
              </div>

              {showTrackStep && step === "track" ? (
                <div>
                  <div className="mb-6 max-w-2xl">
                    <h3 className="text-xl font-semibold text-white">Choose your track</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      Start by selecting the competition track your team wants to build for.
                    </p>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2 items-stretch">
                    <TrackCard
                      title="Software"
                      description="Ideal for teams building platforms, apps, AI tools, dashboards, and digital systems."
                      bullets={["Web or mobile products", "AI-powered workflows", "Platform and dashboard ideas"]}
                      icon={Layers3}
                      active={selectedTrack === "Software"}
                      onClick={() => chooseTrack("Software")}
                      theme={modalTheme.Software}
                    />
                    <TrackCard
                      title="Hardware"
                      description="Best for teams creating embedded, IoT, automation, robotics, or sensor-based solutions."
                      bullets={["Physical prototypes", "Embedded and IoT systems", "Automation and sensing"]}
                      icon={Cpu}
                      active={selectedTrack === "Hardware"}
                      onClick={() => chooseTrack("Hardware")}
                      theme={modalTheme.Hardware}
                    />
                  </div>
                </div>
              ) : null}

              {step === "problem" ? (
                <div>
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">Choose a {selectedTrack} problem statement</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-400">
                        Placeholder cards are wired in for now. You can replace them with final statements later.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => (showTrackStep ? setStep("track") : onClose())}
                      className="cursor-target inline-flex items-center gap-2 rounded-sm border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 transition hover:border-[rgba(0,245,255,0.2)] hover:text-white"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      {showTrackStep ? "Back" : "Close"}
                    </button>
                  </div>

                  <GlassCard className="mb-6 p-4">
                    <div className="inline-flex items-center gap-2 rounded-sm px-3 py-1 text-sm font-medium" style={{ backgroundColor: theme.accentBg, color: theme.accent }}>
                      {selectedTrack === "Software" ? <Layers3 className="h-4 w-4" /> : <Wrench className="h-4 w-4" />}
                      {selectedTrack} Track
                    </div>
                  </GlassCard>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 items-stretch">
                    {currentProblems.map((item) => (
                      <ProblemCard
                        key={item.id}
                        item={item}
                        active={selectedProblemStatement === item.title}
                        onSelect={() => chooseProblemStatement(item)}
                        theme={theme}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              {step === "form" ? (
                <div>
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">Complete your registration</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-400">
                        Your team selection is locked in below. Fill in the remaining details to submit.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep("problem")}
                      className="cursor-target inline-flex items-center gap-2 rounded-sm border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 transition hover:border-[rgba(0,245,255,0.2)] hover:text-white"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Change problem statement
                    </button>
                  </div>

                  <div className="mb-6 grid gap-4 md:grid-cols-2">
                    <SummaryPill label="Selected track" value={selectedTrack} theme={theme} />
                    <SummaryPill label="Problem statement" value={selectedProblemStatement} theme={theme} />
                  </div>

                  <GlassCard className="p-5 md:p-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <input type="hidden" {...register("track")} />
                    <input type="hidden" {...register("problemStatement")} />
                    <input type="hidden" {...register("problemStatementId")} />

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Full Name" error={errors.name?.message}>
                        <input
                          {...register("name")}
                          className="w-full rounded-sm border border-white/8 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-[var(--neon-cyan)]"
                          style={{ focusBorderColor: theme.focusBorder }}
                          placeholder="Enter your full name"
                        />
                      </Field>
                      <Field label="Email" error={errors.email?.message}>
                        <input
                          {...register("email")}
                          type="email"
                          className="w-full rounded-sm border border-white/8 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-[var(--neon-cyan)]"
                          placeholder="Enter your email"
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Phone Number" error={errors.phone?.message}>
                        <input
                          {...register("phone")}
                          type="tel"
                          className="w-full rounded-sm border border-white/8 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-[var(--neon-cyan)]"
                          placeholder="Enter phone number"
                        />
                      </Field>
                      <Field label="College Name" error={errors.college?.message}>
                        <input
                          {...register("college")}
                          className="w-full rounded-sm border border-white/8 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-[var(--neon-cyan)]"
                          placeholder="Enter college name"
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 md:grid-cols-[1.6fr_0.8fr]">
                      <Field label="Team Name" error={errors.teamName?.message}>
                        <input
                          {...register("teamName")}
                          className="w-full rounded-sm border border-white/8 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-[var(--neon-cyan)]"
                          placeholder="Enter team name"
                        />
                      </Field>
                      <TeamSizeSelector
                        value={watch("teamSize") || 1}
                        onChange={(n) => setValue("teamSize", n, { shouldDirty: true, shouldValidate: true })}
                        error={errors.teamSize?.message}
                        theme={theme}
                      />
                    </div>

                    {(errors.track || errors.problemStatement) && (
                      <div className="rounded-sm border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        {errors.track?.message || errors.problemStatement?.message}
                      </div>
                    )}

                    <div className="flex flex-col gap-3 border-t border-white/6 pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={() => (showTrackStep ? setStep("problem") : onClose())}
                        className="cursor-target inline-flex items-center justify-center gap-2 rounded-sm border border-white/8 bg-white/[0.03] px-5 py-3 text-sm font-medium text-gray-300 transition hover:border-[rgba(0,245,255,0.2)] hover:text-white"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        {showTrackStep ? "Back" : "Close"}
                      </button>
                      <button type="submit" disabled={submitting} className={`${theme.buttonClass} cursor-target text-sm disabled:opacity-50`}>
                        <span>{submitting ? "Submitting..." : "Submit Registration"}</span>
                      </button>
                    </div>
                  </form>
                  </GlassCard>
                </div>
              ) : null}
            </div>
          )}
        </ModalShell>
      ) : null}
    </AnimatePresence>
  );
}
