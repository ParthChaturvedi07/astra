"use client";

import { useEffect } from "react";

export default function AwwwardsInteractiveCards() {
  useEffect(() => {
    // Dynamic mouse spotlight handler for all cards across the page
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll<HTMLElement>(
        ".tf-card, .pww-step-card, .pww-payout-card, .htp-step-card, .ds-card, .test-stat-card, .ct-channel-card, .faq-card, .sg-btn"
      );

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        // Check if mouse is somewhat near the card to avoid unnecessary style recalculations
        if (
          e.clientX >= rect.left - 50 &&
          e.clientX <= rect.right + 50 &&
          e.clientY >= rect.top - 50 &&
          e.clientY <= rect.bottom + 50
        ) {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
}

