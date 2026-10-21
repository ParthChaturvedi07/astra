"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DottedPatch from "@/components/DottedPatch";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const contactInfo = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    label: "Email Us",
    value: "support@astra.gg",
    href: "mailto:support@astra.gg",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    label: "Discord",
    value: "discord.gg/astra",
    href: "https://discord.com",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Support Hours",
    value: "Mon – Sat, 10am – 7pm IST",
    href: null,
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ct-badge",
        { opacity: 0, y: -20, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".ct-badge", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".ct-title",
        { opacity: 0, y: 35 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".ct-title", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".ct-desc",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, delay: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".ct-title", start: "top 83%" },
        }
      );

      gsap.fromTo(
        ".ct-info-tile",
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".ct-info-row", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".ct-form",
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: ".ct-form", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".ct-char-left",
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".ct-title", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".ct-char-right",
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".ct-title", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-28 bg-transparent overflow-hidden flex flex-col items-center"
    >
      {/* Dotted patches */}
      <DottedPatch top="5%" left="-20px" width={360} height={280} rotate={10} maskShape="fade-left" dotColor="rgba(192,132,252,0.3)" />
      <DottedPatch top="20%" right="-10px" width={380} height={300} rotate={-14} maskShape="fade-right" dotColor="rgba(124,58,237,0.38)" spacing={18} />
      <DottedPatch bottom="5%" left="30%" width={320} height={220} rotate={6} maskShape="pill" glow glowColor="rgba(167,139,250,0.12)" animate="float" />

      {/* Left gaming character */}
      <div className="ct-char-left hidden lg:block absolute left-0 bottom-0 w-[300px] xl:w-[360px] h-[560px] xl:h-[660px] pointer-events-none z-10">
        {/* Purple glow pool beneath character */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[80px] bg-purple-600/40 blur-[50px] rounded-full" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[120px] h-[40px] bg-violet-500/30 blur-[30px] rounded-full" />

        <Image
          src="/images/tournamentformat/solo_bgmi.png"
          alt="Gaming character"
          fill
          className="object-contain object-bottom opacity-75"
          quality={90}
        />
        {/* Left edge fade */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#080410] to-transparent" />
        {/* Right edge fade — blends into center */}
        <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#080410] to-transparent" />
        {/* Top fade */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#080410] via-[#080410]/60 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#080410] via-[#080410]/70 to-transparent" />
      </div>

      {/* Right gaming character */}
      <div className="ct-char-right hidden lg:block absolute right-0 bottom-0 w-[280px] xl:w-[340px] h-[540px] xl:h-[640px] pointer-events-none z-10">
        {/* Purple glow pool beneath character */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[80px] bg-purple-600/40 blur-[50px] rounded-full" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[120px] h-[40px] bg-violet-500/30 blur-[30px] rounded-full" />

        <Image
          src="/images/Hero_character.png"
          alt="Gaming character"
          fill
          className="object-contain object-bottom opacity-75 scale-x-[-1]"
          quality={90}
        />
        {/* Right edge fade */}
        {/* <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#080410] to-transparent" /> */}
        {/* Left edge fade — blends into center */}
        {/* <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#080410] to-transparent" /> */}
        {/* Top fade */}
        {/* <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#080410] via-[#080410]/60 to-transparent" /> */}
        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#080410] via-[#080410]/70 to-transparent" />
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-700/10 blur-[130px] rounded-full" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center">

        {/* Badge */}
        <div className="ct-badge flex items-center gap-2.5 bg-[#1a0f2e] border border-purple-500/30 rounded-full px-5 py-2 mb-8 shadow-[0_0_20px_rgba(167,139,250,0.15)]">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_6px_rgba(167,139,250,0.8)]" />
          <span className="text-zinc-300 text-sm font-semibold tracking-[0.2em] uppercase">Get In Touch</span>
        </div>

        {/* Heading */}
        <h2 className="ct-title text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-4 leading-tight tracking-tight">
          We&apos;re Here to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
            Help
          </span>
        </h2>
        <p className="ct-desc text-zinc-400 text-lg md:text-xl font-medium mb-14 text-center max-w-xl">
          Have a question, feedback, or need support? Reach out — our team responds fast.
        </p>

        {/* Contact info tiles */}
        <div className="ct-info-row flex flex-col sm:flex-row items-stretch justify-center gap-4 w-full max-w-4xl mb-12">
          {contactInfo.map((item, i) => (
            <div
              key={i}
              className="ct-info-tile flex-1 flex items-center gap-4 bg-[#0d0818]/80 border border-white/[0.07] rounded-2xl p-5 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-300 group-hover:bg-purple-500 group-hover:text-white group-hover:border-purple-500 transition-colors duration-300 shrink-0">
                {item.icon}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-purple-400/80 uppercase tracking-widest mb-0.5">{item.label}</span>
                {item.href ? (
                  <a href={item.href} className="text-sm font-semibold text-zinc-200 hover:text-purple-300 transition-colors truncate">
                    {item.value}
                  </a>
                ) : (
                  <span className="text-sm font-semibold text-zinc-200">{item.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form Card */}
        <div className="ct-form w-full max-w-3xl bg-[#0d0818]/90 border border-white/[0.06] rounded-[1.75rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-purple-500/5 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-purple-400/80 uppercase tracking-widest">Your Name</label>
              <input
                type="text"
                placeholder="e.g. Arjun Sharma"
                className="w-full bg-white/[0.04] border border-white/[0.08] hover:border-purple-500/40 focus:border-purple-500/60 focus:outline-none rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 transition-colors duration-200"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-purple-400/80 uppercase tracking-widest">Email Address</label>
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full bg-white/[0.04] border border-white/[0.08] hover:border-purple-500/40 focus:border-purple-500/60 focus:outline-none rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 transition-colors duration-200"
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[11px] font-bold text-purple-400/80 uppercase tracking-widest">Subject</label>
              <input
                type="text"
                placeholder="e.g. Tournament issue, account query..."
                className="w-full bg-white/[0.04] border border-white/[0.08] hover:border-purple-500/40 focus:border-purple-500/60 focus:outline-none rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 transition-colors duration-200"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[11px] font-bold text-purple-400/80 uppercase tracking-widest">Message</label>
              <textarea
                rows={5}
                placeholder="Tell us how we can help..."
                className="w-full bg-white/[0.04] border border-white/[0.08] hover:border-purple-500/40 focus:border-purple-500/60 focus:outline-none rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 resize-none transition-colors duration-200"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-end">
              <button className="flex items-center gap-3 px-9 py-4 bg-[#a855f7] hover:bg-[#9333ea] active:scale-95 transition-all duration-200 rounded-2xl text-white font-bold text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(168,85,247,0.35)]">
                Send Message
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
