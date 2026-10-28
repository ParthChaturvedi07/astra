"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DottedPatch from "@/components/DottedPatch";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const contactChannels = [
  {
    num: "01",
    badge: "24/7 SUPPORT",
    title: "EMAIL US",
    desc: "Drop us a message anytime — our support team typically responds within 2 hours during business days.",
    value: "support@astra.gg",
    href: "mailto:support@astra.gg",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    variant: "purple",
  },
  {
    num: "02",
    badge: "LIVE CHAT",
    title: "JOIN DISCORD",
    desc: "Connect with fellow gamers, get instant help from community moderators, and stay updated on tournaments.",
    value: "discord.gg/astra",
    href: "https://discord.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    variant: "purple-glow",
  },
  {
    num: "03",
    badge: "IST TIMEZONE",
    title: "SUPPORT HOURS",
    desc: "Our dedicated team is available during business hours to handle account issues, disputes, and technical problems.",
    value: "Mon – Sat, 10am – 7pm IST",
    href: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    variant: "purple-bright",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header tag
      gsap.fromTo(
        ".ct-header-tag",
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".ct-header", start: "top 85%" },
        }
      );

      // Main Heading
      gsap.fromTo(
        ".ct-title",
        { opacity: 0, y: 45 },
        {
          opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: ".ct-header", start: "top 82%" },
        }
      );

      // Lead Paragraph
      gsap.fromTo(
        ".ct-lead",
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.7, delay: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".ct-header", start: "top 80%" },
        }
      );

      // Channel cards stagger
      gsap.fromTo(
        ".ct-channel-card",
        { opacity: 0, x: -40, scale: 0.96 },
        {
          opacity: 1, x: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".ct-channels-list", start: "top 82%" },
        }
      );

      // Form card
      gsap.fromTo(
        ".ct-form-stage",
        { opacity: 0, y: 60, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".ct-form-stage", start: "top 82%" },
        }
      );

      // CTA group
      gsap.fromTo(
        ".ct-cta-group",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, delay: 0.25, ease: "power3.out",
          scrollTrigger: { trigger: ".ct-cta-group", start: "top 88%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="ct-section" id="contact">
      {/* Background Giant Text */}
      <div className="ct-bg-text-wrapper" aria-hidden="true">
        <span className="ct-bg-text-line">GET IN</span>
        <span className="ct-bg-text-line">TOUCH</span>
      </div>

      {/* Background Ambient Radial Lighting */}
      <div className="ct-ambient-light" aria-hidden="true" />

      {/* Dotted Patches */}
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
        bottom="10%"
        right="16%"
        width={320}
        height={260}
        rotate={14}
        maskShape="circle"
        dotColor="rgba(124, 58, 237, 0.35)"
      />

      <div className="ct-container">
        {/* ═══════════ MAIN 2-COLUMN STAGE ═══════════ */}
        <div className="ct-stage">
          {/* ── Left Column: Header, Contact Channels, CTA ── */}
          <div className="ct-left">
            {/* Header */}
            <div className="ct-header">
              <div className="ct-header-tag">
                <span className="ct-tag-text">REACH OUT TO US</span>
                <div className="ct-tag-line" />
              </div>

              <h2 className="ct-title">
                <span>WE&apos;RE HERE TO</span>
                <span className="ct-grad-text">HELP YOU.</span>
              </h2>

              <p className="ct-lead">
                Have a question, feedback, or need support? Our team is always
                ready to assist — whether it&apos;s about tournaments, your account,
                or anything else on Astra.
              </p>
            </div>

            {/* Contact Channel Cards */}
            <div className="ct-channels-list">
              {contactChannels.map((ch, idx) => (
                <div
                  key={ch.num}
                  className={`ct-channel-card ct-channel-${ch.variant}`}
                >
                  {/* Rail / indicator */}
                  <div className="ct-channel-rail">
                    <div className="ct-channel-icon-box">
                      {ch.icon}
                    </div>
                    {idx < contactChannels.length - 1 && (
                      <div className="ct-channel-connector" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="ct-channel-body">
                    <div className="ct-channel-meta">
                      <span className="ct-channel-num">{ch.num}</span>
                      <span className="ct-channel-badge">{ch.badge}</span>
                    </div>
                    <h3 className="ct-channel-title">{ch.title}</h3>
                    <p className="ct-channel-desc">{ch.desc}</p>
                    {ch.href ? (
                      <a href={ch.href} className="ct-channel-link">
                        {ch.value}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7M7 7h10v10" />
                        </svg>
                      </a>
                    ) : (
                      <span className="ct-channel-value">{ch.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Group */}
            <div className="ct-cta-group">

              {/* Trust Badges Bar */}
              <div className="ct-trust-bar">
                <div className="ct-trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Fast Resolution</span>
                </div>
                <div className="ct-trust-divider" />
                <div className="ct-trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>Secure Communication</span>
                </div>
                <div className="ct-trust-divider" />
                <div className="ct-trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>No Spam, Ever</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Contact Form Card ── */}
          <div className="ct-form-stage">
            {/* Ambient glows behind the form */}
            <div className="ct-form-backdrop-glow" aria-hidden="true">
              <div className="ct-glow-orb ct-glow-purple" />
              <div className="ct-glow-orb ct-glow-violet" />
            </div>

            {/* Form Card */}
            <div className="ct-form-card">
              {/* Top bar */}
              <div className="ct-form-top-bar">
                <div className="ct-form-dots">
                  <span className="ct-dot ct-dot-red" />
                  <span className="ct-dot ct-dot-yellow" />
                  <span className="ct-dot ct-dot-green" />
                </div>
                <span className="ct-form-tab">contact_form.tsx</span>
              </div>

              {/* Inner gradient */}
              <div className="ct-form-inner-glow" />

              <div className="ct-form-fields">
                {/* Name */}
                <div className="ct-field">
                  <label className="ct-field-label">Your Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Arjun Sharma"
                    className="ct-field-input"
                  />
                </div>

                {/* Email */}
                <div className="ct-field">
                  <label className="ct-field-label">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    className="ct-field-input"
                  />
                </div>

                {/* Subject */}
                <div className="ct-field ct-field-full">
                  <label className="ct-field-label">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Tournament issue, account query..."
                    className="ct-field-input"
                  />
                </div>

                {/* Message */}
                <div className="ct-field ct-field-full">
                  <label className="ct-field-label">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="ct-field-textarea"
                  />
                </div>

                {/* Submit */}
                <div className="ct-field ct-field-full ct-field-submit">
                  <button className="ct-submit-btn">
                    <span>SEND MESSAGE</span>
                    <div className="ct-submit-arrow">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
