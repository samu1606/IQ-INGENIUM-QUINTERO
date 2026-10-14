export interface ContentSchema {
  header: {
    brand: string;
    nav: Array<{ label: string; href: string }>;
    cta: string;
    mobileMenuOpen: string;
    mobileMenuClose: string;
  };
  hero: {
    statusPill: string;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    card1: {
      botName: string;
      onlineStatus: string;
      userMessage: string;
      userTime: string;
      engineTag: string;
      botResponsePrefix: string;
      botResponseHighlight: string;
      botResponseSuffix: string;
      botMeta: string;
      badgeTag: string;
    };
    card2: {
      label: string;
      status: string;
      metric: string;
      caption: string;
      stat1: string;
      stat2: string;
    };
    card3: {
      fileName: string;
      citationLabel: string;
      quote: string;
      verifiedTag: string;
      safetyTag: string;
    };
  };
  sectors: {
    title: string;
    items: string[];
  };
  services: {
    badge: string;
    titleStrong: string;
    titleSuffix: string;
    subtitle: string;
    card1: {
      tag: string;
      title: string;
      description: string;
      pipeline: Array<{
        title: string;
        desc: string;
      }>;
    };
    card2: {
      title: string;
      description: string;
      badgeTitle: string;
      badgeSubtitle: string;
    };
    card3: {
      title: string;
      description: string;
      tags: string[];
    };
    card4: {
      title: string;
      description: string;
      score: string;
      badge: string;
    };
  };
  niches: {
    badge: string;
    titlePrefix: string;
    titleStrong: string;
    titleSuffix: string;
    items: Array<{
      title: string;
      desc: string;
      iconType: 'medical' | 'legal' | 'real_estate' | 'retail' | 'education' | 'b2b' | 'food' | 'support';
    }>;
  };
  process: {
    badge: string;
    titlePrefix: string;
    titleStrong: string;
    subtitle: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
      phase: string;
    }>;
  };
  comparison: {
    badge: string;
    titleStrong: string;
    titleSuffix: string;
    subtitle: string;
    us: {
      title: string;
      tag: string;
      points: string[];
      footer: string;
    };
    others: {
      title: string;
      tag: string;
      points: string[];
      footer: string;
    };
  };
  finalCta: {
    badge: string;
    title: string;
    subtitle: string;
    buttonText: string;
    guarantee: string;
    openFormPrompt: string;
    closeFormPrompt: string;
  };
  leadForm: {
    heading: string;
    subheading: string;
    nameLabel: string;
    namePlaceholder: string;
    businessLabel: string;
    businessPlaceholder: string;
    detailsLabel: string;
    detailsPlaceholder: string;
    submitButton: string;
    submitting: string;
    privacyNote: string;
    errorValidation: string;
  };
  whatsappFab: {
    tooltip: string;
    ariaLabel: string;
    defaultMessage: string;
  };
  footer: {
    brand: string;
    brandDescription: string;
    statusBadge: string;
    contactHeading: string;
    email: string;
    locations: string;
    navHeading: string;
    navLinks: Array<{ label: string; href: string }>;
    copyright: string;
    legalLinks: Array<{ label: string; href: string }>;
  };
}

export const content: ContentSchema = {
  header: {
    brand: "Ingenium Quintero",
    nav: [
      { label: "Servicios", href: "#servicios" },
      { label: "Cómo trabajamos", href: "#como-trabajamos" },
      { label: "Por qué nosotros", href: "#por-que-nosotros" },
      { label: "Contacto", href: "#contacto" },
    ],
    cta: "Diagnóstico gratis",
    mobileMenuOpen: "Abrir menú de navegación",
    mobileMenuClose: "Cerrar menú de navegación",
  },
  hero: {
    statusPill: "Automatización e IA para negocios reales",
    titlePrefix: "Páginas web, ",
    titleHighlight: "bots de WhatsApp con IA",
    titleSuffix: " y automatización para cualquier tipo de negocio.",
    subtitle:
      "Desarrollamos sistemas a medida que atienden clientes, responden documentos y eliminan el trabajo repetitivo sin importar tu país.",
    ctaPrimary: "Agenda tu diagnóstico gratuito",
    ctaSecondary: "Ver servicios",
    card1: {
      botName: "Asistente Clínico IA",
      onlineStatus: "En línea ahora",
      userMessage: "Hola, me gustaría agendar una cita para mañana a las 4pm.",
      userTime: "15:42",
      engineTag: "Ingenium Autonomous Engine",
      botResponsePrefix: "¡Perfecto Carlos! He verificado la disponibilidad y tu cita está reservada para mañana a las ",
      botResponseHighlight: "16:00 hs",
      botResponseSuffix: ". Te envié la confirmación al correo.",
      botMeta: "15:42 · Respondido en 1.2s",
      badgeTag: "Nuevo pedido agendado · Sincronizado a CRM",
    },
    card2: {
      label: "Rendimiento",
      status: "Live 24/7",
      metric: "99.4%",
      caption: "Respuestas en menos de 5 segundos sin intervención humana.",
      stat1: "0 tareas perdidas",
      stat2: "+420h ahorradas/mes",
    },
    card3: {
      fileName: "Expediente_Operativo_2024.pdf",
      citationLabel: "Cita verificada de origen:",
      quote: "“Según la cláusula 14.2 (pág. 48), el plazo de garantía cubre 24 meses sin recargo operativo.”",
      verifiedTag: "Referencia exacta pág. 48",
      safetyTag: "Cero alucinación",
    },
  },
  sectors: {
    title: "Sistemas implementados para empresas de diferentes sectores",
    items: [
      "Clínicas & Salud",
      "Inmobiliarias",
      "Estudios Legales",
      "E-commerce & Retail",
      "Empresas de Logística",
      "Consultorías & B2B",
    ],
  },
  services: {
    badge: "Capacidades Operativas",
    titleStrong: "Cuatro formas",
    titleSuffix: " de dejar de perder tiempo y clientes",
    subtitle: "Arquitectura digital diseñada para captar, cualificar y ejecutar sin cuellos de botella humanos.",
    card1: {
      tag: "Autónomo 24/7/365",
      title: "Tu negocio atiende solo, 24/7",
      description:
        "Responde preguntas frecuentes, califica prospectos en tiempo real, agenda citas y procesa pedidos directo al CRM o canal de WhatsApp. Aunque sean las 3 de la mañana en fin de semana.",
      pipeline: [
        {
          title: "Captación",
          desc: "Entrada simultánea WhatsApp, Web y Redes.",
        },
        {
          title: "Cualificación",
          desc: "Filtra presupuestos y prioriza valor real.",
        },
        {
          title: "Cierre",
          desc: "Citas agendadas y confirmadas en calendario.",
        },
      ],
    },
    card2: {
      title: "Pregúntale a tus documentos",
      description:
        "Lee expedientes, normativas, contratos extensos y manuales técnicos. Tu equipo o clientes obtienen respuestas citando la página exacta con seguridad cifrada.",
      badgeTitle: "Privacidad Zero-Data Retention",
      badgeSubtitle: "Tus datos nunca entrenan modelos de terceros.",
    },
    card3: {
      title: "Que la máquina haga el trabajo repetitivo",
      description:
        "Cotizaciones instantáneas, generación automática de contratos e informes periódicos en segundos. Elimina el cortar y pegar entre hojas de cálculo y correos.",
      tags: ["CRM Auto-Sync", "Invoicing Flow", "Multi-Platform"],
    },
    card4: {
      title: "Páginas web y tiendas que venden 24/7",
      description:
        "Desarrollos web ultrarrápidos, con arquitectura a medida, estética limpia e integración nativa con agentes inteligentes preparados para captar transacciones sin fricción.",
      score: "Lighthouse Score: 99/100",
      badge: "Next-Gen Stack",
    },
  },
  niches: {
    badge: "Adaptabilidad comprobada",
    titlePrefix: "Si tu negocio ",
    titleStrong: "repite tareas",
    titleSuffix: " o pierde mensajes, es para ti",
    items: [
      {
        title: "Clínicas y dentales",
        desc: "Gestión de turnos médicos y recordatorios automáticos.",
        iconType: "medical",
      },
      {
        title: "Despachos legales",
        desc: "Búsqueda veloz en expedientes y cualificación de clientes.",
        iconType: "legal",
      },
      {
        title: "Inmobiliarias",
        desc: "Filtro de requisitos de compradores y agenda de visitas.",
        iconType: "real_estate",
      },
      {
        title: "E-commerce & Retail",
        desc: "Estado de pedidos, resolución de dudas y posventa.",
        iconType: "retail",
      },
      {
        title: "Academias",
        desc: "Matriculación guiada e información de programas 24/7.",
        iconType: "education",
      },
      {
        title: "Servicios B2B",
        desc: "Presupuestos automáticos y seguimiento de leads fríos.",
        iconType: "b2b",
      },
      {
        title: "Restaurantes",
        desc: "Reservas instantáneas y gestión de mesas sin demoras.",
        iconType: "food",
      },
      {
        title: "Soporte saturado",
        desc: "Descongestión del 80% de consultas recurrentes.",
        iconType: "support",
      },
    ],
  },
  process: {
    badge: "Metodología Clara",
    titlePrefix: "Un proceso directo y ",
    titleStrong: "sin sorpresas",
    subtitle: "De la auditoría técnica a la producción operativa sin fricciones.",
    steps: [
      {
        number: "01",
        title: "Diagnóstico gratis",
        description:
          "Analizamos tus cuellos de botella actuales y evaluamos qué procesos tienen mayor ROI al automatizar.",
        phase: "Fase: Descubrimiento",
      },
      {
        number: "02",
        title: "Propuesta y precio fijo",
        description:
          "Definimos el alcance exacto, la tecnología y el presupuesto cerrado. Sin costos ocultos ni letras pequeñas.",
        phase: "Fase: Planificación",
      },
      {
        number: "03",
        title: "Construimos",
        description:
          "Desarrollamos e integramos la solución con tus herramientas actuales (WhatsApp, CRM, correo y bases de datos).",
        phase: "Fase: Integración",
      },
      {
        number: "04",
        title: "Entrega y soporte mensual",
        description:
          "Te capacitamos, ponemos todo en marcha y monitorizamos el rendimiento mes a mes para calibrar respuestas.",
        phase: "Fase: Evolución continua",
      },
    ],
  },
  comparison: {
    badge: "Transparencia Operativa",
    titleStrong: "Lo mejor de una agencia",
    titleSuffix: ", sin lo peor",
    subtitle: "Compara nuestro modelo de ejecución directa frente a los métodos convencionales.",
    us: {
      title: "Con Ingenium Quintero",
      tag: "Estándar Pro",
      points: [
        "Soluciones a medida que funcionan en tus canales reales sin fricción.",
        "Respuestas y plazos garantizados formalmente por contrato.",
        "Precio fijo y transparente pactado desde el primer día.",
        "Soporte proactivo y optimización continua de prompts y datos.",
      ],
      footer: "Disponibilidad y control total",
    },
    others: {
      title: "Otras alternativas",
      tag: "Común",
      points: [
        "Plantillas genéricas que no se adaptan a la lógica de tu negocio.",
        "Semanas enteras de silencio sin saber el avance de tu proyecto.",
        "Tarifas variables que se inflan continuamente por “imprevistos”.",
        "Te entregan archivos sin documentación y desaparecen sin soporte.",
      ],
      footer: "Fricción y horas perdidas",
    },
  },
  finalCta: {
    badge: "Paso Cero",
    title: "Agenda tu diagnóstico gratuito.",
    subtitle:
      "Cuéntanos qué te quita tiempo en el día a día. Te decimos con honestidad técnica si podemos ayudarte y cómo. Sin compromiso alguno.",
    buttonText: "Agendar diagnóstico ahora",
    guarantee: "Sin tarjeta de crédito · 30 minutos de auditoría práctica",
    openFormPrompt: "¿Prefieres escribirnos tu caso en detalle? Completa este breve formulario",
    closeFormPrompt: "Ocultar formulario",
  },
  leadForm: {
    heading: "Cuéntanos sobre tu negocio",
    subheading: "Al enviar, se abrirá WhatsApp con los detalles organizados para responderte de inmediato.",
    nameLabel: "Nombre y apellido",
    namePlaceholder: "Ej. Carlos Martínez",
    businessLabel: "Nombre de tu negocio o sector",
    businessPlaceholder: "Ej. Clínica Dental Sonrisas o Estudio Contable",
    detailsLabel: "¿Qué proceso o tarea quieres automatizar?",
    detailsPlaceholder:
      "Ej. Queremos que un bot califique pacientes por WhatsApp, responda consultas frecuentes y agende citas directamente en Google Calendar...",
    submitButton: "Enviar y continuar en WhatsApp",
    submitting: "Abriendo WhatsApp...",
    privacyNote: "Tus datos son estrictamente confidenciales. Sin spam ni suscripciones.",
    errorValidation: "Por favor completa todos los campos para poder preparar tu propuesta.",
  },
  whatsappFab: {
    tooltip: "¿Hablamos por WhatsApp?",
    ariaLabel: "Contactar a Ingenium Quintero por WhatsApp",
    defaultMessage: "Hola Ingenium Quintero, me gustaría agendar un diagnóstico gratuito para automatizar procesos en mi negocio.",
  },
  footer: {
    brand: "Ingenium Quintero",
    brandDescription:
      "Arquitectura de inteligencia artificial y orquestación de procesos de alto impacto para organizaciones escalables.",
    statusBadge: "Sistemas Operativos 24/7",
    contactHeading: "Contacto Directo",
    email: "contacto@ingeniumquintero.com",
    locations: "Bogotá, Colombia · Trabajo remoto global",
    navHeading: "Navegación",
    navLinks: [
      { label: "Servicios de Automatización", href: "#servicios" },
      { label: "Metodología de Trabajo", href: "#como-trabajamos" },
      { label: "Ventajas y Garantías", href: "#por-que-nosotros" },
      { label: "Auditoría Inicial", href: "#contacto" },
    ],
    copyright: "© 2025 Ingenium Quintero. Todos los derechos reservados.",
    legalLinks: [
      { label: "Privacidad", href: "#" },
      { label: "Términos de Servicio", href: "#" },
      { label: "Seguridad Operativa", href: "#" },
    ],
  },
};


/** Alias que usa content/index.ts como contrato del diccionario. */
export type Dictionary = ContentSchema;
export { content as es };
