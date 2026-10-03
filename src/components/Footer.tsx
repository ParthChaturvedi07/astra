import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  PLATFORM: [
    { label: "Tournaments", href: "/tournaments" },
    { label: "Games", href: "/games" },
    { label: "Leaderboards", href: "/leaderboards" },
    { label: "Rewards", href: "/rewards" },
    { label: "How It Works", href: "/how-it-works" },
  ],
  COMMUNITY: [
    { label: "Discord", href: "https://discord.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "X", href: "https://x.com" },
  ],
  SUPPORT: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Report a Problem", href: "/report" },
  ],
  LEGAL: [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Tournament Rules", href: "/rules" },
    { label: "Refund / Cancellation Policy", href: "/refund" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative w-full pt-32 pb-0 flex flex-col items-center bg-transparent overflow-hidden border-t border-white/[0.05] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[60%] before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-purple-500/60 before:to-transparent before:shadow-[0_0_30px_rgba(139,92,246,0.8)]">
      
      {/* Footer Content */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
          
          {/* Logo & Tagline section */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            <Link href="/" className="inline-block transition-transform duration-300 hover:scale-105">
              <Image 
                src="/images/astra_logo.png" 
                alt="Astra Logo" 
                width={120} 
                height={35} 
                className="filter drop-shadow-[0_0_15px_rgba(192,132,252,0.4)]"
              />
            </Link>
            <p className="text-zinc-400 text-sm max-w-xs leading-relaxed font-medium">
              Play. Compete. Belong.
            </p>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col space-y-5">
              <h3 className="text-white text-sm font-bold tracking-widest text-shadow-[0_0_10px_rgba(167,139,250,0.5)]">
                {category}
              </h3>
              <ul className="flex flex-col space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-zinc-400 text-sm font-medium transition-all duration-200 hover:text-white hover:text-shadow-[0_0_8px_rgba(167,139,250,0.6)] relative group flex w-fit"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-400 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
        
        {/* Copyright text at the bottom of the links, no harsh border */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-zinc-500 text-xs font-medium tracking-wide pb-4">
          <p className="mb-4 sm:mb-0">© 2026 Astra. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Massive ASTRA text blended into the bottom */}
      <div className="w-full flex justify-center items-end pointer-events-none select-none relative z-0 -mt-10 lg:-mt-20">
        
        {/* Dotted pattern background blending with the text */}
        <div 
          className="absolute inset-0 z-[-1] opacity-70"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(167,139,250,0.3) 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)'
          }}
        />

        <h1 className="text-[22vw] leading-[0.75] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/[0.07] via-white/[0.03] to-transparent tracking-tighter">
          ASTRA
        </h1>
        {/* Subtle glow behind the text to merge with website vibe */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-1/2 bg-purple-600/10 blur-[120px] rounded-[100%]" />
      </div>

    </footer>
  );
}
