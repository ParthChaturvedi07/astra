import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SupportedGamesSection from "@/components/SupportedGamesSection";
import TournamentFormatsSection from "@/components/TournamentFormatsSection";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Navbar />
      <HeroSection />
      <SupportedGamesSection />
      <TournamentFormatsSection />
    </main>
  );
}
