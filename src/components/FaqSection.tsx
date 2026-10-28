"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DottedPatch from "@/components/DottedPatch";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    question: "How do I join a tournament on Astra?",
    answer:
      "Download the Astra app, create your profile, and browse the Tournaments tab. Pick the game, format (Solo, Duo, Squad, or Clash Squad), pay the entry fee, and you're in. You'll get a room code 15 minutes before the match starts.",
  },
  {
    question: "What games are supported on the platform?",
    answer:
      "Currently we support BGMI, Free Fire, and COD Mobile with fully automated bracket and lobby systems. New titles are added every quarter based on community votes — keep an eye on our Discord for upcoming announcements.",
  },
  {
    question: "How does the points and withdrawal system work?",
    answer:
      "Every kill, placement, and tournament win earns you Astra Points. Points accumulate in your in-app wallet and can be converted to Indian Rupees at a rate of 100 Points = ₹10. Withdrawals are instant via UPI to any bank account with zero processing fees.",
  },
  {
    question: "Is Astra available on both Android and iOS?",
    answer:
      "Astra is available on Android via the Google Play Store and as a direct APK download. iOS support is currently in closed beta — join the waitlist on our website or Discord to get early access.",
  },
  {
    question: "Are the tournaments fair and cheat-free?",
    answer:
      "Absolutely. We use a multi-layered anti-cheat system including device-level detection, replay analysis, and manual review by our moderation team. Cheaters are permanently banned, and affected match results are recalculated to ensure fair payouts.",
  },
  {
    question: "What are the entry fees and prize structures?",
    answer:
      "Entry fees range from Free to ₹100 depending on the tournament tier. Prize pools are clearly shown before you join and are distributed within minutes of match completion. Premium tournaments feature guaranteed prize pools up to ₹50,000.",
  },
];

/* ── Accordion Item ── */
function FaqItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const inner = innerRef.current;
    if (!content || !inner) return;

    if (isOpen) {
      // measure actual height
      const h = inner.scrollHeight;
      gsap.to(content, {
        height: h,
        opacity: 1,
        duration: 0.55,
        ease: "power3.out",
      });
    } else {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [isOpen]);

  return (
    <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
      {/* Animated border glow line */}
      <div className="faq-item-glow" />

      <button
        className="faq-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
      >
        {/* Number */}
        <span className="faq-num">{String(index + 1).padStart(2, "0")}</span>

        {/* Question text */}
        <span className="faq-question">{faq.question}</span>

        {/* Animated icon */}
        <div className={`faq-icon-wrap ${isOpen ? "faq-icon-wrap--open" : ""}`}>
          <div className="faq-icon">
            <span className="faq-icon-h" />
            <span className={`faq-icon-v ${isOpen ? "faq-icon-v--open" : ""}`} />
          </div>
        </div>
      </button>

      {/* Collapsible answer */}
      <div
        ref={contentRef}
        id={`faq-panel-${index}`}
        className="faq-panel"
        role="region"
        aria-labelledby={`faq-trigger-${index}`}
        style={{ height: 0, opacity: 0, overflow: "hidden" }}
      >
        <div ref={innerRef} className="faq-answer">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = useCallback(
    (idx: number) => setOpenIndex((prev) => (prev === idx ? null : idx)),
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header tag
      gsap.fromTo(
        ".faq-header-tag",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-header", start: "top 85%" },
        }
      );

      // Title
      gsap.fromTo(
        ".faq-title",
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-header", start: "top 82%" },
        }
      );

      // Lead
      gsap.fromTo(
        ".faq-lead",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-header", start: "top 80%" },
        }
      );

      // Illustration / right decorative element
      gsap.fromTo(
        ".faq-visual",
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-visual", start: "top 85%" },
        }
      );

      // FAQ items staggered entrance
      gsap.fromTo(
        ".faq-item",
        { opacity: 0, y: 35, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-list", start: "top 84%" },
        }
      );

      // CTA card
      gsap.fromTo(
        ".faq-cta-card",
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-cta-card", start: "top 88%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="faq-section" id="faq">
      {/* Giant background text */}
      <div className="faq-bg-text-wrapper" aria-hidden="true">
        <span className="faq-bg-text-line">FREQUENTLY</span>
        <span className="faq-bg-text-line">ASKED</span>
      </div>

      {/* Ambient lighting */}
      <div className="faq-ambient-light" aria-hidden="true" />

      {/* Dotted patches */}
      <DottedPatch
        top="15%"
        right="0%"
        width={400}
        height={320}
        rotate={12}
        maskShape="ellipse"
        glow
        glowColor="rgba(124, 58, 237, 0.14)"
        animate="float"
      />
      <DottedPatch
        top="55%"
        left="0%"
        width={360}
        height={280}
        rotate={-10}
        maskShape="fade-left"
        dotColor="rgba(192, 132, 252, 0.28)"
        animate="pulse"
      />
      <DottedPatch
        bottom="8%"
        right="25%"
        width={300}
        height={240}
        rotate={8}
        maskShape="circle"
        dotColor="rgba(124, 58, 237, 0.3)"
      />

      <div className="faq-container">
        {/* ═══════════ TOP ROW: Heading + Visual ═══════════ */}
        <div className="faq-top-stage">
          {/* Left — heading block */}
          <div className="faq-header">
            <div className="faq-header-tag">
              <span className="faq-tag-text">FAQ</span>
              <div className="faq-tag-line" />
            </div>

            <h2 className="faq-title">
              <span>GOT</span>
              <span className="faq-grad-text">QUESTIONS?</span>
            </h2>

            <p className="faq-lead">
              Everything you need to know about competing, earning, and
              withdrawing on Astra — answered.
            </p>
          </div>

          {/* Right — decorative visual */}
          <div className="faq-visual">
            <div className="faq-visual-card">
              {/* Floating question mark orbs */}
              <div className="faq-orb faq-orb-1">?</div>
              <div className="faq-orb faq-orb-2">?</div>
              <div className="faq-orb faq-orb-3">?</div>

              {/* Central icon */}
              <div className="faq-visual-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
              </div>

              {/* Stat pills */}
              <div className="faq-stat-pill faq-stat-pill-1">
                <span className="faq-stat-dot" />
                <span>6 Topics</span>
              </div>
              <div className="faq-stat-pill faq-stat-pill-2">
                <span className="faq-stat-dot faq-stat-dot--green" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════ ACCORDION LIST ═══════════ */}
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>

        {/* ═══════════ BOTTOM CTA CARD ═══════════ */}
        <div className="faq-cta-card">
          <div className="faq-cta-glow" />
          <div className="faq-cta-content">
            <div className="faq-cta-left">
              <h3 className="faq-cta-title">Still have questions?</h3>
              <p className="faq-cta-desc">
                Can&apos;t find what you&apos;re looking for? Our team is happy to help.
              </p>
            </div>
            <div className="faq-cta-right">
              <a href="#contact" className="faq-cta-btn">
                <span>CONTACT US</span>
                <div className="faq-cta-btn-arrow">
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
              <a href="https://discord.com" className="faq-cta-discord">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>Join Discord</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
