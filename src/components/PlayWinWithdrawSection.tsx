"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DottedPatch from "@/components/DottedPatch";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    num: "01",
    badge: "ANY FORMAT",
    title: "WIN TOURNAMENTS",
    desc: "Place high in Solo, Duo, Clash Squad or Classic matches across your favorite competitive games.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
        <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
      </svg>
    ),
    variant: "purple",
  },
  {
    num: "02",
    badge: "INSTANT CREDIT",
    title: "EARN ASTRA POINTS",
    desc: "Every kill, placement, and tournament victory automatically accumulates points in your Astra wallet.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M9 9.5a2.8 2.8 0 0 1 2.8-2.5h.4a2.8 2.8 0 0 1 0 5.6h-.4a2.8 2.8 0 0 0 0 5.6h.4a2.8 2.8 0 0 0 2.8-2.5" />
      </svg>
    ),
    variant: "purple-glow",
  },
  {
    num: "03",
    badge: "UNDER 60 SEC",
    title: "CONVERT & WITHDRAW",
    desc: "Convert your earned points directly to Indian rupees and withdraw straight to your bank account via UPI.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18" />
      </svg>
    ),
    variant: "purple-bright",
  },
];

export default function PlayWinWithdrawSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header tag
      gsap.fromTo(
        ".pww-header-tag",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pww-header", start: "top 85%" },
        }
      );

      // Main Heading
      gsap.fromTo(
        ".pww-title",
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pww-header", start: "top 82%" },
        }
      );

      // Lead Paragraph
      gsap.fromTo(
        ".pww-lead",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pww-header", start: "top 80%" },
        }
      );

      // Step cards stagger
      gsap.fromTo(
        ".pww-step-card",
        { opacity: 0, x: -40, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pww-steps-list", start: "top 82%" },
        }
      );

      // CTA row & trust badges
      gsap.fromTo(
        ".pww-cta-group",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.25,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pww-cta-group", start: "top 88%" },
        }
      );

      // Phone stage reveal
      gsap.fromTo(
        ".pww-phone-stage",
        { opacity: 0, y: 60, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pww-phone-stage", start: "top 82%" },
        }
      );

      // Payout cards stagger
      gsap.fromTo(
        ".pww-payout-card",
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pww-payouts", start: "top 88%" },
        }
      );

      // Floating gentle animation for phone
      if (phoneRef.current) {
        gsap.to(phoneRef.current, {
          y: -12,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pww-section" id="play-win-withdraw">
      {/* Background Giant Text matching TournamentFormats & HowToPlay */}
      <div className="pww-bg-text-wrapper" aria-hidden="true">
        <span className="pww-bg-text-line">PLAY</span>
        <span className="pww-bg-text-line">WIN</span>
        <span className="pww-bg-text-line">WITHDRAW</span>
      </div>

      {/* Background Ambient Radial Lighting */}
      <div className="pww-ambient-light" aria-hidden="true" />

      {/* Dotted Patches matching Astra Theme */}
      <DottedPatch
        top="30%"
        right="0%"
        width={420}
        height={320}
        rotate={10}
        maskShape="ellipse"
        glow
        glowColor="rgba(124, 58, 237, 0.16)"
        animate="float"
      />
      <DottedPatch
        top="42%"
        left="2%"
        width={360}
        height={300}
        rotate={-8}
        maskShape="soft"
        dotColor="rgba(192, 132, 252, 0.3)"
        animate="pulse"
      />
      <DottedPatch
        top="27%"
        right="34%"
        width={320}
        height={260}
        rotate={14}
        maskShape="circle"
        dotColor="rgba(124, 58, 237, 0.35)"
      />
      <DottedPatch
        bottom="27%"
        right="16%"
        width={320}
        height={260}
        rotate={14}
        maskShape="circle"
        dotColor="rgba(124, 58, 237, 0.35)"
      />

      <div className="pww-container">
        {/* ═══════════ MAIN 2-COLUMN STAGE ═══════════ */}
        <div className="pww-stage">
          {/* ── Left Column: Header, Progression, CTA ── */}
          <div className="pww-left">
            {/* Header */}
            <div className="pww-header">
              <div className="pww-header-tag">
                <span className="pww-tag-text">REWARDS &amp; CASH OUT</span>
                <div className="pww-tag-line" />
              </div>

              <h2 className="pww-title">
                <span>YOUR WINS ARE WORTH</span>
                <span className="pww-grad-text">REAL MONEY.</span>
              </h2>

              <p className="pww-lead">
                Compete in daily tournaments, rack up points on the leaderboard,
                and convert in-game victories directly into real cash transferred
                straight to your bank account.
              </p>
            </div>

            {/* Step Progression Cards */}
            <div className="pww-steps-list">
              {steps.map((step, idx) => (
                <div
                  key={step.num}
                  className={`pww-step-card pww-step-${step.variant}`}
                >
                  {/* Step rail / indicator */}
                  <div className="pww-step-rail">
                    <div className="pww-step-icon-box">
                      {step.icon}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="pww-step-connector" />
                    )}
                  </div>

                  {/* Step content */}
                  <div className="pww-step-body">
                    <div className="pww-step-meta">
                      <span className="pww-step-num">{step.num}</span>
                      <span className="pww-step-badge">{step.badge}</span>
                    </div>
                    <h3 className="pww-step-title">{step.title}</h3>
                    <p className="pww-step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Group */}
            <div className="pww-cta-group">
              <div className="pww-cta-row">
                <a href="#home" className="pww-btn-primary">
                  <span>START EARNING</span>
                  <div className="pww-btn-arrow">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </div>
                </a>

                {/* Conversion Rate Pill */}
                <div className="pww-rate-pill">
                  <span className="pww-live-dot" />
                  <span className="pww-rate-highlight">100 PTS = ₹10</span>
                  <span className="pww-rate-sub">Instant Conversion</span>
                </div>
              </div>

              {/* Trust Badges Bar */}
              <div className="pww-trust-bar">
                <div className="pww-trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Instant UPI Settlement</span>
                </div>
                <div className="pww-trust-divider" />
                <div className="pww-trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>100% Verified Transfers</span>
                </div>
                <div className="pww-trust-divider" />
                <div className="pww-trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>Zero Processing Fees</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Phone Showcase ── */}
          <div className="pww-phone-stage">
            {/* Ambient glows behind the device image */}
            <div className="pww-phone-backdrop-glow" aria-hidden="true">
              <div className="pww-glow-orb pww-glow-purple" />
              <div className="pww-glow-orb pww-glow-violet" />
            </div>

            {/* Animated phone container */}
            <div ref={phoneRef} className="pww-phone-wrap">
              <Image
                src="/images/rewardssection/rewards-phone.png"
                alt="Astra Wallet – Points balance, recent activity and UPI withdrawal"
                width={620}
                height={720}
                className="pww-phone-img"
                priority
              />
            </div>
          </div>
        </div>

        {/* ═══════════ PAYOUT METHODS SHOWCASE ═══════════ */}
        <div className="pww-payouts">
          {/* Card 1: UPI Bank Transfer */}
          <div className="pww-payout-card pww-payout-upi">
            <div className="pww-payout-glow" />

            <div className="pww-payout-top">
              <div className="pww-payout-logo-box pww-payout-logo-upi">
                <Image
                  src="/images/howtoplay/upi.png"
                  alt="UPI Bank Transfer"
                  width={68}
                  height={32}
                  style={{ objectFit: "contain" }}
                />
              </div>

              <div className="pww-payout-badges">
                <span className="pww-badge-purple">DIRECT CASHOUT</span>
                <span className="pww-badge-micro">⚡ Under 60s</span>
              </div>
            </div>

            <div className="pww-payout-info">
              <h3 className="pww-payout-name">UPI Bank Transfer</h3>
              <p className="pww-payout-desc">
                Withdraw your match winnings straight to any Indian bank account
                with zero convenience charges or waiting period.
              </p>
            </div>

            <div className="pww-payout-footer">
              <div className="pww-payout-features">
                <span className="pww-payout-pill">GPay</span>
                <span className="pww-payout-pill">PhonePe</span>
                <span className="pww-payout-pill">Paytm</span>
                <span className="pww-payout-pill">All Banks</span>
              </div>

              <div className="pww-payout-action">
                <span>Instant Transfer</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 2: Google Play Voucher */}
          <div className="pww-payout-card pww-payout-play">
            <div className="pww-payout-glow" />

            <div className="pww-payout-top">
              <div className="pww-payout-logo-box pww-payout-logo-play">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5Z" fill="#4285F4" />
                  <path d="M16.81 15.12L6.05 21.34L13.69 12L16.81 15.12Z" fill="#EA4335" />
                  <path d="M20.16 10.81C20.5 11.08 20.5 11.64 20.5 12C20.5 12.36 20.38 12.65 20.16 12.87L17.65 14.32L14.28 12L17.65 9.68L20.16 10.81Z" fill="#FBBC04" />
                  <path d="M6.05 2.66L16.81 8.88L13.69 12L6.05 2.66Z" fill="#34A853" />
                </svg>
              </div>

              <div className="pww-payout-badges">
                <span className="pww-badge-purple">DIGITAL REWARD</span>
                <span className="pww-badge-micro">🎮 Direct Code</span>
              </div>
            </div>

            <div className="pww-payout-info">
              <h3 className="pww-payout-name">Google Play Voucher</h3>
              <p className="pww-payout-desc">
                Redeem points for official Google Play redeem codes to unlock
                in-game diamonds, season passes, and premium crates.
              </p>
            </div>

            <div className="pww-payout-footer">
              <div className="pww-payout-features">
                <span className="pww-payout-pill">Diamonds</span>
                <span className="pww-payout-pill">Royal Pass</span>
                <span className="pww-payout-pill">No Expiry</span>
              </div>

              <div className="pww-payout-action">
                <span>Redeem Code</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
