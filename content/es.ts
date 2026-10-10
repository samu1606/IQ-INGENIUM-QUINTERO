/**
 * Todos los textos del sitio viven aquí.
 * Para añadir inglés: crear `content/en.ts` con el mismo tipo `Dictionary`
 * y registrarlo en `content/index.ts`.
 */

export type NicheIcon =
  | "utensils"
  | "store"
  | "hotel"
  | "stethoscope"
  | "scale"
  | "building"
  | "hardHat"
  | "graduationCap"
  | "briefcase"
  | "workflow";

export type ServiceId = "bot" | "docs" | "automation" | "web";

export const es = {
  meta: {
    title: "Ingenium Quintero | Bots de WhatsApp con IA, automatización y webs",
    description:
      "Tu negocio atendiendo solo, 24/7. Bots de WhatsApp con IA, asistentes sobre tus documentos, automatización de procesos y páginas web para cualquier negocio, en cualquier país.",
    ogAlt: "Ingenium Quintero — Tu negocio atendiendo solo, 24/7",
  },

  brand: {
    name: "Ingenium Quintero",
    short: "IQ",
    logoAlt: "Logo de Ingenium Quintero, monograma IQ",
  },

  nav: {
    links: [
      { href: "#servicios", label: "Servicios" },
      { href: "#para-quien", label: "Para quién" },
      { href: "#como-trabajamos", label: "Cómo trabajamos" },
      { href: "#por-que", label: "Por qué IQ" },
    ],
    cta: "Escríbenos",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    skip: "Saltar al contenido",
  },

  whatsapp: {
    floatingLabel: "Hablar por WhatsApp",
    defaultMessage:
      "Hola, vi su página y quiero saber cómo pueden ayudar a mi negocio.",
  },

  hero: {
    badge: "Atención y procesos en piloto automático",
    titleStart: "Tu negocio atendiendo solo,",
    titleAccent: "24/7",
    subtitle:
      "Páginas web, bots de WhatsApp con IA y automatización para cualquier tipo de negocio, en cualquier país.",
    primaryCta: "Ver servicios",
    whatsappCta: "Hablar por WhatsApp",
    imageAlt:
      "Flujos de luz verde que recorren paneles digitales, representando automatización y velocidad",
    proof: [
      "Diagnóstico gratis",
      "Precio fijo antes de empezar",
      "Soporte mensual",
    ],
    floatingCard: {
      title: "Nuevo pedido agendado",
      subtitle: "Respondido en segundos · 03:14",
    },
  },

  services: {
    eyebrow: "Servicios Principales",
    title: "Cuatro formas de dejar de perder tiempo y clientes",
    subtitle:
      "Elige por dónde empezar. Lo construimos a la medida de tu negocio y lo dejamos funcionando.",
    includesLabel: "Incluye",
    items: [
      {
        id: "bot" as ServiceId,
        tag: "Bot de WhatsApp con IA",
        title: "Tu negocio atiende solo, 24/7",
        description:
          "Responde preguntas, califica clientes, agenda citas y toma pedidos. Aunque sean las 3 de la mañana.",
        includes: [
          "Tu número de WhatsApp conectado",
          "Entrenado con la información de tu negocio",
          "Panel para que una persona tome la conversación",
          "Reportes de conversaciones y ventas",
        ],
        cta: "Quiero mi bot de WhatsApp",
        whatsappMessage:
          "Hola, me interesa un bot de WhatsApp con IA para mi negocio.",
        image: "/service-bot.jpg",
        imageAlt:
          "Teléfono con una conversación de WhatsApp respondida automáticamente con texto real en español",
      },
      {
        id: "docs" as ServiceId,
        tag: "Asistente IA sobre tus documentos",
        title: "Pregúntale a tus documentos",
        description:
          "Lee expedientes, normativa y manuales, y responde citando la página exacta. Privado.",
        includes: [
          "Carga de tus documentos",
          "Asistente entrenado con tu información",
          "Respuestas con la fuente citada",
          "Tus datos no salen de tu empresa",
        ],
        cta: "Quiero mi asistente",
        whatsappMessage:
          "Hola, me interesa un asistente con IA que responda sobre mis documentos.",
        image: "/service-docs.jpg",
        imageAlt:
          "Documentos y carpetas conectados con hilos de luz a un asistente central, dentro de un escudo de privacidad",
      },
      {
        id: "automation" as ServiceId,
        tag: "Automatización de procesos",
        title: "Que la máquina haga el trabajo repetitivo",
        description:
          "Cotizaciones, informes, seguimiento y reportes. Automáticos, sin copiar y pegar.",
        includes: [
          "Flujos hechos a la medida",
          "Integración con los sistemas que ya usas",
          "Alertas cuando algo necesita tu atención",
          "Panel de control para verlo todo",
        ],
        cta: "Quiero automatizar",
        whatsappMessage:
          "Hola, quiero automatizar procesos repetitivos de mi negocio.",
        image: "/service-automation.jpg",
        imageAlt:
          "Engranajes y tareas conectadas en un flujo de trabajo automático",
      },
      {
        id: "web" as ServiceId,
        tag: "Páginas Web & E-commerce",
        title: "Páginas web y tiendas online que venden 24/7",
        description:
          "Desde una landing page de alta conversión hasta una tienda online completa. Rápida, optimizada para celular y pensada para convertir visitas en ventas.",
        includes: [
          "Diseño moderno y 100% a la medida",
          "Optimizado para celular y posicionamiento en Google",
          "Integración directa con WhatsApp y pasarelas de pago",
          "Velocidad de carga ultra rápida y panel administrable",
        ],
        cta: "Quiero mi página web",
        whatsappMessage:
          "Hola, necesito una página web o tienda online para mi negocio.",
        image: "/service-web.jpg",
        imageAlt:
          "Sitio web moderno y tienda online desplegada en laptop y teléfono con tablero de ventas",
      },
    ],
  },

  web: {
    eyebrow: "Puerta de entrada",
    title: "¿Solo necesitas la web? También la hacemos.",
    description:
      "Desde una landing para captar clientes hasta una tienda online completa. Rápida, lista para celular y pensada para vender.",
    points: ["Landing pages", "Webs corporativas", "Tiendas online"],
    cta: "Cotizar mi web",
    whatsappMessage: "Hola, necesito una página web para mi negocio.",
  },

  niches: {
    eyebrow: "Para quién",
    title: "Si tu negocio repite tareas o pierde mensajes, es para ti",
    items: [
      {
        icon: "utensils" as NicheIcon,
        sector: "Restaurantes",
        pain: "Pedidos y reservas por WhatsApp sin que nadie se quede sin respuesta.",
      },
      {
        icon: "store" as NicheIcon,
        sector: "Tiendas y comercio",
        pain: "Precios, stock y envíos respondidos al instante, incluso de noche.",
      },
      {
        icon: "hotel" as NicheIcon,
        sector: "Hoteles",
        pain: "Disponibilidad y reservas atendidas en cualquier idioma y horario.",
      },
      {
        icon: "stethoscope" as NicheIcon,
        sector: "Clínicas y consultorios",
        pain: "Citas agendadas y recordatorios automáticos, menos ausencias.",
      },
      {
        icon: "scale" as NicheIcon,
        sector: "Abogados y contadores",
        pain: "Encuentra la cláusula o la norma en segundos, no en horas.",
      },
      {
        icon: "building" as NicheIcon,
        sector: "Inmobiliarias",
        pain: "Filtra a los interesados reales antes de agendar una visita.",
      },
      {
        icon: "hardHat" as NicheIcon,
        sector: "Constructoras e ingeniería",
        pain: "Cotizaciones e informes de obra sin rehacer planillas cada semana.",
      },
      {
        icon: "graduationCap" as NicheIcon,
        sector: "Colegios y academias",
        pain: "Inscripciones y dudas de padres y alumnos resueltas al momento.",
      },
      {
        icon: "briefcase" as NicheIcon,
        sector: "Profesionales independientes",
        pain: "Deja de contestar lo mismo y dedica tu tiempo a trabajar.",
      },
      {
        icon: "workflow" as NicheIcon,
        sector: "Empresas con procesos manuales",
        pain: "Elimina el copiar y pegar entre hojas de cálculo y correos.",
      },
    ],
  },

  process: {
    eyebrow: "Cómo trabajamos",
    title: "Simple, claro y sin sorpresas",
    steps: [
      {
        title: "Diagnóstico gratis",
        description:
          "Por WhatsApp o llamada. Entendemos qué te quita tiempo y clientes.",
      },
      {
        title: "Propuesta y precio fijo",
        description:
          "Te decimos qué haremos y cuánto cuesta. Sin letra pequeña ni cobros extra.",
      },
      {
        title: "Construimos",
        description:
          "Lo desarrollamos con tu información y te mostramos avances en el camino.",
      },
      {
        title: "Entrega y soporte mensual",
        description:
          "Lo dejamos funcionando, te enseñamos a usarlo y seguimos contigo cada mes.",
      },
    ],
  },

  comparison: {
    eyebrow: "Por qué Ingenium Quintero",
    title: "Lo mejor de una agencia, sin lo peor",
    columns: {
      feature: "Criterio",
      us: "Ingenium Quintero",
      agency: "Agencia tradicional",
      diy: "Hacerlo por tu cuenta",
    },
    rows: [
      {
        feature: "Velocidad",
        us: { ok: true, text: "Entregas ágiles, por etapas" },
        agency: { ok: false, text: "Meses de reuniones" },
        diy: { ok: false, text: "Depende de tu tiempo libre" },
      },
      {
        feature: "Garantía",
        us: { ok: true, text: "Ajustamos hasta que funcione" },
        agency: { ok: false, text: "Cambios con costo extra" },
        diy: { ok: false, text: "Ninguna" },
      },
      {
        feature: "Soporte",
        us: { ok: true, text: "Mensual y por WhatsApp" },
        agency: { ok: false, text: "Por ticket y con demora" },
        diy: { ok: false, text: "Foros y tutoriales" },
      },
      {
        feature: "Precio claro",
        us: { ok: true, text: "Precio fijo antes de empezar" },
        agency: { ok: false, text: "Presupuestos que crecen" },
        diy: { ok: false, text: "Costos ocultos y suscripciones" },
      },
      {
        feature: "Tecnología IA",
        us: { ok: true, text: "IA aplicada a tu negocio" },
        agency: { ok: false, text: "Rara vez incluida" },
        diy: { ok: false, text: "Difícil de configurar bien" },
      },
    ],
  },

  finalCta: {
    eyebrow: "Empieza hoy",
    title: "Agenda tu diagnóstico gratuito",
    subtitle:
      "Cuéntanos qué te quita tiempo. Te decimos si podemos ayudarte y cómo. Sin compromiso.",
    button: "Agendar por WhatsApp",
    note: "Diagnóstico inicial · Sin compromiso · Sin costo",
    whatsappMessage:
      "Hola, quiero agendar mi diagnóstico gratuito.",
    form: {
      title: "¿Prefieres que te escribamos?",
      nameLabel: "Tu nombre",
      namePlaceholder: "Ej. Laura Gómez",
      phoneLabel: "Tu WhatsApp",
      phonePlaceholder: "Con código de país, ej. +34 600 000 000",
      submit: "Abrir conversación",
      note: "Se abrirá WhatsApp con tu mensaje listo para enviar.",
      errorName: "Escribe tu nombre.",
      errorPhone: "Escribe un número válido con código de país.",
      /** {name} y {phone} se reemplazan en tiempo de ejecución */
      messageTemplate:
        "Hola, soy {name}. Mi WhatsApp es {phone}. Quiero agendar mi diagnóstico gratuito.",
    },
  },

  footer: {
    tagline: "Webs, bots de WhatsApp con IA y automatización para negocios que quieren crecer sin trabajar más horas.",
    contactTitle: "Contacto",
    whatsappLabel: "WhatsApp",
    emailLabel: "Correo",
    email: "hola@ingeniumquintero.com",
    socialTitle: "Redes",
    /** Reemplazar "#" por las URLs reales cuando existan */
    social: [
      { name: "Instagram", href: "#", icon: "instagram" as const },
      { name: "LinkedIn", href: "#", icon: "linkedin" as const },
      { name: "Facebook", href: "#", icon: "facebook" as const },
    ],
    linksTitle: "Navegación",
    rights: "Todos los derechos reservados.",
  },
};

export type Dictionary = typeof es;
