import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SupportedGamesSection from "@/components/SupportedGamesSection";
import TournamentFormatsSection from "@/components/TournamentFormatsSection";
import HowToPlaySection from "@/components/HowToPlaySection";
import PlayWinWithdrawSection from "@/components/PlayWinWithdrawSection";
import DynamicStreamingSection from "@/components/DynamicStreamingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Navbar />
      <HeroSection />
      <SupportedGamesSection />
      <PlayWinWithdrawSection />
      <TournamentFormatsSection />
      <HowToPlaySection />
      <DynamicStreamingSection />
      <TestimonialsSection />
      {/* <ContactSection /> */}
      <Footer />
    </main>
  );
}
