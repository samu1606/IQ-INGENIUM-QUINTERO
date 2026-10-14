import React, { useState } from "react";
import { Header } from "./components/Header.tsx";
import { Hero } from "./components/Hero.tsx";
import { Services } from "./components/Services.tsx";
import { Niches } from "./components/Niches.tsx";
import { Process } from "./components/Process.tsx";
import { Comparison } from "./components/Comparison.tsx";
import { FinalCta } from "./components/FinalCta.tsx";
import { Footer } from "./components/Footer.tsx";
import { WhatsAppFab } from "./components/WhatsAppFab.tsx";

export default function App() {
  const [showLeadForm, setShowLeadForm] = useState(false);

  const handleOpenLeadForm = () => {
    setShowLeadForm(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fe] text-[#191c1f] flex flex-col selection:bg-[#26ff9d] selection:text-[#191c1f]">
      {/* Fixed Sticky Header */}
      <Header onOpenLeadForm={handleOpenLeadForm} />

      {/* Main Content Area */}
      <main className="w-full pt-20 flex-1">
        <Hero onOpenLeadForm={handleOpenLeadForm} />
        <Services />
        <Niches />
        <Process />
        <Comparison />
        <FinalCta showFormInitial={showLeadForm} />
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Floating Action Button */}
      <WhatsAppFab />
    </div>
  );
}
