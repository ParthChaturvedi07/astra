"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Types                                                                      */
/* ─────────────────────────────────────────────────────────────────────────── */
interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Static data                                                                */
/* ─────────────────────────────────────────────────────────────────────────── */
const BUG_TYPE_ICONS: Record<string, React.ReactNode> = {
  crash: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
  match: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  ),
  payment: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  ),
  visual: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  perf: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  auth: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  data: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  other: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  ),
};

const BUG_TYPES: { id: string; label: string; desc: string }[] = [
  { id: "crash", label: "Crash / Freeze", desc: "App unexpectedly closes or hangs" },
  { id: "match", label: "Match Blocker", desc: "Can't join or start a tournament" },
  { id: "payment", label: "Payment / UPI", desc: "Withdrawal or reward issue" },
  { id: "visual", label: "Visual Glitch", desc: "UI renders incorrectly" },
  { id: "perf", label: "Performance", desc: "Lag, stutter, slow load" },
  { id: "auth", label: "Login / Auth", desc: "Can't sign in or session expired" },
  { id: "data", label: "Data Error", desc: "Wrong stats, scores, or ranks" },
  { id: "other", label: "Other", desc: "Something else entirely" },
];

const PLATFORMS = [
  { id: "app", label: "Astra App" },
  { id: "bgmi", label: "BGMI" },
  { id: "freefire", label: "Free Fire" },
  { id: "cod", label: "COD Mobile" },
  { id: "lobby", label: "Tournament Lobby" },
  { id: "rewards", label: "Rewards / UPI" },
  { id: "streaming", label: "Live Streaming" },
];

const PRIORITIES = [
  {
    id: "critical",
    label: "Critical",
    sub: "Prevents play entirely",
    color: "red",
    glow: "rgba(239,68,68,0.35)",
    border: "border-red-500/60",
    activeBg: "bg-red-500/15",
    inactiveBorder: "border-red-500/20",
    inactiveBg: "bg-red-950/10",
    dot: "bg-red-500",
    text: "text-red-400",
  },
  {
    id: "high",
    label: "High",
    sub: "Major feature broken",
    color: "orange",
    glow: "rgba(249,115,22,0.35)",
    border: "border-orange-500/60",
    activeBg: "bg-orange-500/15",
    inactiveBorder: "border-orange-500/20",
    inactiveBg: "bg-orange-950/10",
    dot: "bg-orange-500",
    text: "text-orange-400",
  },
  {
    id: "medium",
    label: "Medium",
    sub: "Workaround exists",
    color: "amber",
    glow: "rgba(245,158,11,0.35)",
    border: "border-amber-500/60",
    activeBg: "bg-amber-500/15",
    inactiveBorder: "border-amber-500/20",
    inactiveBg: "bg-amber-950/10",
    dot: "bg-amber-400",
    text: "text-amber-400",
  },
  {
    id: "low",
    label: "Low",
    sub: "Cosmetic or minor",
    color: "emerald",
    glow: "rgba(16,185,129,0.35)",
    border: "border-emerald-500/60",
    activeBg: "bg-emerald-500/15",
    inactiveBorder: "border-emerald-500/20",
    inactiveBg: "bg-emerald-950/10",
    dot: "bg-emerald-400",
    text: "text-emerald-400",
  },
];

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Inline CSS injected once                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */
const inlineCss = `
  @keyframes br-pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
  @keyframes br-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes br-scan  { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
  @keyframes br-spin  { to{transform:rotate(360deg)} }
  @keyframes br-ping  { 75%,100%{transform:scale(1.8);opacity:0} }
  @keyframes br-tick  { from{stroke-dashoffset:60} to{stroke-dashoffset:0} }

  .br-scanline { animation: br-scan 4s linear infinite; }
  .br-float    { animation: br-float 6s ease-in-out infinite; }
  .br-pulse    { animation: br-pulse 2s ease-in-out infinite; }
  .br-spin     { animation: br-spin 20s linear infinite; }
  .br-ping     { animation: br-ping 1.4s cubic-bezier(0,0,.2,1) infinite; }
  .br-tick     { stroke-dasharray:60; animation: br-tick .5s ease forwards; }

  .br-input {
    background: rgba(10,4,22,0.9);
    border: 1px solid rgba(167,139,250,0.2);
    border-radius: 1rem;
    padding: .75rem 1rem;
    width: 100%;
    color: rgb(216,180,254);
    font-size:.875rem;
    outline: none;
    transition: border-color .2s, box-shadow .2s;
    caret-color: rgb(167,139,250);
  }
  .br-input::placeholder { color: rgba(113,113,122,.6); }
  .br-input:focus {
    border-color: rgba(167,139,250,.6);
    box-shadow: 0 0 0 3px rgba(124,58,237,.12);
  }

  .br-textarea {
    background: rgba(10,4,22,0.9);
    border: 1px solid rgba(167,139,250,0.2);
    border-radius: 1rem;
    padding: 1rem;
    width: 100%;
    color: rgb(216,180,254);
    font-size:.875rem;
    outline: none;
    resize: vertical;
    min-height: 7rem;
    line-height: 1.6;
    transition: border-color .2s, box-shadow .2s;
    caret-color: rgb(167,139,250);
  }
  .br-textarea::placeholder { color: rgba(113,113,122,.55); }
  .br-textarea:focus {
    border-color: rgba(167,139,250,.6);
    box-shadow: 0 0 0 3px rgba(124,58,237,.12);
  }

  .br-step-line {
    position:absolute; left:19px; top:40px; bottom:-16px;
    width:1px;
    background: linear-gradient(to bottom, rgba(167,139,250,.35), transparent);
  }

  .br-card {
    background: rgba(18,7,38,0.75);
    border: 1px solid rgba(167,139,250,0.12);
    border-radius: 1.5rem;
    backdrop-filter: blur(20px);
    transition: border-color .3s;
  }
  .br-card:hover { border-color: rgba(167,139,250,0.22); }

  /* Noise grain overlay */
  .br-noise::after {
    content:'';
    position:absolute;inset:0;border-radius:inherit;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.5'/></svg>");
    opacity:.04;pointer-events:none;mix-blend-mode:overlay;
  }
`;

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Step header                                                                */
/* ─────────────────────────────────────────────────────────────────────────── */
function StepHeader({
  num,
  label,
  hint,
  last = false,
}: {
  num: number;
  label: string;
  hint?: string;
  last?: boolean;
}) {
  return (
    <div className="relative mb-5 flex items-start gap-4">
      {!last && <div className="br-step-line" />}
      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-purple-400/30 bg-[#1a0a38] text-sm font-black text-purple-300">
        {num}
      </div>
      <div className="pt-1">
        <p className="text-base font-black uppercase tracking-wide text-white sm:text-lg">
          {label}
        </p>
        {hint && (
          <p className="mt-0.5 text-xs font-medium text-zinc-500">{hint}</p>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Animated success checkmark                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */
function CheckCircle() {
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20" fill="none">
      <circle cx="40" cy="40" r="36" stroke="rgba(167,139,250,0.25)" strokeWidth="2" />
      <circle
        cx="40"
        cy="40"
        r="36"
        stroke="rgba(167,139,250,0.9)"
        strokeWidth="2"
        strokeDasharray="226"
        strokeDashoffset="0"
        style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
      />
      <polyline
        points="24,40 36,52 56,30"
        stroke="rgb(192,132,252)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="br-tick"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Main component                                                             */
/* ─────────────────────────────────────────────────────────────────────────── */
export default function BugReportPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  /* form state */
  const [bugType, setBugType] = useState("crash");
  const [platform, setPlatform] = useState("app");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otherBugLabel, setOtherBugLabel] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ui state */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [mx, setMx] = useState("50%");
  const [my, setMy] = useState("30%");

  /* cursor glow */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!pageRef.current) return;
    const r = pageRef.current.getBoundingClientRect();
    setMx(`${e.clientX - r.left}px`);
    setMy(`${e.clientY - r.top}px`);
  }, []);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove as EventListener);
    return () => el.removeEventListener("mousemove", handleMouseMove as EventListener);
  }, [handleMouseMove]);

  /* restore draft */
  useEffect(() => {
    try {
      const d = localStorage.getItem("astra_br_draft");
      if (!d) return;
      const p = JSON.parse(d);
      if (p.bugType) setBugType(p.bugType);
      if (p.platform) setPlatform(p.platform);
      if (p.description) setDescription(p.description);
      if (p.priority) setPriority(p.priority);
      if (p.additionalInfo) setAdditionalInfo(p.additionalInfo);
      if (p.username) setUsername(p.username);
      if (p.email) setEmail(p.email);
    } catch {}
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  /* file handling */
  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    const next: UploadedFile[] = Array.from(list).map((f) => ({
      id: `${f.name}-${Date.now()}-${Math.random()}`,
      name: f.name,
      size: f.size,
      type: f.type,
      url: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
    }));
    setFiles((prev) => [...prev, ...next]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const t = prev.find((f) => f.id === id);
      if (t?.url) URL.revokeObjectURL(t.url);
      return prev.filter((f) => f.id !== id);
    });
  };

  const fmtSize = (b: number) =>
    b < 1024 ? `${b}B` : b < 1048576 ? `${(b / 1024).toFixed(1)}KB` : `${(b / 1048576).toFixed(1)}MB`;

  /* draft */
  const saveDraft = () => {
    try {
      localStorage.setItem(
        "astra_br_draft",
        JSON.stringify({ bugType, platform, description, priority, additionalInfo, username, email })
      );
      showToast("Draft saved to this browser.");
    } catch {
      showToast("Could not save draft.");
    }
  };

  /* submit */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    if (!description.trim() || description.trim().length < 15) {
      setValidationError("Please describe the bug in at least 15 characters.");
      document.getElementById("desc-field")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const id = `AST-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketId(id);
      setIsSubmitting(false);
      setIsSubmitted(true);
      try { localStorage.removeItem("astra_br_draft"); } catch {}
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1400);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setBugType("crash");
    setPlatform("app");
    setDescription("");
    setPriority("medium");
    setAdditionalInfo("");
    setFiles([]);
    setValidationError(null);
    setTicketId("");
  };

  /* ─── derived ─── */
  const selectedPriority = PRIORITIES.find((p) => p.id === priority)!;

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen overflow-x-hidden bg-[#0c051a] text-zinc-100 selection:bg-purple-500/40 selection:text-white"
      style={{ "--mx": mx, "--my": my } as CSSProperties}
    >
      <style>{inlineCss}</style>

      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Ambient background ── */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {/* cursor glow */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(600px circle at var(--mx) var(--my), rgba(124,58,237,0.1), transparent 60%)" }}
        />
        {/* static blobs */}
        <div className="absolute -left-32 top-[15%] h-[500px] w-[500px] rounded-full bg-purple-700/15 blur-[160px]" />
        <div className="absolute -right-24 top-[35%] h-[400px] w-[400px] rounded-full bg-fuchsia-700/10 blur-[140px]" />
        <div className="absolute bottom-[10%] left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-violet-800/10 blur-[140px]" />

        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%,#000 20%,transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%,#000 20%,transparent 100%)",
          }}
        />

        {/* corner hex accent */}
        <svg className="absolute right-0 top-0 h-64 w-64 opacity-[0.06]" viewBox="0 0 200 200" fill="none">
          <polygon points="100,10 190,55 190,145 100,190 10,145 10,55" stroke="rgba(167,139,250,1)" strokeWidth="1" />
          <polygon points="100,30 170,67 170,133 100,170 30,133 30,67" stroke="rgba(167,139,250,1)" strokeWidth="0.5" />
        </svg>
        <svg className="absolute bottom-0 left-0 h-56 w-56 opacity-[0.05]" viewBox="0 0 200 200" fill="none">
          <polygon points="100,10 190,55 190,145 100,190 10,145 10,55" stroke="rgba(192,132,252,1)" strokeWidth="1" />
        </svg>
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-purple-400/40 bg-[#180a33]/95 px-5 py-3 text-sm font-semibold text-purple-100 shadow-[0_0_30px_rgba(124,58,237,0.4)] backdrop-blur-md">
          <svg className="h-4 w-4 shrink-0 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {toast}
        </div>
      )}

      {/* ── Main ── */}
      <main className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-24 pt-28 sm:px-6 md:pt-36 lg:px-8">

        {/* ── Page header ── */}
        {!isSubmitted && (
          <>
            {/* breadcrumb */}
            <div className="mb-10 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-600">
              <Link href="/" className="transition-colors hover:text-purple-300">Home</Link>
              <span>/</span>
              <span className="text-zinc-500">Support</span>
              <span>/</span>
              <span className="text-purple-400">Bug Report</span>
            </div>

            <div className="mb-14">
              {/* eyebrow */}
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-purple-400/20 bg-purple-500/8 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-purple-300">
                <span className="relative flex h-2 w-2">
                  <span className="br-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400/70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-400" />
                </span>
                Bug Tracker — Live
              </div>

              {/* title */}
              <h1
                className="font-black uppercase leading-[0.9] tracking-tighter text-white"
                style={{ fontSize: "clamp(3.2rem,8vw,6rem)" }}
              >
                <span className="block">Report</span>
                <span className="block bg-gradient-to-r from-[#a78bfa] via-[#c084fc] to-[#e879f9] bg-clip-text text-transparent">
                  a Bug
                </span>
              </h1>
              <p className="mt-5 max-w-lg text-sm font-medium leading-relaxed text-zinc-400">
                Found something broken in a tournament or the app? Tell us — every report
                is reviewed within 24 hours by our QA team, and critical bugs are fixed in the next patch.
              </p>
            </div>
          </>
        )}

        {/* ── Validation error ── */}
        {validationError && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/8 p-4 text-sm font-semibold text-red-200">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            {validationError}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            SUCCESS SCREEN
        ══════════════════════════════════════════════════════════════════ */}
        {isSubmitted ? (
          <div className="br-card br-noise relative overflow-hidden px-8 py-14 text-center sm:px-14">
            {/* scanline shimmer */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-400/40 to-transparent br-scanline" />

            <div className="mb-6 flex justify-center">
              <CheckCircle />
            </div>

            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.25em] text-purple-400">
              Report Submitted Successfully
            </span>
            <h2
              className="font-black uppercase tracking-tight text-white"
              style={{ fontSize: "clamp(1.6rem,4vw,2.5rem)" }}
            >
              Thank you,<br />Bug Hunter
            </h2>

            {/* ticket badge */}
            <div className="mx-auto mt-6 inline-flex items-center gap-3 rounded-xl border border-purple-400/30 bg-purple-900/30 px-5 py-3 font-mono">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">Ticket</span>
              <span className="text-lg font-black tracking-widest text-white">{ticketId}</span>
              <button
                type="button"
                onClick={() => { navigator.clipboard.writeText(ticketId); showToast("Ticket ID copied!"); }}
                className="ml-1 rounded-lg border border-purple-400/20 bg-white/5 px-2 py-1 text-[10px] font-bold text-purple-300 transition-colors hover:bg-purple-500/20"
              >
                Copy
              </button>
            </div>

            <p className="mx-auto mt-6 max-w-md text-sm font-medium leading-relaxed text-zinc-400">
              Our engineering team has been notified. If you provided an email, you&apos;ll receive
              status updates and may qualify for a{" "}
              <span className="text-purple-300">Bug Bounty reward</span>.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={resetForm}
                className="w-full rounded-2xl border border-purple-400/20 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                Report Another Bug
              </button>
              <Link
                href="/"
                className="w-full rounded-2xl bg-[#7c3aed] px-8 py-3 text-center text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all hover:bg-[#6d28d9] sm:w-auto"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          /* ══════════════════════════════════════════════════════════════════
              BUG REPORT FORM
          ══════════════════════════════════════════════════════════════════ */
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* ── STEP 1 · Bug Type ── */}
            <div className="br-card br-noise relative overflow-hidden p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
              <StepHeader num={1} label="What type of bug is it?" hint="Pick the category closest to what you experienced" />

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {BUG_TYPES.map((bt) => {
                  const active = bugType === bt.id;
                  return (
                    <button
                      key={bt.id}
                      type="button"
                      onClick={() => setBugType(bt.id)}
                      className={`flex flex-col items-start gap-2 rounded-2xl border p-3.5 text-left transition-all duration-200 ${
                        active
                          ? "border-purple-400/70 bg-purple-500/15 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                          : "border-purple-400/12 bg-white/[0.02] hover:border-purple-400/30 hover:bg-white/[0.05]"
                      }`}
                    >
                      <span className={`${active ? "text-purple-300" : "text-zinc-500"} transition-colors`}>
                        {BUG_TYPE_ICONS[bt.id]}
                      </span>
                      <span className={`text-[13px] font-bold leading-tight ${active ? "text-white" : "text-zinc-300"}`}>
                        {bt.label}
                      </span>
                      <span className="text-[11px] leading-tight text-zinc-500">{bt.desc}</span>
                    </button>
                  );
                })}
              </div>

              {bugType === "other" && (
                <div className="mt-4">
                  <input
                    type="text"
                    value={otherBugLabel}
                    onChange={(e) => setOtherBugLabel(e.target.value)}
                    placeholder="Describe the bug category…"
                    className="br-input"
                  />
                </div>
              )}
            </div>

            {/* ── STEP 2 · Platform ── */}
            <div className="br-card br-noise relative overflow-hidden p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
              <StepHeader num={2} label="Affected platform" hint="Where did you encounter the bug?" />

              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((pl) => {
                  const active = platform === pl.id;
                  return (
                    <button
                      key={pl.id}
                      type="button"
                      onClick={() => setPlatform(pl.id)}
                      className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                        active
                          ? "border-purple-400/60 bg-purple-500/20 text-purple-200 shadow-[0_0_14px_rgba(124,58,237,0.35)]"
                          : "border-purple-400/15 bg-white/[0.03] text-zinc-400 hover:border-purple-400/35 hover:text-white"
                      }`}
                    >
                      {pl.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── STEP 3 · Description ── */}
            <div id="desc-field" className="br-card br-noise relative overflow-hidden p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
              <StepHeader
                num={3}
                label="Describe the bug"
                hint="Include steps to reproduce, expected vs actual behaviour"
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={"1. Open Tournament > Solo BGMI\n2. Tap 'Join Room' before countdown ends\n3. Password field resets — lobby ID disappears\n\nExpected: Room details stay visible."}
                rows={6}
                className="br-textarea"
              />
              <div className="mt-1.5 flex justify-end text-[11px] text-zinc-600">
                {description.length} / 2 000
              </div>
            </div>

            {/* ── STEP 4 · Priority ── */}
            <div className="br-card br-noise relative overflow-hidden p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
              <StepHeader num={4} label="Severity" hint="How badly does this impact your experience?" />

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {PRIORITIES.map((p) => {
                  const active = priority === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPriority(p.id)}
                      className={`flex flex-col gap-2 rounded-2xl border p-4 text-left transition-all duration-200 ${
                        active
                          ? `${p.border} ${p.activeBg}`
                          : `${p.inactiveBorder} ${p.inactiveBg} hover:border-opacity-50`
                      }`}
                      style={active ? { boxShadow: `0 0 20px ${p.glow}` } : undefined}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-black ${p.text}`}>{p.label}</span>
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${active ? p.dot : "bg-zinc-700"} transition-colors`}
                        />
                      </div>
                      <span className="text-[11px] leading-tight text-zinc-500">{p.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── STEP 5 · Attachments ── */}
            <div className="br-card br-noise relative overflow-hidden p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
              <StepHeader num={5} label="Attach evidence" hint="Screenshots, screen recordings, or log files (max 25 MB each)" />

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*,.log,.txt"
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
              />

              {/* drop zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
                onClick={() => fileInputRef.current?.click()}
                className={`group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed py-10 text-center transition-all duration-200 ${
                  isDragging
                    ? "border-purple-400/70 bg-purple-500/10 shadow-[0_0_30px_rgba(124,58,237,0.25)]"
                    : "border-purple-400/20 bg-white/[0.015] hover:border-purple-400/40 hover:bg-white/[0.04]"
                }`}
              >
                {/* upload icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-purple-400/25 bg-purple-500/10 text-purple-300 transition-all duration-200 group-hover:border-purple-400/50 group-hover:bg-purple-500/20">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    <span className="text-purple-300">Choose files</span> or drag & drop
                  </p>
                  <p className="mt-1 text-xs text-zinc-600">PNG · JPG · MP4 · WebM · TXT · LOG</p>
                </div>
              </div>

              {/* file list */}
              {files.length > 0 && (
                <div className="mt-4 flex flex-col gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                    Attached ({files.length})
                  </span>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {files.map((f) => (
                      <div
                        key={f.id}
                        className="flex items-center gap-3 rounded-xl border border-purple-400/15 bg-[#170a30]/60 p-2.5"
                      >
                        {f.url ? (
                          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-purple-400/20">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={f.url} alt={f.name} className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-purple-400/15 bg-purple-500/10 text-purple-400">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-white">{f.name}</p>
                          <p className="text-[10px] font-mono text-zinc-600">{fmtSize(f.size)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(f.id)}
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 text-zinc-500 transition-colors hover:bg-red-500/20 hover:text-red-300"
                          aria-label="Remove"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── STEP 6 · Additional info ── */}
            <div className="br-card br-noise relative overflow-hidden p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
              <StepHeader num={6} label="Additional context" hint="Device, OS version, app build, Room/Match ID, network type" last />

              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder={"Device: Samsung S23 / iPhone 14 Pro\nOS: Android 14 / iOS 17.5\nRoom ID: #8754213\nApp build: v2.4.1"}
                rows={4}
                className="br-textarea font-mono"
              />
            </div>

            {/* ── STEP 7 · Reporter info ── */}
            <div className="br-card br-noise relative overflow-hidden p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400">
                  Your Identity — Optional
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Share your username or email to receive status updates and bug bounty credits.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                    Astra Username / ID
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="ShadowHunter_99"
                    className="br-input"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="player@gmail.com"
                    className="br-input"
                  />
                </div>
              </div>
            </div>

            {/* ── Bottom action bar ── */}
            <div className="sticky bottom-4 z-20">
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-purple-400/15 bg-[#0c051a]/90 px-5 py-4 backdrop-blur-xl">
                {/* left */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => window.location.href = "/"}
                    className="rounded-xl border border-purple-400/20 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400 transition-colors hover:border-purple-400/40 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={saveDraft}
                    className="rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-purple-400 transition-colors hover:bg-purple-500/10 hover:text-purple-200"
                  >
                    Save Draft
                  </button>
                </div>

                {/* right: priority pill + submit */}
                <div className="flex items-center gap-3">
                  <div
                    className="hidden items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider sm:flex"
                    style={{ borderColor: `${selectedPriority.glow}` }}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${selectedPriority.dot}`} />
                    <span className={selectedPriority.text}>{selectedPriority.label}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2.5 rounded-xl bg-[#7c3aed] px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all hover:bg-[#6d28d9] hover:shadow-[0_0_30px_rgba(124,58,237,0.7)] hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Submitting…
                      </>
                    ) : (
                      <>
                        Submit Report
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
