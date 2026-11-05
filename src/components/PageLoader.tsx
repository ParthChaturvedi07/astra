"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Inline styles                                                               */
/* ─────────────────────────────────────────────────────────────────────────── */
const css = `
  @keyframes pl-spin  { to { transform: rotate(360deg); } }
  @keyframes pl-rspin { to { transform: rotate(-360deg); } }
  @keyframes pl-ping  {
    0%,100% { opacity:.7; transform: scale(1); }
    50%     { opacity:1;  transform: scale(1.18); }
  }
  @keyframes pl-bar {
    0%   { width: 0%; }
    100% { width: 100%; }
  }

  #astra-loader {
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #0c051a;
    overflow: hidden;
  }

  /* noise grain */
  #astra-loader::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.5'/></svg>");
    opacity: .055;
    pointer-events: none;
  }

  /* ambient blobs */
  .pl-blob { position:absolute; border-radius:50%; pointer-events:none; filter:blur(100px); }
  .pl-blob-1 { width:420px; height:420px; background:rgba(124,58,237,0.2);  top:-120px; left:-120px; }
  .pl-blob-2 { width:340px; height:340px; background:rgba(232,121,249,0.13); bottom:-80px; right:-80px; }

  /* rings */
  .pl-ring {
    position:absolute; border-radius:50%;
    border-style:solid; border-color:transparent;
  }
  .pl-ring-1 {
    width:220px; height:220px;
    border-top-color: rgba(167,139,250,.6);
    border-right-color: rgba(167,139,250,.12);
    border-width: 1.5px;
    animation: pl-spin 3s linear infinite;
  }
  .pl-ring-2 {
    width:170px; height:170px;
    border-bottom-color: rgba(232,121,249,.5);
    border-left-color:   rgba(232,121,249,.1);
    border-width: 1px;
    animation: pl-rspin 2.2s linear infinite;
  }
  .pl-ring-3 {
    width:130px; height:130px;
    border-top-color: rgba(124,58,237,.45);
    border-right-color: rgba(124,58,237,.08);
    border-width: 1px;
    animation: pl-spin 1.6s linear infinite;
  }

  /* center glow dot */
  .pl-dot {
    position:absolute;
    width:8px; height:8px; border-radius:50%;
    background: rgb(192,132,252);
    box-shadow: 0 0 14px 5px rgba(192,132,252,.75), 0 0 32px 12px rgba(124,58,237,.4);
    animation: pl-ping 1.6s ease-in-out infinite;
  }

  /* logo centred inside rings */
  .pl-logo {
    position:absolute;
    display:flex; align-items:center; justify-content:center;
  }

  /* eyebrow label */
  .pl-label {
    position:absolute;
    top:28px; left:50%; transform:translateX(-50%);
    font-size:10px; font-weight:800;
    letter-spacing:.28em; text-transform:uppercase;
    color:rgba(167,139,250,.5);
    white-space:nowrap;
  }

  /* progress bar */
  .pl-bar-track {
    position:absolute;
    bottom:52px; left:50%; transform:translateX(-50%);
    width:min(260px,72vw); height:2px; border-radius:999px;
    background:rgba(167,139,250,.12); overflow:hidden;
  }
  .pl-bar-fill {
    height:100%; border-radius:999px;
    background:linear-gradient(90deg,#7c3aed,#c084fc,#e879f9);
    box-shadow:0 0 10px rgba(192,132,252,.7);
    animation: pl-bar 1.6s cubic-bezier(0.4,0,0.2,1) forwards;
  }

  /* percent counter */
  .pl-counter {
    position:absolute;
    bottom:30px; left:50%; transform:translateX(-50%);
    font-size:11px; font-weight:700; letter-spacing:.18em;
    color:rgba(167,139,250,.6); font-family:ui-monospace,monospace;
    white-space:nowrap;
  }
`;

/* ── counter synced to bar duration ── */
function useCounter(durationMs = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      const ease = t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
      setVal(Math.round(ease * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs]);
  return val;
}

/* ── main component ── */
export default function PageLoader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const count = useCounter(1600);

  useEffect(() => {
    // Fire exit ~200ms after bar finishes
    const t = setTimeout(() => {
      if (!ref.current) { onDone(); return; }

      const tl = gsap.timeline({ onComplete: onDone });

      // rings + dot + logo fade & scale out
      tl.to(
        "#astra-loader .pl-ring, #astra-loader .pl-dot, #astra-loader .pl-logo",
        { opacity: 0, scale: 1.1, duration: 0.35, ease: "power2.in", stagger: 0.04 }
      );
      // whole overlay slides up
      tl.to(ref.current, {
        yPercent: -100,
        duration: 0.65,
        ease: "power4.inOut",
      }, "-=0.05");
    }, 1800);

    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <>
      <style>{css}</style>
      <div id="astra-loader" ref={ref}>
        <div className="pl-blob pl-blob-1" />
        <div className="pl-blob pl-blob-2" />

        <div className="pl-label">Initialising Platform</div>

        <div className="pl-ring pl-ring-1" />
        <div className="pl-ring pl-ring-2" />
        <div className="pl-ring pl-ring-3" />

        <div className="pl-logo">
          <Image
            src="/images/astra_logo.png"
            alt="Astra"
            width={76}
            height={24}
            priority
            style={{ objectFit: "contain", filter: "drop-shadow(0 0 14px rgba(192,132,252,0.65))" }}
          />
        </div>
        <div className="pl-dot" />

        <div className="pl-bar-track">
          <div className="pl-bar-fill" />
        </div>
        <div className="pl-counter">{String(count).padStart(3, "0")}%</div>
      </div>
    </>
  );
}
