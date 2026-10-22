import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Eliminación de datos · Ingenium Quintero",
  description:
    "Cómo pedir que borremos los datos que tenemos de usted, qué se elimina, qué se conserva por obligación legal y en cuánto tiempo.",
  alternates: { canonical: `${site.url}/eliminacion-de-datos` },
};

const actualizado = "20 de octubre de 2026";

export default function EliminacionDeDatos() {
  return (
    <main className="w-full bg-white">
      <div className="max-w-[900px] mx-auto px-5 sm:px-8 lg:px-16 py-16 sm:py-24">
        <p className="font-label text-xs uppercase tracking-wider text-[#535d55] font-semibold mb-3">
          Legal
        </p>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#191c1f] mb-3">
          Eliminación de datos
        </h1>
        <p className="font-body text-sm text-[#3b4a3f] mb-10">
          Última actualización: {actualizado}
        </p>

        <div className="flex flex-col gap-8 font-body text-[15px] leading-relaxed text-[#3b4a3f]">
          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              Cómo pedirlo
            </h2>
            <p>Hay dos formas, y cualquiera de las dos sirve:</p>
            <ol className="list-decimal pl-5 flex flex-col gap-2 mt-2">
              <li>
                <strong>Por WhatsApp:</strong> escriba la palabra <strong>BAJA</strong> al número
                desde el que le hemos hablado. El sistema registra la solicitud y una persona la
                confirma.
              </li>
              <li>
                <strong>Por correo:</strong> escriba a{" "}
                <a href={`mailto:${site.email}`} className="text-[#006d3f] underline">
                  {site.email}
                </a>{" "}
                con el asunto <strong>«Eliminación de datos»</strong>, desde el mismo correo o
                número que usó con nosotros.
              </li>
            </ol>
            <p className="mt-3">
              Para poder ubicar sus datos necesitamos el número de teléfono o el correo con el que
              nos contactó. Si no los tenemos, le pediremos un dato que nos permita verificar que
              la solicitud es suya, y nada más.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              Qué eliminamos
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>El historial de conversaciones de WhatsApp asociado a su número.</li>
              <li>El nombre, el negocio y el detalle que dejó en el formulario de la web.</li>
              <li>Cualquier nota interna que hayamos escrito sobre su caso.</li>
            </ul>
            <p className="mt-3">
              Confirmamos la eliminación por el mismo canal por el que recibimos la solicitud.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              En cuánto tiempo
            </h2>
            <p>
              En un plazo máximo de <strong>quince (15) días hábiles</strong>, según los términos
              de la Ley 1581 de 2012. En la práctica suele ser antes.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              Qué no podemos borrar
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>
                <strong>Facturas y soportes contables</strong> de un servicio ya prestado: la ley
                obliga a conservarlos por varios años.
              </li>
              <li>
                <strong>Los mensajes dentro de su propio WhatsApp.</strong> Esa copia vive en su
                teléfono y en la plataforma de Meta; se borra desde la app, no desde aquí.
              </li>
              <li>
                <strong>Registros de seguridad</strong> estrictamente necesarios para demostrar
                que la eliminación se hizo.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-[#191c1f] mb-3">
              Si los datos están en la instalación de un cliente
            </h2>
            <p>
              Cuando el servicio se entrega instalado en la infraestructura de un cliente, los
              datos son de ese cliente y no pasan por nuestros servidores. En ese caso la
              solicitud se dirige a él, y nosotros le ayudamos a tramitarla si nos lo pide.
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
