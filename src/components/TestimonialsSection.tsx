"use client";

import { useState, useCallback, useEffect } from "react";

/* ── Testimonial data ── */
const testimonials = [
  {
    name: "Priya Sharma",
    role: "Streamer",
    avatar: "https://i.pravatar.cc/100?img=47",
    quote:
      "The community on Astra is incredible! I've met so many talented players and viewers through live streaming.",
    rating: 4,
  },
  {
    name: "Rohan Verma",
    role: "Competitive Gamer",
    avatar: "https://i.pravatar.cc/100?img=68",
    quote:
      "Astra has completely changed how I participate in tournaments. The smooth experience, live streaming, and active community make it the best platform for competitive gamers.",
    rating: 5,
  },
  {
    name: "Aditya Singh",
    role: "Squad Leader",
    avatar: "https://i.pravatar.cc/100?img=53",
    quote:
      "Organizing and joining tournaments has never been easier. Astra keeps everything simple and exciting!",
    rating: 4,
  },
  {
    name: "Sneha Patel",
    role: "Content Creator",
    avatar: "https://i.pravatar.cc/100?img=45",
    quote:
      "Astra's streaming tools are next-level! My audience grew 3x since I started streaming my tournament runs here.",
    rating: 5,
  },
  {
    name: "Vikram Das",
    role: "Pro Player",
    avatar: "https://i.pravatar.cc/100?img=12",
    quote:
      "The tournament format variety on Astra is unmatched. Solo, duo, squad — every mode feels polished and fair.",
    rating: 5,
  },
];

/* ── Stats data ── */
const stats = [
  {
    icon: (
      <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.2)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-purple-400"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </div>
    ),
    value: "1M+",
    label: "Users",
    desc: "Trusted by over 1,000,000+ gamers to play, stream and compete together.",
  },
  {
    icon: (
      <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.2)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-purple-400"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>
    ),
    value: "4.8",
    label: "Rating",
    desc: "Our platform is loved by the community for its seamless experience.",
  },
  {
    icon: (
      <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.2)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-purple-400"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
    ),
    value: "96%",
    label: "Satisfaction",
    desc: "Users report a better gaming experience with organized and fair tournaments.",
  },
];

/* ── Star rendering helper ── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1 mt-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < count ? "#f59e0b" : "rgba(255,255,255,0.1)"}
          className="shrink-0"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(1);

  const prev = useCallback(
    () => setActive((c) => (c === 0 ? testimonials.length - 1 : c - 1)),
    []
  );
  const next = useCallback(
    () => setActive((c) => (c === testimonials.length - 1 ? 0 : c + 1)),
    []
  );

  /* Auto-rotate every 6s */
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  /* Get visible cards: prev, active, next */
  const getIdx = (offset: number) =>
    (active + offset + testimonials.length) % testimonials.length;

  return (
    <section className="relative w-full py-12 bg-transparent overflow-hidden flex flex-col items-center" style={{ fontFamily: 'var(--font-main)' }}>
      {/* ── Background ambient glow ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-700/10 blur-[140px] rounded-full" />
      </div>

      {/* ── Dotted world-map background ── */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.18]">
        <svg
          viewBox="0 0 1000 500"
          className="w-[110%] max-w-[1400px] h-auto"
          preserveAspectRatio="xMidYMid meet"
          style={{
            maskImage:
              "radial-gradient(ellipse 80% 75% at 50% 48%, black 15%, transparent 65%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 75% at 50% 48%, black 15%, transparent 65%)",
          }}
        >
          <defs>
            <pattern
              id="worldDots"
              x="0"
              y="0"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="4" cy="4" r="1.4" fill="rgba(167,139,250,0.7)" />
            </pattern>
          </defs>

          {/* North America */}
          <path
            d="M145,60 L170,55 195,65 225,60 250,70 265,85 270,110 280,130 275,150 265,170 250,185 235,200 220,210 200,215 185,220 175,235 180,250 195,260 200,270 175,270 155,265 135,255 120,240 110,220 100,200 95,180 100,160 110,140 120,120 130,100 135,80Z"
            fill="url(#worldDots)"
          />
          {/* Greenland */}
          <path
            d="M280,30 L310,25 330,35 335,55 325,70 310,75 295,68 285,55 282,42Z"
            fill="url(#worldDots)"
          />
          {/* Central America */}
          <path
            d="M175,235 L190,232 205,240 215,255 225,270 230,278 220,282 205,278 195,268 185,255Z"
            fill="url(#worldDots)"
          />
          {/* South America */}
          <path
            d="M228,280 L248,275 268,282 282,298 292,320 296,345 290,370 278,392 262,408 248,420 238,438 235,455 240,468 232,472 222,460 218,438 212,418 206,395 200,370 198,345 202,320 208,300 218,288Z"
            fill="url(#worldDots)"
          />
          {/* Europe */}
          <path
            d="M458,48 L478,44 498,52 515,58 525,68 532,82 528,98 518,115 508,128 498,142 488,152 478,158 462,152 452,140 448,125 452,108 456,92 458,78 460,62Z"
            fill="url(#worldDots)"
          />
          {/* UK */}
          <path
            d="M438,68 L450,62 455,72 452,85 446,92 438,88 435,78Z"
            fill="url(#worldDots)"
          />
          {/* Scandinavia */}
          <path
            d="M488,22 L500,18 510,25 515,40 512,55 505,62 495,58 490,45 488,32Z"
            fill="url(#worldDots)"
          />
          {/* Africa */}
          <path
            d="M462,168 L482,162 508,168 528,178 542,195 548,215 552,240 548,268 542,295 532,318 522,340 510,358 498,372 485,382 472,378 460,365 452,345 448,320 445,292 442,265 444,238 448,215 452,195 458,180Z"
            fill="url(#worldDots)"
          />
          {/* Madagascar */}
          <path
            d="M558,335 L565,328 570,340 568,358 562,368 555,362 553,348Z"
            fill="url(#worldDots)"
          />
          {/* Russia / Northern Asia */}
          <path
            d="M535,38 L575,32 625,28 675,24 725,28 775,35 825,42 865,52 885,65 892,78 888,92 872,102 852,108 832,102 810,96 782,90 752,86 722,82 692,78 662,84 642,92 625,105 612,118 602,132 592,148 582,158 568,162 555,158 545,142 538,122 535,100 532,78 534,58Z"
            fill="url(#worldDots)"
          />
          {/* Middle East */}
          <path
            d="M555,155 L575,148 598,155 615,165 628,178 632,195 628,210 618,222 605,225 592,220 580,210 572,198 568,182 562,168Z"
            fill="url(#worldDots)"
          />
          {/* India / South Asia */}
          <path
            d="M628,180 L648,175 665,185 675,202 680,225 675,248 665,262 648,272 632,268 622,255 618,235 620,215 622,198Z"
            fill="url(#worldDots)"
          />
          {/* China / East Asia */}
          <path
            d="M698,88 L732,82 762,95 788,112 802,132 808,158 798,178 782,195 762,205 742,210 722,205 708,192 698,175 688,155 682,135 686,115 692,100Z"
            fill="url(#worldDots)"
          />
          {/* Korean Peninsula */}
          <path
            d="M810,110 L820,105 828,115 826,130 820,140 812,138 808,128 808,118Z"
            fill="url(#worldDots)"
          />
          {/* Japan */}
          <path
            d="M835,98 L845,92 855,102 854,120 848,138 840,148 832,142 828,128 830,112Z"
            fill="url(#worldDots)"
          />
          {/* Southeast Asia */}
          <path
            d="M738,218 L758,212 778,220 792,235 798,255 792,272 780,282 762,286 748,278 740,262 735,242 736,228Z"
            fill="url(#worldDots)"
          />
          {/* Indonesia */}
          <path
            d="M735,292 L755,288 775,295 795,302 810,310 800,318 782,315 762,310 745,305 738,298Z"
            fill="url(#worldDots)"
          />
          {/* Australia */}
          <path
            d="M782,332 L815,322 845,328 870,338 885,355 890,375 882,395 868,410 848,416 828,412 808,402 792,388 782,368 778,348Z"
            fill="url(#worldDots)"
          />
          {/* New Zealand */}
          <path
            d="M905,395 L912,388 918,398 916,412 910,420 904,415 902,405Z"
            fill="url(#worldDots)"
          />
        </svg>
      </div>

      {/* ── Pink/purple edge accents ── */}
      <div className="absolute top-[30%] left-0 w-40 h-80 bg-gradient-to-r from-pink-600/15 to-transparent blur-[60px] pointer-events-none" />
      <div className="absolute top-[30%] right-0 w-40 h-80 bg-gradient-to-l from-pink-600/15 to-transparent blur-[60px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* ── Pill badge ── */}
        <div className="flex items-center gap-2.5 bg-[#1a0f2e] border border-purple-500/30 rounded-full px-5 py-2 mb-8 shadow-[0_0_20px_rgba(167,139,250,0.15)]">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_6px_rgba(167,139,250,0.8)]" />
          <span className="text-zinc-300 text-sm font-semibold tracking-[0.2em] uppercase">
            Testimonials
          </span>
        </div>

        {/* ── Heading ── */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-4 leading-tight tracking-tight">
          Hear Our Users{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
            Feedback
          </span>
        </h2>
        <p className="text-zinc-400 text-base md:text-lg font-medium mb-16 text-center max-w-2xl leading-relaxed">
          Join thousands of gamers and teams achieving more with Astra.
          Here&apos;s what they&apos;re saying about our platform and
          experience.
        </p>

        {/* ══════════════════════════════════════
             Testimonial Carousel
        ══════════════════════════════════════ */}
        <div className="relative w-full flex items-center justify-center mb-12">
          {/* Cards container */}
          <div className="relative w-full flex items-center justify-center min-h-[320px] md:min-h-[300px]">
            {[-1, 0, 1].map((offset) => {
              const idx = getIdx(offset);
              const t = testimonials[idx];
              const isCenter = offset === 0;

              return (
                <div
                  key={`${idx}-${offset}`}
                  className={`
                    absolute transition-all duration-700 ease-out
                    ${
                      isCenter
                        ? "z-30 scale-100 opacity-100"
                        : "z-10 scale-[0.85] opacity-50 blur-[1px]"
                    }
                    ${offset === -1 ? "-translate-x-[75%] md:-translate-x-[110%]" : ""}
                    ${offset === 1 ? "translate-x-[75%] md:translate-x-[110%]" : ""}
                  `}
                  style={{ width: "min(420px, 85vw)" }}
                >
                  <div
                    className={`
                    relative rounded-2xl overflow-hidden
                    ${
                      isCenter
                        ? "bg-[#0d0818]/95 border border-purple-500/40 shadow-[0_0_40px_rgba(124,58,237,0.25)]"
                        : "bg-[#0d0818]/80 border border-white/[0.06] shadow-2xl"
                    }
                    p-6 md:p-8 flex flex-col items-center text-center
                  `}
                  >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 via-transparent to-transparent pointer-events-none" />

                    {/* Avatar */}
                    <div className="relative z-10 mb-4">
                      <div
                        className={`w-16 h-16 rounded-full overflow-hidden border-2 ${
                          isCenter
                            ? "border-purple-500 shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                            : "border-purple-500/30"
                        }`}
                      >
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Name & Role */}
                    <h4 className="relative z-10 text-white font-bold text-lg">
                      {t.name}
                    </h4>
                    <span className="relative z-10 text-purple-400 text-sm font-medium mb-4">
                      {t.role}
                    </span>

                    {/* Quote mark */}
                    {isCenter && (
                      <div className="absolute top-4 right-6 text-purple-500/30 text-6xl font-serif leading-none select-none pointer-events-none z-0">
                        &ldquo;&rdquo;
                      </div>
                    )}

                    {/* Quote text */}
                    <p
                      className={`relative z-10 text-sm leading-relaxed font-medium ${
                        isCenter ? "text-zinc-300" : "text-zinc-500"
                      }`}
                    >
                      {t.quote}
                    </p>

                    {/* Stars */}
                    <div className="relative z-10">
                      <Stars count={t.rating} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Navigation Arrows ── */}
        <div className="flex items-center gap-3 mb-20">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-11 h-11 rounded-full border border-white/[0.12] bg-white/[0.04] flex items-center justify-center text-zinc-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 backdrop-blur-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-11 h-11 rounded-full bg-purple-600 flex items-center justify-center text-white hover:bg-purple-500 transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.5)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* ══════════════════════════════════════
             Stats Row
        ══════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-purple-500/20 bg-[#0d0818]/80 backdrop-blur-md p-6 md:p-7 flex flex-col gap-3 group hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(124,58,237,0.15)] transition-all duration-300"
            >
              {/* Subtle top glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 via-transparent to-transparent pointer-events-none" />

              {/* Icon + Value row */}
              <div className="relative z-10 flex items-center gap-4">
                {stat.icon}
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  {stat.value}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300 ">
                    {stat.label}
                  </span>
                </h3>
              </div>

              {/* Description */}
              <p className="relative z-10 text-zinc-400 text-sm font-medium leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
