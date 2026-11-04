"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DottedPatch from "@/components/DottedPatch";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const ICON_ROWS = {
  a: ["bgmi", "ludoking", "mario", "minecraft", "csgo"],
  b: ["angrybirds", "chess", "bgmi", "minecraft"],
  c: ["csgo", "angrybirds", "chess", "ludoking", "mario"],
  d: ["minecraft", "bgmi", "csgo", "chess"],
};

/* Words split into masked spans so each one can rise out of its own line */
function Words({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className="ds-mask inline-block overflow-hidden align-bottom py-[0.1em] -my-[0.1em]">
          <span className={`ds-word inline-block will-change-transform ${className}`}>{w}&nbsp;</span>
        </span>
      ))}
    </>
  );
}

function MarqueeRow({
  icons,
  size,
  gap,
  opacity,
  reverse = false,
  bottom,
}: {
  icons: string[];
  size: number;
  gap: number;
  opacity: number;
  reverse?: boolean;
  bottom: string;
}) {
  return (
    <div
      className="absolute inset-x-0 overflow-hidden z-0 pointer-events-none"
      style={{ bottom, opacity }}
      aria-hidden
    >
      <div className={`ds-marquee ${reverse ? "ds-marquee-rev" : ""} flex w-max will-change-transform`}>
        {[0, 1].map((n) => (
          <div key={n} className="flex" style={{ gap, paddingRight: gap }}>
            {icons.map((name, i) => (
              <div key={i} className="relative shrink-0" style={{ width: size, height: size }}>
                <Image src={`/images/gameicons/${name}.png`} alt="" fill className="object-contain" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const Arrow = () => (
  <svg
    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default function DynamicStreamingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef);

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        fine: "(hover: hover) and (pointer: fine)",
      },
      (context) => {
        const { motion, fine } = context.conditions as { motion: boolean; fine: boolean };
        if (!motion) return; // reduced motion: everything stays static and visible

        const cleanups: Array<() => void> = [];

        /* ---------- 1. Header: words rise out of their masks ---------- */
        const head = gsap.timeline({
          scrollTrigger: { trigger: ".ds-title", start: "top 80%" },
        });
        head
          .from(".ds-badge", { autoAlpha: 0, y: -16, scale: 0.92, duration: 0.6, ease: "back.out(1.6)" })
          .from(
            ".ds-word",
            {
              yPercent: 115,
              rotate: 5,
              transformOrigin: "0% 100%",
              duration: 1,
              stagger: 0.09,
              ease: "expo.out",
            },
            "-=0.3"
          )
          .from(".ds-desc", { autoAlpha: 0, y: 18, duration: 0.8, ease: "power3.out" }, "-=0.6");

        // the gradient on "Community" drifts as you scroll
        gsap.fromTo(
          ".ds-grad",
          { backgroundPosition: "0% 50%" },
          {
            backgroundPosition: "100% 50%",
            ease: "none",
            scrollTrigger: { trigger: ".ds-title", start: "top 90%", end: "bottom 10%", scrub: true },
          }
        );

        /* ---------- 2. Cards: clip-path reveal, then scroll parallax ---------- */
        gsap.set(".ds-card", { clipPath: "inset(100% 0% 0% 0% round 28px)", y: 60 });
        ScrollTrigger.batch(".ds-card", {
          start: "top 88%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, {
              clipPath: "inset(0% 0% 0% 0% round 28px)",
              y: 0,
              duration: 1.2,
              stagger: 0.18,
              ease: "expo.out",
            }),
        });

        // images drift at different speeds than the card frame
        gsap.utils.toArray<HTMLElement>(".ds-parallax").forEach((el, i) => {
          gsap.fromTo(
            el,
            { yPercent: 10 },
            {
              yPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest(".ds-card"),
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        });

        /* ---------- 3. Marquees speed up with scroll velocity ---------- */
        const tweens = gsap.utils.toArray<HTMLElement>(".ds-marquee").map((row, i) => {
          const rev = row.classList.contains("ds-marquee-rev");
          return gsap.fromTo(
            row,
            { xPercent: rev ? -50 : 0 },
            { xPercent: rev ? 0 : -50, duration: 26 + i * 3, ease: "none", repeat: -1 }
          );
        });
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 350, 7);
            tweens.forEach((t) => t.timeScale(boost));
            gsap.to(tweens, { timeScale: 1, duration: 1.2, ease: "power2.out", overwrite: "auto" });
          },
        });

        /* ---------- 4. CTA: buttons, avatars, counting number ---------- */
        const count = { v: 0 };
        const countEl = sectionRef.current?.querySelector<HTMLElement>(".ds-count");
        const cta = gsap.timeline({ scrollTrigger: { trigger: ".ds-cta", start: "top 88%" } });
        cta
          .from(".ds-btn", { autoAlpha: 0, y: 30, duration: 0.8, stagger: 0.12, ease: "power3.out" })
          .from(
            ".ds-avatar",
            { scale: 0, x: -40, duration: 0.7, stagger: 0.08, ease: "back.out(2)" },
            "-=0.4"
          )
          .from(".ds-stat-label", { autoAlpha: 0, x: -14, duration: 0.6, ease: "power3.out" }, "-=0.4")
          .to(
            count,
            {
              v: 10,
              duration: 1.8,
              ease: "power3.out",
              onUpdate: () => {
                if (countEl) countEl.textContent = `${Math.round(count.v)}K+`;
              },
            },
            "<"
          );

        /* ---------- 5. Pointer-only: 3D tilt, spotlight, magnetic buttons ---------- */
        if (fine) {
          gsap.utils.toArray<HTMLElement>(".ds-card").forEach((card) => {
            const tilt = card.querySelector<HTMLElement>(".ds-tilt")!;
            const img = card.querySelector<HTMLElement>(".ds-img")!;
            gsap.set(tilt, { transformPerspective: 1100 });
            const rx = gsap.quickTo(tilt, "rotationX", { duration: 0.6, ease: "power3" });
            const ry = gsap.quickTo(tilt, "rotationY", { duration: 0.6, ease: "power3" });
            const ix = gsap.quickTo(img, "x", { duration: 0.8, ease: "power3" });
            const iy = gsap.quickTo(img, "y", { duration: 0.8, ease: "power3" });

            const move = (e: PointerEvent) => {
              const r = card.getBoundingClientRect();
              const px = (e.clientX - r.left) / r.width - 0.5;
              const py = (e.clientY - r.top) / r.height - 0.5;
              ry(px * 7);
              rx(-py * 7);
              ix(px * -26);
              iy(py * -18);
              card.style.setProperty("--mx", `${e.clientX - r.left}px`);
              card.style.setProperty("--my", `${e.clientY - r.top}px`);
            };
            const leave = () => {
              rx(0);
              ry(0);
              ix(0);
              iy(0);
            };
            card.addEventListener("pointermove", move);
            card.addEventListener("pointerleave", leave);
            cleanups.push(() => {
              card.removeEventListener("pointermove", move);
              card.removeEventListener("pointerleave", leave);
            });
          });

          gsap.utils.toArray<HTMLElement>(".ds-mag").forEach((btn) => {
            const xTo = gsap.quickTo(btn, "x", { duration: 0.9, ease: "elastic.out(1, 0.45)" });
            const yTo = gsap.quickTo(btn, "y", { duration: 0.9, ease: "elastic.out(1, 0.45)" });
            const move = (e: PointerEvent) => {
              const r = btn.getBoundingClientRect();
              xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
              yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
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

  const cardBase =
    "ds-card relative rounded-[1.75rem] h-[440px] group";
  const tiltBase =
    "ds-tilt absolute inset-0 rounded-[1.75rem] overflow-hidden bg-[#0d0818]/90 border border-white/[0.07] shadow-2xl will-change-transform";

  return (
    <section
      ref={sectionRef}
      id="community"
      className="relative w-full py-28 md:py-36 bg-transparent overflow-hidden flex flex-col items-center"
    >
      {/* Background */}
      <DottedPatch top="2%" right="5%" width={390} height={270} rotate={-12} maskShape="ellipse" glow glowColor="rgba(124, 58, 237, 0.16)" animate="float" />
      <DottedPatch top="38%" right="-20px" width={370} height={330} rotate={-15} maskShape="fade-right" dotColor="rgba(124, 58, 237, 0.4)" spacing={18} />
      <DottedPatch top="30%" left="-30px" width={380} height={350} rotate={10} maskShape="fade-left" dotColor="rgba(192, 132, 252, 0.35)" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[460px] bg-purple-700/10 blur-[130px] rounded-full" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="ds-badge flex items-center gap-2.5 bg-[#1a0f2e] border border-purple-500/30 rounded-full px-5 py-2 mb-10 shadow-[0_0_24px_rgba(167,139,250,0.18)]">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_6px_rgba(167,139,250,0.8)]" />
          <span className="text-zinc-300 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">Connect</span>
          <span className="w-1 h-1 rounded-full bg-zinc-500" />
          <span className="text-zinc-300 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">Create</span>
          <span className="w-1 h-1 rounded-full bg-zinc-500" />
          <span className="text-zinc-300 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">Grow</span>
        </div>

        <h2 className="ds-title text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white text-center mb-6 leading-[1.02] tracking-[-0.035em]">
          <Words text="A Vibrant" />
          <Words
            text="Community"
            className="ds-grad text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-violet-400 bg-[length:250%_100%]"
          />
          <Words text="Hub" />
        </h2>
        <p className="ds-desc text-zinc-400 text-lg md:text-xl font-medium mb-16 text-center max-w-xl">
          Where Gamers, Creators, and Communities Come Together
        </p>

        {/* Asymmetric bento: narrow + wide, second card on a slower scroll lane */}
        <div className="ds-cards-grid grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
          {/* Card 1 */}
          <div className={`${cardBase} lg:col-span-5`}>
            <div className={tiltBase}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.07] via-transparent to-transparent pointer-events-none" />
              <MarqueeRow icons={ICON_ROWS.a} size={32} gap={48} opacity={0.3} bottom="35%" />
              <MarqueeRow icons={ICON_ROWS.b} size={28} gap={64} opacity={0.2} bottom="25%" reverse />

              {/* cursor spotlight */}
              <div
                className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(168,85,247,0.2), transparent 60%)",
                }}
              />

              <div className="relative z-10 p-7 md:p-9 text-left">
                <h3 className="text-2xl md:text-[1.75rem] font-bold text-white leading-[1.15] tracking-tight mb-3">
                  Discover and support your favorite{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
                    gaming creators
                  </span>
                </h3>
                <p className="text-zinc-400 text-sm font-medium max-w-xs">
                  Follow creators across every genre and be part of their journey
                </p>
              </div>

              <div className="absolute -bottom-16 inset-x-0 z-10 h-[78%] transition-transform duration-700 ease-out group-hover:-translate-y-2">
                <div className="ds-parallax absolute inset-0">
                  <div className="ds-img absolute inset-0">
                    <Image
                      src="/images/streaming/card-1.png"
                      alt="Gaming content on Astra app"
                      fill
                      className="object-contain object-bottom drop-shadow-[0_0_60px_rgba(139,92,246,0.45)]"
                      quality={95}
                    />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none z-20">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0818] via-[#0d0818]/50 to-transparent" />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-24 bg-purple-600/35 blur-[50px] rounded-full" />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="lg:col-span-7">
            <div className={`${cardBase}`}>
              <div className={tiltBase}>
                <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/[0.07] via-transparent to-transparent pointer-events-none" />
                <MarqueeRow icons={ICON_ROWS.c} size={32} gap={56} opacity={0.3} bottom="35%" />
                <MarqueeRow icons={ICON_ROWS.d} size={28} gap={48} opacity={0.2} bottom="25%" reverse />

                <div
                  className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(168,85,247,0.2), transparent 60%)",
                  }}
                />

                <div className="relative z-10 p-7 md:p-9 text-left">
                  <h3 className="text-2xl md:text-[1.75rem] font-bold text-white leading-[1.15] tracking-tight mb-3 max-w-md">
                    Build real{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
                      connections
                    </span>{" "}
                    with a thriving gaming community
                  </h3>
                  <p className="text-zinc-400 text-sm font-medium max-w-sm">
                    Engage, collaborate, and grow alongside players and creators who share your passion
                  </p>
                </div>

                <div className="absolute -bottom-16 inset-x-0 z-10 h-[88%] transition-transform duration-700 ease-out group-hover:-translate-y-2">
                  <div className="ds-parallax absolute inset-0">
                    <div className="ds-img absolute inset-0">
                      <Image
                        src="/images/streaming/card-2(3).png"
                        alt="Connect with streamers on Astra"
                        fill
                        className="object-contain object-bottom drop-shadow-[0_0_60px_rgba(139,92,246,0.45)]"
                        quality={95}
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none z-20">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0818] via-[#0d0818]/50 to-transparent" />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-24 bg-purple-600/35 blur-[50px] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="ds-cta mt-28 flex flex-col items-center gap-12 w-full max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center">
            <button className="ds-btn ds-mag group relative overflow-hidden flex items-center justify-center gap-3 w-full sm:w-auto px-9 py-4 bg-[#a855f7] rounded-2xl text-white hover:text-[#1a0f2e] font-bold text-sm tracking-widest uppercase shadow-[0_0_28px_rgba(168,85,247,0.35)] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300">
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              <span className="relative z-10">Join the Astra Community</span>
              <span className="relative z-10"><Arrow /></span>
            </button>
            <button className="ds-btn ds-mag group relative overflow-hidden flex items-center justify-center gap-3 w-full sm:w-auto px-9 py-4 bg-transparent border border-white/[0.18] hover:border-white/40 rounded-2xl text-white font-bold text-sm tracking-widest uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300">
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              <span className="relative z-10">Become a Creator</span>
              <span className="relative z-10"><Arrow /></span>
            </button>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex -space-x-4">
              {[32, 44, 12, 57].map((n, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={n}
                  className="ds-avatar w-[52px] h-[52px] rounded-full border-[3px] border-[#080410] object-cover relative"
                  style={{ zIndex: 10 + i * 10 }}
                  src={`https://i.pravatar.cc/100?img=${n}`}
                  alt="Community member"
                />
              ))}
              <div
                className="ds-avatar w-[52px] h-[52px] rounded-full border-[3px] border-[#080410] bg-[#1a102e] flex items-center justify-center text-white relative text-xl shadow-inner cursor-pointer hover:bg-[#2d1b54] transition-colors"
                style={{ zIndex: 50 }}
              >
                +
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="ds-count text-white font-black text-[32px] leading-none tracking-wide mb-1 tabular-nums">
                10K+
              </span>
              <span className="ds-stat-label text-zinc-400 text-xs font-semibold tracking-widest uppercase">
                Active community members
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}