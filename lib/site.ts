export const site = {
  name: "Ingenium Quintero",
  // El respaldo apuntaba a ingeniumquintero.com, un dominio que NO está
  // registrado (verificado: whois "No match for domain"). Como el despliegue no
  // fija NEXT_PUBLIC_SITE_URL, ese valor inexistente salía en la página viva:
  // canonical, og:url y og:image apuntaban a un dominio que no resuelve.
  //
  // No es un detalle cosmético. El canonical le dice a Google que la versión
  // real de la página está en un dominio que no existe, y og:image roto deja
  // sin previsualización cualquier enlace compartido por WhatsApp — que es el
  // canal por el que llegan los clientes.
  //
  // El respaldo ahora es el dominio donde la landing vive de verdad. Cuando se
  // compre ingeniumquintero.com, basta con fijar NEXT_PUBLIC_SITE_URL en el
  // docker-compose.deploy.yml: no hay que tocar este archivo.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://iq.elingesmartgrids.cloud",
  whatsappNumber: "573106055920",
  whatsappDisplay: "+57 310 605 5920",
  email: "contacto@ingeniumquintero.com",
  locations: "Bogotá, Colombia · Trabajo remoto global",
};

export function whatsappLink(message?: string): string {
  const query = message && message.trim().length > 0 ? `?text=${encodeURIComponent(message.trim())}` : "";
  return `https://wa.me/${site.whatsappNumber}${query}`;
}
