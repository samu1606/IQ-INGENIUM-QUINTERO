export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ingeniumquintero.com",
  whatsappNumber: "573106055920",
  whatsappDisplay: "+57 310 605 5920",
};

/** Construye un enlace wa.me con el mensaje ya escrito. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
