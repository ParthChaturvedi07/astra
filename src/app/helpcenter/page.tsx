"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DottedPatch from "@/components/DottedPatch";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

const reasons = [
  "Functionality Issue",
  "Visual/Aesthetic Issue",
  "Performance Issue",
  "Security Issue",
  "Data/Content Issue",
  "Crash/Error Issue",
  "Localization/Internationalization Issue",
  "Usability/UX Issue",
  "Other",
];

const games = [
  { id: "all", name: "General Platform / Astra App" },
  { id: "bgmi", name: "Battlegrounds Mobile (BGMI)" },
  { id: "freefire", name: "Free Fire" },
  { id: "csgo", name: "CS:GO" },
  { id: "ludo", name: "Ludo King" },
  { id: "minecraft", name: "Minecraft" },
  { id: "chess", name: "Chess" },
  { id: "tournaments", name: "Tournament Lobby / Password" },
  { id: "streaming", name: "Live Streaming" },
  { id: "rewards", name: "UPI / Voucher Rewards" },
];

export default function HelpCenterPage() {
  // Form State
  const [selectedReason, setSelectedReason] = useState<string>("Visual/Aesthetic Issue");
  const [otherReason, setOtherReason] = useState<string>("");
  const [selectedGame, setSelectedGame] = useState<string>("all");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // File Uploads
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // UI States
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState<string>("");
  const [validationError, setValidationError] = useState<string | null>(null);

  // Restore draft if available
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem("astra_bug_report_draft");
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.selectedReason) setSelectedReason(parsed.selectedReason);
        if (parsed.description) setDescription(parsed.description);
        if (parsed.priority) setPriority(parsed.priority);
        if (parsed.additionalInfo) setAdditionalInfo(parsed.additionalInfo);
        if (parsed.username) setUsername(parsed.username);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.selectedGame) setSelectedGame(parsed.selectedGame);
      }
    } catch {
      // Ignore localStorage read errors
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleFileSelect = (selectedFileList: FileList | null) => {
    if (!selectedFileList) return;
    const newFiles: UploadedFile[] = [];

    Array.from(selectedFileList).forEach((file) => {
      // Create local preview if image
      const isImg = file.type.startsWith("image/");
      const url = isImg ? URL.createObjectURL(file) : undefined;
      newFiles.push({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url,
      });
    });

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target?.url) URL.revokeObjectURL(target.url);
      return prev.filter((f) => f.id !== id);
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSaveDraft = () => {
    const draft = {
      selectedReason,
      selectedGame,
      description,
      priority,
      additionalInfo,
      username,
      email,
      savedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem("astra_bug_report_draft", JSON.stringify(draft));
      showToast("Draft saved successfully to this browser.");
    } catch {
      showToast("Failed to save draft. Storage may be full.");
    }
  };

  const handleCancel = () => {
    if (
      description ||
      additionalInfo ||
      files.length > 0
    ) {
      if (confirm("Are you sure you want to discard your changes?")) {
        setSelectedReason("Visual/Aesthetic Issue");
        setDescription("");
        setAdditionalInfo("");
        setFiles([]);
        setValidationError(null);
        try {
          localStorage.removeItem("astra_bug_report_draft");
        } catch {}
      }
    } else {
      window.location.href = "/";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!selectedReason) {
      setValidationError("Please select a reason for reporting this bug.");
      return;
    }

    if (!description.trim() || description.trim().length < 15) {
      setValidationError(
        "Please provide a description with at least 15 characters to help us understand the issue."
      );
      const el = document.getElementById("description-field");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);

    // Simulate server ticket creation
    setTimeout(() => {
      const generatedId = `AST-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketId(generatedId);
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        localStorage.removeItem("astra_bug_report_draft");
      } catch {}
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSelectedReason("Functionality Issue");
    setDescription("");
    setAdditionalInfo("");
    setFiles([]);
    setPriority("medium");
    setTicketId("");
    setValidationError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c051a] text-zinc-100 relative overflow-x-hidden selection:bg-purple-500 selection:text-white">
      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Background Dotted Patches ── */}
      <DottedPatch
        top="8%"
        left="-4%"
        width={420}
        height={320}
        rotate={-12}
        maskShape="soft"
        dotColor="rgba(167, 139, 250, 0.4)"
        glow
        glowColor="rgba(124, 58, 237, 0.18)"
        animate="float"
      />
      <DottedPatch
        top="18%"
        right="-5%"
        width={440}
        height={340}
        rotate={14}
        maskShape="ellipse"
        dotColor="rgba(192, 132, 252, 0.35)"
        glow
        glowColor="rgba(167, 139, 250, 0.14)"
        animate="pulse"
      />
      <DottedPatch
        top="52%"
        left="-3%"
        width={380}
        height={300}
        rotate={8}
        maskShape="circle"
        dotColor="rgba(124, 58, 237, 0.35)"
        spacing={20}
      />
      <DottedPatch
        bottom="12%"
        right="-2%"
        width={400}
        height={300}
        rotate={-10}
        maskShape="pill"
        dotColor="rgba(167, 139, 250, 0.35)"
        glow
        glowColor="rgba(124, 58, 237, 0.15)"
        animate="float"
      />

      {/* ── Ambient Glows ── */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-700/10 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[60%] left-1/3 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-700/10 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* ── Toast Notification ── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#180a33] border border-purple-400/40 text-purple-100 px-5 py-3 rounded-2xl shadow-[0_0_30px_rgba(124,58,237,0.4)] backdrop-blur-md animate-in fade-in slide-in-from-bottom-5">
          <svg className="w-5 h-5 text-purple-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ── Main Content Container ── */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-20 relative z-10">

        {/* ── Breadcrumb & Category Badge ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-300/70">
            <Link href="/" className="hover:text-purple-300 transition-colors flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-purple-200">Help Center</span>
            <span className="text-zinc-600">/</span>
            <span className="text-purple-400 font-bold">Bug Report</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[11px] font-bold uppercase tracking-widest text-purple-300">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Active Bug Tracker
          </div>
        </div>

        {/* ── Header Title & Description ── */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase mb-3">
            Bug <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300">Report</span>
          </h1>
          <p className="text-purple-200/80 text-sm sm:text-base max-w-2xl font-medium leading-relaxed">
            Encountered a bug or unexpected behavior during a tournament or in the app? Let our engineering team know so we can investigate and patch it immediately.
          </p>
        </div>

        {/* ── Validation Error Banner ── */}
        {validationError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-200 flex items-start gap-3 animate-in fade-in">
            <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="text-sm font-semibold">{validationError}</div>
          </div>
        )}

        {/* ── Success Screen ── */}
        {isSubmitted ? (
          <div className="rounded-3xl border border-purple-400/30 bg-[#120726]/90 backdrop-blur-2xl p-8 sm:p-12 shadow-[0_0_60px_rgba(124,58,237,0.25)] text-center flex flex-col items-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center text-purple-300 mb-6 shadow-[0_0_30px_rgba(167,139,250,0.5)]">
              <svg className="w-10 h-10 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <span className="text-xs font-bold text-purple-300 tracking-[0.2em] uppercase mb-2">
              Report Submitted Successfully
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-3">
              Thank You for Helping Us Improve
            </h2>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-900/40 border border-purple-400/30 text-purple-200 text-sm font-mono my-4">
              <span className="text-purple-400 font-sans font-bold text-xs uppercase">Ticket ID:</span>
              <span className="font-bold text-white tracking-wider">{ticketId}</span>
            </div>

            <p className="text-purple-200/70 text-sm max-w-lg mb-8 leading-relaxed">
              Our QA and dev team have received your bug report. We review all submissions within 24 hours. If you provided an email, you will receive progress updates and potential tournament bug bounty credits!
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={handleResetForm}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/5 border border-purple-400/30 hover:bg-white/10 text-white font-bold text-xs tracking-wider uppercase transition-all"
              >
                Submit Another Bug
              </button>
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          /* ── Bug Report Form ── */
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-purple-400/20 bg-[#120726]/85 backdrop-blur-xl p-6 sm:p-10 shadow-[0_0_50px_rgba(124,58,237,0.15)] flex flex-col gap-9"
          >
            {/* ─────────────────────────────────────────────
                SECTION 1: Reason for reporting this bug?
            ───────────────────────────────────────────── */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 relative">
                <label className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Reason for reporting this bug?
                </label>
                <button
                  type="button"
                  onMouseEnter={() => setActiveTooltip("reason")}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onClick={() =>
                    setActiveTooltip(activeTooltip === "reason" ? null : "reason")
                  }
                  className="w-4 h-4 rounded-full border border-purple-400/40 text-purple-300 text-[10px] flex items-center justify-center font-bold hover:bg-purple-500/20 transition-colors"
                  aria-label="Info about reasons"
                >
                  i
                </button>
                {activeTooltip === "reason" && (
                  <div className="absolute left-0 bottom-full mb-2 z-30 p-2.5 rounded-xl bg-[#1c0a3a] border border-purple-400/30 text-purple-200 text-xs shadow-xl max-w-xs">
                    Select the main category that best describes the malfunction or discrepancy.
                  </div>
                )}
              </div>

              {/* Pills Grid */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {reasons.map((reason) => {
                  const isSelected = selectedReason === reason;
                  return (
                    <button
                      key={reason}
                      type="button"
                      onClick={() => setSelectedReason(reason)}
                      className={`
                        px-4 py-2 rounded-xl text-xs sm:text-[13px] font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer
                        ${
                          isSelected
                            ? "bg-[#7c3aed] text-white shadow-[0_0_18px_rgba(124,58,237,0.5)] border border-purple-300/40 font-semibold scale-[1.02]"
                            : "bg-white/[0.04] text-purple-200/80 border border-purple-400/20 hover:bg-white/[0.08] hover:border-purple-400/40 hover:text-white"
                        }
                      `}
                    >
                      {isSelected && (
                        <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {reason}
                    </button>
                  );
                })}
              </div>

              {/* If "Other" selected, show custom input */}
              {selectedReason === "Other" && (
                <div className="mt-2 animate-in fade-in">
                  <input
                    type="text"
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    placeholder="Please specify the nature of the issue..."
                    className="w-full bg-[#0a0416]/90 border border-purple-400/30 rounded-xl px-4 py-2.5 text-sm text-purple-100 placeholder:text-zinc-500 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none"
                  />
                </div>
              )}
            </div>

            {/* ─────────────────────────────────────────────
                SECTION 1.5: Affected Game / Platform
            ───────────────────────────────────────────── */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-bold text-purple-300 uppercase tracking-widest">
                Affected Game or Platform Feature
              </label>
              <div className="relative">
                <select
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
                  className="w-full appearance-none bg-[#0a0416]/90 border border-purple-400/25 rounded-2xl px-4 py-3 text-sm text-purple-100 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 outline-none cursor-pointer"
                >
                  {games.map((g) => (
                    <option key={g.id} value={g.id} className="bg-[#15072e] text-purple-100">
                      {g.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-purple-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* ─────────────────────────────────────────────
                SECTION 2: Can you provide clarity on the issue?
            ───────────────────────────────────────────── */}
            <div id="description-field" className="flex flex-col gap-2">
              <div className="flex items-center gap-2 relative">
                <label className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Can you provide clarity on the issue? Help us understand
                </label>
                <button
                  type="button"
                  onMouseEnter={() => setActiveTooltip("desc")}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onClick={() =>
                    setActiveTooltip(activeTooltip === "desc" ? null : "desc")
                  }
                  className="w-4 h-4 rounded-full border border-purple-400/40 text-purple-300 text-[10px] flex items-center justify-center font-bold hover:bg-purple-500/20 transition-colors"
                  aria-label="Info about description"
                >
                  i
                </button>
                {activeTooltip === "desc" && (
                  <div className="absolute left-0 bottom-full mb-2 z-30 p-2.5 rounded-xl bg-[#1c0a3a] border border-purple-400/30 text-purple-200 text-xs shadow-xl max-w-sm">
                    Include step-by-step reproduction instructions and what screen you were on when the problem occurred.
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                Provide a detailed description of the bug including steps to reproduce it, expected behavior, and actual behavior. Include any relevant information or observations.
              </p>

              <div className="relative mt-2">
                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="1. Go to Tournament > Solo BGMI&#10;2. Click on 'Join Room' before the countdown&#10;3. The password field resets and lobby ID does not appear...&#10;Expected: Room details should copy to clipboard."
                  className="w-full bg-[#0a0416]/90 border border-purple-400/25 rounded-2xl p-4 text-sm text-purple-100 placeholder:text-zinc-600 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all resize-y leading-relaxed"
                />
                <div className="flex justify-end text-[11px] text-zinc-500 mt-1">
                  <span>{description.length} / 2,000 characters</span>
                </div>
              </div>
            </div>

            {/* ─────────────────────────────────────────────
                SECTION 3: Bug priority
            ───────────────────────────────────────────── */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 relative">
                <label className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Bug priority
                </label>
                <button
                  type="button"
                  onMouseEnter={() => setActiveTooltip("priority")}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onClick={() =>
                    setActiveTooltip(activeTooltip === "priority" ? null : "priority")
                  }
                  className="w-4 h-4 rounded-full border border-purple-400/40 text-purple-300 text-[10px] flex items-center justify-center font-bold hover:bg-purple-500/20 transition-colors"
                  aria-label="Info about priority"
                >
                  i
                </button>
                {activeTooltip === "priority" && (
                  <div className="absolute left-0 bottom-full mb-2 z-30 p-2.5 rounded-xl bg-[#1c0a3a] border border-purple-400/30 text-purple-200 text-xs shadow-xl max-w-xs">
                    Choose High for tournament blockers/crashes, Medium for functional defects, Low for visual glitches.
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                Choose the priority level of the bug: High/Medium/Low. Priority indicates the urgency and impact of the bug on users or system functionality.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                {/* High Priority */}
                <button
                  type="button"
                  onClick={() => setPriority("high")}
                  className={`
                    p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col gap-1 cursor-pointer
                    ${
                      priority === "high"
                        ? "border-red-500 bg-red-500/20 text-red-100 shadow-[0_0_25px_rgba(239,68,68,0.3)] ring-1 ring-red-400/50"
                        : "border-red-500/30 bg-red-950/20 text-red-300/80 hover:border-red-500/60 hover:bg-red-950/30"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm tracking-wide text-red-400">High Priority</span>
                    <span className={`w-3 h-3 rounded-full border ${priority === "high" ? "bg-red-500 border-red-300" : "border-red-500/40"}`} />
                  </div>
                  <span className="text-[11px] text-zinc-400 leading-tight">
                    Crashes, match blockers, login failures
                  </span>
                </button>

                {/* Medium Priority */}
                <button
                  type="button"
                  onClick={() => setPriority("medium")}
                  className={`
                    p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col gap-1 cursor-pointer
                    ${
                      priority === "medium"
                        ? "border-amber-500 bg-amber-500/20 text-amber-100 shadow-[0_0_25px_rgba(245,158,11,0.3)] ring-1 ring-amber-400/50"
                        : "border-amber-500/30 bg-amber-950/20 text-amber-300/80 hover:border-amber-500/60 hover:bg-amber-950/30"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm tracking-wide text-amber-400">Medium Priority</span>
                    <span className={`w-3 h-3 rounded-full border ${priority === "medium" ? "bg-amber-500 border-amber-300" : "border-amber-500/40"}`} />
                  </div>
                  <span className="text-[11px] text-zinc-400 leading-tight">
                    Partial failures, incorrect stats or scores
                  </span>
                </button>

                {/* Low Priority */}
                <button
                  type="button"
                  onClick={() => setPriority("low")}
                  className={`
                    p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col gap-1 cursor-pointer
                    ${
                      priority === "low"
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-100 shadow-[0_0_25px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400/50"
                        : "border-emerald-500/30 bg-emerald-950/20 text-emerald-300/80 hover:border-emerald-500/60 hover:bg-emerald-950/30"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm tracking-wide text-emerald-400">Low Priority</span>
                    <span className={`w-3 h-3 rounded-full border ${priority === "low" ? "bg-emerald-500 border-emerald-300" : "border-emerald-500/40"}`} />
                  </div>
                  <span className="text-[11px] text-zinc-400 leading-tight">
                    Cosmetic flaws, typo, subtle UI glitch
                  </span>
                </button>
              </div>
            </div>

            {/* ─────────────────────────────────────────────
                SECTION 4: Attach files
            ───────────────────────────────────────────── */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 relative">
                <label className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Attach files
                </label>
                <button
                  type="button"
                  onMouseEnter={() => setActiveTooltip("files")}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onClick={() =>
                    setActiveTooltip(activeTooltip === "files" ? null : "files")
                  }
                  className="w-4 h-4 rounded-full border border-purple-400/40 text-purple-300 text-[10px] flex items-center justify-center font-bold hover:bg-purple-500/20 transition-colors"
                  aria-label="Info about file attachments"
                >
                  i
                </button>
                {activeTooltip === "files" && (
                  <div className="absolute left-0 bottom-full mb-2 z-30 p-2.5 rounded-xl bg-[#1c0a3a] border border-purple-400/30 text-purple-200 text-xs shadow-xl max-w-xs">
                    Screenshots, screen recordings, or error log files (PNG, JPG, MP4, TXT, LOG). Max 25MB each.
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                Attach screenshots, screen recordings, or any other relevant files that illustrate the bug. Visual aids can help developers understand the issue more effectively.
              </p>

              {/* Drop Zone Box */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFileSelect(e.dataTransfer.files);
                }}
                className={`
                  mt-2 border-2 border-dashed rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all duration-200
                  ${
                    isDragging
                      ? "border-purple-400 bg-purple-500/15 shadow-[0_0_30px_rgba(124,58,237,0.3)]"
                      : "border-purple-400/25 bg-[#0a0416]/50 hover:border-purple-400/40 hover:bg-[#0a0416]/80"
                  }
                `}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*,.log,.txt"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-purple-400/30 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm hover:border-purple-400/60"
                  >
                    <svg className="w-4 h-4 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    Choose a file
                  </button>

                  <span className="text-xs text-zinc-500 font-medium">
                    or drag and drop attachments here
                  </span>
                </div>

                <span className="text-[11px] text-purple-300/50 mt-3 font-medium">
                  Supports PNG, JPG, MP4, WebM, TXT, LOG up to 25 MB
                </span>
              </div>

              {/* Uploaded Files List */}
              {files.length > 0 && (
                <div className="flex flex-col gap-2 mt-3">
                  <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                    Attached Files ({files.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#170a30]/80 border border-purple-400/20"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {file.url ? (
                            <div className="w-9 h-9 rounded-lg overflow-hidden bg-black/40 relative shrink-0 border border-purple-400/20">
                              <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-400/20 flex items-center justify-center shrink-0 text-purple-300">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                          )}

                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-semibold text-white truncate">
                              {file.name}
                            </span>
                            <span className="text-[10px] text-purple-300/60 font-mono">
                              {formatFileSize(file.size)}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-300 flex items-center justify-center transition-colors shrink-0"
                          aria-label="Remove file"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ─────────────────────────────────────────────
                SECTION 5: Additional information
            ───────────────────────────────────────────── */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 relative">
                <label className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Additional information
                </label>
                <button
                  type="button"
                  onMouseEnter={() => setActiveTooltip("additional")}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onClick={() =>
                    setActiveTooltip(activeTooltip === "additional" ? null : "additional")
                  }
                  className="w-4 h-4 rounded-full border border-purple-400/40 text-purple-300 text-[10px] flex items-center justify-center font-bold hover:bg-purple-500/20 transition-colors"
                  aria-label="Info about additional details"
                >
                  i
                </button>
                {activeTooltip === "additional" && (
                  <div className="absolute left-0 bottom-full mb-2 z-30 p-2.5 rounded-xl bg-[#1c0a3a] border border-purple-400/30 text-purple-200 text-xs shadow-xl max-w-xs">
                    Mention your Device Model, OS Version, App build, Room/Match ID, or network type.
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                Include any additional information that might be helpful in resolving the bug, such as error logs, console outputs, or relevant URLs.
              </p>

              <textarea
                rows={4}
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Device: iPhone 14 Pro / Samsung S23&#10;OS: Android 14 / iOS 17.5&#10;Room ID: #8754213&#10;URL: https://astra.gg/tournaments/bgmi-duo"
                className="w-full mt-2 bg-[#0a0416]/90 border border-purple-400/25 rounded-2xl p-4 text-sm text-purple-100 placeholder:text-zinc-600 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all resize-y leading-relaxed font-mono"
              />
            </div>

            {/* ─────────────────────────────────────────────
                SECTION 5.5: Reporter Details (Username & Email)
            ───────────────────────────────────────────── */}
            <div className="pt-2 border-t border-purple-400/15">
              <span className="text-xs font-bold text-purple-300 tracking-wider uppercase block mb-3">
                Your Player Information (For Status Updates & Bounties)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                    Astra In-Game Username / ID
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. ShadowHunter_99"
                    className="w-full bg-[#0a0416]/90 border border-purple-400/20 rounded-xl px-4 py-2.5 text-sm text-purple-100 placeholder:text-zinc-600 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="player@gmail.com"
                    className="w-full bg-[#0a0416]/90 border border-purple-400/20 rounded-xl px-4 py-2.5 text-sm text-purple-100 placeholder:text-zinc-600 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* ─────────────────────────────────────────────
                SECTION 6: Bottom Action Buttons
            ───────────────────────────────────────────── */}
            <div className="pt-5 border-t border-purple-400/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Left: Cancel */}
              <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-purple-400/30 text-purple-200/80 hover:text-white hover:bg-white/5 font-semibold text-xs tracking-wider uppercase transition-colors"
              >
                Cancel
              </button>

              {/* Right: Save as draft & Submit report */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-transparent text-purple-300 hover:text-white hover:bg-purple-500/10 font-semibold text-xs tracking-wider uppercase transition-colors"
                >
                  Save as draft
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(124,58,237,0.45)] hover:shadow-[0_0_35px_rgba(124,58,237,0.7)] hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit report
                      <svg className="w-4 h-4 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
