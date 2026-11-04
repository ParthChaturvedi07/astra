"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const footerLinks = {
  PLATFORM: [
    { label: "Tournaments", href: "/#tournaments" },
    { label: "Games", href: "/#tournaments" },
    { label: "Rewards", href: "/#play-win-withdraw" },
    { label: "How It Works", href: "/#how-to-play" },
  ],
  COMMUNITY: [
    { label: "Discord", href: "https://discord.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "X", href: "https://x.com" },
  ],
  SUPPORT: [
    { label: "Bug Report", href: "/bugreport" },
    { label: "Contact Us", href: "/#contact" },
  ],
  LEGAL: [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Tournament Rules", href: "/rules" },
    { label: "Refund / Cancellation Policy", href: "/refund" },
  ],
};

const marqueeItems = [
  { text: "PLAY", highlight: false },
  { text: "COMPETE", highlight: true },
  { text: "BELONG", highlight: false },
  { text: "LIVE TOURNAMENTS", highlight: true },
  { text: "INSTANT UPI CASHOUT", highlight: false },
  { text: "100% FAIR PLAY", highlight: true },
  { text: "GUARANTEED PRIZE POOLS", highlight: false },
  { text: "AUTOMATED BRACKETS", highlight: true },
  { text: "CLIMB THE LEADERBOARDS", highlight: false },
];

// Floating glass chips around the phone – edit the copy freely
const chips = [
  {
    title: "Live now",
    sub: "Tournaments running",
    pos: "left-0 top-[12%] lg:-left-4",
    icon: "live",
  },
  {
    title: "Instant UPI cashout",
    sub: "Play · Win · Withdraw",
    pos: "right-0 top-[36%] lg:-right-2",
    icon: "inr",
  },
  {
    title: "Guaranteed prize pools",
    sub: "Automated brackets",
    pos: "left-[2%] bottom-[16%] lg:left-2",
    icon: "trophy",
  },
];

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                              */
/* -------------------------------------------------------------------------- */

const EASE_ROLL = "ease-[cubic-bezier(0.76,0,0.24,1)]";

function RollLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group inline-flex w-fit items-baseline gap-1.5 text-sm font-medium leading-[1.5]"
    >
      <span className="relative block overflow-hidden">
        <span
          className={`block text-zinc-400 transition-transform duration-500 ${EASE_ROLL} group-hover:-translate-y-full`}
        >
          {label}
        </span>
        <span
          aria-hidden
          className={`absolute inset-0 block translate-y-full text-white transition-transform duration-500 ${EASE_ROLL} group-hover:translate-y-0`}
        >
          {label}
        </span>
      </span>
      {external && (
        <span className="text-[10px] text-zinc-600 transition-colors duration-300 group-hover:text-fuchsia-300">
          ↗
        </span>
      )}
    </Link>
  );
}

function MarqueeGroup({ variant }: { variant: "solid" | "outline" }) {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div className="flex shrink-0 items-center">
      {row.map((item, i) => (
        <div key={`${item.text}-${i}`} className="flex items-center">
          {variant === "solid" ? (
            <span
              className={`whitespace-nowrap px-8 text-xs font-black uppercase tracking-[0.28em] sm:px-12 sm:text-[13px] ${item.highlight
                ? "bg-gradient-to-r from-[#a78bfa] via-[#c084fc] to-[#e879f9] bg-clip-text text-transparent"
                : "text-purple-100/90"
                }`}
            >
              {item.text}
            </span>
          ) : (
            <span
              className="whitespace-nowrap px-8 text-3xl font-black uppercase tracking-tight text-transparent sm:px-12 sm:text-5xl"
              style={{ WebkitTextStroke: "1px rgba(216,180,254,0.45)" }}
            >
              {item.text}
            </span>
          )}
          <span
            className={
              variant === "solid"
                ? "select-none text-[11px] text-purple-400/80 drop-shadow-[0_0_6px_rgba(167,139,250,0.7)]"
                : "select-none text-xl text-fuchsia-400/50"
            }
          >
            ✦
          </span>
        </div>
      ))}
    </div>
  );
}

/** Infinite marquee whose speed reacts to scroll velocity. */
function Marquee({
  variant,
  reverse = false,
  duration = 40,
}: {
  variant: "solid" | "outline";
  reverse?: boolean;
  duration?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.fromTo(
      track,
      { xPercent: reverse ? -50 : 0 },
      {
        xPercent: reverse ? 0 : -50,
        duration,
        ease: "none",
        repeat: -1,
      }
    );

    const state = { boost: 1 };
    const apply = () => {
      tween.timeScale(state.boost);
    };

    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const target = 1 + Math.min(Math.abs(self.getVelocity()) / 220, 5);
        gsap.to(state, {
          boost: target,
          duration: 0.25,
          overwrite: true,
          onUpdate: apply,
          onComplete: () => {
            gsap.to(state, {
              boost: 1,
              duration: 1.4,
              ease: "power2.out",
              onUpdate: apply,
            });
          },
        });
      },
    });

    return () => {
      st.kill();
      gsap.killTweensOf(state);
      tween.kill();
    };
  }, [reverse, duration]);

  return (
    <div ref={trackRef} className="flex w-max will-change-transform">
      <MarqueeGroup variant={variant} />
      <div aria-hidden>
        <MarqueeGroup variant={variant} />
      </div>
    </div>
  );
}

function Ring({
  size,
  duration,
  reverse = false,
  dashed = false,
  dot = false,
}: {
  size: number;
  duration: number;
  reverse?: boolean;
  dashed?: boolean;
  dot?: boolean;
}) {
  const dim = `min(${size}px, 94vw)`;
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[50%] flex h-0 items-center justify-center">
      <div className="ft-ring-wrap">
        <div
          className={`ft-spin relative rounded-full border ${dashed ? "border-dashed border-purple-300/20" : "border-white/[0.07]"
            } ${reverse ? "ft-spin-rev" : ""}`}
          style={{ width: dim, height: dim, animationDuration: `${duration}s` }}
        >
          {dot && (
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400 shadow-[0_0_14px_4px_rgba(232,121,249,0.65)]" />
          )}
        </div>
      </div>
    </div>
  );
}

function ChipIcon({ kind }: { kind: string }) {
  if (kind === "live") {
    return (
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400/70" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
      </span>
    );
  }
  return (
    <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-purple-500/40 to-fuchsia-500/30 text-xs font-bold text-white">
      {kind === "inr" ? "₹" : "★"}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

const css = `
  @keyframes ft-spin { to { transform: rotate(360deg); } }
  .ft-spin { animation: ft-spin linear infinite; }
  .ft-spin-rev { animation-direction: reverse; }

  /* Feathers every edge of the phone photo so no rectangle is ever visible */
  .ft-phone-img {
    -webkit-mask-image:
      linear-gradient(to right, transparent 0%, #000 16%, #000 84%, transparent 100%),
      linear-gradient(to bottom, transparent 0%, #000 7%, #000 56%, transparent 100%);
    mask-image:
      linear-gradient(to right, transparent 0%, #000 16%, #000 84%, transparent 100%),
      linear-gradient(to bottom, transparent 0%, #000 7%, #000 56%, transparent 100%);
    -webkit-mask-composite: source-in;
    mask-composite: intersect;
  }

  .ft-letter {
    -webkit-text-stroke: 1px rgba(196,181,253,0.22);
    transition: filter .4s ease, -webkit-text-stroke-color .4s ease;
    cursor: default;
  }
  .ft-letter:hover {
    -webkit-text-stroke-color: rgba(232,121,249,0.85);
    filter: drop-shadow(0 0 28px rgba(168,85,247,0.55));
  }

  .ft-grain {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.5'/></svg>");
  }

  @media (prefers-reduced-motion: reduce) {
    .ft-spin { animation: none; }
  }
`;

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState("");

  // live local time (client only, avoids hydration mismatch)
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    // cursor spotlight
    const onMove = (e: MouseEvent) => {
      const r = footer.getBoundingClientRect();
      footer.style.setProperty("--mx", `${e.clientX - r.left}px`);
      footer.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    footer.addEventListener("mousemove", onMove);
    cleanups.push(() => footer.removeEventListener("mousemove", onMove));

    const ctx = gsap.context(() => {
      const ctaTrigger = { trigger: ".ft-cta", start: "top 78%" };
      const stageTrigger = { trigger: ".ft-stage", start: "top 85%" };

      /* ---------- entrances ---------- */
      gsap.from(".ft-strip", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ft-strip", start: "top 95%" },
      });

      gsap.from(".ft-line", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: ctaTrigger,
      });

      gsap.from(".ft-fade", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: ctaTrigger,
      });

      gsap.from(".ft-phone-enter", {
        opacity: 0,
        y: 90,
        scale: 0.92,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: stageTrigger,
      });

      gsap.from(".ft-ring-wrap", {
        opacity: 0,
        scale: 0.6,
        duration: 1.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: stageTrigger,
      });

      gsap.from(".ft-chip-in", {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.9,
        stagger: 0.15,
        delay: 0.5,
        ease: "back.out(1.6)",
        scrollTrigger: stageTrigger,
      });

      gsap.from(".ft-panel", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ft-panel", start: "top 92%" },
      });

      gsap.from(".ft-col", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ft-panel", start: "top 85%" },
      });

      gsap.from(".ft-bottom", {
        opacity: 0,
        y: 16,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ft-bottom", start: "top 98%" },
      });

      gsap.from(".ft-letter", {
        yPercent: 60,
        opacity: 0,
        duration: 1.3,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: ".ft-wordmark", start: "top 98%" },
      });

      /* ---------- scroll parallax on the phone ---------- */
      gsap.fromTo(
        ".ft-phone-parallax",
        { y: 70 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: ".ft-stage",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      if (reduce) return;

      /* ---------- idle floating ---------- */
      gsap.to(".ft-phone-float", {
        y: -14,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.utils.toArray<HTMLElement>(".ft-chip", footer).forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 ? 10 : -12,
          duration: 2.4 + i * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      /* ---------- phone tilt following the cursor ---------- */
      const stage = footer.querySelector<HTMLElement>(".ft-stage");
      const tilt = footer.querySelector<HTMLElement>(".ft-phone-tilt");
      if (stage && tilt) {
        gsap.set(tilt, { transformPerspective: 900 });
        const rx = gsap.quickTo(tilt, "rotationX", { duration: 0.8, ease: "power3.out" });
        const ry = gsap.quickTo(tilt, "rotationY", { duration: 0.8, ease: "power3.out" });
        const move = (e: MouseEvent) => {
          const r = stage.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry(px * 10);
          rx(-py * 8);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        stage.addEventListener("mousemove", move);
        stage.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          stage.removeEventListener("mousemove", move);
          stage.removeEventListener("mouseleave", leave);
        });
      }

      /* ---------- magnetic buttons ---------- */
      gsap.utils.toArray<HTMLElement>(".ft-magnetic", footer).forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", move);
          el.removeEventListener("mouseleave", leave);
        });
      });
    }, footer);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={footerRef}
      className="relative isolate w-full overflow-hidden bg-transparent"
      style={{ "--mx": "50%", "--my": "25%" } as CSSProperties}
    >
      <style>{css}</style>

      {/* ------------------------------ ambient layers ------------------------------ */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        {/* top glow line */}
        {/* <div className="absolute left-1/2 top-0 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-500/60 to-transparent shadow-[0_0_30px_rgba(139,92,246,0.8)]" /> */}

        {/* blueprint grid */}
        {/* <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 75% 55% at 50% 38%, #000 15%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 55% at 50% 38%, #000 15%, transparent 100%)",
          }}
        /> */}

        {/* colour blobs */}
        <div className="absolute -left-[10%] top-[18%] h-[420px] w-[420px] rounded-full bg-purple-700/20 blur-[140px]" />
        <div className="absolute -right-[8%] top-[6%] h-[380px] w-[380px] rounded-full bg-fuchsia-600/15 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 h-[360px] w-[70%] -translate-x-1/2 rounded-full bg-purple-600/15 blur-[140px]" />

        {/* cursor spotlight */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(520px circle at var(--mx) var(--my), rgba(168,85,247,0.14), transparent 65%)",
          }}
        />

        {/* film grain */}
        <div className="ft-grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
      </div>

      {/* ------------------------------ crossing strips ------------------------------ */}
      <div className="ft-strip relative h-[240px] w-full select-none sm:h-[300px]">
        {/* back strip – outlined, reversed */}
        <div
          className="absolute left-1/2 top-1/2 w-[140%] opacity-70"
          style={{ transform: "translate(-50%, -50%) rotate(3deg)" }}
          aria-hidden
        >
          <div className="overflow-hidden border-y border-white/[0.05] bg-white/[0.015] py-3 sm:py-4">
            <Marquee variant="outline" reverse duration={60} />
          </div>
        </div>

        {/* front strip – solid glass */}
        <div
          className="absolute left-1/2 top-1/2 z-10 w-[140%]"
          style={{ transform: "translate(-50%, -50%) rotate(-3deg)" }}
        >
          <div className="relative overflow-hidden border-y border-purple-400/25 bg-gradient-to-r from-[#0d051f]/95 via-[#1a0a3d]/95 to-[#0d051f]/95 py-4 shadow-[0_0_60px_rgba(124,58,237,0.25)] backdrop-blur-md sm:py-5">
            <Marquee variant="solid" duration={40} />
          </div>
        </div>
      </div>

      {/* ------------------------------ CTA + phone ------------------------------ */}
      <section className="ft-cta relative z-10 mx-auto grid w-full max-w-7xl items-center gap-4 px-6 pb-4 pt-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-6">
          <div className="ft-fade mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-purple-200/80 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-400" />
            </span>
            Your next match starts here
          </div>

          <h2
            className="font-black uppercase leading-[0.92] tracking-tighter text-white"
            style={{ fontSize: "clamp(3rem, 6.4vw, 6.5rem)" }}
          >
            {["PLAY.", "COMPETE.", "BELONG."].map((w, i) => (
              <span key={w} className="block overflow-hidden pb-[0.08em]">
                <span
                  className={`ft-line inline-block ${i === 1
                    ? "bg-gradient-to-r from-[#a78bfa] via-[#c084fc] to-[#f0abfc] bg-clip-text text-transparent"
                    : ""
                    }`}
                  style={
                    i === 2
                      ? {
                        WebkitTextStroke: "1.5px rgba(255,255,255,0.75)",
                        color: "transparent",
                      }
                      : undefined
                  }
                >
                  {w}
                </span>
              </span>
            ))}
          </h2>

          <p className="ft-fade mt-8 max-w-md text-base font-medium leading-relaxed text-zinc-400">
            Join live tournaments, climb the leaderboards and cash out instantly
            with UPI.
          </p>

          <div className="ft-fade mt-10 flex flex-wrap items-center gap-4">
            <div className="ft-magnetic inline-block">
              <Link
                href="/#games"
                className="group inline-flex items-center gap-3 rounded-full border border-purple-400/30 bg-purple-500/10 py-3 pl-7 pr-3 text-sm font-bold tracking-wide text-white shadow-[0_0_30px_rgba(124,58,237,0.3)] backdrop-blur-xl transition-all duration-300 hover:border-purple-400/60 hover:bg-purple-500/20 hover:shadow-[0_0_50px_rgba(124,58,237,0.5)]"
              >
                <Image
                  src="https://framerusercontent.com/images/1GgSZDsVA7GKub98IQFhnqoNJvI.svg"
                  alt="Play Store"
                  width={22}
                  height={22}
                  className="shrink-0 object-contain"
                />
                Download Now
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-purple-400/20 bg-purple-500/15 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-purple-400/30">
                  →
                </span>
              </Link>
            </div>

            <div className="ft-magnetic inline-block">
              <Link
                href="/#how-to-play"
                className="inline-flex items-center rounded-full border border-white/15 px-7 py-[14px] text-sm font-semibold tracking-wide text-white/80 backdrop-blur transition-colors duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                How it works
              </Link>
            </div>
          </div>
        </div>

        {/* phone stage */}
        <div className="lg:col-span-6">
          <div className="ft-stage relative mx-auto h-[500px] w-full sm:h-[580px] lg:h-[620px]">
            {/* glow */}
            <div className="pointer-events-none absolute inset-x-0 top-[50%] flex h-0 items-center justify-center">
              <div className="h-[420px] w-[420px] max-w-[90vw] rounded-full bg-purple-600/30 blur-[110px]" />
            </div>

            {/* orbit rings */}
            <Ring size={380} duration={70} dashed dot />
            <Ring size={540} duration={110} reverse />
            <Ring size={700} duration={160} dashed />

            {/* phone */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
              <div className="ft-phone-enter">
                <div className="ft-phone-parallax">
                  <div className="ft-phone-tilt">
                    <div className="ft-phone-float">
                      <div className="relative aspect-[1086/1448] w-[290px] sm:w-[340px] lg:w-[400px]">
                        <Image
                          src="/images/handelingphone.png"
                          alt="Astra app showing live and upcoming tournaments"
                          fill
                          sizes="(max-width: 640px) 290px, (max-width: 1024px) 340px, 400px"
                          className="ft-phone-img object-contain object-bottom"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* floating glass chips */}
            {chips.map((c) => (
              <div
                key={c.title}
                className={`ft-chip-in absolute z-20 hidden sm:block ${c.pos}`}
              >
                <div className="ft-chip flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                  <ChipIcon kind={c.icon} />
                  <div className="leading-tight">
                    <p className="text-[13px] font-bold text-white">{c.title}</p>
                    <p className="mt-0.5 text-[11px] font-medium text-zinc-400">
                      {c.sub}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ links panel ------------------------------ */}
      <section className="relative z-10 mx-auto mt-10 w-full max-w-7xl px-6 lg:px-8">
        <div className="ft-panel rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8 backdrop-blur-xl lg:p-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.3fr] lg:gap-x-10">
            {/* brand */}
            <div className="ft-col col-span-2 flex flex-col items-start gap-6 md:col-span-4 lg:col-span-1">
              <Link
                href="/"
                className="inline-block transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src="/images/astra_logo.png"
                  alt="Astra Logo"
                  width={120}
                  height={35}
                  className="drop-shadow-[0_0_15px_rgba(192,132,252,0.4)]"
                />
              </Link>
              <p className="text-lg font-semibold tracking-tight text-white">
                Play. Compete. Belong.
              </p>
              <p className="max-w-xs text-sm font-medium leading-relaxed text-zinc-500">
                Tournaments, leaderboards and instant rewards, built for gamers
                who play to win.
              </p>
            </div>

            {/* link columns */}
            {Object.entries(footerLinks).map(([category, links], i) => (
              <div key={category} className="ft-col flex flex-col">
                <h3 className="mb-6 flex items-center gap-3 text-[11px] font-bold tracking-[0.25em] text-white">
                  <span className="font-mono text-purple-400/80">0{i + 1}</span>
                  {category}
                </h3>
                <ul className="flex flex-col gap-3.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <RollLink href={link.href} label={link.label} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ bottom bar ------------------------------ */}
      <div className="ft-bottom relative z-10 mx-auto mt-10 flex w-full max-w-7xl flex-col gap-5 px-6 text-xs font-medium tracking-wide text-zinc-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p>© 2026 Astra. All rights reserved.</p>

        {time && (
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.9)]" />
            Local time · {time}
          </p>
        )}

        <div className="flex items-center gap-6">
          <Link href="/privacy" className="transition-colors hover:text-zinc-200">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-zinc-200">
            Terms of Service
          </Link>
          <button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            className="group grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition-colors duration-300 hover:border-fuchsia-400/60 hover:bg-white/10"
          >
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
              ↑
            </span>
          </button>
        </div>
      </div>

      {/* ------------------------------ giant wordmark ------------------------------ */}
      <div
        aria-hidden
        className="ft-wordmark relative z-0 mt-4 flex w-full select-none justify-center sm:mt-2"
        style={{
          maskImage: "linear-gradient(to bottom, #000 38%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 38%, transparent 100%)",
        }}
      >
        {"ASTRA".split("").map((l, i) => (
          <span
            key={i}
            className="ft-letter inline-block bg-gradient-to-b from-white/[0.18] via-white/[0.05] to-transparent bg-clip-text text-[25vw] font-black leading-[0.82] tracking-tighter text-transparent"
          >
            {l}
          </span>
        ))}
      </div>
    </footer>
  );
}