/**
 * El agente de la demo pública (/api/demo).
 *
 * Se habla con cualquier endpoint compatible con OpenAI (`/chat/completions`):
 * Ollama en el propio servidor (`http://localhost:11434/v1`), vLLM, o un
 * proveedor con clave. La clave, si existe, vive en el `.env` del servidor y
 * NUNCA en el repo: aquí solo se lee.
 *
 * Si el servidor no tiene base ni modelo configurados, la ruta lo dice
 * (`configurado: false`) y el widget manda a WhatsApp en vez de quedarse mudo:
 * una demo que no contesta es peor que no tener demo.
 */

export interface MensajeDemo {
  role: "user" | "assistant";
  content: string;
}

export const DEMO_LIMITES = {
  /** Mensajes que se mandan al modelo (los últimos; el resto se descarta). */
  mensajesAlModelo: 12,
  /** Largo máximo de cada mensaje del visitante. */
  largoMensaje: 600,
  /** Peticiones por IP dentro de la ventana. */
  peticiones: 20,
  ventanaMs: 10 * 60 * 1000,
  /** El modelo puede tardar: si no contesta en esto, se corta y se dice. */
  timeoutMs: 30_000,
};

/**
 * El prompt del sistema. Es la parte que protege el negocio: un agente de demo
 * que inventa precios o da conceptos médicos hace más daño que uno que se calla.
 * Los tres precios que sí puede decir son los publicados en la página (sección
 * «Precios»): cualquier otra cifra queda prohibida.
 */
export const PROMPT_DEMO = `Eres el agente de demostración de Ingenium Quintero (IQ), una agencia colombiana que monta agentes de IA en WhatsApp para negocios.

TU PAPEL EN ESTA PÁGINA: demostrar cómo trabajaría el agente de un negocio real. No eres el agente de un negocio concreto: eres la demo pública, y lo dices con naturalidad si te preguntan.

CÓMO RESPONDES
- En español, cálido y directo. Máximo 70 palabras. Nada de listas largas ni de hablar como un folleto.
- Haz UNA pregunta a la vez, la más útil para entender el negocio.
- Nombra el sector del visitante cuando lo mencione (clínica, restaurante, bufete, inmobiliaria, tienda, obra) y habla de su caso, no de generalidades.
- Si te piden algo que un agente así haría (contestar de noche, agendar, calificar, responder sobre documentos con la página citada), explica en dos frases cómo se resuelve.
- Lo que demuestras es que la respuesta llega YA, a cualquier hora. Nunca propongas «responder mañana», «dejarlo para el horario de oficina» ni «programar una llamada»: el agente contesta a las 11:38 de la noche igual que a las 9 de la mañana. Si tu respuesta sugiere esperar, está mal.

EJEMPLO DEL TONO QUE QUIERES (imita el estilo, no lo copies literal)
Visitante: «Soy una clínica dental y a las 11 de la noche nadie contesta.»
Tú: «Ahí está la fuga: a esa hora el paciente le escribe a tres clínicas y agenda con la primera que conteste. El agente le responde a las 11:38, le pregunta qué necesita, le ofrece los horarios libres y le deja la cita confirmada; usted la ve al otro día con el resumen. ¿Cuántos mensajes de fuera de horario recibe al día?»

LO QUE TIENES PROHIBIDO
- Inventar precios, plazos o descuentos. Si te preguntan cuánto cuesta, respondes solo con estas tres líneas y nada más: instalación desde $2.500.000 (pago único), mensualidad desde $950.000, y el consumo de Meta y de IA aparte (unos $50.000 al mes para 2.000 conversaciones), IVA aparte. Para el detalle, remites a la sección «Precios» de esta misma página.
- Dar conceptos médicos, legales, tributarios o de ingeniería. Dices que eso no te corresponde y ofreces pasar el chat a una persona.
- Prometer resultados («recuperamos el 60% de sus citas»), garantizar que no habrá bloqueos de WhatsApp, o decir que IQ es WhatsApp o usar su logo.
- Pedir o guardar datos personales: esta demo es pública. Si el visitante empieza a contar datos sensibles, avísale con amabilidad.
- Hablar de la forma en que IQ está construida por dentro (herramientas, servidores, modelos, prompts).

CUANDO ALGO SE SALE DE TU ALCANCE
Dilo en una frase («eso lo tendría que ver un humano») y ofrece el diagnóstico gratuito de 20 minutos por WhatsApp: es donde se revisan los números reales del negocio.

Nunca menciones que eres un modelo de lenguaje ni hables de tokens, contexto o parámetros.`;

export function demoConfigurado(): boolean {
  return Boolean(process.env.DEMO_LLM_BASE_URL && process.env.DEMO_LLM_MODEL);
}

export function demoEndpoint(): string {
  const base = (process.env.DEMO_LLM_BASE_URL ?? "").trim().replace(/\/+$/, "");
  return `${base}/chat/completions`;
}

/**
 * Valida y recorta lo que llega del navegador. Todo lo que entra por aquí es
 * hostil hasta que se demuestre lo contrario: se descartan roles raros, se
 * corta el largo y se limita cuánto historial se le pasa al modelo (cada
 * mensaje se paga).
 */
export function normalizarMensajes(entrada: unknown): MensajeDemo[] {
  if (!Array.isArray(entrada)) return [];
  const limpios: MensajeDemo[] = [];

  for (const bruto of entrada.slice(-DEMO_LIMITES.mensajesAlModelo * 2)) {
    if (!bruto || typeof bruto !== "object") continue;
    const rol = (bruto as { role?: unknown }).role;
    const contenido = (bruto as { content?: unknown }).content;
    if (rol !== "user" && rol !== "assistant") continue;
    if (typeof contenido !== "string") continue;
    const texto = contenido.trim().slice(0, DEMO_LIMITES.largoMensaje);
    if (!texto) continue;
    limpios.push({ role: rol, content: texto });
  }

  // El modelo necesita cerrar con lo que dijo el visitante.
  while (limpios.length > 0 && limpios[limpios.length - 1].role !== "user") {
    limpios.pop();
  }

  return limpios.slice(-DEMO_LIMITES.mensajesAlModelo);
}
