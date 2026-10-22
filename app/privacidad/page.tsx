import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad · Ingenium Quintero",
  description:
    "Qué datos tratamos cuando usted escribe por WhatsApp o deja sus datos en esta web, para qué los usamos y cómo ejercer sus derechos.",
  alternates: { canonical: `${site.url}/privacidad` },
};

const actualizado = "20 de octubre de 2026";

export default function Privacidad() {
  return (
    <main className="w-full bg-white">
      <div className="max-w-[900px] mx-auto px-5 sm:px-8 lg:px-16 py-16 sm:py-24">
        <p className="font-label text-xs uppercase tracking-wider text-[#535d55] font-semibold mb-3">
          Legal
        </p>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#191c1f] mb-3">
          Política de privacidad
        </h1>
        <p className="font-body text-sm text-[#3b4a3f] mb-10">
          Última actualización: {actualizado}
        </p>

        <div className="flex flex-col gap-8 font-body text-[15px] leading-relaxed text-[#3b4a3f]">
          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              1. Quién trata sus datos
            </h2>
            <p>
              {site.name} es un servicio de ingeniería y automatización con inteligencia
              artificial que opera desde {site.locations}. Para cualquier asunto relacionado con
              sus datos personales puede escribir a{" "}
              <a href={`mailto:${site.email}`} className="text-[#006d3f] underline">
                {site.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              2. Qué datos tratamos
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>
                <strong>Cuando nos escribe por WhatsApp:</strong> su número de teléfono, el nombre
                con el que aparece en WhatsApp y el contenido de los mensajes que nos envía.
              </li>
              <li>
                <strong>Cuando deja sus datos en esta web:</strong> el nombre, el nombre del
                negocio y el detalle que usted escriba en el formulario.
              </li>
              <li>
                <strong>Datos técnicos del formulario:</strong> la dirección IP y el navegador,
                únicamente para prevenir envíos automatizados y spam.
              </li>
            </ul>
            <p className="mt-3">
              No le pedimos datos de salud, financieros ni documentos de identidad. Si un caso
              concreto los requiere, se los pediremos aparte, con su autorización expresa y
              explicándole para qué.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              3. Para qué los usamos
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Responder a su mensaje y entender qué necesita su negocio.</li>
              <li>Preparar la propuesta o el diagnóstico que usted nos haya pedido.</li>
              <li>Prestar y dar soporte al servicio contratado, si llegamos a un acuerdo.</li>
              <li>Cumplir obligaciones legales, contables y tributarias.</li>
            </ul>
            <p className="mt-3">
              <strong>No usamos sus datos para publicidad de terceros</strong> y no vendemos ni
              alquilamos bases de datos.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              4. Con quién se comparten
            </h2>
            <p>
              Los datos se alojan en proveedores de infraestructura y de modelos de lenguaje que
              actúan como encargados del tratamiento. Los mensajes de WhatsApp pasan por la
              plataforma de Meta, que tiene sus propias políticas. Solo accedemos a lo necesario
              para atenderle y no compartimos su información con terceros ajenos al servicio.
            </p>
            <p className="mt-3">
              Cuando un cliente contrata una instalación en su propia infraestructura, los datos
              quedan en los servidores del cliente y no pasan por los nuestros.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              5. Cuánto tiempo los guardamos
            </h2>
            <p>
              Las conversaciones se conservan mientras dure la relación comercial y hasta un año
              después, salvo que usted pida su eliminación antes. Los datos de facturación se
              conservan por el tiempo que exija la ley contable y tributaria colombiana.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              6. Sus derechos
            </h2>
            <p>
              De acuerdo con la Ley 1581 de 2012 y el Decreto 1377 de 2013, usted puede conocer,
              actualizar, rectificar y pedir la supresión de sus datos, así como revocar la
              autorización que nos dio. Para ejercerlos escriba a{" "}
              <a href={`mailto:${site.email}`} className="text-[#006d3f] underline">
                {site.email}
              </a>{" "}
              indicando qué derecho quiere ejercer. Respondemos en los términos legales y, si
              pide la supresión, el procedimiento está descrito en{" "}
              <Link href="/eliminacion-de-datos" className="text-[#006d3f] underline">
                eliminación de datos
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              7. Seguridad
            </h2>
            <p>
              Las credenciales se guardan cifradas o con permisos restringidos, el acceso a los
              servidores es por red privada y las conversaciones se registran sin exponer datos
              sensibles. Si ocurriera un incidente que afecte sus datos, se lo comunicaríamos por
              el mismo canal por el que hablamos.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              8. Cambios en esta política
            </h2>
            <p>
              Si esta política cambia, se publica aquí con su fecha. El uso del servicio después
              de una actualización implica que la conoce.
            </p>
          </section>

          <div className="pt-6 border-t border-[#b9cbbc]/40 flex flex-wrap gap-4">
            <Link href="/" className="font-display text-sm font-semibold text-[#006d3f]">
              ← Volver al inicio
            </Link>
            <Link
              href="/eliminacion-de-datos"
              className="font-display text-sm font-semibold text-[#006d3f]"
            >
              Eliminación de datos →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
