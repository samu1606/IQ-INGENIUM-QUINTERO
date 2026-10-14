"use client";

import { useState } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { Niches } from "./Niches";
import { Process } from "./Process";
import { Comparison } from "./Comparison";
import { FinalCta } from "./FinalCta";
import { Footer } from "./Footer";
import { WhatsAppFab } from "./WhatsAppFab";

/**
 * El armazón de la landing. Es un componente de cliente porque mantiene el
 * estado de «abrir el formulario» que comparten el botón del header y el del
 * hero. El contenido igual sale renderizado del servidor: un componente de
 * cliente también se renderiza en el servidor, solo que además hidrata.
 */
export function Landing() {
  const [showLeadForm, setShowLeadForm] = useState(false);

  const handleOpenLeadForm = () => setShowLeadForm(true);

  return (
    <div className="min-h-screen bg-[#f8f9fe] text-[#191c1f] flex flex-col">
      <Header onOpenLeadForm={handleOpenLeadForm} />

      <main className="w-full pt-20 flex-1">
        <Hero onOpenLeadForm={handleOpenLeadForm} />
        <Services />
        <Niches />
        <Process />
        <Comparison />
        <FinalCta showFormInitial={showLeadForm} />
      </main>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
