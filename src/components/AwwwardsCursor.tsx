"use client";

import { useEffect, useRef, useState } from "react";

export default function AwwwardsCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Smooth lerp coordinates
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only mount on devices that have a precise pointer (mouse)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Instantly position the small center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Dynamic hover detection for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'button, a, [role="button"], input, textarea, .faq-card, .tf-card, .pww-step-card, .htp-step-card, .cursor-pointer'
      );

      if (interactive) {
        setIsHovered(true);
        if (interactive.hasAttribute("data-cursor-text")) {
          setHoverText(interactive.getAttribute("data-cursor-text") || "");
        } else if (interactive.classList.contains("faq-card")) {
          setHoverText("VIEW");
        } else {
          setHoverText("");
        }
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    // Smooth lerp animation loop for outer ring
    const renderLoop = () => {
      // Lerp formula: current + (target - current) * factor
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] pointer-events-none will-change-transform"
      />

      {/* Fluid Trailing Aura Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none will-change-transform rounded-full flex items-center justify-center transition-[width,height,background-color,border-color,box-shadow] duration-200 ease-out ${
          isClicking
            ? "w-8 h-8 -ml-4 -mt-4 bg-purple-500/40 border border-purple-300 shadow-[0_0_25px_rgba(167,139,250,0.8)]"
            : isHovered
            ? "w-14 h-14 -ml-7 -mt-7 bg-[#7c3aed]/25 border border-purple-400/80 shadow-[0_0_25px_rgba(124,58,237,0.45)] backdrop-blur-[1px]"
            : "w-8 h-8 -ml-4 -mt-4 bg-purple-500/10 border border-purple-400/35 shadow-[0_0_12px_rgba(124,58,237,0.2)]"
        }`}
      >
        {hoverText && (
          <span className="text-[9px] font-black uppercase tracking-widest text-purple-200 animate-pulse font-mono select-none">
            {hoverText}
          </span>
        )}
      </div>
    </div>
  );
}

