import Image from "next/image";

export default function DynamicStreamingSection() {
  return (
    <section className="relative w-full py-24 bg-transparent overflow-hidden flex flex-col items-center">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee 30s linear infinite reverse;
        }
      `}</style>

      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-700/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center">

        {/* Pill badge */}
        <div className="flex items-center gap-2.5 bg-[#1a0f2e] border border-purple-500/30 rounded-full px-5 py-2 mb-8 shadow-[0_0_20px_rgba(167,139,250,0.15)]">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_6px_rgba(167,139,250,0.8)]" />
          <span className="text-zinc-300 text-sm font-semibold tracking-[0.2em] uppercase">Live</span>
          <span className="w-1 h-1 rounded-full bg-zinc-500" />
          <span className="text-zinc-300 text-sm font-semibold tracking-[0.2em] uppercase">Stream</span>
          <span className="w-1 h-1 rounded-full bg-zinc-500" />
          <span className="text-zinc-300 text-sm font-semibold tracking-[0.2em] uppercase">Play</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-5 leading-tight tracking-tight">
          Dynamic{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
            Streaming
          </span>{" "}
          Experience
        </h2>
        <p className="text-zinc-400 text-lg md:text-xl font-medium mb-14 text-center">
          Empower Your Gameplay with Live Streaming
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">

          {/* Card 1 */}
          <div className="relative bg-[#0d0818]/90 border border-white/[0.06] rounded-[1.75rem] overflow-hidden group shadow-2xl h-[380px]">
            {/* Inner subtle border glow */}
            <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-purple-500/5 via-transparent to-transparent pointer-events-none" />

            {/* Marquee background game icons - Row 1 */}
            <div className="absolute bottom-[25%] inset-x-0 overflow-hidden opacity-30 z-0 pointer-events-none flex">
              <div className="flex w-max animate-marquee">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-12 pr-12">
                    <div className="relative w-8 h-8"><Image src="/images/gameicons/bgmi.png" alt="Icon" fill className="object-contain" /></div>
                    <div className="relative w-8 h-8"><Image src="/images/gameicons/ludoking.png" alt="Icon" fill className="object-contain" /></div>
                    <div className="relative w-8 h-8"><Image src="/images/gameicons/mario.png" alt="Icon" fill className="object-contain" /></div>
                    <div className="relative w-8 h-8"><Image src="/images/gameicons/minecraft.png" alt="Icon" fill className="object-contain" /></div>
                    <div className="relative w-8 h-8"><Image src="/images/gameicons/csgo.png" alt="Icon" fill className="object-contain" /></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Marquee background game icons - Row 2 */}
            <div className="absolute bottom-[15%] inset-x-0 overflow-hidden opacity-20 z-0 pointer-events-none flex">
              <div className="flex w-max animate-marquee-reverse">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-16 pr-16">
                    <div className="relative w-7 h-7"><Image src="/images/gameicons/angrybirds.png" alt="Icon" fill className="object-contain" /></div>
                    <div className="relative w-7 h-7"><Image src="/images/gameicons/chess.png" alt="Icon" fill className="object-contain" /></div>
                    <div className="relative w-7 h-7"><Image src="/images/gameicons/bgmi.png" alt="Icon" fill className="object-contain" /></div>
                    <div className="relative w-7 h-7"><Image src="/images/gameicons/minecraft.png" alt="Icon" fill className="object-contain" /></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Text content — centered */}
            <div className="relative z-10 p-6 md:p-8 text-center flex flex-col items-center">
              <h3 className="text-xl md:text-2xl font-bold text-white leading-snug mb-2">
                Revamp Your Entertainment with Diverse{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
                  Gaming Content
                </span>
              </h3>
              <p className="text-zinc-400 text-sm font-medium">
                Stay Entertained with a Variety of Game Genres
              </p>
            </div>

            {/* Image — absolutely positioned at bottom */}
            <div className="absolute -bottom-16 inset-x-0 z-10 h-[75%] transition-transform duration-700 ease-out group-hover:-translate-y-2">
              <Image
                src="/images/streaming/card-1.png"
                alt="Gaming content on Astra app"
                fill
                className="object-contain object-bottom drop-shadow-[0_0_60px_rgba(139,92,246,0.4)]"
                quality={95}
              />
            </div>

            {/* Purple smoke layers — blend image into card */}
            <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none z-20">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0818] via-[#0d0818]/50 to-transparent" />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-24 bg-purple-600/35 blur-[50px] rounded-full" />
              <div className="absolute -bottom-4 left-[10%] w-40 h-20 bg-purple-700/25 blur-[40px] rounded-full" />
              <div className="absolute -bottom-4 right-[15%] w-36 h-16 bg-violet-600/20 blur-[35px] rounded-full" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-[#0d0818]/90 border border-white/[0.06] rounded-[1.75rem] overflow-hidden group shadow-2xl h-[380px]">
            <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-purple-500/5 via-transparent to-transparent pointer-events-none" />

            {/* Marquee background game icons - Row 1 */}
            <div className="absolute bottom-[25%] inset-x-0 overflow-hidden opacity-30 z-0 pointer-events-none flex">
              <div className="flex w-max animate-marquee">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-14 pr-14">
                    <div className="relative w-8 h-8"><Image src="/images/gameicons/csgo.png" alt="Icon" fill className="object-contain" /></div>
                    <div className="relative w-8 h-8"><Image src="/images/gameicons/angrybirds.png" alt="Icon" fill className="object-contain" /></div>
                    <div className="relative w-8 h-8"><Image src="/images/gameicons/chess.png" alt="Icon" fill className="object-contain" /></div>
                    <div className="relative w-8 h-8"><Image src="/images/gameicons/ludoking.png" alt="Icon" fill className="object-contain" /></div>
                    <div className="relative w-8 h-8"><Image src="/images/gameicons/mario.png" alt="Icon" fill className="object-contain" /></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Marquee background game icons - Row 2 */}
            <div className="absolute bottom-[15%] inset-x-0 overflow-hidden opacity-20 z-0 pointer-events-none flex">
              <div className="flex w-max animate-marquee-reverse">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-12 pr-12">
                    <div className="relative w-7 h-7"><Image src="/images/gameicons/minecraft.png" alt="Icon" fill className="object-contain" /></div>
                    <div className="relative w-7 h-7"><Image src="/images/gameicons/bgmi.png" alt="Icon" fill className="object-contain" /></div>
                    <div className="relative w-7 h-7"><Image src="/images/gameicons/csgo.png" alt="Icon" fill className="object-contain" /></div>
                    <div className="relative w-7 h-7"><Image src="/images/gameicons/chess.png" alt="Icon" fill className="object-contain" /></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Text content — centered */}
            <div className="relative z-10 p-6 md:p-8 text-center flex flex-col items-center">
              <h3 className="text-xl md:text-2xl font-bold text-white leading-snug mb-2">
                Connect with Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
                  Favorite Creators
                </span>{" "}
                for a Seamless Streaming Experience
              </h3>
              <p className="text-zinc-400 text-sm font-medium">
                Watch live, interact in real-time, and be part of the action
              </p>
            </div>

            {/* Image — absolutely positioned at bottom */}
            <div className="absolute -bottom-16 inset-x-0 z-10 h-[75%] transition-transform duration-700 ease-out group-hover:-translate-y-2">
              <Image
                src="/images/streaming/card-2.png"
                alt="Connect with streamers on Astra"
                fill
                className="object-contain object-bottom drop-shadow-[0_0_60px_rgba(139,92,246,0.4)]"
                quality={95}
              />
            </div>

            {/* Purple smoke layers — blend image into card */}
            <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none z-20">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0818] via-[#0d0818]/50 to-transparent" />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-24 bg-purple-600/35 blur-[50px] rounded-full" />
              <div className="absolute -bottom-4 left-[15%] w-36 h-20 bg-purple-700/25 blur-[40px] rounded-full" />
              <div className="absolute -bottom-4 right-[10%] w-40 h-16 bg-violet-600/20 blur-[35px] rounded-full" />
            </div>
          </div>

        </div>

        {/* Call to Action & Community Section */}
        <div className="mt-20 flex flex-col items-center gap-10 w-full max-w-4xl">
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center">
            <button className="flex items-center justify-center gap-3 w-full sm:w-auto px-9 py-4 bg-[#a855f7] hover:bg-[#9333ea] transition-colors rounded-2xl text-white font-bold text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              Join the Astra Community
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button className="flex items-center justify-center gap-3 w-full sm:w-auto px-9 py-4 bg-transparent border border-white/[0.15] hover:border-white/[0.3] hover:bg-white/[0.05] transition-colors rounded-2xl text-white font-bold text-sm tracking-widest uppercase">
              Become a Creator
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Community Stats */}
          <div className="flex items-center gap-5 mt-2">
            {/* Avatars */}
            <div className="flex -space-x-4">
              <img className="w-[52px] h-[52px] rounded-full border-[3px] border-[#080410] object-cover relative z-10" src="https://i.pravatar.cc/100?img=32" alt="Community Member" />
              <img className="w-[52px] h-[52px] rounded-full border-[3px] border-[#080410] object-cover relative z-20" src="https://i.pravatar.cc/100?img=44" alt="Community Member" />
              <img className="w-[52px] h-[52px] rounded-full border-[3px] border-[#080410] object-cover relative z-30" src="https://i.pravatar.cc/100?img=12" alt="Community Member" />
              <img className="w-[52px] h-[52px] rounded-full border-[3px] border-[#080410] object-cover relative z-40" src="https://i.pravatar.cc/100?img=57" alt="Community Member" />
              <div className="w-[52px] h-[52px] rounded-full border-[3px] border-[#080410] bg-[#1a102e] flex items-center justify-center text-white relative z-50 text-xl shadow-inner cursor-pointer hover:bg-[#2d1b54] transition-colors">
                +
              </div>
            </div>
            {/* Stats text */}
            <div className="flex flex-col justify-center">
              <span className="text-white font-black text-[26px] leading-none tracking-wide mb-1">10K+</span>
              <span className="text-zinc-400 text-xs font-semibold tracking-widest uppercase">Active Community Members</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
