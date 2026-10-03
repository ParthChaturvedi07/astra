import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SupportedGamesSection from "@/components/SupportedGamesSection";
import TournamentFormatsSection from "@/components/TournamentFormatsSection";
import DynamicStreamingSection from "@/components/DynamicStreamingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Navbar />
      <HeroSection />
      <SupportedGamesSection />
      <TournamentFormatsSection />
      <DynamicStreamingSection />
      <Footer />
    </main>
  );
}
