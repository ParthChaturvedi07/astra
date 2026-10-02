"use client";

import Image from "next/image";

const gameIcons = [
  { id: "bgmi", src: "/images/gameicons/bgmi.png" },
  { id: "chess", src: "/images/gameicons/chess.png" },
  { id: "csgo", src: "/images/gameicons/csgo.png" },
  { id: "ludoking", src: "/images/gameicons/ludoking.png" },
  { id: "mario", src: "/images/gameicons/mario.png" },
  { id: "minecraft", src: "/images/gameicons/minecraft.png" },
  { id: "angrybirds", src: "/images/gameicons/angrybirds.png" },
];

// Triplicate for seamless looping
const track = [...gameIcons, ...gameIcons, ...gameIcons];

interface SupportedGamesSectionProps {
  className?: string;
}

export default function SupportedGamesSection({
  className = "",
}: SupportedGamesSectionProps) {
  return (
    <section
      id="games"
      className={`w-full flex flex-col items-center justify-center min-h-[20vh] py-10 ${className}`}
    >
      {/* Carousel */}
      <div className="w-full max-w-[1000px] mx-auto overflow-hidden px-4">
        <div className="carousel-mask carousel-pause-on-hover">
          <div className="carousel-track flex gap-4 pr-4 w-max">
            {track.map((g, i) => (
              <div
                key={`${g.id}-${i}`}
                className="
                  flex items-center justify-center
                  w-10 h-10 sm:w-12 sm:h-12
                  rounded-xl
                  overflow-hidden
                  flex-shrink-0
                  border border-purple-400/20
                  bg-white/5
                  backdrop-blur-md
                  transition-all duration-300
                  hover:border-purple-400/50
                  hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]
                  hover:scale-110
                "
              >
                <Image
                  src={g.src}
                  alt={g.id}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Download Prompt */}
      <div className="flex flex-col items-center justify-center text-center mt-12 mb-2 px-4 relative z-10">
        <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
          Play. Compete. <span className="text-[#7c3aed]">Win.</span>
        </h3>
        <p className="text-sm sm:text-base text-purple-200/80 mt-3 max-w-lg font-medium">
          Download now. Compete with the best and win real rewards in your favorite games.
        </p>
      </div>

      {/* Download Buttons */}
      <div className="flex flex-col sm:flex-row px-4 relative z-10 w-full sm:w-auto" style={{ marginTop: '32px', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
        <button className="flex items-center justify-center rounded-2xl border border-purple-400/20 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-purple-400/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:-translate-y-1 group" style={{ padding: '10px 24px', gap: '12px' }}>
          <div className="shrink-0 relative" style={{ width: '28px', height: '28px', flexShrink: 0 }}>
            <Image 
              src="/images/playstore.png" 
              alt="Play Store" 
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col items-start shrink-0" style={{ flexShrink: 0 }}>
            <span className="text-purple-200/70 font-semibold uppercase tracking-wider leading-none" style={{ fontSize: '10px', marginBottom: '2px' }}>Get it on</span>
            <span className="font-bold text-white leading-none tracking-tight" style={{ fontSize: '17px' }}>Google Play</span>
          </div>
        </button>

        <button className="flex items-center justify-center rounded-2xl border border-purple-400/20 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-purple-400/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:-translate-y-1 group" style={{ padding: '10px 24px', gap: '12px' }}>
          <div className="shrink-0 relative" style={{ width: '28px', height: '28px', flexShrink: 0 }}>
            <Image 
              src="/images/apple.png" 
              alt="App Store" 
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col items-start shrink-0" style={{ flexShrink: 0 }}>
            <span className="text-purple-200/70 font-semibold uppercase tracking-wider leading-none" style={{ fontSize: '10px', marginBottom: '2px' }}>Download on the</span>
            <span className="font-bold text-white leading-none tracking-tight" style={{ fontSize: '17px' }}>App Store</span>
          </div>
        </button>
      </div>
    </section>
  );
}