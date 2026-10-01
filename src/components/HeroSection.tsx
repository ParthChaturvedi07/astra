"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";

// Avatar placeholder data for "Trusted by" section
const avatars = [
  { id: 1, color: "#7C3AED" },
  { id: 2, color: "#9333EA" },
  { id: 3, color: "#A855F7" },
  { id: 4, color: "#6D28D9" },
  { id: 5, color: "#8B5CF6" },
];

export default function HeroSection() {
  const characterRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background ASTRA text: starts scaled-up, animates to normal
      gsap.fromTo(
        ".hero-bg-text",
        {
          opacity: 0,
          scale: 1.4,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.1,
        }
      );

      // Character: rises from bottom
      gsap.fromTo(
        ".hero-character",
        {
          y: 200,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          delay: 0.3,
        }
      );

      // Left content fade-in
      gsap.fromTo(
        ".hero-left-content",
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", delay: 0.8 }
      );

      // Right tagline stagger
      gsap.fromTo(
        ".hero-tagline-word",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.9,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      {/* ── Background giant ASTRA text ── */}
      <div ref={bgTextRef} className="hero-bg-text-wrapper">
        <span className="hero-bg-text">ASTRA</span>
      </div>

      {/* ── Secondary background text lines ── */}
      <div className="hero-bg-lines">
        <span className="hero-bg-line hero-bg-line-left">FOR THE</span>
        <span className="hero-bg-line hero-bg-line-right">
          PLAY
          <br />
          COMPETE
          <br />
          BELONG
        </span>
      </div>

      {/* ── Corner fog: bottom-left (female char + text) and bottom-right (skull char + tagline) ── */}
      <div className="char-fog char-fog-left"  aria-hidden="true" />
      <div className="char-fog char-fog-right" aria-hidden="true" />

      {/* ── Mobile-only: dark purple bottom fog over the lower hero area ── */}
      <div className="hero-mobile-fog" aria-hidden="true" />

      {/* ── Center character image (on top of ASTRA text) ── */}
      <div ref={characterRef} className="hero-character">
        <Image
          src="/images/Hero_character.png"
          alt="Astra Game Characters"
          width={900}
          height={700}
          priority
          className="hero-character-img"
        />
      </div>

      {/* ── Left content ── */}
      <div className="hero-left-content">
        <p className="hero-description">
          ASTRA is a next-generation gaming tournament platform where players
          compete, climb leaderboards, and win real rewards across their favorite
          games.
        </p>

        <div className="hero-cta-row">
          <motion.button
            className="hero-cta-btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            GET STARTED
          </motion.button>
          <motion.button
            className="hero-cta-icon"
            whileHover={{ scale: 1.1, rotate: 45 }}
            whileTap={{ scale: 0.95 }}
          >
            ↗
          </motion.button>
        </div>

        <div className="hero-trust">
          <div className="hero-avatars">
            {avatars.map((avatar, i) => (
              <div
                key={avatar.id}
                className="hero-avatar"
                style={{
                  background: `radial-gradient(circle at 35% 35%, #c084fc, ${avatar.color})`,
                  marginLeft: i === 0 ? "0" : "-10px",
                  zIndex: avatars.length - i,
                }}
              />
            ))}
          </div>
          <div>
            <p className="hero-trust-text">Trusted by 100K+</p>
            <p className="hero-trust-sub">players worldwide</p>
          </div>
        </div>
      </div>

      {/* ── Right tagline (bottom-right) ── */}
      <div className="hero-right-tagline">
        {["PLAY", "COMPETE", "BELONG"].map((word, i) => (
          <span
            key={word}
            className={`hero-tagline-word ${i === 2 ? "hero-tagline-bold" : ""}`}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}
