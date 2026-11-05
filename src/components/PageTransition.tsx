"use client";

import { useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import PageLoader from "./PageLoader";

/**
 * Renders the loading overlay fixed on top of the page.
 * Does NOT wrap children — it's placed as a sibling in layout.tsx.
 * Once the loader exits it fires the hero entrance animations.
 */
export default function PageTransition() {
  // Start with true on both SSR and initial client hydration so the loader
  // is present in the initial HTML and covers the screen from frame 0.
  const [show, setShow] = useState(true);

  useEffect(() => {
    // If the user has already visited in this session, unmount the loader immediately.
    // (The blocking script in <head> already hid it with display:none before paint,
    // so this unmounts it cleanly without any flash.)
    if (sessionStorage.getItem("astra_loaded")) {
      setShow(false);
    }
  }, []);

  const handleDone = useCallback(() => {
    try {
      sessionStorage.setItem("astra_loaded", "1");
    } catch {}
    setShow(false);
    // Remove the skip-loader-style if one was appended
    document.getElementById("astra-skip-loader-style")?.remove();
    // Fire the hero entrance animations
    requestAnimationFrame(() => requestAnimationFrame(fireHeroEntrance));
  }, []);

  if (!show) return null;
  return <PageLoader onDone={handleDone} />;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Hero entrance triggered after loader exits                                  */
/* ─────────────────────────────────────────────────────────────────────────── */
function fireHeroEntrance() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(
      [".hero-bg-text", ".hero-character", ".hero-left-content", ".hero-tagline-word"],
      { clearProps: "all" }
    );
    return;
  }

  // Force reset so tweens replay cleanly
  gsap.set(".hero-bg-text",      { opacity: 0, scale: 1.4 });
  gsap.set(".hero-character",    { opacity: 0, y: 180 });
  gsap.set(".hero-left-content", { opacity: 0, x: -40 });
  gsap.set(".hero-tagline-word", { opacity: 0, x: 40 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(".hero-bg-text", { opacity: 1, scale: 1, duration: 1.1 });
  tl.to(".hero-character",    { y: 0, opacity: 1, duration: 1.3, ease: "power4.out" }, "-=0.75");
  tl.to(".hero-left-content", { opacity: 1, x: 0, duration: 0.85 }, "-=0.75");
  tl.to(".hero-tagline-word", { opacity: 1, x: 0, duration: 0.65, stagger: 0.1 }, "-=0.5");
  tl.to(".hero-character-img", {
    y: -12, duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut",
  }, "+=0.2");
}
