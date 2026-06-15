window.APP_DATA = {
  appMeta: {
    examCode: "CLF-C02",
    examName: "AWS Certified Cloud Practitioner",
    simulatedQuestionCount: 65,
    simulatedTimeMinutes: 90,
    passingScoreGoal: 70,
    assumptions: [
      "La guía oficial local `cloud-particioner-02.pdf` se usa como documento rector del blueprint.",
      "La trazabilidad exacta a secciones internas de cada PDF no pudo extraerse automáticamente en esta sesión; por eso algunas referencias a módulos quedaron inferidas por dominio.",
      "Las preguntas de este banco inicial están marcadas como generadas a partir de fuente local alineada al blueprint oficial."
    ]
  },
  blueprint: {
    note: "Configurado como simulación CLF-C02 con 65 preguntas y 90 minutos. Distribución objetivo aproximada por dominio alineada al blueprint oficial del PDF local.",
    domains: [
      {
        id: "D1",
        name: "Cloud Concepts",
        weight: 24,
        questionTarget: 16,
        officialSection: "Domain 1: Cloud Concepts",
        studyFile: "AWS-Particioner-Docs/1.- 100-ACCLFO-20-LA-M01SG.pdf",
        studySection: "Tema sugerido alineado al dominio"
      },
      {
        id: "D2",
        name: "Security and Compliance",
        weight: 30,
        questionTarget: 20,
        officialSection: "Domain 2: Security and Compliance",
        studyFile: "AWS-Particioner-Docs/6.- 100-ACCLFO-20-LA-M06SG.pdf",
        studySection: "Tema sugerido alineado al dominio"
      },
      {
        id: "D3",
        name: "Cloud Technology and Services",
        weight: 26,
        questionTarget: 17,
        officialSection: "Domain 3: Cloud Technology and Services",
        studyFile: "AWS-Particioner-Docs/3.- 100-ACCLFO-20-LA-M03SG.pdf",
        studySection: "Tema sugerido alineado al dominio"
      },
      {
        id: "D4",
        name: "Billing, Pricing, and Support",
        weight: 20,
        questionTarget: 12,
        officialSection: "Domain 4: Billing, Pricing, and Support",
        studyFile: "AWS-Particioner-Docs/8.- 100-ACCLFO-20-LA-M08SG.pdf",
        studySection: "Tema sugerido alineado al dominio"
      }
    ]
  },
  documents: [
    {
      id: "official-guide",
      title: "cloud-particioner-02.pdf",
      type: "Blueprint oficial",
      path: "cloud-particioner-02.pdf",
      confidence: "Alta",
      usage: "Documento rector para dominios, estilo y estructura del simulador."
    },
    {
      id: "m01",
      title: "1.- 100-ACCLFO-20-LA-M01SG.pdf",
      type: "Módulo de estudio",
      path: "AWS-Particioner-Docs/1.- 100-ACCLFO-20-LA-M01SG.pdf",
      confidence: "Media",
      usage: "Refuerzo sugerido para conceptos base y vocabulario cloud."
    },
    {
      id: "m02",
      title: "2.- 100-ACCLFO-20-LA-M02SG.pdf",
      type: "Módulo de estudio",
      path: "AWS-Particioner-Docs/2.- 100-ACCLFO-20-LA-M02SG.pdf",
      confidence: "Media",
      usage: "Refuerzo sugerido para servicios y escenarios."
    },
    {
      id: "m03",
      title: "3.- 100-ACCLFO-20-LA-M03SG.pdf",
      type: "Módulo de estudio",
      path: "AWS-Particioner-Docs/3.- 100-ACCLFO-20-LA-M03SG.pdf",
      confidence: "Media",
      usage: "Refuerzo sugerido para tecnología cloud e infraestructura."
    },
    {
      id: "m04",
      title: "4.- 100-ACCLFO-20-LA-M04SG.pdf",
      type: "Módulo de estudio",
      path: "AWS-Particioner-Docs/4.- 100-ACCLFO-20-LA-M04SG.pdf",
      confidence: "Media",
      usage: "Refuerzo sugerido para redes y entrega."
    },
    {
      id: "m05",
      title: "5.- 100-ACCLFO-20-LA-M05SG.pdf",
      type: "Módulo de estudio",
      path: "AWS-Particioner-Docs/5.- 100-ACCLFO-20-LA-M05SG.pdf",
      confidence: "Media",
      usage: "Refuerzo sugerido para storage y bases de datos."
    },
    {
      id: "m06",
      title: "6.- 100-ACCLFO-20-LA-M06SG.pdf",
      type: "Módulo de estudio",
      path: "AWS-Particioner-Docs/6.- 100-ACCLFO-20-LA-M06SG.pdf",
      confidence: "Media",
      usage: "Refuerzo sugerido para seguridad, IAM y cumplimiento."
    },
    {
      id: "m07",
      title: "7.- 100-ACCLFO-20-LA-M07SG.pdf",
      type: "Módulo de estudio",
      path: "AWS-Particioner-Docs/7.- 100-ACCLFO-20-LA-M07SG.pdf",
      confidence: "Media",
      usage: "Refuerzo sugerido para observabilidad y operaciones."
    },
    {
      id: "m08",
      title: "8.- 100-ACCLFO-20-LA-M08SG.pdf",
      type: "Módulo de estudio",
      path: "AWS-Particioner-Docs/8.- 100-ACCLFO-20-LA-M08SG.pdf",
      confidence: "Media",
      usage: "Refuerzo sugerido para pricing, facturación y soporte."
    },
    {
      id: "m09",
      title: "9.- 100-ACCLFO-20-LA-M09SG.pdf",
      type: "Módulo de estudio",
      path: "AWS-Particioner-Docs/9.- 100-ACCLFO-20-LA-M09SG.pdf",
      confidence: "Media",
      usage: "Refuerzo sugerido para migración, innovación y marco Well-Architected."
    },
    {
      id: "m10",
      title: "10.- 100-ACCLFO-20-LA-M10SG.pdf",
      type: "Módulo de estudio",
      path: "AWS-Particioner-Docs/10.- 100-ACCLFO-20-LA-M10SG.pdf",
      confidence: "Media",
      usage: "Repaso general previo al examen."
    }
  ],
  questionBank: [
    {
      id: "D1-Q01",
      domainId: "D1",
      topic: "Value Proposition",
      difficulty: "easy",
      prompt: "¿Qué beneficio principal ofrece la computación en la nube frente a operar infraestructura on-premises tradicional?",
      options: [
        "Comprar hardware por adelantado para reducir la variabilidad de costos",
        "Cambiar gasto de capital por gasto variable y escalar bajo demanda",
        "Eliminar por completo la responsabilidad compartida",
        "Garantizar el mismo rendimiento para todas las cargas"
      ],
      answer: 1,
      explanation: "La nube permite pagar según consumo y escalar recursos de acuerdo con la demanda, reduciendo la necesidad de inversión inicial en hardware.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 1: Cloud Concepts",
        studyFile: "AWS-Particioner-Docs/1.- 100-ACCLFO-20-LA-M01SG.pdf",
        studySection: "Beneficios del modelo cloud",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D1-Q02",
      domainId: "D1",
      topic: "Elasticity",
      difficulty: "easy",
      prompt: "Una empresa quiere aumentar y disminuir capacidad automáticamente según tráfico. ¿Qué concepto cloud describe mejor esta necesidad?",
      options: [
        "Elasticidad",
        "CapEx",
        "Aislamiento físico",
        "Replicación manual"
      ],
      answer: 0,
      explanation: "Elasticidad es la capacidad de ajustar recursos de manera automática o dinámica a la demanda.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 1: Cloud Concepts",
        studyFile: "AWS-Particioner-Docs/1.- 100-ACCLFO-20-LA-M01SG.pdf",
        studySection: "Elasticidad y escalabilidad",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D1-Q03",
      domainId: "D1",
      topic: "Scalability",
      difficulty: "easy",
      prompt: "¿Qué situación representa escalabilidad en AWS?",
      options: [
        "Habilitar MFA para todos los usuarios",
        "Agregar más instancias para soportar más usuarios concurrentes",
        "Cambiar una región por otra cada semana",
        "Mantener un solo servidor dedicado"
      ],
      answer: 1,
      explanation: "Escalabilidad implica aumentar o reducir capacidad para responder a la carga. Agregar instancias es un ejemplo clásico.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 1: Cloud Concepts",
        studyFile: "AWS-Particioner-Docs/2.- 100-ACCLFO-20-LA-M02SG.pdf",
        studySection: "Patrones de escalado",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D1-Q04",
      domainId: "D1",
      topic: "Global Reach",
      difficulty: "easy",
      prompt: "¿Qué ventaja estratégica entrega la infraestructura global de AWS a una startup que quiere llegar a usuarios en distintos continentes?",
      options: [
        "Reemplazar la necesidad de DNS",
        "Mantener todos los datos obligatoriamente en una sola región",
        "Desplegar más cerca de los usuarios para reducir latencia",
        "Eliminar cualquier requisito regulatorio local"
      ],
      answer: 2,
      explanation: "La infraestructura global permite desplegar en regiones cercanas al usuario final, lo que reduce la latencia.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 1: Cloud Concepts",
        studyFile: "AWS-Particioner-Docs/3.- 100-ACCLFO-20-LA-M03SG.pdf",
        studySection: "Infraestructura global",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D1-Q05",
      domainId: "D1",
      topic: "Shared Responsibility",
      difficulty: "easy",
      prompt: "¿Qué describe correctamente el modelo de responsabilidad compartida de AWS?",
      options: [
        "AWS es responsable de toda la seguridad, incluyendo permisos de usuarios",
        "El cliente solo se encarga del cableado del data center",
        "AWS protege la infraestructura cloud y el cliente configura la seguridad dentro de la nube",
        "No aplica a servicios administrados"
      ],
      answer: 2,
      explanation: "AWS protege la infraestructura global, mientras el cliente configura identidades, datos, sistemas operativos y políticas según el servicio usado.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 1: Cloud Concepts / Shared Responsibility",
        studyFile: "AWS-Particioner-Docs/6.- 100-ACCLFO-20-LA-M06SG.pdf",
        studySection: "Responsabilidad compartida",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D1-Q06",
      domainId: "D1",
      topic: "Economies of Scale",
      difficulty: "easy",
      prompt: "¿Por qué AWS puede ofrecer economías de escala a sus clientes?",
      options: [
        "Porque cada cliente compra hardware dedicado",
        "Porque su uso masivo reduce costos unitarios y esos ahorros pueden trasladarse",
        "Porque elimina todos los costos operativos",
        "Porque cobra un precio fijo idéntico para cualquier servicio"
      ],
      answer: 1,
      explanation: "AWS opera a gran escala y puede optimizar costos unitarios en infraestructura y operación.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 1: Cloud Concepts",
        studyFile: "AWS-Particioner-Docs/8.- 100-ACCLFO-20-LA-M08SG.pdf",
        studySection: "Economías de escala",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D1-Q07",
      domainId: "D1",
      topic: "Agility",
      difficulty: "easy",
      prompt: "¿Qué escenario refleja mejor la agilidad empresarial en la nube?",
      options: [
        "Esperar semanas por aprobación y compra de hardware",
        "Aprovisionar un entorno de prueba en minutos",
        "Mantener cambios solo una vez al año",
        "Evitar cualquier automatización"
      ],
      answer: 1,
      explanation: "La nube permite experimentar y aprovisionar recursos rápidamente, acelerando la entrega de valor.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 1: Cloud Concepts",
        studyFile: "AWS-Particioner-Docs/1.- 100-ACCLFO-20-LA-M01SG.pdf",
        studySection: "Agilidad y velocidad de innovación",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D1-Q08",
      domainId: "D1",
      topic: "Fault Tolerance",
      difficulty: "medium",
      prompt: "¿Qué práctica mejora directamente la tolerancia a fallas de una aplicación web en AWS?",
      options: [
        "Usar una sola instancia EC2 en una sola zona",
        "Distribuir la aplicación en múltiples Availability Zones",
        "Deshabilitar monitoreo para ahorrar costos",
        "Ejecutar la base de datos en el equipo del desarrollador"
      ],
      answer: 1,
      explanation: "Distribuir componentes en varias Availability Zones reduce el impacto de la falla de una sola zona.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 1: Cloud Concepts",
        studyFile: "AWS-Particioner-Docs/3.- 100-ACCLFO-20-LA-M03SG.pdf",
        studySection: "Alta disponibilidad",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D1-Q09",
      domainId: "D1",
      topic: "Migration Benefits",
      difficulty: "medium",
      prompt: "Una empresa migra una aplicación a AWS para dejar de adivinar capacidad futura. ¿Qué beneficio cloud busca principalmente?",
      options: [
        "Trading fixed expense for variable expense",
        "Reducir el uso de internet",
        "Evitar el cifrado de datos",
        "Eliminar la necesidad de gobernanza"
      ],
      answer: 0,
      explanation: "Cambiar a gasto variable permite ajustar consumo real sin sobredimensionar infraestructura.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 1: Cloud Concepts",
        studyFile: "AWS-Particioner-Docs/9.- 100-ACCLFO-20-LA-M09SG.pdf",
        studySection: "Motivaciones de migración",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D1-Q10",
      domainId: "D1",
      topic: "Resilience",
      difficulty: "medium",
      prompt: "¿Qué describe mejor resiliencia en un contexto AWS?",
      options: [
        "La capacidad de una carga para recuperarse de interrupciones",
        "La obligación de usar hardware dedicado",
        "La eliminación de respaldos",
        "La desactivación de alarmas automáticas"
      ],
      answer: 0,
      explanation: "Resiliencia es la capacidad de recuperarse de fallas y seguir operando con el menor impacto posible.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 1: Cloud Concepts",
        studyFile: "AWS-Particioner-Docs/3.- 100-ACCLFO-20-LA-M03SG.pdf",
        studySection: "Resiliencia y continuidad",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D1-Q11",
      domainId: "D1",
      topic: "Cloud Adoption",
      difficulty: "medium",
      prompt: "¿Qué resultado es más probable cuando un equipo usa servicios administrados en lugar de administrar toda la infraestructura?",
      options: [
        "Mayor tiempo invertido en tareas diferenciadoras del negocio",
        "Menor tiempo dedicado a operaciones repetitivas",
        "Más necesidad de comprar racks propios",
        "Menor capacidad de automatización"
      ],
      answer: 1,
      explanation: "Los servicios administrados permiten enfocar más tiempo en el negocio y menos en operación de infraestructura.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 1: Cloud Concepts",
        studyFile: "AWS-Particioner-Docs/2.- 100-ACCLFO-20-LA-M02SG.pdf",
        studySection: "Servicios administrados",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D1-Q12",
      domainId: "D1",
      topic: "Design Principles",
      difficulty: "medium",
      prompt: "¿Qué enfoque está más alineado con buenas prácticas cloud?",
      options: [
        "Arquitectura monolítica sin monitoreo",
        "Experimentación rápida y automatización iterativa",
        "Cambios manuales sin versionado",
        "Dependencia de un solo componente sin redundancia"
      ],
      answer: 1,
      explanation: "La nube favorece iteración rápida, automatización y mejora continua.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 1: Cloud Concepts",
        studyFile: "AWS-Particioner-Docs/9.- 100-ACCLFO-20-LA-M09SG.pdf",
        studySection: "Principios de diseño",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D1-Q13",
      domainId: "D1",
      topic: "Availability",
      difficulty: "medium",
      prompt: "¿Qué combinación apoya mejor la alta disponibilidad?",
      options: [
        "Múltiples AZ y balanceo de carga",
        "Una sola EC2 y snapshot mensual",
        "Sin DNS ni Auto Scaling",
        "Recursos solo en horario laboral"
      ],
      answer: 0,
      explanation: "Múltiples AZ con balanceo de carga es un patrón típico de alta disponibilidad en AWS.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 1: Cloud Concepts",
        studyFile: "AWS-Particioner-Docs/4.- 100-ACCLFO-20-LA-M04SG.pdf",
        studySection: "Disponibilidad y balanceo",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D1-Q14",
      domainId: "D1",
      topic: "Innovation",
      difficulty: "medium",
      prompt: "¿Qué característica de la nube favorece la innovación con menor riesgo inicial?",
      options: [
        "Capacidad de experimentar sin grandes inversiones iniciales",
        "Necesidad de comprometer hardware por 5 años",
        "Prohibición de crear entornos temporales",
        "Dependencia exclusiva de instalaciones propias"
      ],
      answer: 0,
      explanation: "La nube permite probar rápido con bajo costo inicial y descartar recursos cuando ya no se necesitan.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 1: Cloud Concepts",
        studyFile: "AWS-Particioner-Docs/1.- 100-ACCLFO-20-LA-M01SG.pdf",
        studySection: "Innovación con nube",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D1-Q15",
      domainId: "D1",
      topic: "Consumption Model",
      difficulty: "medium",
      prompt: "¿Cuál es una ventaja del modelo de consumo bajo demanda?",
      options: [
        "Pagar por capacidad máxima aunque no se use",
        "Ajustar costos más cerca del uso real",
        "Eliminar toda supervisión financiera",
        "Obligar contratos idénticos para todos los servicios"
      ],
      answer: 1,
      explanation: "El modelo bajo demanda alinea mejor gasto y uso real de recursos.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 1: Cloud Concepts",
        studyFile: "AWS-Particioner-Docs/8.- 100-ACCLFO-20-LA-M08SG.pdf",
        studySection: "Consumo y costos",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D1-Q16",
      domainId: "D1",
      topic: "Operational Model",
      difficulty: "medium",
      prompt: "¿Qué ventaja busca una organización al dejar que AWS administre la infraestructura física subyacente?",
      options: [
        "Invertir más tiempo en mantenimiento de hardware",
        "Concentrarse en cargas y objetivos del negocio",
        "Eliminar la necesidad de definir permisos",
        "Aumentar la exposición a fallas locales"
      ],
      answer: 1,
      explanation: "Delegar la infraestructura física libera tiempo para enfocarse en la aplicación y el negocio.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 1: Cloud Concepts",
        studyFile: "AWS-Particioner-Docs/2.- 100-ACCLFO-20-LA-M02SG.pdf",
        studySection: "Modelo operativo cloud",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D2-Q01",
      domainId: "D2",
      topic: "IAM Users",
      difficulty: "easy",
      prompt: "¿Qué servicio permite gestionar usuarios, grupos y permisos en AWS?",
      options: ["Amazon GuardDuty", "AWS IAM", "AWS Artifact", "AWS Organizations"],
      answer: 1,
      explanation: "AWS Identity and Access Management (IAM) administra identidades y permisos.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 2: Security and Compliance",
        studyFile: "AWS-Particioner-Docs/6.- 100-ACCLFO-20-LA-M06SG.pdf",
        studySection: "IAM",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D2-Q02",
      domainId: "D2",
      topic: "Least Privilege",
      difficulty: "easy",
      prompt: "¿Cuál es una práctica correcta al otorgar permisos en AWS?",
      options: [
        "Asignar siempre AdministratorAccess",
        "Aplicar el principio de menor privilegio",
        "Usar la misma cuenta root para todas las tareas",
        "Evitar revisar políticas"
      ],
      answer: 1,
      explanation: "El menor privilegio reduce la superficie de riesgo al entregar solo los permisos necesarios.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 2: Security and Compliance",
        studyFile: "AWS-Particioner-Docs/6.- 100-ACCLFO-20-LA-M06SG.pdf",
        studySection: "Principio de menor privilegio",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D2-Q03",
      domainId: "D2",
      topic: "MFA",
      difficulty: "easy",
      prompt: "¿Qué control incrementa directamente la seguridad de inicio de sesión?",
      options: ["Auto Scaling", "MFA", "Amazon S3 Glacier", "Savings Plans"],
      answer: 1,
      explanation: "La autenticación multifactor añade una capa adicional al proceso de autenticación.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 2: Security and Compliance",
        studyFile: "AWS-Particioner-Docs/6.- 100-ACCLFO-20-LA-M06SG.pdf",
        studySection: "MFA",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D2-Q04",
      domainId: "D2",
      topic: "Root User",
      difficulty: "easy",
      prompt: "¿Cuál es una práctica recomendada para la cuenta root de AWS?",
      options: [
        "Usarla para tareas diarias",
        "Compartir sus credenciales con el equipo",
        "Protegerla con MFA y usarla solo cuando sea necesario",
        "Desactivarla permanentemente"
      ],
      answer: 2,
      explanation: "La cuenta root debe protegerse fuertemente y reservarse para tareas excepcionales.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 2: Security and Compliance",
        studyFile: "AWS-Particioner-Docs/6.- 100-ACCLFO-20-LA-M06SG.pdf",
        studySection: "Cuenta root",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D2-Q05",
      domainId: "D2",
      topic: "AWS Organizations",
      difficulty: "easy",
      prompt: "¿Qué servicio ayuda a gestionar múltiples cuentas AWS de forma centralizada?",
      options: ["AWS IAM Identity Center", "AWS Organizations", "Amazon Inspector", "AWS Backup"],
      answer: 1,
      explanation: "AWS Organizations facilita la gobernanza y administración multi-cuenta.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 2: Security and Compliance",
        studyFile: "AWS-Particioner-Docs/6.- 100-ACCLFO-20-LA-M06SG.pdf",
        studySection: "Multi-cuenta y gobernanza",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D2-Q06",
      domainId: "D2",
      topic: "Compliance Artifacts",
      difficulty: "easy",
      prompt: "¿Dónde puede un cliente revisar reportes y documentación de cumplimiento de AWS?",
      options: ["AWS Artifact", "AWS Budgets", "Amazon Macie", "AWS Health Dashboard"],
      answer: 0,
      explanation: "AWS Artifact ofrece acceso a reportes y acuerdos relacionados con cumplimiento.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 2: Security and Compliance",
        studyFile: "AWS-Particioner-Docs/6.- 100-ACCLFO-20-LA-M06SG.pdf",
        studySection: "Cumplimiento y Artifact",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D2-Q07",
      domainId: "D2",
      topic: "Encryption",
      difficulty: "easy",
      prompt: "¿Qué opción mejora la protección de datos almacenados?",
      options: [
        "Desactivar logs",
        "Usar cifrado en reposo",
        "Eliminar control de acceso",
        "Compartir claves por correo"
      ],
      answer: 1,
      explanation: "El cifrado en reposo ayuda a proteger datos almacenados contra accesos no autorizados.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 2: Security and Compliance",
        studyFile: "AWS-Particioner-Docs/6.- 100-ACCLFO-20-LA-M06SG.pdf",
        studySection: "Cifrado",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D2-Q08",
      domainId: "D2",
      topic: "Logging",
      difficulty: "medium",
      prompt: "¿Qué servicio registra llamadas API y actividad de cuenta para auditoría?",
      options: ["Amazon CloudWatch", "AWS CloudTrail", "Amazon Inspector", "AWS Shield"],
      answer: 1,
      explanation: "AWS CloudTrail registra actividad de cuentas y llamadas API para auditoría y análisis forense.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 2: Security and Compliance",
        studyFile: "AWS-Particioner-Docs/7.- 100-ACCLFO-20-LA-M07SG.pdf",
        studySection: "Auditoría y registros",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D2-Q09",
      domainId: "D2",
      topic: "Threat Detection",
      difficulty: "medium",
      prompt: "¿Qué servicio ayuda a detectar actividad potencialmente maliciosa en cuentas y cargas AWS?",
      options: ["Amazon GuardDuty", "AWS Budgets", "Amazon Route 53", "AWS Snowball"],
      answer: 0,
      explanation: "Amazon GuardDuty realiza detección inteligente de amenazas a partir de logs y señales de AWS.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 2: Security and Compliance",
        studyFile: "AWS-Particioner-Docs/6.- 100-ACCLFO-20-LA-M06SG.pdf",
        studySection: "Detección de amenazas",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D2-Q10",
      domainId: "D2",
      topic: "DDoS Protection",
      difficulty: "medium",
      prompt: "¿Qué servicio ofrece protección administrada contra ataques DDoS?",
      options: ["AWS Shield", "AWS Config", "Amazon Athena", "Amazon EMR"],
      answer: 0,
      explanation: "AWS Shield entrega protección contra ataques DDoS para aplicaciones en AWS.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 2: Security and Compliance",
        studyFile: "AWS-Particioner-Docs/6.- 100-ACCLFO-20-LA-M06SG.pdf",
        studySection: "Shield y protección de red",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D2-Q11",
      domainId: "D2",
      topic: "WAF",
      difficulty: "medium",
      prompt: "Una empresa quiere bloquear solicitudes HTTP maliciosas a una aplicación web. ¿Qué servicio es el más directo?",
      options: ["AWS WAF", "Amazon SQS", "AWS Storage Gateway", "Amazon RDS"],
      answer: 0,
      explanation: "AWS WAF filtra y bloquea tráfico HTTP/S en función de reglas configuradas.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 2: Security and Compliance",
        studyFile: "AWS-Particioner-Docs/4.- 100-ACCLFO-20-LA-M04SG.pdf",
        studySection: "Seguridad de aplicaciones web",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D2-Q12",
      domainId: "D2",
      topic: "KMS",
      difficulty: "medium",
      prompt: "¿Qué servicio se usa para crear y administrar claves de cifrado?",
      options: ["AWS KMS", "AWS Directory Service", "Amazon SNS", "AWS Compute Optimizer"],
      answer: 0,
      explanation: "AWS KMS administra claves de cifrado y se integra con múltiples servicios AWS.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 2: Security and Compliance",
        studyFile: "AWS-Particioner-Docs/6.- 100-ACCLFO-20-LA-M06SG.pdf",
        studySection: "KMS",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D2-Q13",
      domainId: "D2",
      topic: "Config",
      difficulty: "medium",
      prompt: "¿Qué servicio ayuda a evaluar configuraciones de recursos frente a reglas definidas?",
      options: ["AWS Config", "Amazon Rekognition", "Amazon Aurora", "AWS Snowcone"],
      answer: 0,
      explanation: "AWS Config monitorea configuraciones y evalúa cumplimiento frente a reglas.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 2: Security and Compliance",
        studyFile: "AWS-Particioner-Docs/6.- 100-ACCLFO-20-LA-M06SG.pdf",
        studySection: "Configuración y compliance",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D2-Q14",
      domainId: "D2",
      topic: "Inspector",
      difficulty: "medium",
      prompt: "¿Qué servicio ayuda a identificar vulnerabilidades en cargas de trabajo soportadas?",
      options: ["Amazon Inspector", "AWS Cost Explorer", "Amazon Connect", "AWS Trusted Advisor"],
      answer: 0,
      explanation: "Amazon Inspector ayuda a detectar vulnerabilidades y exposiciones en cargas compatibles.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 2: Security and Compliance",
        studyFile: "AWS-Particioner-Docs/6.- 100-ACCLFO-20-LA-M06SG.pdf",
        studySection: "Evaluación de seguridad",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D2-Q15",
      domainId: "D2",
      topic: "Identity Federation",
      difficulty: "medium",
      prompt: "¿Qué capacidad permite integrar un directorio corporativo existente con acceso a AWS?",
      options: [
        "Federación de identidades",
        "Elasticidad",
        "Zonas locales",
        "Reserved Instances"
      ],
      answer: 0,
      explanation: "La federación permite usar identidades corporativas para acceder a AWS según políticas configuradas.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 2: Security and Compliance",
        studyFile: "AWS-Particioner-Docs/6.- 100-ACCLFO-20-LA-M06SG.pdf",
        studySection: "Federación e identidad",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D2-Q16",
      domainId: "D2",
      topic: "Data Residency",
      difficulty: "medium",
      prompt: "Una empresa necesita controlar la ubicación geográfica de sus datos por razones regulatorias. ¿Qué decisión es más relevante?",
      options: [
        "Elegir la región adecuada para almacenar y procesar datos",
        "Usar siempre una sola cuenta",
        "Desactivar CloudTrail",
        "Comprar instancias spot"
      ],
      answer: 0,
      explanation: "La elección de región afecta residencia de datos y requerimientos regulatorios asociados.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 2: Security and Compliance",
        studyFile: "AWS-Particioner-Docs/3.- 100-ACCLFO-20-LA-M03SG.pdf",
        studySection: "Regiones y cumplimiento",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D2-Q17",
      domainId: "D2",
      topic: "Security Hub",
      difficulty: "medium",
      prompt: "¿Qué servicio ayuda a centralizar hallazgos de seguridad de varias fuentes AWS?",
      options: ["AWS Security Hub", "Amazon Elastic File System", "AWS Batch", "Amazon MQ"],
      answer: 0,
      explanation: "AWS Security Hub consolida hallazgos y estado de seguridad de múltiples servicios y socios.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 2: Security and Compliance",
        studyFile: "AWS-Particioner-Docs/6.- 100-ACCLFO-20-LA-M06SG.pdf",
        studySection: "Consolidación de hallazgos",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D2-Q18",
      domainId: "D2",
      topic: "Secrets Management",
      difficulty: "medium",
      prompt: "¿Cuál es una buena práctica para credenciales de bases de datos usadas por aplicaciones?",
      options: [
        "Hardcodearlas en el código fuente",
        "Gestionarlas de forma segura y rotarlas cuando corresponda",
        "Publicarlas en un bucket público",
        "Guardarlas solo en una planilla compartida"
      ],
      answer: 1,
      explanation: "Las credenciales deben almacenarse de forma segura y rotarse según políticas de seguridad.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 2: Security and Compliance",
        studyFile: "AWS-Particioner-Docs/6.- 100-ACCLFO-20-LA-M06SG.pdf",
        studySection: "Gestión de secretos",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D2-Q19",
      domainId: "D2",
      topic: "Access Reviews",
      difficulty: "medium",
      prompt: "¿Por qué es importante revisar periódicamente permisos IAM?",
      options: [
        "Para aumentar privilegios automáticamente",
        "Para reducir acceso innecesario acumulado",
        "Para deshabilitar cifrado",
        "Para impedir el uso de políticas administradas"
      ],
      answer: 1,
      explanation: "Las revisiones ayudan a eliminar permisos excesivos y sostener menor privilegio.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 2: Security and Compliance",
        studyFile: "AWS-Particioner-Docs/6.- 100-ACCLFO-20-LA-M06SG.pdf",
        studySection: "Revisión de accesos",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D2-Q20",
      domainId: "D2",
      topic: "Security Responsibility",
      difficulty: "medium",
      prompt: "En un servicio IaaS como Amazon EC2, ¿qué tarea de seguridad suele recaer en el cliente?",
      options: [
        "Seguridad física del data center",
        "Parches del sistema operativo invitado",
        "Control de acceso a las instalaciones de AWS",
        "Protección del hardware global"
      ],
      answer: 1,
      explanation: "Con EC2 el cliente administra el sistema operativo invitado, incluyendo parches y endurecimiento.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 2: Security and Compliance / Shared Responsibility",
        studyFile: "AWS-Particioner-Docs/6.- 100-ACCLFO-20-LA-M06SG.pdf",
        studySection: "Seguridad en EC2",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D3-Q01",
      domainId: "D3",
      topic: "EC2",
      difficulty: "easy",
      prompt: "¿Qué servicio ofrece capacidad de cómputo virtual redimensionable?",
      options: ["Amazon S3", "Amazon EC2", "Amazon CloudFront", "AWS Budgets"],
      answer: 1,
      explanation: "Amazon EC2 proporciona instancias virtuales configurables para ejecutar aplicaciones.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 3: Cloud Technology and Services",
        studyFile: "AWS-Particioner-Docs/2.- 100-ACCLFO-20-LA-M02SG.pdf",
        studySection: "Compute con EC2",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D3-Q02",
      domainId: "D3",
      topic: "S3",
      difficulty: "easy",
      prompt: "¿Qué servicio está orientado a almacenamiento de objetos altamente durable?",
      options: ["Amazon EBS", "Amazon S3", "Amazon EC2", "Amazon VPC"],
      answer: 1,
      explanation: "Amazon S3 es el servicio de almacenamiento de objetos de AWS.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 3: Cloud Technology and Services",
        studyFile: "AWS-Particioner-Docs/5.- 100-ACCLFO-20-LA-M05SG.pdf",
        studySection: "Amazon S3",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D3-Q03",
      domainId: "D3",
      topic: "RDS",
      difficulty: "easy",
      prompt: "¿Qué servicio reduce la carga operativa al administrar bases de datos relacionales?",
      options: ["Amazon RDS", "Amazon Route 53", "AWS Shield", "Amazon Kinesis"],
      answer: 0,
      explanation: "Amazon RDS simplifica aprovisionamiento, parches, respaldos y operación de motores relacionales.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 3: Cloud Technology and Services",
        studyFile: "AWS-Particioner-Docs/5.- 100-ACCLFO-20-LA-M05SG.pdf",
        studySection: "Bases de datos relacionales",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D3-Q04",
      domainId: "D3",
      topic: "Lambda",
      difficulty: "easy",
      prompt: "¿Qué servicio permite ejecutar código sin administrar servidores?",
      options: ["AWS Lambda", "Amazon ECS", "AWS Snowball", "Amazon WorkSpaces"],
      answer: 0,
      explanation: "AWS Lambda ejecuta funciones por eventos sin gestionar servidores subyacentes.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 3: Cloud Technology and Services",
        studyFile: "AWS-Particioner-Docs/2.- 100-ACCLFO-20-LA-M02SG.pdf",
        studySection: "Serverless",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D3-Q05",
      domainId: "D3",
      topic: "VPC",
      difficulty: "easy",
      prompt: "¿Qué servicio permite definir una red virtual aislada en AWS?",
      options: ["Amazon VPC", "AWS IAM", "Amazon Aurora", "AWS Artifact"],
      answer: 0,
      explanation: "Amazon VPC permite diseñar una red virtual con subredes, tablas de rutas y controles.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 3: Cloud Technology and Services",
        studyFile: "AWS-Particioner-Docs/4.- 100-ACCLFO-20-LA-M04SG.pdf",
        studySection: "Redes con VPC",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D3-Q06",
      domainId: "D3",
      topic: "CloudFront",
      difficulty: "easy",
      prompt: "¿Qué servicio distribuye contenido con baja latencia a través de una red global de edge locations?",
      options: ["Amazon CloudFront", "Amazon SQS", "AWS Direct Connect", "Amazon Neptune"],
      answer: 0,
      explanation: "Amazon CloudFront es la CDN de AWS para distribución de contenido con baja latencia.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 3: Cloud Technology and Services",
        studyFile: "AWS-Particioner-Docs/4.- 100-ACCLFO-20-LA-M04SG.pdf",
        studySection: "Distribución de contenido",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D3-Q07",
      domainId: "D3",
      topic: "Route 53",
      difficulty: "easy",
      prompt: "¿Qué servicio DNS administrado ayuda a enrutar tráfico hacia aplicaciones AWS?",
      options: ["Amazon Route 53", "AWS Step Functions", "Amazon SES", "Amazon FSx"],
      answer: 0,
      explanation: "Amazon Route 53 es el servicio DNS administrado de AWS.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 3: Cloud Technology and Services",
        studyFile: "AWS-Particioner-Docs/4.- 100-ACCLFO-20-LA-M04SG.pdf",
        studySection: "DNS y enrutamiento",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D3-Q08",
      domainId: "D3",
      topic: "EBS",
      difficulty: "medium",
      prompt: "¿Qué tipo de almacenamiento se asocia típicamente a una instancia EC2 y se presenta como bloque?",
      options: ["Amazon S3", "Amazon EBS", "Amazon Glacier", "Amazon Athena"],
      answer: 1,
      explanation: "Amazon EBS entrega almacenamiento en bloque persistente para instancias EC2.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 3: Cloud Technology and Services",
        studyFile: "AWS-Particioner-Docs/5.- 100-ACCLFO-20-LA-M05SG.pdf",
        studySection: "Almacenamiento en bloque",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D3-Q09",
      domainId: "D3",
      topic: "Auto Scaling",
      difficulty: "medium",
      prompt: "¿Qué servicio o capacidad agrega o elimina instancias automáticamente según demanda o políticas?",
      options: ["Amazon Auto Scaling", "AWS Artifact", "Amazon Macie", "AWS Outposts"],
      answer: 0,
      explanation: "Auto Scaling ajusta recursos automáticamente con base en métricas o calendarios.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 3: Cloud Technology and Services",
        studyFile: "AWS-Particioner-Docs/2.- 100-ACCLFO-20-LA-M02SG.pdf",
        studySection: "Escalado automático",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D3-Q10",
      domainId: "D3",
      topic: "ELB",
      difficulty: "medium",
      prompt: "¿Qué función cumple Elastic Load Balancing?",
      options: [
        "Distribuir tráfico entre múltiples destinos",
        "Cifrar llaves administradas",
        "Emitir reportes de costos",
        "Crear usuarios IAM"
      ],
      answer: 0,
      explanation: "Elastic Load Balancing distribuye tráfico entrante para mejorar disponibilidad y escalado.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 3: Cloud Technology and Services",
        studyFile: "AWS-Particioner-Docs/4.- 100-ACCLFO-20-LA-M04SG.pdf",
        studySection: "Balanceo de carga",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D3-Q11",
      domainId: "D3",
      topic: "Availability Zones",
      difficulty: "medium",
      prompt: "¿Qué describe mejor una Availability Zone?",
      options: [
        "Una red CDN global",
        "Una o más data centers aislados dentro de una región",
        "Una cuenta AWS secundaria",
        "Una factura consolidada"
      ],
      answer: 1,
      explanation: "Una Availability Zone es un conjunto aislado de infraestructura dentro de una región.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 3: Cloud Technology and Services",
        studyFile: "AWS-Particioner-Docs/3.- 100-ACCLFO-20-LA-M03SG.pdf",
        studySection: "Regiones y AZ",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D3-Q12",
      domainId: "D3",
      topic: "Containers",
      difficulty: "medium",
      prompt: "Una empresa quiere ejecutar contenedores sin administrar servidores subyacentes. ¿Qué opción se alinea mejor?",
      options: ["Amazon ECS on Fargate", "Amazon S3", "AWS Artifact", "Amazon Route 53"],
      answer: 0,
      explanation: "Fargate permite ejecutar contenedores sin gestionar infraestructura de servidores.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 3: Cloud Technology and Services",
        studyFile: "AWS-Particioner-Docs/2.- 100-ACCLFO-20-LA-M02SG.pdf",
        studySection: "Contenedores administrados",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D3-Q13",
      domainId: "D3",
      topic: "Monitoring",
      difficulty: "medium",
      prompt: "¿Qué servicio recolecta métricas y crea alarmas para recursos AWS?",
      options: ["Amazon CloudWatch", "AWS Organizations", "Amazon Polly", "AWS IQ"],
      answer: 0,
      explanation: "Amazon CloudWatch centraliza métricas, logs y alarmas operativas.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 3: Cloud Technology and Services",
        studyFile: "AWS-Particioner-Docs/7.- 100-ACCLFO-20-LA-M07SG.pdf",
        studySection: "Monitoreo y alarmas",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D3-Q14",
      domainId: "D3",
      topic: "Messaging",
      difficulty: "medium",
      prompt: "¿Qué servicio ofrece colas desacopladas para integrar aplicaciones?",
      options: ["Amazon SQS", "AWS Budgets", "Amazon Chime", "Amazon ECR"],
      answer: 0,
      explanation: "Amazon SQS ofrece colas administradas para desacoplar componentes.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 3: Cloud Technology and Services",
        studyFile: "AWS-Particioner-Docs/2.- 100-ACCLFO-20-LA-M02SG.pdf",
        studySection: "Mensajería y desacople",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D3-Q15",
      domainId: "D3",
      topic: "Notification",
      difficulty: "medium",
      prompt: "¿Qué servicio se usa para notificaciones pub/sub simples?",
      options: ["Amazon SNS", "Amazon Redshift", "AWS Ground Station", "Amazon EC2 Auto Scaling"],
      answer: 0,
      explanation: "Amazon SNS distribuye mensajes a múltiples suscriptores o endpoints.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 3: Cloud Technology and Services",
        studyFile: "AWS-Particioner-Docs/2.- 100-ACCLFO-20-LA-M02SG.pdf",
        studySection: "Notificaciones",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D3-Q16",
      domainId: "D3",
      topic: "Disaster Recovery",
      difficulty: "medium",
      prompt: "¿Qué práctica apoya recuperación ante desastres a nivel de datos?",
      options: [
        "No hacer copias porque S3 es durable",
        "Diseñar backups y replicación apropiados según RPO/RTO",
        "Mantener todas las cargas en una sola AZ",
        "Eliminar snapshots periódicos"
      ],
      answer: 1,
      explanation: "Los objetivos RPO/RTO guían diseño de respaldos, replicación y recuperación.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 3: Cloud Technology and Services",
        studyFile: "AWS-Particioner-Docs/3.- 100-ACCLFO-20-LA-M03SG.pdf",
        studySection: "Recuperación y continuidad",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D3-Q17",
      domainId: "D3",
      topic: "Database Choice",
      difficulty: "medium",
      prompt: "Si una aplicación requiere almacenamiento clave-valor con latencia de milisegundos a gran escala, ¿qué servicio es el más alineado?",
      options: ["Amazon DynamoDB", "Amazon EFS", "AWS Artifact", "Amazon QuickSight"],
      answer: 0,
      explanation: "Amazon DynamoDB es una base de datos NoSQL clave-valor/documento orientada a baja latencia y escala.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 3: Cloud Technology and Services",
        studyFile: "AWS-Particioner-Docs/5.- 100-ACCLFO-20-LA-M05SG.pdf",
        studySection: "Bases NoSQL",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D4-Q01",
      domainId: "D4",
      topic: "Pricing Model",
      difficulty: "easy",
      prompt: "¿Qué describe mejor el modelo de precios de AWS para muchos servicios?",
      options: [
        "Pago por uso",
        "Pago único anual obligatorio",
        "Compra de licencias perpetuas",
        "Costo fijo idéntico por cuenta"
      ],
      answer: 0,
      explanation: "Muchos servicios AWS usan un esquema de pago por consumo real.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 4: Billing, Pricing, and Support",
        studyFile: "AWS-Particioner-Docs/8.- 100-ACCLFO-20-LA-M08SG.pdf",
        studySection: "Modelo de precios",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D4-Q02",
      domainId: "D4",
      topic: "Cost Visibility",
      difficulty: "easy",
      prompt: "¿Qué herramienta ayuda a visualizar y analizar costos y uso a lo largo del tiempo?",
      options: ["AWS Cost Explorer", "Amazon Inspector", "AWS Shield", "Amazon Route 53"],
      answer: 0,
      explanation: "AWS Cost Explorer permite analizar tendencias de costo y consumo.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 4: Billing, Pricing, and Support",
        studyFile: "AWS-Particioner-Docs/8.- 100-ACCLFO-20-LA-M08SG.pdf",
        studySection: "Cost Explorer",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D4-Q03",
      domainId: "D4",
      topic: "Budgets",
      difficulty: "easy",
      prompt: "¿Qué servicio permite definir umbrales de costo o uso y recibir alertas?",
      options: ["AWS Budgets", "Amazon Athena", "Amazon GuardDuty", "AWS CloudHSM"],
      answer: 0,
      explanation: "AWS Budgets permite configurar presupuestos y alertas asociadas.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 4: Billing, Pricing, and Support",
        studyFile: "AWS-Particioner-Docs/8.- 100-ACCLFO-20-LA-M08SG.pdf",
        studySection: "Budgets y alertas",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D4-Q04",
      domainId: "D4",
      topic: "Support Plans",
      difficulty: "easy",
      prompt: "¿Qué factor suele influir al elegir un plan de soporte AWS?",
      options: [
        "Solo el color del dashboard",
        "Nivel de orientación técnica y tiempos de respuesta requeridos",
        "La cantidad de usuarios IAM creados",
        "El tipo de sistema operativo local"
      ],
      answer: 1,
      explanation: "Los planes de soporte varían en tiempos de respuesta y acceso a guía técnica.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 4: Billing, Pricing, and Support",
        studyFile: "AWS-Particioner-Docs/8.- 100-ACCLFO-20-LA-M08SG.pdf",
        studySection: "Planes de soporte",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D4-Q05",
      domainId: "D4",
      topic: "Trusted Advisor",
      difficulty: "medium",
      prompt: "¿Qué servicio ofrece recomendaciones sobre optimización de costos, seguridad y rendimiento?",
      options: ["AWS Trusted Advisor", "Amazon Rekognition", "Amazon Lex", "AWS Snowmobile"],
      answer: 0,
      explanation: "Trusted Advisor entrega recomendaciones de mejores prácticas en varias categorías.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 4: Billing, Pricing, and Support",
        studyFile: "AWS-Particioner-Docs/10.- 100-ACCLFO-20-LA-M10SG.pdf",
        studySection: "Optimización y repaso final",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D4-Q06",
      domainId: "D4",
      topic: "Savings Plans",
      difficulty: "medium",
      prompt: "¿Cuál es una razón común para usar Savings Plans o compromisos equivalentes?",
      options: [
        "Pagar más por cargas estables",
        "Obtener descuentos a cambio de un compromiso de uso",
        "Eliminar completamente la necesidad de presupuestos",
        "Usar regiones ilimitadas sin costo"
      ],
      answer: 1,
      explanation: "Los compromisos de uso pueden reducir costos para cargas previsibles.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 4: Billing, Pricing, and Support",
        studyFile: "AWS-Particioner-Docs/8.- 100-ACCLFO-20-LA-M08SG.pdf",
        studySection: "Descuentos por compromiso",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D4-Q07",
      domainId: "D4",
      topic: "Consolidated Billing",
      difficulty: "medium",
      prompt: "¿Qué beneficio entrega la facturación consolidada en una organización con varias cuentas?",
      options: [
        "Cada cuenta negocia soporte por separado sin visibilidad central",
        "Permite centralizar facturas y mejorar visibilidad del gasto",
        "Deshabilita el uso de etiquetas de costos",
        "Obliga a usar una sola región"
      ],
      answer: 1,
      explanation: "La facturación consolidada centraliza visibilidad y administración del gasto multi-cuenta.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 4: Billing, Pricing, and Support",
        studyFile: "AWS-Particioner-Docs/8.- 100-ACCLFO-20-LA-M08SG.pdf",
        studySection: "Facturación consolidada",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D4-Q08",
      domainId: "D4",
      topic: "Tagging",
      difficulty: "medium",
      prompt: "¿Qué práctica ayuda a asignar costos a equipos o proyectos?",
      options: [
        "Eliminar nombres descriptivos",
        "Usar etiquetas consistentes de asignación de costos",
        "Crear una sola cuenta para toda la empresa sin separación",
        "Desactivar Cost Explorer"
      ],
      answer: 1,
      explanation: "Las etiquetas de costos facilitan atribuir gasto a áreas, productos o centros de costo.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 4: Billing, Pricing, and Support",
        studyFile: "AWS-Particioner-Docs/8.- 100-ACCLFO-20-LA-M08SG.pdf",
        studySection: "Etiquetado y chargeback",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D4-Q09",
      domainId: "D4",
      topic: "Pricing Factors",
      difficulty: "medium",
      prompt: "En Amazon S3, ¿qué variable suele impactar el costo además del volumen almacenado?",
      options: [
        "Cantidad de llamadas API y transferencia asociada",
        "Número de usuarios root",
        "Color del bucket",
        "Cantidad de políticas IAM adjuntas a Lambda"
      ],
      answer: 0,
      explanation: "En S3 suelen influir almacenamiento, solicitudes y transferencia de datos, entre otros factores.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 4: Billing, Pricing, and Support",
        studyFile: "AWS-Particioner-Docs/8.- 100-ACCLFO-20-LA-M08SG.pdf",
        studySection: "Factores de costo",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D4-Q10",
      domainId: "D4",
      topic: "Support Use Case",
      difficulty: "medium",
      prompt: "Una empresa necesita mejores tiempos de respuesta para incidentes operativos críticos. ¿Qué debería revisar?",
      options: [
        "El plan de soporte contratado",
        "La cantidad de buckets públicos",
        "La longitud de los nombres de usuarios IAM",
        "La versión del navegador local"
      ],
      answer: 0,
      explanation: "Los planes de soporte definen cobertura y tiempos de respuesta ante distintos niveles de severidad.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 4: Billing, Pricing, and Support",
        studyFile: "AWS-Particioner-Docs/8.- 100-ACCLFO-20-LA-M08SG.pdf",
        studySection: "Escenarios de soporte",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D4-Q11",
      domainId: "D4",
      topic: "Cost Anomaly",
      difficulty: "medium",
      prompt: "¿Qué enfoque ayuda a detectar aumentos inesperados de gasto tempranamente?",
      options: [
        "Monitorear costos con alertas y revisión periódica",
        "Esperar al cierre mensual sin monitoreo",
        "Evitar etiquetas",
        "Centralizar todo en la cuenta root sin reportes"
      ],
      answer: 0,
      explanation: "La detección temprana requiere monitoreo y alertas, además de revisión frecuente.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 4: Billing, Pricing, and Support",
        studyFile: "AWS-Particioner-Docs/8.- 100-ACCLFO-20-LA-M08SG.pdf",
        studySection: "Monitoreo de gasto",
        confidence: "blueprint-aligned"
      }
    },
    {
      id: "D4-Q12",
      domainId: "D4",
      topic: "Pricing Tradeoff",
      difficulty: "medium",
      prompt: "¿Qué tipo de carga suele beneficiarse más de descuentos por compromiso frente a pago on-demand puro?",
      options: [
        "Una carga estable y predecible",
        "Una prueba que dura minutos y se usa una sola vez",
        "Una cuenta sin servicios ejecutándose",
        "Un bucket vacío sin solicitudes"
      ],
      answer: 0,
      explanation: "Las cargas previsibles suelen beneficiarse de compromisos de uso por descuentos asociados.",
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "cloud-particioner-02.pdf",
        primarySection: "Domain 4: Billing, Pricing, and Support",
        studyFile: "AWS-Particioner-Docs/8.- 100-ACCLFO-20-LA-M08SG.pdf",
        studySection: "Estrategias de ahorro",
        confidence: "blueprint-aligned"
      }
    }
  ]
};

(function expandCertifications() {
  const clf = window.APP_DATA;
  const defaultUsageModes = ["full", "reinforcement"];

  function enrichQuestion(question, certificationId) {
    return {
      ...question,
      certificationId,
      difficulty: question.difficulty || "mixed",
      usageModes: Array.isArray(question.usageModes) && question.usageModes.length ? question.usageModes : [...defaultUsageModes],
      tags: Array.isArray(question.tags) ? question.tags : ["blueprint-aligned"]
    };
  }

  clf.appMeta.questionBankTargets = {
    full: 150,
    reinforcement: 60
  };
  clf.appMeta.questionSelection = {
    fullStrategy: "stratified-random-by-domain",
    reinforcementStrategy: "stratified-random-by-domain"
  };
  clf.questionBank = clf.questionBank.map((question) => enrichQuestion(question, "clf-c02"));

  const architectModuleFiles = Array.from({ length: 15 }, (_value, index) => {
    const moduleNumber = index + 1;
    return `${moduleNumber}.- 200-ACACAD-20-LA-M${String(moduleNumber).padStart(2, "0")}SG.pdf`;
  });

  const architectDocuments = [
    {
      id: "saa-official-guide",
      title: "solutions-architect-associate-03.pdf",
      type: "Blueprint oficial",
      path: "solutions-architect-associate-03.pdf",
      confidence: "Alta",
      usage: "Documento rector para dominios, tiempos, ponderaciones y estilo del examen SAA-C03."
    },
    ...architectModuleFiles.map((fileName, index) => ({
      id: `saa-m${String(index + 1).padStart(2, "0")}`,
      title: fileName,
      type: "Modulo de estudio",
      path: `AWS-Architect-Docs/${fileName}`,
      confidence: "Media",
      usage: "Material de apoyo para trazabilidad de conceptos del Associate."
    }))
  ];

  function architectQuestion(
    id,
    domainId,
    topic,
    prompt,
    options,
    answer,
    explanation,
    studyFile,
    studySection
  ) {
    const primarySectionByDomain = {
      A1: "Domain 1: Design Secure Architectures",
      A2: "Domain 2: Design Resilient Architectures",
      A3: "Domain 3: Design High-Performing Architectures",
      A4: "Domain 4: Design Cost-Optimized Architectures"
    };

    return {
      id,
      domainId,
      topic,
      certificationId: "saa-c03",
      difficulty: "associate",
      usageModes: [...defaultUsageModes],
      tags: ["blueprint-aligned"],
      prompt,
      options,
      answer,
      explanation,
      source: {
        sourceType: "generated-from-local-source",
        primaryFile: "solutions-architect-associate-03.pdf",
        primarySection: primarySectionByDomain[domainId],
        studyFile,
        studySection,
        confidence: "blueprint-aligned"
      }
    };
  }

  const architectQuestionBank = [
    architectQuestion("A1-Q01", "A1", "IAM Roles", "A company runs an application on EC2 that needs access to an S3 bucket. Which design is most secure?", ["Store access keys in the application config file", "Use an IAM role attached to the EC2 instance", "Create a shared IAM user for all servers", "Embed root credentials in user data"], 1, "An IAM role avoids hardcoded credentials and is the standard secure design for EC2 access to AWS services.", "AWS-Architect-Docs/1.- 200-ACACAD-20-LA-M01SG.pdf", "Identity and access patterns"),
    architectQuestion("A1-Q02", "A1", "Private Access", "An application in private subnets must read objects from Amazon S3 without traversing the internet. Which design is best?", ["Use a NAT Gateway only", "Use an S3 gateway VPC endpoint", "Use an internet gateway in the private subnet", "Make the bucket public"], 1, "A gateway VPC endpoint for S3 keeps traffic on the AWS network and avoids internet traversal.", "AWS-Architect-Docs/4.- 200-ACACAD-20-LA-M04SG.pdf", "Private connectivity"),
    architectQuestion("A1-Q03", "A1", "Secrets", "A web application needs to rotate database credentials automatically. Which option is the best fit?", ["Store credentials in a text file on EC2", "Use AWS Secrets Manager", "Use an AMI with embedded credentials", "Put credentials in an S3 public bucket"], 1, "AWS Secrets Manager supports secure storage and automatic rotation for credentials.", "AWS-Architect-Docs/6.- 200-ACACAD-20-LA-M06SG.pdf", "Secrets management"),
    architectQuestion("A1-Q04", "A1", "Least Privilege", "A Lambda function only needs to write logs to CloudWatch Logs. Which IAM design follows least privilege?", ["AdministratorAccess policy", "A policy allowing only required CloudWatch Logs actions", "Root credentials for the function", "A wildcard allow on all AWS services"], 1, "Least privilege means granting only the specific actions required by the workload.", "AWS-Architect-Docs/1.- 200-ACACAD-20-LA-M01SG.pdf", "IAM least privilege"),
    architectQuestion("A1-Q05", "A1", "Encryption", "A solutions architect needs to encrypt an Amazon RDS database and its snapshots at rest. What should be used?", ["AWS KMS keys with RDS encryption enabled", "Security groups only", "Amazon CloudFront signed URLs", "Amazon Route 53 health checks"], 0, "RDS encryption at rest is implemented with AWS KMS keys.", "AWS-Architect-Docs/5.- 200-ACACAD-20-LA-M05SG.pdf", "Encryption at rest"),
    architectQuestion("A1-Q06", "A1", "Public Web Security", "A company wants to block SQL injection and cross-site scripting attempts before they reach an ALB. Which service should be added?", ["AWS WAF", "AWS Backup", "Amazon EFS", "AWS Storage Gateway"], 0, "AWS WAF is designed to filter malicious web requests at the application edge or ALB.", "AWS-Architect-Docs/7.- 200-ACACAD-20-LA-M07SG.pdf", "Web application protection"),
    architectQuestion("A1-Q07", "A1", "DDoS", "An internet-facing application needs enhanced DDoS protection. Which AWS service is the direct fit?", ["AWS Shield", "Amazon MQ", "AWS Glue", "Amazon Athena"], 0, "AWS Shield provides DDoS protection for workloads exposed to the internet.", "AWS-Architect-Docs/7.- 200-ACACAD-20-LA-M07SG.pdf", "Network protection"),
    architectQuestion("A1-Q08", "A1", "Multi-Account Governance", "A company uses multiple AWS accounts and wants to centrally block the use of nonapproved Regions. What should be used?", ["Security groups", "Service control policies in AWS Organizations", "An IAM user in each account", "A CloudFront distribution"], 1, "SCPs apply guardrails across accounts in an AWS Organization.", "AWS-Architect-Docs/2.- 200-ACACAD-20-LA-M02SG.pdf", "Organizations and guardrails"),
    architectQuestion("A1-Q09", "A1", "Private Databases", "A database must not be reachable from the internet. Which design is best?", ["Place the database in a public subnet with an elastic IP", "Place the database in private subnets and allow access only from the app tier security group", "Use a bucket policy", "Use Route 53 failover"], 1, "A private subnet plus security-group-based access is the standard secure design for databases.", "AWS-Architect-Docs/4.- 200-ACACAD-20-LA-M04SG.pdf", "Subnet isolation"),
    architectQuestion("A1-Q10", "A1", "TLS", "A company needs HTTPS for an application behind an Application Load Balancer. Which service should manage the certificate?", ["AWS Certificate Manager", "Amazon Inspector", "AWS Budgets", "AWS Organizations"], 0, "ACM manages public certificates for supported AWS services like ALB and CloudFront.", "AWS-Architect-Docs/7.- 200-ACACAD-20-LA-M07SG.pdf", "TLS certificates"),
    architectQuestion("A1-Q11", "A1", "Audit", "A security team needs a history of API activity across accounts for investigations. Which service is required?", ["AWS CloudTrail", "Amazon EventBridge", "Amazon SQS", "AWS DataSync"], 0, "CloudTrail records API activity and is foundational for account audit trails.", "AWS-Architect-Docs/6.- 200-ACACAD-20-LA-M06SG.pdf", "Audit logging"),
    architectQuestion("A1-Q12", "A1", "S3 Bucket Security", "A company wants to ensure requests to an S3 bucket use TLS. What is the best control?", ["A bucket policy denying requests that do not use SecureTransport", "A NAT gateway", "A security group on the bucket", "An Auto Scaling policy"], 0, "S3 bucket policies can explicitly deny non-TLS requests using the SecureTransport condition.", "AWS-Architect-Docs/8.- 200-ACACAD-20-LA-M08SG.pdf", "S3 access controls"),
    architectQuestion("A1-Q13", "A1", "Threat Detection", "Which service continuously analyzes logs and signals to detect suspicious activity in AWS accounts?", ["Amazon GuardDuty", "Amazon WorkSpaces", "AWS Snowball", "Amazon Aurora"], 0, "Amazon GuardDuty provides managed threat detection using multiple AWS data sources.", "AWS-Architect-Docs/6.- 200-ACACAD-20-LA-M06SG.pdf", "Threat detection"),
    architectQuestion("A1-Q14", "A1", "Federation", "A company wants employees to sign in to AWS using the existing corporate identity provider. Which architecture is most appropriate?", ["Create long-term IAM users for all employees", "Use federation with IAM Identity Center or a compatible IdP", "Share the root user", "Place credentials in Systems Manager Run Command"], 1, "Federation lets users access AWS with enterprise identities instead of separate long-term IAM users.", "AWS-Architect-Docs/1.- 200-ACACAD-20-LA-M01SG.pdf", "Federated access"),
    architectQuestion("A1-Q15", "A1", "Compliance", "A team needs AWS compliance reports such as SOC reports. Where should they look?", ["AWS Artifact", "AWS Lambda", "AWS Config", "Amazon Cognito"], 0, "AWS Artifact provides access to compliance reports and agreements.", "AWS-Architect-Docs/15.- 200-ACACAD-20-LA-M15SG.pdf", "Compliance evidence"),
    architectQuestion("A1-Q16", "A1", "Config Rules", "A company wants to detect whenever an S3 bucket becomes public. Which service is best suited for this requirement?", ["AWS Config", "Amazon SQS", "AWS Batch", "Amazon Chime SDK"], 0, "AWS Config evaluates resource configurations against rules and can detect public S3 buckets.", "AWS-Architect-Docs/15.- 200-ACACAD-20-LA-M15SG.pdf", "Configuration compliance"),
    architectQuestion("A1-Q17", "A1", "Network Filtering", "Which statement correctly compares security groups and network ACLs?", ["Security groups are stateless and NACLs are stateful", "Security groups are stateful and NACLs are stateless", "Both are stateful", "Both are stateless"], 1, "Security groups are stateful. Network ACLs are stateless and evaluated with explicit rules.", "AWS-Architect-Docs/4.- 200-ACACAD-20-LA-M04SG.pdf", "Security groups and NACLs"),
    architectQuestion("A1-Q18", "A1", "Customer Authentication", "A mobile application needs managed user sign-up, sign-in, and token-based access. Which service fits best?", ["Amazon Cognito", "AWS Direct Connect", "Amazon FSx", "AWS DMS"], 0, "Amazon Cognito is built for user authentication, authorization, and identity federation in apps.", "AWS-Architect-Docs/11.- 200-ACACAD-20-LA-M11SG.pdf", "Identity for applications"),
    architectQuestion("A1-Q19", "A1", "Instance Access", "Operations engineers need secure shell access to EC2 instances without opening inbound SSH from the internet. Which design is preferred?", ["Use Session Manager", "Open port 22 to 0.0.0.0/0", "Use public IPs on all instances", "Store private keys in user data"], 0, "Session Manager reduces exposed ingress and centralizes managed access to instances.", "AWS-Architect-Docs/14.- 200-ACACAD-20-LA-M14SG.pdf", "Secure operations access"),
    architectQuestion("A1-Q20", "A1", "Data Classification", "A company wants to discover sensitive data in S3 automatically. Which service is the best match?", ["Amazon Macie", "Amazon Route 53", "AWS Cost Explorer", "AWS Global Accelerator"], 0, "Amazon Macie helps discover and classify sensitive data stored in Amazon S3.", "AWS-Architect-Docs/15.- 200-ACACAD-20-LA-M15SG.pdf", "Sensitive data discovery"),

    architectQuestion("A2-Q01", "A2", "RDS High Availability", "A production relational database must fail over automatically if the primary Availability Zone becomes unavailable. Which design should be used?", ["Single-AZ RDS", "RDS Multi-AZ deployment", "RDS in a public subnet only", "A read replica in the same subnet"], 1, "RDS Multi-AZ provides synchronous standby and automatic failover for high availability.", "AWS-Architect-Docs/5.- 200-ACACAD-20-LA-M05SG.pdf", "RDS Multi-AZ"),
    architectQuestion("A2-Q02", "A2", "Web Tier HA", "A stateless web application must remain available during an AZ failure. Which architecture is best?", ["One EC2 instance in one subnet", "An Auto Scaling group spanning multiple AZs behind an ALB", "A single NAT Gateway", "An EBS volume with snapshots"], 1, "Multi-AZ Auto Scaling behind a load balancer is the standard resilient web-tier design.", "AWS-Architect-Docs/3.- 200-ACACAD-20-LA-M03SG.pdf", "Load balancing and Auto Scaling"),
    architectQuestion("A2-Q03", "A2", "DNS Failover", "A company needs DNS-based failover between a primary and a standby endpoint. Which Route 53 feature should be used?", ["Weighted routing", "Latency routing", "Failover routing", "Geolocation routing"], 2, "Failover routing uses health checks to direct traffic to a standby endpoint when the primary fails.", "AWS-Architect-Docs/9.- 200-ACACAD-20-LA-M09SG.pdf", "Route 53 routing policies"),
    architectQuestion("A2-Q04", "A2", "Decoupling", "Order processing requests should not be lost if the worker application is temporarily unavailable. What should be used?", ["Amazon SQS between the producer and consumer", "A larger EC2 instance only", "An EBS snapshot schedule", "An internet gateway"], 0, "SQS decouples producers and consumers and provides durable buffering.", "AWS-Architect-Docs/10.- 200-ACACAD-20-LA-M10SG.pdf", "Decoupled integration"),
    architectQuestion("A2-Q05", "A2", "Object Recovery", "Users sometimes delete important objects in an S3 bucket by mistake. Which feature helps recover them quickly?", ["S3 Versioning", "An ALB target group", "A security group", "A launch template"], 0, "S3 Versioning preserves previous object versions and supports recovery from accidental deletion or overwrite.", "AWS-Architect-Docs/8.- 200-ACACAD-20-LA-M08SG.pdf", "S3 durability features"),
    architectQuestion("A2-Q06", "A2", "Cross-Region DR", "A company requires copies of critical objects in another Region for disaster recovery. Which design is best?", ["S3 Cross-Region Replication", "A security group", "An Elastic IP", "One NAT gateway per subnet"], 0, "Cross-Region Replication creates copies in another Region to support disaster recovery and data residency needs.", "AWS-Architect-Docs/8.- 200-ACACAD-20-LA-M08SG.pdf", "Cross-Region replication"),
    architectQuestion("A2-Q07", "A2", "Application State", "To improve resilience, a web tier should remain stateless. Which design best supports that goal?", ["Store session state on each instance local disk", "Store shared session state in ElastiCache or DynamoDB", "Disable Auto Scaling", "Use one long-lived server"], 1, "Externalizing session state supports horizontal scaling and instance replacement without losing user state.", "AWS-Architect-Docs/12.- 200-ACACAD-20-LA-M12SG.pdf", "Stateless application design"),
    architectQuestion("A2-Q08", "A2", "Streaming Fanout", "Several downstream systems must react independently to a single event. Which design is most resilient and loosely coupled?", ["SNS topic with multiple subscribers", "One shared database table polled every second", "Direct calls to all services in sequence", "One larger monolith"], 0, "SNS fanout supports resilient one-to-many event delivery with loose coupling.", "AWS-Architect-Docs/10.- 200-ACACAD-20-LA-M10SG.pdf", "Event fanout"),
    architectQuestion("A2-Q09", "A2", "Serverless Resilience", "A Lambda function processes messages from a queue. Which architecture improves retry handling and resilience?", ["Invoke Lambda directly from the browser only", "Use SQS as the event source with a dead-letter strategy", "Store failed messages in local memory", "Run Lambda in only one AZ manually"], 1, "SQS with Lambda provides buffering, retries, and dead-letter patterns for resilient processing.", "AWS-Architect-Docs/10.- 200-ACACAD-20-LA-M10SG.pdf", "Queue-driven processing"),
    architectQuestion("A2-Q10", "A2", "File Storage HA", "Multiple instances in different AZs need concurrent access to the same shared files. Which service is designed for this?", ["Amazon EFS", "Amazon EBS attached to multiple instances in different AZs", "Instance store", "Amazon CloudFront"], 0, "Amazon EFS is a managed multi-AZ elastic file system for concurrent access.", "AWS-Architect-Docs/8.- 200-ACACAD-20-LA-M08SG.pdf", "Shared file systems"),
    architectQuestion("A2-Q11", "A2", "Global Databases", "A globally distributed application needs low-latency reads and resilient multi-Region writes for a NoSQL workload. Which service feature is most appropriate?", ["DynamoDB global tables", "S3 Transfer Acceleration only", "A single-AZ RDS instance", "An EC2 placement group"], 0, "DynamoDB global tables provide multi-Region active-active replication for resilient global applications.", "AWS-Architect-Docs/13.- 200-ACACAD-20-LA-M13SG.pdf", "Global data stores"),
    architectQuestion("A2-Q12", "A2", "Backups", "A company needs centralized backup policies across multiple AWS services and accounts. Which service can help?", ["AWS Backup", "Amazon Inspector", "AWS Shield", "Amazon AppFlow"], 0, "AWS Backup centralizes backup policies and management across supported services.", "AWS-Architect-Docs/14.- 200-ACACAD-20-LA-M14SG.pdf", "Centralized backups"),
    architectQuestion("A2-Q13", "A2", "RTO/RPO", "A workload has a strict RTO and a very low RPO. Which DR strategy is usually more appropriate than backup-and-restore alone?", ["Pilot light or warm standby", "No backups", "Single instance with manual restore", "One Region with no replication"], 0, "Tighter RTO/RPO objectives usually require partially warm or replicated environments instead of restore-only designs.", "AWS-Architect-Docs/14.- 200-ACACAD-20-LA-M14SG.pdf", "Disaster recovery strategies"),
    architectQuestion("A2-Q14", "A2", "Health Checks", "An application uses Route 53 and multiple endpoints. What allows traffic to be shifted away from an unhealthy endpoint?", ["S3 lifecycle rules", "Route 53 health checks", "EBS snapshots", "AWS Glue jobs"], 1, "Route 53 health checks inform failover and routing decisions based on endpoint health.", "AWS-Architect-Docs/9.- 200-ACACAD-20-LA-M09SG.pdf", "DNS health checks"),
    architectQuestion("A2-Q15", "A2", "Database Read Availability", "A read-heavy Aurora database must remain available during replica failure and support read scaling. Which design fits best?", ["Aurora with reader instances across AZs", "Single EC2-hosted database", "No replicas and nightly exports", "One on-premises database only"], 0, "Aurora reader instances across AZs support resilient read scaling and fast failover scenarios.", "AWS-Architect-Docs/5.- 200-ACACAD-20-LA-M05SG.pdf", "Aurora resilience"),
    architectQuestion("A2-Q16", "A2", "Edge Availability", "A media site wants static assets delivered even if one origin becomes unhealthy. Which design improves resilience at the edge?", ["CloudFront with origin failover", "One EC2 instance only", "A larger NAT gateway", "A single NACL rule"], 0, "CloudFront origin failover can route requests to a secondary origin when the primary is unavailable.", "AWS-Architect-Docs/9.- 200-ACACAD-20-LA-M09SG.pdf", "Edge resiliency"),
    architectQuestion("A2-Q17", "A2", "Message Isolation", "A workload receives burst traffic and downstream systems sometimes slow down. Which architecture best increases resiliency?", ["Direct synchronous calls to the database", "Queue requests and process asynchronously", "Disable retries", "Use one larger subnet"], 1, "Asynchronous queueing absorbs bursts and isolates producers from consumer slowdowns.", "AWS-Architect-Docs/10.- 200-ACACAD-20-LA-M10SG.pdf", "Buffering and backpressure"),

    architectQuestion("A3-Q01", "A3", "Caching", "A web application suffers from repeated database reads for the same hot data. Which design best improves performance?", ["Add Amazon ElastiCache", "Increase Route 53 TTL only", "Replace HTTPS with HTTP", "Move logs to Glacier"], 0, "ElastiCache reduces repeated database reads by caching frequently requested data in memory.", "AWS-Architect-Docs/12.- 200-ACACAD-20-LA-M12SG.pdf", "Caching patterns"),
    architectQuestion("A3-Q02", "A3", "CDN", "Users across continents report high latency when downloading static images. What is the most direct improvement?", ["Add Amazon CloudFront", "Create more IAM users", "Enable versioning on EBS", "Use one larger RDS instance"], 0, "CloudFront caches content closer to users at edge locations, reducing latency.", "AWS-Architect-Docs/9.- 200-ACACAD-20-LA-M09SG.pdf", "Content delivery"),
    architectQuestion("A3-Q03", "A3", "NoSQL Choice", "An application requires single-digit millisecond latency at very high scale for key-value access. Which data store is the best match?", ["Amazon DynamoDB", "Amazon Redshift", "Amazon Athena", "Amazon EFS"], 0, "DynamoDB is built for high-scale, low-latency key-value and document access.", "AWS-Architect-Docs/13.- 200-ACACAD-20-LA-M13SG.pdf", "NoSQL workload fit"),
    architectQuestion("A3-Q04", "A3", "Read Scaling", "A relational database is CPU constrained because of many read queries. Which design is most appropriate?", ["Add read replicas", "Move the database to a public subnet", "Disable caching", "Add an internet gateway"], 0, "Read replicas are a common way to scale read-heavy relational workloads.", "AWS-Architect-Docs/5.- 200-ACACAD-20-LA-M05SG.pdf", "Read scaling"),
    architectQuestion("A3-Q05", "A3", "Container Performance", "A team wants to run containers without managing EC2 capacity and still scale with load. Which option fits best?", ["Amazon ECS on Fargate", "Amazon S3", "AWS Artifact", "AWS Outposts only"], 0, "Fargate removes server management while supporting container-based scaling patterns.", "AWS-Architect-Docs/3.- 200-ACACAD-20-LA-M03SG.pdf", "Managed containers"),
    architectQuestion("A3-Q06", "A3", "Storage Performance", "A transactional database on EC2 needs predictable high IOPS storage. Which option is most appropriate?", ["Amazon S3 Standard", "Amazon EBS io2 volumes", "Amazon Glacier Deep Archive", "Amazon FSx for Lustre for boot volume"], 1, "EBS io2 is designed for mission-critical workloads requiring high and consistent IOPS.", "AWS-Architect-Docs/8.- 200-ACACAD-20-LA-M08SG.pdf", "High-performance block storage"),
    architectQuestion("A3-Q07", "A3", "Latency-Based Routing", "Users should be routed to the Region with the lowest network latency. Which Route 53 policy should be used?", ["Failover routing", "Weighted routing", "Latency routing", "Simple routing"], 2, "Latency routing uses network latency measurements to route users to the best Region.", "AWS-Architect-Docs/9.- 200-ACACAD-20-LA-M09SG.pdf", "Latency routing"),
    architectQuestion("A3-Q08", "A3", "Burst Processing", "A system receives sudden spikes of work that overwhelm workers for short periods. Which design helps smooth the load?", ["Place a queue between producers and consumers", "Disable retries and drop requests", "Use one large monolithic server only", "Move everything to one subnet"], 0, "Queues buffer bursts and let consumers process at a controlled pace.", "AWS-Architect-Docs/10.- 200-ACACAD-20-LA-M10SG.pdf", "Smoothing spikes"),
    architectQuestion("A3-Q09", "A3", "Auto Scaling", "Which design increases performance for a stateless fleet when CPU utilization rises?", ["Horizontal Auto Scaling on demand", "Manual snapshots", "Blocking all inbound traffic", "Reducing instance count"], 0, "Auto Scaling horizontally expands the fleet to handle increased demand.", "AWS-Architect-Docs/3.- 200-ACACAD-20-LA-M03SG.pdf", "Scaling web tiers"),
    architectQuestion("A3-Q10", "A3", "Streaming Ingestion", "A platform ingests large volumes of streaming data in near real time. Which service is purpose-built for this?", ["Amazon Kinesis", "Amazon CloudFront", "AWS Budgets", "AWS Organizations"], 0, "Amazon Kinesis is designed for real-time streaming data ingestion and processing.", "AWS-Architect-Docs/11.- 200-ACACAD-20-LA-M11SG.pdf", "Streaming architectures"),
    architectQuestion("A3-Q11", "A3", "Global Network Entry", "A company wants to improve global TCP application performance with a static anycast entry point. Which service fits best?", ["AWS Global Accelerator", "AWS Config", "Amazon Comprehend", "AWS Control Tower"], 0, "Global Accelerator improves performance and availability using the AWS global network and anycast IPs.", "AWS-Architect-Docs/9.- 200-ACACAD-20-LA-M09SG.pdf", "Global application entry points"),
    architectQuestion("A3-Q12", "A3", "DynamoDB Caching", "An application uses DynamoDB and needs microsecond read performance for popular items. What should be added?", ["DynamoDB Accelerator (DAX)", "AWS Batch", "A NAT instance", "Amazon EMR"], 0, "DAX is an in-memory cache for DynamoDB designed for extremely fast reads.", "AWS-Architect-Docs/13.- 200-ACACAD-20-LA-M13SG.pdf", "DynamoDB acceleration"),
    architectQuestion("A3-Q13", "A3", "Large Uploads", "Users upload multi-GB files to Amazon S3. Which design improves transfer performance and resiliency?", ["Use multipart upload", "Store files in user cookies", "Send all uploads through the root account", "Disable retries"], 0, "Multipart upload improves throughput, resiliency, and restart behavior for large object uploads.", "AWS-Architect-Docs/8.- 200-ACACAD-20-LA-M08SG.pdf", "Large object transfer"),
    architectQuestion("A3-Q14", "A3", "HPC Placement", "A tightly coupled HPC workload needs very low network latency between EC2 instances. Which feature should be evaluated?", ["Cluster placement groups", "S3 lifecycle policies", "AWS Budgets", "Amazon WorkMail"], 0, "Cluster placement groups optimize placement for low-latency, high-throughput networking between instances.", "AWS-Architect-Docs/3.- 200-ACACAD-20-LA-M03SG.pdf", "Placement strategies"),
    architectQuestion("A3-Q15", "A3", "Serverless Concurrency", "A Lambda-based API has intermittent traffic spikes. Which property of Lambda helps absorb demand quickly?", ["Automatic scaling of concurrent invocations", "Dedicated public IPs", "Manual placement groups", "Root-user optimization"], 0, "Lambda scales concurrency automatically for many bursty event-driven workloads.", "AWS-Architect-Docs/11.- 200-ACACAD-20-LA-M11SG.pdf", "Serverless scaling"),
    architectQuestion("A3-Q16", "A3", "Compression and Edge Cache", "A website wants to improve asset delivery speed without changing application code. Which option is the most direct?", ["Use CloudFront caching and compression", "Increase IAM policy size", "Make the database public", "Replace DNS with static hosts entries"], 0, "CloudFront edge caching and compression improve delivery speed for static and cacheable content.", "AWS-Architect-Docs/9.- 200-ACACAD-20-LA-M09SG.pdf", "Edge performance"),

    architectQuestion("A4-Q01", "A4", "Storage Tiering", "A company stores logs that are rarely accessed after 30 days. Which design reduces cost the most?", ["Use S3 lifecycle transitions to a lower-cost storage class", "Keep all logs on io2 volumes", "Move logs to EC2 instance store", "Store logs in MemoryDB"], 0, "S3 lifecycle rules automatically transition data to cheaper storage classes over time.", "AWS-Architect-Docs/8.- 200-ACACAD-20-LA-M08SG.pdf", "Lifecycle and archival"),
    architectQuestion("A4-Q02", "A4", "Fault-Tolerant Batch", "A batch processing workload can tolerate interruptions. Which purchase option is usually most cost effective?", ["On-Demand Instances only", "Spot Instances", "Dedicated Hosts only", "Provisioned IOPS"], 1, "Spot Instances are typically the lowest-cost compute option for interruption-tolerant workloads.", "AWS-Architect-Docs/3.- 200-ACACAD-20-LA-M03SG.pdf", "Spot economics"),
    architectQuestion("A4-Q03", "A4", "Steady-State Savings", "A company has predictable EC2 usage all year. Which option can reduce compute costs?", ["Savings Plans or Reserved capacity strategies", "One NAT gateway per AZ for every app regardless of need", "More public IPs", "A larger Route 53 TTL"], 0, "Predictable usage is a strong fit for commitment-based discounts such as Savings Plans.", "AWS-Architect-Docs/15.- 200-ACACAD-20-LA-M15SG.pdf", "Commitment discounts"),
    architectQuestion("A4-Q04", "A4", "Rightsizing", "Which service provides recommendations to right-size EC2 resources based on utilization patterns?", ["AWS Compute Optimizer", "AWS Artifact", "Amazon Cognito", "Amazon Simple Email Service"], 0, "Compute Optimizer analyzes usage and recommends better-sized compute resources.", "AWS-Architect-Docs/15.- 200-ACACAD-20-LA-M15SG.pdf", "Rightsizing recommendations"),
    architectQuestion("A4-Q05", "A4", "Development Schedules", "A company wants nonproduction EC2 instances to stop automatically outside business hours. What is the best general approach?", ["Automate stop/start schedules", "Purchase Dedicated Hosts", "Use Multi-AZ for all dev boxes", "Force all instances to stay on"], 0, "Stopping nonproduction resources when they are not needed is a common direct cost optimization.", "AWS-Architect-Docs/14.- 200-ACACAD-20-LA-M14SG.pdf", "Operational cost controls"),
    architectQuestion("A4-Q06", "A4", "Spiky Workloads", "A startup has unpredictable traffic and wants to avoid paying for idle servers. Which architecture is often cost optimized?", ["Serverless services such as Lambda and managed integrations", "Dedicated Hosts for every component", "Always-on oversized EC2 fleets", "Provisioned IOPS for static websites"], 0, "Serverless can align cost closely with usage for spiky, intermittent workloads.", "AWS-Architect-Docs/11.- 200-ACACAD-20-LA-M11SG.pdf", "Serverless cost alignment"),
    architectQuestion("A4-Q07", "A4", "NAT Cost Reduction", "Private subnets frequently access S3 and DynamoDB, creating NAT Gateway charges. Which change can reduce cost?", ["Add VPC endpoints for S3 and DynamoDB", "Use more NAT Gateways", "Move all workloads to public subnets", "Add more EIPs"], 0, "VPC endpoints for S3 and DynamoDB can reduce NAT data processing charges for those service calls.", "AWS-Architect-Docs/4.- 200-ACACAD-20-LA-M04SG.pdf", "Reducing data path costs"),
    architectQuestion("A4-Q08", "A4", "Efficient Compute", "A company wants better price performance for many compute workloads. Which instance family direction should be evaluated?", ["AWS Graviton-based instances", "Only previous-generation instances", "Dedicated Hosts for every environment", "Magnetic EBS only"], 0, "Graviton instances often provide favorable price/performance for supported workloads.", "AWS-Architect-Docs/3.- 200-ACACAD-20-LA-M03SG.pdf", "Instance family optimization"),
    architectQuestion("A4-Q09", "A4", "Transfer Optimization", "A global site serves large volumes of cacheable content. Which design can reduce origin egress and improve user experience?", ["Use CloudFront in front of the origin", "Increase root account usage", "Run the origin in more public subnets only", "Use bigger SSH keys"], 0, "CloudFront offloads origin traffic and can reduce repeated origin data transfer.", "AWS-Architect-Docs/9.- 200-ACACAD-20-LA-M09SG.pdf", "Cost-aware content delivery"),
    architectQuestion("A4-Q10", "A4", "Intermittent Databases", "A development team uses a database heavily only during working hours and wants to scale down when idle. Which option is attractive to evaluate?", ["Aurora Serverless v2 or a similar elastic managed design", "Dedicated Hosts", "Always-on multi-Region active-active if not needed", "Provisioned IOPS for test schemas"], 0, "Elastic or automatically scaling database options can reduce cost for variable usage patterns.", "AWS-Architect-Docs/5.- 200-ACACAD-20-LA-M05SG.pdf", "Elastic database consumption"),
    architectQuestion("A4-Q11", "A4", "Managed Services", "Why can managed services be cost optimized even if the per-unit price seems higher than self-managed compute?", ["They can reduce operational overhead and hidden management cost", "They always remove the need for monitoring", "They eliminate the responsibility model", "They require no architecture decisions"], 0, "Cost optimization includes engineering and operations effort, not just infrastructure list price.", "AWS-Architect-Docs/15.- 200-ACACAD-20-LA-M15SG.pdf", "Total cost of ownership"),
    architectQuestion("A4-Q12", "A4", "Chargeback", "A company wants to allocate AWS costs to business units accurately. Which design is foundational?", ["Use cost allocation tags consistently", "Use one shared root account only", "Disable Cost Explorer", "Avoid account separation"], 0, "Consistent cost allocation tags are key to showback and chargeback models.", "AWS-Architect-Docs/15.- 200-ACACAD-20-LA-M15SG.pdf", "Cost allocation and reporting")
  ];

  const saa = {
    appMeta: {
      examCode: "SAA-C03",
      examName: "AWS Certified Solutions Architect - Associate",
      simulatedQuestionCount: 65,
      simulatedTimeMinutes: 130,
      passingScoreGoal: 72,
      defaultSettings: {
        targetExamDate: "2026-07-31",
        targetScore: 80,
        questionsPerExam: 20,
        dailyPracticeGoal: 1,
        preferredMode: "full",
        focusDomainIds: []
      },
      assumptions: [
        "La guia local solutions-architect-associate-03.pdf se usa como blueprint rector para el examen Associate.",
        "La trazabilidad exacta a capitulos internos de cada PDF no pudo extraerse automaticamente en esta sesion.",
        "El banco inicial del Associate esta generado a partir de fuente local alineada al blueprint oficial."
      ],
      questionBankTargets: {
        full: 150,
        reinforcement: 60
      },
      questionSelection: {
        fullStrategy: "stratified-random-by-domain",
        reinforcementStrategy: "stratified-random-by-domain"
      }
    },
    blueprint: {
      note: "Configurado como simulacion SAA-C03 con 65 preguntas y 130 minutos. La distribucion por dominios sigue una aproximacion alineada al blueprint oficial.",
      domains: [
        {
          id: "A1",
          name: "Design Secure Architectures",
          weight: 30,
          questionTarget: 20,
          officialSection: "Domain 1: Design Secure Architectures",
          studyFile: "AWS-Architect-Docs/1.- 200-ACACAD-20-LA-M01SG.pdf",
          studySection: "Seguridad, identidad y acceso"
        },
        {
          id: "A2",
          name: "Design Resilient Architectures",
          weight: 26,
          questionTarget: 17,
          officialSection: "Domain 2: Design Resilient Architectures",
          studyFile: "AWS-Architect-Docs/3.- 200-ACACAD-20-LA-M03SG.pdf",
          studySection: "Alta disponibilidad y recuperacion"
        },
        {
          id: "A3",
          name: "Design High-Performing Architectures",
          weight: 24,
          questionTarget: 16,
          officialSection: "Domain 3: Design High-Performing Architectures",
          studyFile: "AWS-Architect-Docs/9.- 200-ACACAD-20-LA-M09SG.pdf",
          studySection: "Rendimiento, caching y escalado"
        },
        {
          id: "A4",
          name: "Design Cost-Optimized Architectures",
          weight: 20,
          questionTarget: 12,
          officialSection: "Domain 4: Design Cost-Optimized Architectures",
          studyFile: "AWS-Architect-Docs/15.- 200-ACACAD-20-LA-M15SG.pdf",
          studySection: "Costos y optimizacion"
        }
      ]
    },
    documents: architectDocuments,
    questionBank: architectQuestionBank.map((question) => enrichQuestion(question, "saa-c03"))
  };

  window.APP_DATA = {
    certifications: {
      "clf-c02": clf,
      "saa-c03": saa
    }
  };
})();
