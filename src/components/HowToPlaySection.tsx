"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DottedPatch from "@/components/DottedPatch";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Step Cards Data ── */
const steps = [
  {
    id: "01",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    title: (
      <>
        Link Your<br />
        <span className="htp-step-title-highlight">Game Account</span>
      </>
    ),
    desc: "Connect your in-game username to your Astra profile for verification.",
    // Mini UI: game list
    miniUI: "game-links",
  },
  {
    id: "02",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: (
      <>
        Get Room ID &amp;<br />
        <span className="htp-step-title-highlight">Password</span>
      </>
    ),
    desc: "Receive the Room ID and Password 15 minutes before your scheduled match time.",
    miniUI: "lobby-details",
  },
  {
    id: "03",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 9 7 12 7s5-3 7.5-3a2.5 2.5 0 0 1 0 5H18" />
        <path d="M18 15h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M6 15H4.5a2.5 2.5 0 0 1 0 5H6" />
        <path d="M6 9v12" /><path d="M18 9v6" />
      </svg>
    ),
    title: (
      <>
        Play &amp; <span className="htp-step-title-highlight">Compete</span>
      </>
    ),
    desc: "Join the room, follow the rules, and give your best. Win points, climb the leaderboard, and earn rewards.",
    miniUI: "compete",
  },
];

/* ── Stats Bar Data ── */
const stats = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    value: "100K+",
    label: "Verified Players",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 9 7 12 7s5-3 7.5-3a2.5 2.5 0 0 1 0 5H18" />
        <path d="M18 15h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M6 15H4.5a2.5 2.5 0 0 1 0 5H6" />
        <path d="M6 9v12" /><path d="M18 9v6" />
      </svg>
    ),
    value: "500+",
    label: "Successful Tournaments",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
        <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
      </svg>
    ),
    value: "99.9%",
    label: "Fair Play Rate",
  },
];



export default function HowToPlaySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".htp-header-label",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".htp-header",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".htp-header-title",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".htp-header",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".htp-header-desc",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".htp-header",
            start: "top 78%",
          },
        }
      );

      // Step cards stagger
      gsap.fromTo(
        ".htp-step-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".htp-cards-grid",
            start: "top 82%",
          },
        }
      );

      // Reward card
      gsap.fromTo(
        ".htp-reward-card",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".htp-reward-card",
            start: "top 85%",
          },
        }
      );

      // Stats bar
      gsap.fromTo(
        ".htp-stats-bar",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".htp-stats-bar",
            start: "top 90%",
          },
        }
      );

      // Reveal background characters from bottom on reaching the section
      gsap.fromTo(
        ".htp-bg-char",
        {
          opacity: 0,
          y: 180,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="htp-section" id="how-to-play">
      {/* Background Dotted Patches */}
      <DottedPatch
        top="4%"
        left="1%"
        width={450}
        height={280}
        rotate={6}
        maskShape="ellipse"
        glow
        glowColor="rgba(124, 58, 237, 0.16)"
        animate="float"
      />
      <DottedPatch
        top="38%"
        left="8%"
        width={340}
        height={350}
        rotate={-12}
        maskShape="soft"
        dotColor="rgba(192, 132, 252, 0.35)"
      />
      <DottedPatch
        top="45%"
        right="24%"
        width={310}
        height={270}
        rotate={14}
        maskShape="circle"
        dotColor="rgba(124, 58, 237, 0.4)"
        spacing={18}
      />
      <DottedPatch
        top="22%"
        right="-2%"
        width={420}
        height={330}
        rotate={-8}
        maskShape="fade-right"
        dotColor="rgba(167, 139, 250, 0.3)"
        animate="pulse"
      />
      <DottedPatch
        bottom="4%"
        left="5%"
        width={360}
        height={220}
        rotate={-7}
        maskShape="pill"
        glow
        glowColor="rgba(167, 139, 250, 0.12)"
        animate="float"
      />

      {/* ── Background Character ── */}
      <div className="htp-bg-char-wrapper">
        <div className="htp-bg-char">
          <Image
            src="/images/howtoplay/bg_char.png"
            alt="Game Characters"
            width={750}
            height={750}
            className="htp-bg-char-img"
          />
        </div>
      </div>

      {/* ── Background "PLAY COMPETE BELONG" text ── */}
      <div className="htp-bg-text-wrapper" aria-hidden="true">
        <span className="htp-bg-text-line">PLAY</span>
        <span className="htp-bg-text-line">COMPETE</span>
        <span className="htp-bg-text-line">BELONG</span>
      </div>

      {/* ── Section Content ── */}
      <div className="htp-content">

        {/* ── Header ── */}
        <div className="htp-header">
          <div className="htp-header-label">
            <span className="htp-label-text">HOW IT WORKS</span>
            <div className="htp-label-line" />
          </div>

          <h2 className="htp-header-title">
            HOW TO {" "} <span className="htp-title-accent">PLAY</span>
          </h2>

          <p className="htp-header-desc">
            Getting started is easy. Link your game account, receive the room details before
            the match, and jump in. We ensure a fair and competitive environment for
            everyone with strict rules and active moderation.
          </p>
        </div>

        {/* ── Cards Grid: 3 steps + reward card ── */}
        <div className="htp-cards-grid">
          {steps.map((step) => (
            <div key={step.id} className="htp-step-card">
              {/* Gradient top edge glow */}
              <div className="htp-card-glow" />

              {/* Step Number */}
              <div className="htp-step-number">{step.id}</div>

              {/* Icon */}
              <div className="htp-step-icon">{step.icon}</div>

              {/* Title */}
              <h3 className="htp-step-title">{step.title}</h3>

              {/* Description */}
              <p className="htp-step-desc">{step.desc}</p>

              {/* Mini UI inside card */}
              {step.miniUI === "game-links" && (
                <div className="htp-mini-ui htp-mini-game-links">
                  <div className="htp-mini-label">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    Link Game Account
                  </div>
                  <div className="htp-gamelink-visual">
                    <Image
                      src="/images/howtoplay/gamelink.png"
                      alt="Link Game Account"
                      width={300}
                      height={150}
                      className="htp-gamelink-img"
                    />
                  </div>
                </div>
              )}

              {step.miniUI === "lobby-details" && (
                <div className="htp-mini-ui htp-mini-lobby">
                  <div className="htp-lobby-header">
                    <span className="htp-lobby-title">Match Lobby Details</span>
                    <span className="htp-lobby-live">
                      <span className="htp-live-dot" />
                      LIVE IN 15 MINS
                    </span>
                  </div>
                  <div className="htp-lobby-fields">
                    <div className="htp-lobby-field">
                      <span className="htp-field-label">Room ID</span>
                      <div className="htp-field-value">
                        <span>8754213</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                      </div>
                    </div>
                    <div className="htp-lobby-field">
                      <span className="htp-field-label">Password</span>
                      <div className="htp-field-value">
                        <span>Astra2026</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step.miniUI === "compete" && (
                <div className="htp-mini-ui htp-mini-compete">
                  {/* Subtle background image overlay for the compete card */}
                  <div className="htp-compete-visual">
                    <Image
                      src="/images/tournamentformat/squad.png"
                      alt="Compete"
                      width={200}
                      height={140}
                      className="htp-compete-img"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* ── Reward Redemption Card ── */}
          <div className="htp-reward-card">
            <div className="htp-card-glow" />

            <div className="htp-reward-header">
              <span className="htp-reward-label">REWARD REDEMPTION</span>
              <p className="htp-reward-sub">Turn your wins into real rewards.</p>
            </div>

            <div className="htp-reward-options">
              {/* UPI Payout */}
              <div className="htp-reward-option">
                <div className="htp-reward-icon-wrapper htp-reward-upi">
                 <Image src={'/images/howtoplay/upi.png'} alt="UPI" width={20} height={20} className="htp-upi-icon" />
                </div>
                <div className="htp-reward-info">
                  <span className="htp-reward-name">UPI Payout</span>
                  <span className="htp-reward-detail">Directly to your bank account.</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="htp-reward-chevron"><path d="m9 18 6-6-6-6" /></svg>
              </div>

              {/* Google Play Voucher */}
              <div className="htp-reward-option">
                <div className="htp-reward-icon-wrapper htp-reward-gplay">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5Z" fill="#4285F4"/>
                    <path d="M16.81 15.12L6.05 21.34L13.69 12L16.81 15.12Z" fill="#EA4335"/>
                    <path d="M20.16 10.81C20.5 11.08 20.5 11.64 20.5 12C20.5 12.36 20.38 12.65 20.16 12.87L17.65 14.32L14.28 12L17.65 9.68L20.16 10.81Z" fill="#FBBC04"/>
                    <path d="M6.05 2.66L16.81 8.88L13.69 12L6.05 2.66Z" fill="#34A853"/>
                  </svg>
                </div>
                <div className="htp-reward-info">
                  <span className="htp-reward-name">Google Play Voucher</span>
                  <span className="htp-reward-detail">Redeem for your favourite apps &amp; games.</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="htp-reward-chevron"><path d="m9 18 6-6-6-6" /></svg>
              </div>
            </div>

            {/* Redeem Now Button */}
            <button className="htp-redeem-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
                <path d="M12 12V3" />
                <rect x="2" y="7" width="20" height="5" rx="1" />
              </svg>
              Redeem Now
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <div className="htp-stats-bar">
          {/* Shield badge */}
          <div className="htp-stats-badge">
            <div className="htp-shield-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="htp-badge-text">
              <span className="htp-badge-title">A SECURE &amp; FAIR</span>
              <span className="htp-badge-sub">TOURNAMENT EXPERIENCE</span>
            </div>
          </div>

          {/* Stat Items */}
          <div className="htp-stats-items">
            {stats.map((stat, idx) => (
              <div key={idx} className="htp-stat-item">
                <div className="htp-stat-icon">{stat.icon}</div>
                <div className="htp-stat-info">
                  <span className="htp-stat-value">{stat.value}</span>
                  <span className="htp-stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
