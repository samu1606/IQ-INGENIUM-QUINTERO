export const site = {
  name: "Ingenium Quintero",
  url: "https://ingeniumquintero.com",
  whatsappNumber: "573106055920",
  whatsappDisplay: "+57 310 605 5920",
  email: "contacto@ingeniumquintero.com",
  locations: "Madrid · Ciudad de México · Remoto Global",
};

export function whatsappLink(message?: string): string {
  const query = message && message.trim().length > 0 ? `?text=${encodeURIComponent(message.trim())}` : "";
  return `https://wa.me/${site.whatsappNumber}${query}`;
}
