"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Tournaments", href: "/tournaments" },
  { label: "Games", href: "/games" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
];

const menuVariants = {
  closed: { opacity: 0, x: "100%" },
  open: {
    opacity: 1,
    x: 0,
    transition: { type: "tween", duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { type: "tween", duration: 0.24, ease: [0.55, 0.06, 0.68, 0.19] },
  },
};

const linkVariants = {
  closed: { opacity: 0, x: 24 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 + i * 0.06, duration: 0.3, ease: "easeOut" },
  }),
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.nav
        className="navbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        {/* ── Mobile: hamburger (order:-1 on mobile → far left) ── */}
        <button
          className="nav-hamburger"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className={`hamburger-line ${mobileOpen ? "line-top-open" : ""}`} />
          <span className={`hamburger-line ${mobileOpen ? "line-mid-open" : ""}`} />
          <span className={`hamburger-line ${mobileOpen ? "line-bot-open" : ""}`} />
        </button>

        {/* ── Desktop: left links ── */}
        <div className="nav-links nav-links-left">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`nav-link ${link.active ? "nav-link-active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Center logo (always visible) ── */}
        <Link href="/" className="nav-logo">
          <Image src="/images/astra_logo.png" alt="Astra Logo" width={110} height={30} className="nav-logo-img" priority />
        </Link>

        {/* ── Desktop: right links ── */}
        <div className="nav-links nav-links-right">
          {navLinks.slice(3).map((link) => (
            <Link key={link.label} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </div>

    </motion.nav>

      {/* ── Mobile drawer overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              className="nav-mobile-panel"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="exit"
            >
              <div className="nav-mobile-links">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      href={link.href}
                      className={`nav-mobile-link ${link.active ? "nav-mobile-link-active" : ""}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* CTA inside drawer */}
              <div className="nav-mobile-footer">
                <Link href="/" className="nav-mobile-cta" onClick={() => setMobileOpen(false)}>
                  DOWNLOAD APP
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
