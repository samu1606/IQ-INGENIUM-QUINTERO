import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Condiciones del servicio · Ingenium Quintero",
  description:
    "Qué incluye el servicio, qué se compromete a hacer cada parte, cómo funciona el pago y qué límites tiene el uso de los agentes de IA.",
  alternates: { canonical: `${site.url}/terminos` },
};

const actualizado = "20 de octubre de 2026";

export default function Terminos() {
  return (
    <main className="w-full bg-white">
      <div className="max-w-[900px] mx-auto px-5 sm:px-8 lg:px-16 py-16 sm:py-24">
        <p className="font-label text-xs uppercase tracking-wider text-[#535d55] font-semibold mb-3">
          Legal
        </p>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#191c1f] mb-3">
          Condiciones del servicio
        </h1>
        <p className="font-body text-sm text-[#3b4a3f] mb-10">
          Última actualización: {actualizado}
        </p>

        <div className="flex flex-col gap-8 font-body text-[15px] leading-relaxed text-[#3b4a3f]">
          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              1. Quién presta el servicio
            </h2>
            <p>
              {site.name} presta servicios de automatización e inteligencia artificial para
              negocios desde {site.locations}. El contacto para cualquier asunto contractual es{" "}
              <a href={`mailto:${site.email}`} className="text-[#006d3f] underline">
                {site.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              2. Qué se contrata
            </h2>
            <p>
              El alcance de cada trabajo se acuerda <strong>por escrito</strong> antes de empezar:
              qué se construye, qué incluye el soporte, qué queda fuera y cuánto cuesta. Lo que no
              esté en esa propuesta no hace parte del servicio, aunque se haya conversado por
              WhatsApp.
            </p>
            <p className="mt-3">
              Los precios no se publican en este sitio porque dependen del alcance. Cualquier cifra
              válida es la que aparezca en la propuesta firmada o aceptada por escrito.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              3. Qué hace el cliente
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Entregar a tiempo la información y los accesos necesarios.</li>
              <li>
                Tramitar ante Meta la verificación de su cuenta de WhatsApp Business y mantenerla
                en regla. Los tiempos de esa revisión son de Meta, no nuestros.
              </li>
              <li>
                Usar el servicio conforme a las políticas de WhatsApp y a la ley colombiana, en
                especial en el tratamiento de datos de sus propios clientes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              4. Límites de la inteligencia artificial
            </h2>
            <p>
              Los agentes responden con base en la información y las instrucciones que se les dan.
              <strong> No garantizamos que acierten el 100% de las veces</strong>: por eso todo
              flujo que pase a una persona queda marcado, y se recomienda revisar las conversaciones
              sensibles. El servicio no sustituye asesoría médica, legal, tributaria ni de
              ingeniería, y no debe usarse para emitirla.
            </p>
            <p className="mt-3">
              Tampoco garantizamos disponibilidad ininterrumpida: dependemos de plataformas de
              terceros (Meta, proveedores de modelos, hosting) que pueden fallar o cambiar sus
              condiciones.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              5. Pago
            </h2>
            <p>
              La forma de pago, los hitos y la periodicidad se acuerdan en la propuesta. Los
              trabajos de instalación se cobran contra entrega; el acompañamiento mensual, por
              período vencido o anticipado según se acuerde. La falta de pago puede suspender el
              servicio avisando por escrito.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              6. Propiedad
            </h2>
            <p>
              El cliente es dueño de sus datos, de sus cuentas y de su contenido. La configuración,
              los flujos y las instrucciones hechas a su medida se entregan con el trabajo pagado.
              El código y las herramientas propias que {site.name} reutiliza entre clientes siguen
              siendo suyos; el cliente recibe el derecho de uso sobre la instalación entregada.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              7. Confidencialidad
            </h2>
            <p>
              La información del negocio del cliente se trata como confidencial. No se publican
              casos, cifras ni nombres de clientes sin autorización escrita.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              8. Terminación
            </h2>
            <p>
              Cualquiera de las partes puede terminar el servicio avisando por escrito con treinta
              (30) días de antelación. Al terminar, se entrega lo que esté pago y se devuelven o
              eliminan los accesos del cliente, según lo pida.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              9. Ley aplicable
            </h2>
            <p>
              Estas condiciones se rigen por la ley colombiana. Cualquier controversia se intenta
              resolver de buena fe y, si no es posible, ante los jueces competentes en Colombia.
            </p>
          </section>

          <div className="pt-6 border-t border-[#b9cbbc]/40 flex flex-wrap gap-4">
            <Link href="/" className="font-display text-sm font-semibold text-[#006d3f]">
              ← Volver al inicio
            </Link>
            <Link href="/privacidad" className="font-display text-sm font-semibold text-[#006d3f]">
              Política de privacidad →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
