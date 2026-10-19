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
  /**
   * Casos. Hoy hay UNO y es propio: elInge Smart Grids, en producción en
   * elingesmartgrids.cloud. Las cifras que se publican aquí están verificadas
   * contra el código de producción y contra la API viva (438 pruebas, 22
   * cálculos, 24 literales, 3 normas) — la fecha va en `evidence.verifiedOn`.
   * Regla: si un dato no se puede comprobar, no se escribe; y no se inventan
   * casos para llenar la sección.
   */
  casos: {
    badge: string;
    titleStrong: string;
    titleSuffix: string;
    subtitle: string;
    caseTag: string;
    caseTitle: string;
    caseSubtitle: string;
    description: string;
    siteLabel: string;
    siteUrl: string;
    highlights: Array<{ title: string; desc: string }>;
    stats: Array<{ value: string; label: string; source: string }>;
    ctaLabel: string;
    ctaMessage: string;
    evidence: {
      badge: string;
      title: string;
      note: string;
      requestLabel: string;
      request: string;
      responseLabel: string;
      response: Array<{ key: string; value: string }>;
      testLabel: string;
      test: string;
      verifiedOn: string;
    };
    honesty: string;
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
  /**
   * Cómo se cobra. Los tres renglones —instalación, mensualidad y consumo— pero
   * SIN cifras: los números van en la propuesta, con el alcance cerrado.
   *
   * La versión anterior publicaba las cifras del precio de campaña y la
   * comparación contra el puesto de recepción. Edwin pidió quitarlo: el precio
   * publicado ata la negociación y el ancla de la recepcionista vive mejor en
   * la campaña y en el diagnóstico que en la página. Lo que se conserva es la
   * promesa de transparencia, que es lo que el prospecto quiere saber aquí.
   */
  pricing: {
    badge: string;
    titleStrong: string;
    titleSuffix: string;
    subtitle: string;
    lines: Array<{
      label: string;
      headline: string;
      detail: string;
      tag: string;
    }>;
    notes: string[];
    offer: {
      badge: string;
      title: string;
      detail: string;
      footnote: string;
    };
    cta: string;
  };
  /**
   * La demo. El agente contesta de verdad desde /api/demo: si el servidor no
   * tiene modelo conectado, el widget lo dice y manda a WhatsApp en vez de
   * quedarse mudo.
   */
  demo: {
    badge: string;
    titleStrong: string;
    titleSuffix: string;
    subtitle: string;
    placeholder: string;
    sendLabel: string;
    thinking: string;
    intro: string;
    suggestions: string[];
    notConfigured: string;
    errorMsg: string;
    limitMsg: string;
    guardrails: string;
    privacy: string;
    ctaLabel: string;
  };
  footer: {
    brand: string;
    brandDescription: string;
    statusBadge: string;
    contactHeading: string;
    email: string;
    locations: string;
    /** Se muestran solo si hay redes cargadas: un enlace vacío es peor que no tenerlo. */
    socialHeading: string;
    socials: Array<{ label: string; href: string }>;
    navHeading: string;
    navLinks: Array<{ label: string; href: string }>;
    copyright: string;
  };
}

export const content: ContentSchema = {
  header: {
    brand: "Ingenium Quintero",
    nav: [
      { label: "Servicios", href: "#servicios" },
      { label: "Cómo se cobra", href: "#precios" },
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
    titleHighlight: "bots y CRM de WhatsApp con IA",
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
      botResponseHighlight: "16:00",
      botResponseSuffix: ". Te envié la confirmación al correo.",
      botMeta: "15:42 · Respondido en 1.2s",
      badgeTag: "Nuevo pedido agendado · Sincronizado a CRM",
    },
    card2: {
      label: "Rendimiento",
      status: "Live 24/7",
      metric: "24/7",
      caption: "Ejemplo de tablero. En producción las cifras dependen de tu operación.",
      stat1: "Nada sin responder",
      stat2: "Horas que recupera tu equipo",
    },
    card3: {
      fileName: "Expediente_Operativo_2024.pdf",
      citationLabel: "Cita verificada de origen:",
      quote: "“Según la cláusula 14.2 (pág. 48), el plazo de garantía cubre 24 meses sin recargo operativo.”",
      verifiedTag: "Referencia exacta pág. 48",
      safetyTag: "Cita la fuente exacta",
    },
  },
  sectors: {
    // Decía «Sistemas implementados para empresas de diferentes sectores». Hoy no
    // hay ninguna implementación todavía: eso es lo que un prospecto pregunta en
    // la primera llamada y se cae la credibilidad entera. Los sectores sí son
    // ciertos (es donde aplica el sistema), lo que sobraba era «implementados».
    title: "Sectores donde aplicamos estos sistemas",
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
      tag: "Bots y CRM · 24/7/365",
      title: "Tu negocio atiende solo, 24/7",
      description:
        "Bots de WhatsApp con IA que responden, califican y agendan solos — y un CRM donde queda cada conversación, cada cliente y cada seguimiento. Aunque sean las 3 de la mañana en fin de semana.",
      pipeline: [
        {
          title: "Captación",
          desc: "El bot recibe en WhatsApp, Web y Redes.",
        },
        {
          title: "Cualificación",
          desc: "Filtra presupuestos y prioriza valor real.",
        },
        {
          title: "CRM y cierre",
          desc: "Cada lead queda en el pipeline, con su cita agendada.",
        },
      ],
    },
    card2: {
      title: "Pregúntale a tus documentos",
      description:
        "Lee expedientes, normativas, contratos extensos y manuales técnicos. Tu equipo o clientes obtienen respuestas citando la página exacta con seguridad cifrada.",
      badgeTitle: "Tus documentos, en tu instalación",
      badgeSubtitle: "Corren donde tú decidas, no en la nube de un tercero.",
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
      score: "Rendimiento como objetivo",
      badge: "Next-Gen Stack",
    },
  },
  casos: {
    badge: "Caso real",
    titleStrong: "Trabajo que se puede comprobar",
    titleSuffix: ", no una pared de logos",
    subtitle:
      "Publicamos un caso cuando lo podemos demostrar: el producto está en producción, las cifras salen de su propio código y cualquiera puede pedirle una respuesta a su motor. Hoy hay uno.",
    caseTag: "En producción · elingesmartgrids.cloud",
    caseTitle: "elInge Smart Grids",
    caseSubtitle:
      "Cálculo eléctrico profesional bajo NTC 2050 y RETIE, con memoria de diseño y presupuestos.",
    description:
      "Es un producto nuestro: una plataforma web donde el ingeniero eléctrico calcula y documenta una instalación completa —del cuadro de cargas al calibre del conductor, la protección, la puesta a tierra y el documento de diseño— bajo la norma colombiana. Lo construimos de punta a punta: el motor de cálculo, el documento normativo, los presupuestos y el cobro en línea.",
    siteLabel: "Ver el producto en vivo",
    siteUrl: "https://elingesmartgrids.cloud",
    highlights: [
      {
        title: "Cada resultado cita la norma",
        desc: "El motor no devuelve solo un número: devuelve el artículo y la tabla de donde sale — Tabla 310-16, Art. 110-14(c), Art. 210-20(A).",
      },
      {
        title: "Memoria de diseño RETIE",
        desc: "El documento del Art. 3.3.1.1 con sus 24 literales, de la a) a la x). Los que admiten cálculo salen calculados; los que no, se declaran en vez de simularse.",
      },
      {
        title: "Presupuestos y APU en el mismo producto",
        desc: "Análisis de precios unitarios, catálogo de materiales y presupuesto final dentro de la misma plataforma donde se calcula la instalación.",
      },
      {
        title: "Cobra dentro de la aplicación",
        desc: "Suscripción y pago en línea integrados en el producto, con la ruta de cobro servida por la propia aplicación.",
      },
    ],
    stats: [
      {
        value: "438",
        label: "pruebas automáticas en verde",
        source: "python3 -m unittest discover -s tests",
      },
      {
        value: "22",
        label: "cálculos expuestos por API",
        source: "backend/app/routers/calculos.py",
      },
      {
        value: "24",
        label: "literales del diseño detallado",
        source: "Res. 40284/2026 · 9 calculados · 15 declarados",
      },
      {
        value: "3",
        label: "normas soportadas",
        source: "NTC 2050 · NEC (NFPA 70) · NOM-001-SEDE",
      },
    ],
    ctaLabel: "Quiero algo así para mi negocio",
    ctaMessage:
      "Hola Ingenium Quintero, vi el caso de elInge Smart Grids en su web y quiero algo así para mi negocio.",
    evidence: {
      badge: "Comprobación",
      title: "Esto no es una captura de pantalla",
      note: "Es una petición real al motor que está en producción, con la respuesta tal como la devuelve. Se puede repetir cuando quieras.",
      requestLabel: "Petición",
      request: `POST https://api.elingesmartgrids.cloud
     /api/calculos/seccion

{
  "potencia_kw": 45,
  "configuracion": "tri_208",
  "longitud": 40,
  "aislamiento": "thhn"
}`,
      responseLabel: "Respuesta del motor",
      response: [
        { key: "conductor", value: "2/0 AWG (67,43 mm²)" },
        { key: "conductor de tierra", value: "6 AWG" },
        { key: "canalización", value: '1-1/2"' },
        { key: "corriente de diseño", value: "173,48 A (125 % de carga)" },
        { key: "columna de bornes", value: "75 °C — Art. 110-14(c)(1)(b)" },
        { key: "caída de tensión", value: "1,93 % (límite pedido: 3 %)" },
      ],
      testLabel: "Y sus pruebas, corriendo",
      test: `$ python3 -m unittest discover -s tests
Ran 438 tests in 0.651s

OK`,
      verifiedOn:
        "Cifras verificadas el 18 de octubre de 2026 contra el código en producción y contra la API en vivo.",
    },
    honesty:
      "Aquí solo hay un caso porque solo hay uno. Preferimos un caso que se puede comprobar a una pared de logos de clientes que todavía no existen: el segundo entra en esta sección el día que esté terminado y funcionando.",
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
        desc: "Menos consultas repetidas llegando a tu equipo.",
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
          "El diagnóstico va con tus propios números: cuántos mensajes entran fuera de horario y cuánto te cuesta eso al mes. Te llega el informe de una página en menos de 24 horas.",
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
        "Alcance y plazos acordados por escrito antes de empezar.",
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
    guarantee: "Informe de una página con tus propios números · sin costo",
    openFormPrompt: "¿Prefieres escribirnos tu caso en detalle? Completa este breve formulario",
    closeFormPrompt: "Ocultar formulario",
  },
  leadForm: {
    heading: "Cuéntanos sobre tu negocio",
    subheading:
      "Al enviar, guardamos tu caso y abrimos WhatsApp con el resumen ya escrito. Te responde una persona del equipo, no un bot.",
    nameLabel: "Nombre y apellido",
    namePlaceholder: "Ej. Carlos Martínez",
    businessLabel: "Nombre de tu negocio o sector",
    businessPlaceholder: "Ej. Clínica Dental Sonrisas o Estudio Contable",
    detailsLabel: "¿Qué proceso o tarea quieres automatizar?",
    detailsPlaceholder:
      "Ej. Queremos que un bot califique pacientes por WhatsApp, responda consultas frecuentes y agende citas directamente en Google Calendar...",
    submitButton: "Enviar y continuar en WhatsApp",
    submitting: "Abriendo WhatsApp...",
    privacyNote:
      "Tus datos se usan solo para responderte: no se comparten ni se venden. Al enviar autorizas su tratamiento para contactarte (Ley 1581 de 2012).",
    errorValidation: "Por favor completa todos los campos para poder preparar tu propuesta.",
  },
  whatsappFab: {
    tooltip: "¿Hablamos por WhatsApp?",
    ariaLabel: "Contactar a Ingenium Quintero por WhatsApp",
    defaultMessage: "Hola Ingenium Quintero, me gustaría agendar un diagnóstico gratuito para automatizar procesos en mi negocio.",
  },
  pricing: {
    badge: "Inversión",
    titleStrong: "Cómo se cobra",
    titleSuffix: " en tres renglones",
    subtitle:
      "Instalación, mensualidad y consumo, y nada más. El número exacto va en la propuesta, por escrito y con el alcance cerrado antes de empezar.",
    lines: [
      {
        label: "Instalación",
        headline: "Pago único, según alcance",
        detail:
          "Montamos el agente en tus canales reales, lo conectamos a tu CRM y a tu calendario y lo dejamos hablando como tu negocio. El valor depende del alcance y queda por escrito antes de empezar.",
        tag: "Una sola vez",
      },
      {
        label: "Mensualidad",
        headline: "Cubre hasta 2.000 conversaciones",
        detail:
          "Incluye soporte y el informe del mes: qué quedó sin responder, qué se recuperó y qué conviene calibrar.",
        tag: "Cada mes",
      },
      {
        label: "Consumo de Meta y de IA",
        headline: "A costo real, facturado aparte",
        detail:
          "Se mide mensaje por mensaje y se factura lo que de verdad se consume. No hay margen escondido aquí.",
        tag: "A costo",
      },
    ],
    notes: [
      "Todo en pesos colombianos, con el IVA aparte y explícito.",
      "El consumo se factura a costo real: si un mes no hay conversaciones, ese renglón casi no se mueve.",
      "El alcance y los plazos quedan por escrito antes de empezar. Sin cobros por «imprevistos».",
    ],
    offer: {
      badge: "Cupos de lanzamiento",
      title: "3 cupos con la instalación rebajada",
      detail:
        "Los tres primeros negocios entran con un descuento en la instalación, a cambio del caso de estudio y un testimonio cuando el sistema esté funcionando. La mensualidad no se descuenta.",
      footnote: "Los cupos se cierran cuando se llenan, no cuando acabe la semana.",
    },
    cta: "Quiero uno de los cupos",
  },
  demo: {
    badge: "Demo en vivo",
    titleStrong: "Pruébalo ahora",
    titleSuffix: ": escríbele al agente",
    subtitle:
      "Esto no es un video ni una captura: es el agente respondiendo de verdad. Pregúntale lo que le preguntaría un cliente tuyo.",
    placeholder: "Escribe como si fueras tu cliente…",
    sendLabel: "Enviar",
    thinking: "Escribiendo…",
    intro:
      "Hola, soy el agente de Ingenium Quintero. Cuéntame qué hace tu negocio y qué es lo que más tiempo te quita; te muestro cómo lo atacaría.",
    suggestions: [
      "¿Atiendes después de las 8 de la noche?",
      "¿Puedes agendar citas en mi calendario?",
      "Soy una clínica dental, ¿qué harías por mí?",
    ],
    notConfigured:
      "La demo en vivo se enciende cuando el servidor tiene un modelo conectado. Escríbeme por WhatsApp y te la muestro funcionando con tu negocio.",
    errorMsg: "No pude responder en este momento. Intenta de nuevo o escríbeme por WhatsApp.",
    limitMsg:
      "Hay mucha gente probando la demo ahora mismo. Espera unos minutos o escríbeme por WhatsApp y te la muestro con tu negocio.",
    guardrails:
      "Lo que este agente NO hace: no inventa precios, no da conceptos médicos ni legales y no reemplaza a tu equipo. Cuando algo se sale de su alcance, le pasa el chat a una persona con el resumen.",
    privacy: "Es una demo pública: no escribas datos personales ni información confidencial.",
    ctaLabel: "Quiero esto en mi WhatsApp",
  },
  footer: {
    brand: "Ingenium Quintero",
    brandDescription:
      "Arquitectura de inteligencia artificial y orquestación de procesos de alto impacto para organizaciones escalables.",
    statusBadge: "Sistemas Operativos 24/7",
    contactHeading: "Contacto Directo",
    email: "contacto@ingeniumquintero.com",
    locations: "Bogotá, Colombia · Trabajo remoto global",
    socialHeading: "Sígueme",
    // Vacío a propósito. Un enlace a una red que no existe (o a «#») es peor que
    // no mostrarla: el componente solo pinta los que estén aquí. Se llena el día
    // que existan los perfiles, en una línea:
    //   { label: "Instagram", href: "https://instagram.com/…" },
    //   { label: "Facebook",  href: "https://facebook.com/…" },
    socials: [],
    navHeading: "Navegación",
    navLinks: [
      { label: "Servicios de Automatización", href: "#servicios" },
      { label: "Casos en producción", href: "#casos" },
      { label: "Cómo se cobra y cupos", href: "#precios" },
      { label: "Probar el agente", href: "#demo" },
      { label: "Metodología de Trabajo", href: "#como-trabajamos" },
      { label: "Ventajas y Garantías", href: "#por-que-nosotros" },
      { label: "Auditoría Inicial", href: "#contacto" },
    ],
    copyright: "© 2026 Ingenium Quintero. Todos los derechos reservados.",
  },
};


/** Alias que usa content/index.ts como contrato del diccionario. */
export type Dictionary = ContentSchema;
export { content as es };
