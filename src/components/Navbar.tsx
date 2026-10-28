"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { id: "home", label: "Home", href: "/" },
  { id: "tournaments", label: "Tournaments", href: "/#tournaments", targetId: "tournaments" },
  { id: "how-to-play", label: "How to Play", href: "/#how-to-play", targetId: "how-to-play" },
  { id: "testimonials", label: "Testimonials", href: "/#testimonials", targetId: "testimonials" },
  { id: "faq", label: "FAQ", href: "/#faq", targetId: "faq" },
  { id: "contact", label: "Contact Us", href: "/#contact", targetId: "contact" },
];

const onPageSectionIds = ["home", "tournaments", "how-to-play", "testimonials", "faq", "contact"];

/** Height of the fixed navbar; the section top lands just below it. */
const NAV_OFFSET = 70;

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
    transition: {
      type: "tween",
      duration: 0.24,
      ease: [0.55, 0.06, 0.68, 0.19],
    },
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

/** Absolute distance of an element from the top of the document. */
const getDocTop = (el: HTMLElement) =>
  el.getBoundingClientRect().top + window.scrollY;

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  /* While a nav click is smooth-scrolling, the scroll-spy must not fight it */
  const isAutoScrolling = useRef(false);
  const rafId = useRef<number | null>(null);

  const updateActiveFromScroll = useCallback(() => {
    if (pathname !== "/") return;
    if (isAutoScrolling.current) return;

    // Bottom of the page: highlight the last section
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 60
    ) {
      setActiveSection(onPageSectionIds[onPageSectionIds.length - 1]);
      return;
    }

    const scrollPosition = window.scrollY + NAV_OFFSET + 70;

    for (let i = onPageSectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(onPageSectionIds[i]);
      if (el && scrollPosition >= getDocTop(el)) {
        setActiveSection(onPageSectionIds[i]);
        return;
      }
    }
    setActiveSection("home");
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/helpcenter") {
      setActiveSection("helpcenter");
      return;
    }

    const stopAutoScroll = () => {
      isAutoScrolling.current = false;
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };

    // If the page was opened with a leftover "#section", clean the URL.
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    window.addEventListener("wheel", stopAutoScroll, { passive: true });
    window.addEventListener("touchstart", stopAutoScroll, { passive: true });
    updateActiveFromScroll();

    return () => {
      window.removeEventListener("scroll", updateActiveFromScroll);
      window.removeEventListener("wheel", stopAutoScroll);
      window.removeEventListener("touchstart", stopAutoScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [pathname, updateActiveFromScroll]);

  /** Keep the lock on until the page has stopped moving. */
  const lockUntilScrollSettles = () => {
    if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    isAutoScrolling.current = true;

    let last = window.scrollY;
    let still = 0;
    const tick = () => {
      const y = window.scrollY;
      still = Math.abs(y - last) < 1 ? still + 1 : 0;
      last = y;

      if (still >= 10) {
        isAutoScrolling.current = false;
        rafId.current = null;
        return;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: (typeof navLinks)[0]
  ) => {
    if (link.id === "home") {
      if (pathname === "/") {
        e.preventDefault();
        setActiveSection("home");
        lockUntilScrollSettles();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (link.targetId) {
      if (pathname !== "/") {
        // If not on home page, let Next.js navigate to /#targetId
        return;
      }

      e.preventDefault();
      const el = document.getElementById(link.targetId);
      if (!el) {
        window.location.href = "/";
        return;
      }

      const targetPosition = Math.max(0, getDocTop(el) - NAV_OFFSET);

      setActiveSection(link.id);
      lockUntilScrollSettles();
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  const isLinkActive = (id: string) => {
    if (pathname === "/helpcenter") {
      return id === "helpcenter";
    }
    return activeSection === id;
  };

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
          className={`nav-hamburger${mobileOpen ? " nav-hamburger-hidden" : ""}`}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        {/* ── Desktop: left links (Home, Help Center, Tournaments) ── */}
        <div className="nav-links nav-links-left">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className={`nav-link ${
                isLinkActive(link.id) ? "nav-link-active" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Center logo (always visible, smooth scrolls to top or home) ── */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              setActiveSection("home");
              lockUntilScrollSettles();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="nav-logo"
        >
          <Image
            src="/images/astra_logo.png"
            alt="Astra Logo"
            width={110}
            height={30}
            className="nav-logo-img"
            priority
          />
        </Link>

        {/* ── Desktop: right links (How to Play, Streaming, Testimonials) ── */}
        <div className="nav-links nav-links-right">
          {navLinks.slice(3).map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className={`nav-link ${
                isLinkActive(link.id) ? "nav-link-active" : ""
              }`}
            >
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
              {/* Panel header with close button */}
              <div className="nav-mobile-panel-header">
                <Link
                  href="/"
                  className="nav-logo"
                  onClick={(e) => {
                    if (pathname === "/") {
                      e.preventDefault();
                      setActiveSection("home");
                      lockUntilScrollSettles();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                    setMobileOpen(false);
                  }}
                >
                  <Image
                    src="/images/astra_logo.png"
                    alt="Astra Logo"
                    width={90}
                    height={24}
                    className="nav-logo-img"
                  />
                </Link>
                <button
                  className="nav-mobile-close"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="nav-mobile-close-line nav-mobile-close-line-1" />
                  <span className="nav-mobile-close-line nav-mobile-close-line-2" />
                </button>
              </div>

              <div className="nav-mobile-links">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.id}
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      href={link.href}
                      className={`nav-mobile-link ${
                        isLinkActive(link.id) ? "nav-mobile-link-active" : ""
                      }`}
                      onClick={(e) => {
                        handleNavClick(e, link);
                        setMobileOpen(false);
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* CTA inside drawer */}
              <div className="nav-mobile-footer">
                <Link
                  href="/#games"
                  className="nav-mobile-cta"
                  onClick={(e) => {
                    if (pathname === "/") {
                      e.preventDefault();
                      const el = document.getElementById("games");
                      if (el) {
                        const targetPosition = Math.max(0, getDocTop(el) - NAV_OFFSET);
                        window.scrollTo({ top: targetPosition, behavior: "smooth" });
                      }
                    }
                    setMobileOpen(false);
                  }}
                >
                  DOWNLOAD APP
                  <Image src="/images/playstore.png" width={20} height={20} alt="App Store" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}