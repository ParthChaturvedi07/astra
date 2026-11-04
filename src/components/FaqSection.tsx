"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DottedPatch from "@/components/DottedPatch";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface FaqItemData {
  id: string;
  category: "tournaments" | "wallet" | "security" | "platform";
  categoryLabel: string;
  question: string;
  answer: string;
  tags: string[];
  tip?: string;
}

const faqs: FaqItemData[] = [
  {
    id: "01",
    category: "tournaments",
    categoryLabel: "Tournaments",
    question: "How do I join a tournament on Astra?",
    answer:
      "Download the Astra app, create your profile, and browse the Tournaments tab. Pick the game, format (Solo, Duo, Squad, or Clash Squad), pay the entry fee, and you're in. You'll get your room code and password 15 minutes before the match starts directly in the app and via SMS notification.",
    tags: ["Solo & Squad", "15-Min Room Code", "Instant Registration"],
    tip: "Be inside the custom lobby at least 5 minutes before match start to avoid forfeiture.",
  },
  {
    id: "02",
    category: "tournaments",
    categoryLabel: "Games & Brackets",
    question: "What games are supported on the platform?",
    answer:
      "Currently we support BGMI, Free Fire, and COD Mobile with fully automated bracket and lobby systems. New titles are added every quarter based on community votes — keep an eye on our Discord for upcoming announcements.",
    tags: ["BGMI", "Free Fire", "COD Mobile", "Auto-Brackets"],
    tip: "You can link multiple game IDs to a single Astra master profile in Settings.",
  },
  {
    id: "03",
    category: "wallet",
    categoryLabel: "Wallet & Cashout",
    question: "How does the points and withdrawal system work?",
    answer:
      "Every kill, placement, and tournament win earns you Astra Points. Points accumulate in your in-app wallet and can be converted to Indian Rupees at a rate of 100 Points = ₹10. Withdrawals are instant via UPI to any bank account with zero processing fees.",
    tags: ["100 Pts = ₹10", "Instant UPI", "Zero Processing Fees"],
    tip: "Withdrawals typically land in your bank account in under 60 seconds.",
  },
  {
    id: "04",
    category: "platform",
    categoryLabel: "Platforms",
    question: "Is Astra available on both Android and iOS?",
    answer:
      "Astra is available on Android via the Google Play Store and as a direct APK download. iOS support is currently in closed beta — join the waitlist on our website or Discord to get early access.",
    tags: ["Google Play", "Direct APK", "iOS Beta"],
    tip: "Direct APK updates auto-install via the in-app updater without redownloading.",
  },
  {
    id: "05",
    category: "security",
    categoryLabel: "Fair Play",
    question: "Are the tournaments fair and cheat-free?",
    answer:
      "Absolutely. We use a multi-layered anti-cheat system including device-level detection, replay analysis, and manual review by our moderation team. Cheaters are permanently banned, and affected match results are recalculated to ensure fair payouts.",
    tags: ["Hardware Banning", "Replay Inspection", "100% Guaranteed Fair"],
    tip: "Disputes can be logged within 15 minutes of match completion via the in-app referee chat.",
  },
  {
    id: "06",
    category: "tournaments",
    categoryLabel: "Prize Pools",
    question: "What are the entry fees and prize structures?",
    answer:
      "Entry fees range from Free to ₹100 depending on the tournament tier. Prize pools are clearly shown before you join and are distributed within minutes of match completion. Premium tournaments feature guaranteed prize pools up to ₹50,000.",
    tags: ["Free-to-Play Tiers", "Guaranteed Pools", "Instant Prize Drop"],
    tip: "Leaderboard champions earn automatic wildcard tickets to quarterly grand invitationals.",
  },
  {
    id: "07",
    category: "wallet",
    categoryLabel: "Payout Methods",
    question: "Can I redeem rewards directly as Google Play vouchers or in-game diamonds?",
    answer:
      "Yes! In addition to instant direct UPI bank transfers (PhonePe, Google Pay, Paytm), you can redeem your points balance directly for official Google Play gift cards and game-specific voucher codes with zero markup.",
    tags: ["Google Play Codes", "Diamonds & UC", "No Expiry"],
    tip: "Voucher codes are delivered instantaneously to your in-app rewards inventory.",
  },
  {
    id: "08",
    category: "security",
    categoryLabel: "Scoring Rules",
    question: "How are kills and match placements scored?",
    answer:
      "Scores are tallied using official esports point matrices. Each confirmed elimination awards fixed kill points, while placement bonuses kick in from Top 10 upwards. In case of point ties, total eliminations break the tie automatically.",
    tags: ["Official Esports Matrix", "Auto-Sync Kill Log", "Tie-Breaker Logic"],
    tip: "Match telemetry screenshots are archived in your match history for 90 days.",
  },
];

const categoryDefs = [
  { id: "all", label: "All" },
  { id: "tournaments", label: "Tournaments" },
  { id: "wallet", label: "Wallet & UPI" },
  { id: "security", label: "Anti-cheat & rules" },
  { id: "platform", label: "Platforms" },
];

const categories = categoryDefs.map((c) => ({
  ...c,
  count: c.id === "all" ? faqs.length : faqs.filter((f) => f.category === c.id).length,
}));

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Each word sits in its own mask so it can rise into place */
function Words({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className="block overflow-hidden py-[0.08em] -my-[0.08em]">
      <span className={`faq-word block will-change-transform ${className}`}>{text}</span>
    </span>
  );
}

const ArrowIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-transform duration-300 group-hover/btn:translate-x-1"
    aria-hidden
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ── Accordion row ── */
function FaqRow({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FaqItemData;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    const inner = innerRef.current;
    if (!panel || !inner) return;
    const dur = prefersReduced() ? 0 : 1;

    if (isOpen) {
      gsap.to(panel, {
        height: "auto",
        duration: 0.7 * dur,
        ease: "expo.out",
        onComplete: () => ScrollTrigger.refresh(),
      });
      gsap.fromTo(
        inner.children,
        { y: 14, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6 * dur, stagger: 0.07 * dur, delay: 0.12 * dur, ease: "power3.out" }
      );
    } else {
      gsap.to(panel, {
        height: 0,
        duration: 0.5 * dur,
        ease: "expo.inOut",
        onComplete: () => ScrollTrigger.refresh(),
      });
    }
  }, [isOpen]);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = rowRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={rowRef}
      onPointerMove={onPointerMove}
      className="faq-row group relative border-b border-purple-400/15"
    >
      {/* cursor spotlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgba(167,139,250,0.10), transparent 70%)",
        }}
      />
      {/* open-state rail */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-300 via-[#7c3aed] to-transparent origin-top transition-transform duration-500 ease-out ${
          isOpen ? "scale-y-100" : "scale-y-0"
        }`}
      />

      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${faq.id}`}
        className="relative z-10 w-full flex items-start gap-4 sm:gap-6 px-4 sm:px-6 py-6 sm:py-7 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-purple-300"
      >
        <span className="font-mono text-xs font-semibold text-purple-400/50 pt-2 w-6 shrink-0 tabular-nums">
          {faq.id}
        </span>

        <span className="flex-1 flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-purple-300/70">{faq.categoryLabel}</span>
          <span
            className={`text-xl sm:text-2xl font-bold leading-snug tracking-tight transition-all duration-500 ease-out group-hover:translate-x-1.5 ${
              isOpen ? "text-white" : "text-white/80 group-hover:text-white"
            }`}
          >
            {faq.question}
          </span>
        </span>

        {/* plus that resolves into a minus */}
        <span
          className={`relative shrink-0 mt-1 w-10 h-10 rounded-full border transition-all duration-500 ${
            isOpen
              ? "bg-[#7c3aed] border-purple-300/70 shadow-[0_0_22px_rgba(124,58,237,0.6)] rotate-180"
              : "border-purple-400/25 group-hover:border-purple-300/60 group-hover:bg-purple-500/10"
          }`}
          aria-hidden
        >
          <span className="absolute top-1/2 left-1/2 w-3.5 h-[2px] -translate-x-1/2 -translate-y-1/2 rounded bg-white" />
          <span
            className={`absolute top-1/2 left-1/2 h-3.5 w-[2px] -translate-x-1/2 -translate-y-1/2 rounded bg-white transition-transform duration-500 ${
              isOpen ? "scale-y-0" : "scale-y-100"
            }`}
          />
        </span>
      </button>

      <div
        id={`faq-panel-${faq.id}`}
        ref={panelRef}
        role="region"
        aria-hidden={!isOpen}
        style={{ height: 0, overflow: "hidden" }}
      >
        <div ref={innerRef} className="relative z-10 flex flex-col gap-5 px-4 sm:px-6 pb-8 sm:pl-[4.25rem]">
          <p className="text-base text-purple-100/75 leading-relaxed font-medium max-w-prose">{faq.answer}</p>

          <div className="flex flex-wrap gap-2">
            {faq.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-100 bg-[#110724] border border-purple-400/20 px-3 py-1.5 rounded-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa]" />
                {tag}
              </span>
            ))}
          </div>

          {faq.tip && (
            <p className="border-l-2 border-purple-400/50 pl-4 text-sm text-purple-200/70 font-medium max-w-prose">
              <span className="text-purple-300 font-bold">Tip: </span>
              {faq.tip}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  // keyed by id (not index) so filtering never opens the wrong row
  const [openId, setOpenId] = useState<string | null>("01");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleToggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
      const matchesSearch =
        q === "" ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  /* Sliding pill behind the active tab */
  useIsoLayoutEffect(() => {
    const place = (animate: boolean) => {
      const el = tabsRef.current?.querySelector<HTMLElement>(`[data-cat="${activeCategory}"]`);
      if (!el || !indicatorRef.current) return;
      gsap.to(indicatorRef.current, {
        x: el.offsetLeft,
        width: el.offsetWidth,
        duration: animate && !prefersReduced() ? 0.6 : 0,
        ease: "expo.out",
      });
    };
    place(mounted.current);
    const onResize = () => place(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeCategory]);

  /* Re-stagger rows whenever the filter changes (skip first render) */
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (prefersReduced()) return;
    gsap.fromTo(
      ".faq-row",
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.05, ease: "power3.out", clearProps: "transform" }
    );
  }, [activeCategory, searchQuery]);

  /* Scroll choreography */
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef);

    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", fine: "(hover: hover) and (pointer: fine)" },
      (context) => {
        const { motion, fine } = context.conditions as { motion: boolean; fine: boolean };
        if (!motion) return;
        const cleanups: Array<() => void> = [];

        gsap.to(".faq-bg-parallax", {
          yPercent: -22,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });

        // header: tag, then words rise out of their masks, then copy and support card
        gsap
          .timeline({ scrollTrigger: { trigger: ".faq-header", start: "top 80%" } })
          .from(".faq-tag", { autoAlpha: 0, x: -20, duration: 0.6, ease: "power3.out" })
          .from(
            ".faq-word",
            { yPercent: 115, rotate: 4, transformOrigin: "0% 100%", duration: 1, stagger: 0.1, ease: "expo.out" },
            "-=0.3"
          )
          .from(".faq-desc", { autoAlpha: 0, y: 18, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .from(".faq-support", { autoAlpha: 0, y: 30, duration: 0.9, ease: "power3.out" }, "-=0.6");

        gsap.fromTo(
          ".faq-grad",
          { backgroundPosition: "0% 50%" },
          {
            backgroundPosition: "100% 50%",
            ease: "none",
            scrollTrigger: { trigger: ".faq-header", start: "top 90%", end: "bottom top", scrub: true },
          }
        );

        // filter bar and list
        gsap.from(".faq-controls", {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-controls", start: "top 90%" },
        });

        gsap.set(".faq-row", { autoAlpha: 0, y: 40 });
        ScrollTrigger.batch(".faq-row", {
          start: "top 92%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "expo.out", clearProps: "transform" }),
        });

        gsap.from(".faq-cta", {
          autoAlpha: 0,
          y: 50,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".faq-cta", start: "top 90%" },
        });

        if (fine) {
          gsap.utils.toArray<HTMLElement>(".faq-mag").forEach((btn) => {
            const xTo = gsap.quickTo(btn, "x", { duration: 0.9, ease: "elastic.out(1, 0.45)" });
            const yTo = gsap.quickTo(btn, "y", { duration: 0.9, ease: "elastic.out(1, 0.45)" });
            const move = (e: PointerEvent) => {
              const r = btn.getBoundingClientRect();
              xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
              yTo((e.clientY - (r.top + r.height / 2)) * 0.38);
            };
            const leave = () => {
              xTo(0);
              yTo(0);
            };
            btn.addEventListener("pointermove", move);
            btn.addEventListener("pointerleave", leave);
            cleanups.push(() => {
              btn.removeEventListener("pointermove", move);
              btn.removeEventListener("pointerleave", leave);
            });
          });
        }

        return () => cleanups.forEach((fn) => fn());
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="w-full relative py-24 md:py-32 px-4 sm:px-8 md:px-12 lg:px-16 mx-auto z-20 overflow-clip"
    >
      {/* Giant background type */}
      <div
        className="faq-bg-parallax absolute right-[-2%] top-[5%] flex-col text-right hidden xl:flex opacity-[0.035] font-black text-8xl lg:text-9xl uppercase leading-[0.8] select-none text-white whitespace-nowrap pointer-events-none z-0"
        aria-hidden="true"
      >
        <span>Frequently</span>
        <span>Asked</span>
        <span>Questions</span>
      </div>

      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[600px] h-[400px] bg-purple-700/10 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[350px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none z-0" />

      <DottedPatch top="12%" right="-5%" width={420} height={320} rotate={-10} maskShape="ellipse" glow glowColor="rgba(124, 58, 237, 0.18)" animate="float" />
      <DottedPatch top="42%" left="-4%" width={380} height={300} rotate={8} maskShape="soft" dotColor="rgba(192, 132, 252, 0.35)" animate="pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ── Left: sticky header + support ── */}
          <div className="faq-header lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-6">
            <div className="faq-tag flex items-center gap-4">
              <span className="text-purple-300 font-semibold text-sm">Got questions?</span>
              <div className="h-px w-12 bg-purple-400/30" />
            </div>

            <h2 className="text-6xl sm:text-7xl xl:text-[5.5rem] font-extrabold leading-[0.95] tracking-[-0.04em] text-white">
              <Words text="Frequently" />
              <Words
                text="asked"
                className="faq-grad text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-violet-400 bg-[length:250%_100%]"
              />
              <Words text="questions" />
            </h2>

            <p className="faq-desc text-purple-200/75 text-base max-w-md leading-relaxed font-medium">
              Everything about joining tournaments, earning points, fair play, and withdrawing real
              cash by UPI on Astra.
            </p>

          </div>

          {/* ── Right: filters + accordion ── */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="faq-controls flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
              <div
                ref={tabsRef}
                role="tablist"
                aria-label="FAQ categories"
                className="relative flex items-center gap-1 p-1 rounded-2xl bg-[#150a2e]/80 border border-purple-400/20 overflow-x-auto max-w-full"
                style={{ scrollbarWidth: "none" }}
              >
                <div
                  ref={indicatorRef}
                  className="absolute top-1 bottom-1 left-0 w-0 rounded-xl bg-[#7c3aed] shadow-[0_0_18px_rgba(124,58,237,0.5)] z-0"
                  aria-hidden
                />
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      data-cat={cat.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`relative z-10 shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-300 flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300 ${
                        isActive ? "text-white" : "text-purple-200/70 hover:text-white"
                      }`}
                    >
                      {cat.label}
                      <span className={`text-xs font-mono tabular-nums ${isActive ? "text-white/80" : "text-purple-300/50"}`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="relative xl:w-64 w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search: UPI, BGMI, entry fee"
                  aria-label="Search questions"
                  className="w-full bg-[#150a2e]/90 border border-purple-400/20 rounded-xl px-4 py-2.5 pl-10 text-sm font-medium text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-300/60 focus:shadow-[0_0_18px_rgba(124,58,237,0.3)] transition-all"
                />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/60"
                  aria-hidden
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-purple-300/60 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div aria-live="polite" className="sr-only">
              {filteredFaqs.length} questions shown
            </div>

            {filteredFaqs.length > 0 ? (
              <div className="faq-list border-t border-purple-400/15">
                {filteredFaqs.map((faq) => (
                  <FaqRow
                    key={faq.id}
                    faq={faq}
                    isOpen={openId === faq.id}
                    onToggle={() => handleToggle(faq.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-purple-400/20 bg-[#150a2e]/60 p-12 text-center flex flex-col items-center gap-3">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <h4 className="text-lg font-bold text-white">No questions match your search</h4>
                <p className="text-sm text-purple-200/70 max-w-sm">
                  Try a different keyword, such as &quot;UPI&quot;, &quot;points&quot;, or &quot;entry fee&quot;.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="mt-2 text-sm font-bold text-[#c084fc] hover:underline"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="faq-cta relative mt-24 rounded-[1.75rem] border border-purple-400/20 bg-[#150a2e]/90 backdrop-blur-md p-8 sm:p-12 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-purple-600/20 via-[#7c3aed]/20 to-transparent blur-[90px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex flex-col gap-3 max-w-xl">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Still have unanswered questions?
              </h3>
              <p className="text-sm sm:text-base text-purple-200/70 leading-relaxed font-medium">
                Our support team and certified referees are active 24/7. Get help with bracket
                disputes, withdrawal tracking, or hosting a custom scrim.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
              <a
                href="#contact"
                className="group/btn faq-mag relative overflow-hidden flex-1 sm:flex-initial inline-flex items-center justify-center gap-3 bg-[#a855f7] text-white hover:text-[#1a0f2e] text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-2xl shadow-[0_0_28px_rgba(168,85,247,0.4)] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300"
              >
                <span className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                <span className="relative z-10">Contact us</span>
                <span className="relative z-10"><ArrowIcon size={16} /></span>
              </a>

              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn faq-mag relative overflow-hidden flex-1 sm:flex-initial inline-flex items-center justify-center gap-3 border border-white/[0.18] hover:border-white/40 text-white text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-2xl transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300"
              >
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                <span className="relative z-10">Join Discord</span>
                <span className="relative z-10"><ArrowIcon size={16} /></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}