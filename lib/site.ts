export const site = {
  name: "Ingenium Quintero",
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
