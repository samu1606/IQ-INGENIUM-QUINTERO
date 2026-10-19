export const site = {
  name: "Ingenium Quintero",
  // El dominio propio. El respaldo apuntaba antes al subdominio donde la
  // landing vivía (iq.elingesmartgrids.cloud) porque ingeniumquintero.com no
  // estaba registrado; desde que existe, el respaldo es el dominio de verdad:
  // así, si un día el despliegue se olvida de fijar NEXT_PUBLIC_SITE_URL, el
  // canonical y las previsualizaciones de WhatsApp siguen saliendo bien.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ingeniumquintero.com",
  whatsappNumber: "573106055920",
  whatsappDisplay: "+57 310 605 5920",
  email: "contacto@ingeniumquintero.com",
  locations: "Bogotá, Colombia · Trabajo remoto global",
};

export function whatsappLink(message?: string): string {
  const query = message && message.trim().length > 0 ? `?text=${encodeURIComponent(message.trim())}` : "";
  return `https://wa.me/${site.whatsappNumber}${query}`;
}
