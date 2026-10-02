"use client";

import Image from "next/image";

const formats = [
  {
    id: "01",
    title: "SOLO",
    desc: "Go alone. Prove your skills. Only the strongest survive in these intense showdowns where every decision rests solely on your shoulders.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
    ),
    map: { name: "Bermuda", image: "/images/tournamentformat/bermuda.png" },
    image: "/images/tournamentformat/solo_bgmi.png"
  },
  {
    id: "02",
    title: "DUO",
    desc: "Two minds. One victory. Team up with a trusted partner and dominate the battlefield with perfectly coordinated strategies and crossfire.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    ),
    map: { name: "Kalahari", image: "/images/tournamentformat/kalahari.png" },
    image: "/images/tournamentformat/duo2.png"
  },
  {
    id: "03",
    title: "CLASH SQUAD",
    desc: "Fast. Fierce. 4v4 action. Every round counts. Outsmart the enemy squad in tight economic rounds and secure your path to the finals.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    ),
    map: { name: "Bermuda (CS)", image: "/images/tournamentformat/bermuda.png" },
    image: "/images/tournamentformat/squad.png"
  },
  {
    id: "04",
    title: "CLASSIC",
    desc: "The ultimate battle royale experience. Land, loot, and survive against massive lobbies. Master map rotations and claim the crown.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" x2="4" y1="22" y2="15" /></svg>
    ),
    map: { name: "Erangel", image: "/images/tournamentformat/erangel.png" },
    image: "/images/tournamentformat/classic_drop.png"
  },
  {
    id: "05",
    title: "QUICK MATCHES",
    desc: "Short, intense, and non-stop action for those who crave instant combat. Drop into smaller zones and test your reflexes in rapid-fire brawls.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
    ),
    map: { name: "Purgatory", image: "/images/tournamentformat/purgatory.png" },
    image: "/images/tournamentformat/quick_match.png"
  }
];

export default function TournamentFormatsSection() {
  return (
    <section className="w-full relative py-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto z-20">
      {/* Top Header Section */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-12 mb-12 sm:mb-16">

        {/* Left: Titles & Desc */}
        <div className="max-w-2xl flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-purple-300 font-semibold tracking-[0.2em] text-[10px] uppercase">Game Modes</span>
            <div className="h-[1px] w-12 bg-purple-400/30"></div>
          </div>

          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-white uppercase flex flex-col">
            <span>Tournament</span>
            <span className="text-[#7c3aed]">Formats</span>
          </h2>

          <p className="text-purple-200/80 text-sm sm:text-base max-w-lg leading-relaxed mt-2 font-medium">
            Choose your style. From intense solo showdowns to high-octane squad battles, Astra hosts a variety of match formats across iconic maps. There&apos;s a battlefield for every kind of player.
          </p>
        </div>

        {/* Right: Background Text & Popular Maps */}
        <div className="relative flex items-center justify-start xl:justify-end w-full xl:w-auto">
          {/* Faded Background Text */}
          <div className="absolute right-[110%] top-1/2 -translate-y-1/2 flex-col text-right hidden xl:flex opacity-[0.04] font-black text-6xl uppercase leading-[0.85] select-none text-white whitespace-nowrap">
            <span>Play</span>
            <span>Compete</span>
            <span>Belong</span>
          </div>

          {/* Popular Maps Box */}
          <div className="rounded-2xl border border-purple-400/20 bg-white/5 backdrop-blur-md p-4 sm:p-5 flex flex-col gap-4 shadow-[0_0_30px_rgba(124,58,237,0.1)]">
            <div className="flex items-center gap-2 text-[10px] font-bold text-purple-300 uppercase tracking-widest">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              Popular Maps
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {[
                { name: 'Bermuda', image: '/images/tournamentformat/bermuda.png' },
                { name: 'Kalahari', image: '/images/tournamentformat/kalahari.png' },
                { name: 'Purgatory', image: '/images/tournamentformat/purgatory.png' }
              ].map((map, i) => (
                <div key={i} className="relative w-24 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden group border border-purple-400/20 flex-shrink-0 bg-[#150a2e]">
                  <Image src={map.image} alt={map.name} fill sizes="(max-width: 768px) 120px, 150px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute bottom-1.5 left-2 text-[10px] sm:text-xs font-bold text-white z-10 shadow-black drop-shadow-md">{map.name}</div>
                </div>
              ))}

              <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center border border-purple-400/20 text-purple-300 hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all ml-1 shadow-[0_0_15px_rgba(124,58,237,0.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        {formats.map((format, idx) => (
          <div key={idx} className="relative rounded-2xl border border-purple-400/20 bg-[#150a2e] backdrop-blur-md overflow-hidden group hover:border-purple-400/50 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(124,58,237,0.2)] hover:-translate-y-1 flex flex-col">

            {/* Background Image */}
            <div className="absolute inset-0 z-0 h-[60%] sm:h-[55%] overflow-hidden">
              <Image
                src={format.image}
                alt={format.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover object-top opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-[#150a2e] via-[#150a2e]/60 to-transparent"></div>
            </div>

            <div className="relative z-10 p-5 sm:p-6 flex flex-col gap-4 h-full overflow-hidden">
              {/* Large faded number */}
              <div className="absolute top-1 left-3 text-[80px] sm:text-[90px] font-black text-white/[0.05] pointer-events-none group-hover:text-white/[0.08] transition-colors leading-none select-none">
                {format.id}
              </div>

              {/* Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#150a2e]/80 border border-purple-400/20 flex items-center justify-center text-purple-300 mt-[120px] sm:mt-[140px] group-hover:bg-purple-500 group-hover:text-white group-hover:border-purple-500 transition-colors relative z-10 shadow-[0_0_15px_rgba(124,58,237,0)] group-hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] backdrop-blur-sm">
                {format.icon}
              </div>

              <div className="flex flex-col gap-1.5 relative z-10">
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide">{format.title}</h3>
                <p className="text-[13px] text-purple-200/70 leading-relaxed min-h-[60px] font-medium">{format.desc}</p>
              </div>

              <div className="mt-auto flex flex-col gap-3 relative z-10 pt-2">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-bold text-purple-400/80 uppercase tracking-widest">Popular Maps</span>
                  <div className="flex items-center justify-between rounded-xl bg-black/40 p-1.5 pr-3 border border-purple-400/10 group-hover:border-purple-400/30 transition-colors cursor-pointer group/map">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-7 rounded-[8px] overflow-hidden relative bg-[#150a2e]">
                        <Image src={format.map.image} alt={format.map.name} fill sizes="60px" className="object-cover" />
                        <div className="absolute inset-0 bg-black/30 group-hover/map:bg-transparent transition-colors"></div>
                      </div>
                      <span className="text-[11px] font-bold text-purple-100">{format.map.name}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400/50 group-hover/map:text-purple-300 transition-colors"><path d="m9 18 6-6-6-6" /></svg>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
