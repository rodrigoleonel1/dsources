import type { SeedResource } from "./types";

export const RESOURCES: SeedResource[] = [
  {
    id: "1",
    name: "freeCodeCamp",
    description:
      "Cursos gratuitos de programación con proyectos prácticos y certificaciones.",
    url: "https://www.freecodecamp.org/",
    tags: ["html", "css", "javascript", "fullstack", "gratis"],
    category: "cursos",
    featured: true,
  },
  {
    id: "2",
    name: "Frontend Mentor",
    description:
      "Retos de frontend con diseños reales para mejorar tus habilidades.",
    url: "https://www.frontendmentor.io/",
    tags: ["frontend", "retos", "ui", "css", "html"],
    category: "challenges",
    featured: true,
  },
  {
    id: "3",
    name: "Exercism",
    description:
      "Ejercicios de programación con mentoría en múltiples lenguajes.",
    url: "https://exercism.org/",
    tags: ["retos", "algoritmos", "mentoria"],
    category: "challenges",
  },
  {
    id: "4",
    name: "MDN Web Docs",
    description: "Documentación oficial y guías de tecnologías web.",
    url: "https://developer.mozilla.org/",
    tags: ["documentacion", "web", "js", "css", "html"],
    category: "documentacion",
    featured: true,
  },
  {
    id: "5",
    name: "DevDocs",
    description:
      "Documentación rápida de múltiples tecnologías en una sola app.",
    url: "https://devdocs.io/",
    tags: ["documentacion", "buscador", "rapido"],
    category: "documentacion",
    featured: true,
  },
  {
    id: "6",
    name: "Behance",
    description: "Portafolios y proyectos creativos para inspiración.",
    url: "https://www.behance.net/",
    tags: ["diseño", "inspiracion", "portafolio"],
    category: "inspiraciones",
    featured: true,
  },
  {
    id: "7",
    name: "Smashing Magazine",
    description:
      "Artículos, guías y recursos para desarrolladores y diseñadores.",
    url: "https://www.smashingmagazine.com/",
    tags: ["blog", "guias", "css", "accesibilidad"],
    category: "blogs",
  },
  {
    id: "8",
    name: "Awesome Lists",
    description: "Colecciones curadas (awesome) de recursos en GitHub.",
    url: "https://github.com/sindresorhus/awesome",
    tags: ["awesome", "listas", "recursos"],
    category: "repositorios",
  },
  {
    id: "9",
    name: "RapidAPI",
    description:
      "Marketplace con miles de APIs para integrar en tus proyectos.",
    url: "https://rapidapi.com/",
    tags: ["apis", "sdk", "backend"],
    category: "apis",
  },
  {
    id: "10",
    name: "Tailwind CSS",
    description:
      "Framework de CSS utility-first para crear diseños personalizados rápidamente.",
    url: "https://tailwindcss.com",
    tags: ["css", "utilidades", "responsive", "personalizable"],
    category: "librerias",
  },
  {
    id: "11",
    name: "Figma",
    description:
      "Herramienta colaborativa para diseño de interfaces y prototipos.",
    url: "https://www.figma.com/",
    tags: ["diseño", "ui", "prototipado", "herramientas"],
    category: "herramientas",
  },
  {
    id: "12",
    name: "Dev.to",
    description:
      "Comunidad de desarrolladores con blogs, tutoriales y discusiones.",
    url: "https://dev.to/",
    tags: ["blog", "comunidad", "guias"],
    category: "blogs",
  },
  {
    id: "13",
    name: "GitHub Trending",
    description: "Repositorios en tendencia por lenguaje y periodo.",
    url: "https://github.com/trending",
    tags: ["repositorios", "tendencias", "open-source"],
    category: "repositorios",
  },
  {
    id: "14",
    name: "Can I Use",
    description: "Compatibilidad de características web en navegadores.",
    url: "https://caniuse.com/",
    tags: ["compatibilidad", "css", "js", "navegadores"],
    category: "herramientas",
  },
  {
    id: "15",
    name: "Full Stack Open",
    description:
      "Curso que introduce el desarrollo web moderno con JavaScript.",
    url: "https://fullstackopen.com/en/",
    tags: ["react", "fullstack", "curso", "gratis"],
    category: "cursos",
  },
  {
    id: "16",
    name: "The Odin Project",
    description: "Plataforma gratuita para aprender desarrollo web desde cero.",
    url: "https://www.theodinproject.com/",
    tags: ["ruby", "javascript", "fullstack", "gratis"],
    category: "cursos",
  },
  {
    id: "17",
    name: "Harvard Courses",
    description:
      "Colección de programas y recursos educativos en línea de Harvard.",
    url: "https://pll.harvard.edu/catalog/",
    tags: ["cursos", "programacion", "universidad"],
    category: "cursos",
  },
  {
    id: "18",
    name: "Google UX Design Certificate",
    description:
      "Certificación con las habilidades básicas necesarias en diseño UX.",
    url: "https://grow.google/certificates/ux-design/",
    tags: ["ux", "ui", "certificado", "diseño"],
    category: "cursos",
  },
  {
    id: "19",
    name: "Udacity Product Design",
    description:
      "Aprende validación de productos, prácticas UI/UX y Design Sprint de Google.",
    url: "https://www.udacity.com/course/product-design--ud509",
    tags: ["producto", "ux", "ui", "curso"],
    category: "cursos",
  },
  {
    id: "20",
    name: "Aprende JavaScript",
    description:
      "Curso para aprender JavaScript paso a paso. Gratis y práctico desde cero.",
    url: "https://www.aprendejavascript.dev/",
    tags: ["javascript", "js", "curso"],
    category: "cursos",
  },
  {
    id: "21",
    name: "Uxcel",
    description:
      "Microcursos para aprender habilidades UX con certificado de finalización.",
    url: "https://app.uxcel.com/courses",
    tags: ["ux", "ui", "curso", "diseño"],
    category: "cursos",
  },
  {
    id: "22",
    name: "Advent JS",
    description: "Retos de programación con temática navideña.",
    url: "https://adventjs.dev/en",
    tags: ["javascript", "retos", "programacion"],
    category: "challenges",
  },
  {
    id: "23",
    name: "Codewars",
    description: "Mejora tus habilidades con desafíos de programación.",
    url: "https://www.codewars.com/",
    tags: ["retos", "ejercicios", "javascript"],
    category: "challenges",
  },
  {
    id: "24",
    name: "Frontend Practice",
    description: "Mejora tus habilidades recreando sitios web reales.",
    url: "https://www.frontendpractice.com/",
    tags: ["frontend", "practica", "retos"],
    category: "challenges",
  },
  {
    id: "25",
    name: "Daily UI",
    description: "Serie diaria de retos de diseño UI.",
    url: "https://www.dailyui.co/",
    tags: ["ui", "css", "retos"],
    category: "challenges",
  },
  {
    id: "26",
    name: "UX Tools Challenges",
    description: "Retos de diseño UX para mejorar habilidades.",
    url: "https://uxtools.co/challenges/",
    tags: ["ux", "ui", "diseño", "retos"],
    category: "challenges",
  },
  {
    id: "27",
    name: "Shots",
    description:
      "Crea mockups y presentaciones para redes sociales o sitios web.",
    url: "https://shots.so/",
    tags: ["mockup", "presentaciones", "diseño"],
    category: "herramientas",
  },
  {
    id: "28",
    name: "Gifcap",
    description: "Crea GIFs animados a partir de grabaciones de pantalla.",
    url: "https://gifcap.dev/",
    tags: ["gif", "animacion", "grabacion"],
    category: "herramientas",
  },
  {
    id: "29",
    name: "ResizePixel",
    description:
      "Editor online para redimensionar y editar imágenes fácilmente.",
    url: "https://www.resizepixel.com/",
    tags: ["imagenes", "editor", "fotos"],
    category: "herramientas",
  },
  {
    id: "30",
    name: "GitHub Profile README Generator",
    description: "Genera un README.md personalizado para tu perfil de GitHub.",
    url: "https://rahuldkjain.github.io/gh-profile-readme-generator/",
    tags: ["markdown", "github", "readme"],
    category: "herramientas",
  },
  {
    id: "31",
    name: "README.so",
    description: "Editor simple para personalizar secciones de README.md.",
    url: "https://readme.so/en",
    tags: ["markdown", "readme", "github"],
    category: "herramientas",
  },
  {
    id: "32",
    name: "Next.js Docs",
    description: "Documentación oficial y tutoriales de Next.js.",
    url: "https://nextjs.org/docs",
    tags: ["nextjs", "react", "documentacion"],
    category: "documentacion",
  },
  {
    id: "33",
    name: "React Docs",
    description: "Aprende fundamentos y conceptos avanzados de React.",
    url: "https://react.dev",
    tags: ["react", "documentacion", "frontend"],
    category: "documentacion",
  },
  {
    id: "35",
    name: "shadcn/ui",
    description: "Colección de componentes reutilizables con Tailwind CSS.",
    url: "https://ui.shadcn.com",
    tags: ["componentes", "ui", "diseño"],
    category: "componentes",
  },
  {
    id: "36",
    name: "Unsplash",
    description: "Banco de imágenes y fotos gratuitas para cualquier proyecto.",
    url: "https://unsplash.com",
    tags: ["imagenes", "fotos", "gratis"],
    category: "diseño",
  },
  {
    id: "37",
    name: "Pexels",
    description: "Fotos y videos libres de derechos y gratuitos.",
    url: "https://www.pexels.com/",
    tags: ["imagenes", "fotos", "gratis", "videos"],
    category: "diseño",
  },
  {
    id: "38",
    name: "SVG Repo",
    description: "Iconos y vectores SVG gratuitos para uso comercial.",
    url: "https://www.svgrepo.com/",
    tags: ["svg", "iconos", "vectores"],
    category: "diseño",
  },
  {
    id: "39",
    name: "Dribbble",
    description: "Plataforma de inspiración para diseño y portafolios.",
    url: "https://dribbble.com/",
    tags: ["diseño", "inspiracion", "ui"],
    category: "inspiraciones",
  },
  {
    id: "40",
    name: "Awwwards",
    description: "Galería de sitios web destacados por diseño y creatividad.",
    url: "https://www.awwwards.com/",
    tags: ["diseño", "inspiracion", "frontend"],
    category: "inspiraciones",
  },
  {
    id: "41",
    name: "CSS-Tricks",
    description: "Guías, artículos y trucos de CSS y desarrollo frontend.",
    url: "https://css-tricks.com/",
    tags: ["css", "frontend", "blog"],
    category: "blogs",
  },
  {
    id: "42",
    name: "REST Countries",
    description: "API para obtener información detallada de países.",
    url: "https://restcountries.com/",
    tags: ["api", "geografia", "paises"],
    category: "apis",
  },
  {
    id: "43",
    name: "OpenWeather",
    description: "API de datos meteorológicos actuales y pronósticos.",
    url: "https://openweathermap.org/api",
    tags: ["api", "clima", "weather"],
    category: "apis",
  },

  {
    id: "44",
    name: "Axios",
    description: "Cliente HTTP basado en promesas para el navegador y Node.js.",
    url: "https://axios-http.com/",
    tags: ["http", "fetch", "javascript"],
    category: "librerias",
  },
  {
    id: "45",
    name: "Motion",
    description: "Librería para animaciones en Javascript.",
    url: "https://www.framer.com/motion/",
    tags: ["animaciones", "react", "frontend", "javascript"],
    category: "librerias",
  },
  {
    id: "46",
    name: "Awesome GitHub Profile READMEs",
    description:
      "Colección visual y práctica de perfiles de GitHub bien diseñados.",
    url: "https://zzetao.github.io/awesome-github-profile/",
    tags: ["github", "readme", "inspiracion"],
    category: "inspiraciones",
  },
  {
    id: "47",
    name: "Godly",
    description: "Inspiración de diseño web, solo lo mejor de lo mejor.",
    url: "https://godly.website/",
    tags: ["inspiracion", "diseño", "ui", "web"],
    category: "inspiraciones",
  },
  {
    id: "48",
    name: "Cult UI",
    description:
      "Componentes gratuitos y de código abierto. Bloques compatibles con shadcn/ui.",
    url: "https://www.cult-ui.com/",
    tags: ["componentes", "ui", "diseño"],
    category: "componentes",
  },
  {
    id: "49",
    name: "Developer portfolios",
    description:
      "Una lista de portafolios de desarrolladores para tu inspiración.",
    url: "https://github.com/emmabostian/developeportfolios",
    tags: ["repositorios", "inspiracion", "diseño"],
    category: "repositorios",
  },
  {
    id: "50",
    name: "List Swajp",
    description:
      "Una lista de proyectos y diseños adecuados para inspirarte en personas exitosas.",
    url: "https://list.swajp.me/",
    tags: ["repositorios", "inspiracion", "diseño"],
    category: "inspiraciones",
  },
  {
    id: "51",
    name: "Visualgo ",
    description:
      "Plataforma diseñada para ayudar a comprender estructuras de datos y algoritmos mediante visualizaciones interactivas y animadas.",
    url: "https://visualgo.net/en",
    tags: ["algoritmos", "educación", "árboles", "estructuras de datos"],
    category: "didactico",
  },
  {
    id: "52",
    name: "Codecademy",
    description:
      "Plataforma interactiva para aprender a programar con cursos gratuitos y opciones de suscripción Pro.",
    url: "https://www.codecademy.com/",
    tags: ["cursos", "programacion", "javascript", "python", "html", "css"],
    category: "cursos",
  },
  {
    id: "53",
    name: "Los Apuntes de Majo",
    description:
      "Apuntes gratuitos y visuales sobre programación, JavaScript, Python, Swift y más, creados a mano por Majo Ledesma.",
    url: "https://losapuntesdemajo.vercel.app/",
    tags: ["apuntes", "programacion", "javascript", "python", "swift", "css"],
    category: "didactico",
  },
  {
    id: "54",
    name: "Excalidraw",
    description:
      "Pizarra colaborativa en línea de código abierto para crear diagramas con estilo dibujado a mano.",
    url: "https://excalidraw.com/",
    tags: ["pizarra", "diagramas", "wireframes", "visualización"],
    category: "herramientas",
  },
  {
    id: "55",
    name: "dbdiagram.io",
    description:
      "Herramienta en línea gratuita para crear diagramas de relaciones de bases de datos mediante código.",
    url: "https://dbdiagram.io",
    tags: ["diagramas", "bases de datos", "DBML", "SQL"],
    category: "herramientas",
  },
  {
    id: "56",
    name: "Magic Loops",
    description:
      "Plataforma sin código que permite crear aplicaciones profesionales mediante automatización con IA.",
    url: "https://magicloops.dev/es",
    tags: [
      "sin código",
      "automatización",
      "IA",
      "productividad",
      "generación de contenido",
      "flujos de trabajo",
    ],
    category: "herramientas",
  },
  {
    id: "57",
    name: "Napkin AI",
    description:
      "Plataforma de IA que convierte texto en visualizaciones gráficas como diagramas, mapas mentales e infografías.",
    url: "https://www.napkin.ai/",
    tags: ["IA", "visualización", "presentaciones", "educación"],
    category: "herramientas",
  },
  {
    id: "58",
    name: "Project-Based Learning",
    description:
      "Repositorio con tutoriales prácticos para aprender a programar construyendo aplicaciones reales desde cero.",
    url: "https://github.com/practical-tutorials/project-based-learning",
    tags: [
      "tutoriales",
      "aprendizaje práctico",
      "proyectos reales",
      "desarrollo de software",
    ],
    category: "repositorios",
  },
  {
    id: "59",
    name: "Grow with Google",
    description:
      "Plataforma gratuita con cursos y herramientas para mejorar habilidades digitales, impulsar carreras y hacer crecer negocios.",
    url: "https://grow.google/intl/es/courses-and-tools/",
    tags: [
      "cursos",
      "herramientas",
      "habilidades digitales",
      "emprendimiento",
      "marketing",
      "certificados",
    ],
    category: "cursos",
  },
  {
    id: "60",
    name: "ReactBits.dev",
    description:
      "Biblioteca de componentes React con animaciones y efectos visuales para interfaces únicas.",
    url: "https://www.reactbits.dev/",
    tags: ["react", "componentes", "animaciones", "ui"],
    category: "componentes",
  },
  {
    id: "61",
    name: "bg.ibelick",
    description:
      "Colección gratuita de fragmentos de código para fondos modernos en Tailwind CSS y CSS puro.",
    url: "https://bg.ibelick.com/",
    tags: ["fondos", "backgrounds", "tailwindcss", "css", "diseño"],
    category: "componentes",
  },
  {
    id: "62",
    name: "NEAT",
    description:
      "Herramienta gratuita para crear fondos animados 3D con gradientes dinámicos usando WebGL y Three.js.",
    url: "https://neat.firecms.co/",
    tags: ["fondos", "backgrounds", "3d", "animaciones", "herramientas"],
    category: "herramientas",
  },
  {
    id: "63",
    name: "Shape Divider App",
    description:
      "Herramienta gratuita para crear divisores de sección personalizados con SVG y CSS para diseños web.",
    url: "https://www.shapedivider.app/",
    tags: ["divisores", "svg", "css", "diseño", "herramientas"],
    category: "herramientas",
  },
  {
    id: "64",
    name: "Aceternity UI",
    description:
      "Biblioteca de componentes UI moderna y gratuita con efectos visuales y animaciones para React, basada en Tailwind CSS y Framer Motion.",
    url: "https://ui.aceternity.com/",
    tags: [
      "ui",
      "componentes",
      "react",
      "tailwindcss",
      "animaciones",
      "efectos",
    ],
    category: "componentes",
  },
  {
    id: "65",
    name: "Magic UI",
    description:
      "Biblioteca de componentes UI gratuita y de código abierto con más de 150 componentes animados construidos con React, TypeScript, Tailwind CSS y Framer Motion.",
    url: "https://magicui.design/",
    tags: [
      "ui",
      "componentes",
      "react",
      "tailwindcss",
      "animaciones",
      "efectos",
    ],
    category: "componentes",
  },
  {
    id: "66",
    name: "Motion Primitives",
    description:
      "Biblioteca de componentes UI animados de código abierto para React, Next.js y Tailwind CSS, usando Framer Motion para crear animaciones fáciles y personalizables.",
    url: "https://motion-primitives.com/",
    tags: [
      "ui",
      "componentes",
      "react",
      "tailwindcss",
      "animaciones",
      "motion",
    ],
    category: "componentes",
  },
  {
    id: "67",
    name: "SmoothUI",
    description:
      "Biblioteca de componentes UI moderna y gratuita para React, construida con Tailwind CSS y Motion, que ofrece animaciones suaves y personalización sencilla.",
    url: "https://smoothui.dev/",
    tags: ["ui", "componentes", "react", "tailwindcss", "animaciones"],
    category: "componentes",
  },
  {
    id: "68",
    name: "21st.dev",
    description:
      "Plataforma para crear, compartir y personalizar componentes UI de alta calidad utilizando inteligencia artificial, devolviendo el toque artesanal y el estilo propio a los productos digitales.",
    url: "https://21st.dev/home",
    tags: ["ui", "componentes", "react", "tailwindcss"],
    category: "componentes",
  },
  {
    id: "69",
    name: "unDraw",
    description:
      "Colección de ilustraciones vectoriales gratuitas y de código abierto, personalizables y listas para usar en proyectos web, aplicaciones y más.",
    url: "https://undraw.co/",
    tags: ["ilustraciones", "SVG", "PNG", "diseño"],
    category: "diseño",
  },
  {
    id: "70",
    name: "Bootswatch",
    description:
      "Colección de temas gratuitos y de código abierto para Bootstrap, diseñados para personalizar la apariencia de tus proyectos web sin modificar el código base.",
    url: "https://bootswatch.com/",
    tags: ["temas", "bootstrap", "frontend", "diseño", "css", "sass"],
    category: "componentes",
  },
  {
    id: "71",
    name: "UI Colors",
    description:
      "Generador y editor de paletas de colores para Tailwind CSS, que permite crear, personalizar y exportar escalas de color armoniosas.",
    url: "https://uicolors.app/",
    tags: ["colores", "tailwindcss", "diseño"],
    category: "herramientas",
  },
  {
    id: "72",
    name: "Tailwind CSS Gradient Generator",
    description:
      "Herramienta en línea gratuita para generar gradientes personalizados con Tailwind CSS, permitiendo crear gradientes de texto y fondo visualmente atractivos.",
    url: "https://www.creative-tim.com/twcomponents/gradient-generator/",
    tags: ["gradientes", "tailwindcss", "diseño"],
    category: "herramientas",
  },
  {
    id: "73",
    name: "Portfolio Ideas",
    description:
      "Colección curada de más de 130 ejemplos de portafolios profesionales con enlaces en vivo, repositorios en GitHub y tecnologías utilizadas.",
    url: "https://portfolio-ideas.vercel.app/portfolio.html",
    tags: ["portafolios", "inspiración", "desarrolladores", "diseñadores"],
    category: "inspiraciones",
  },
  {
    id: "74",
    name: "Refero",
    description:
      "Plataforma de inspiración UX/UI con más de 100,000 pantallas organizadas por tipo de página, patrón y elemento de interfaz, ideal para diseñadores que buscan referencias reales y bien estructuradas.",
    url: "https://refero.design/",
    tags: ["inspiración", "UX/UI", "diseño", "patrones", "interfaz"],
    category: "inspiraciones",
  },
  {
    id: "75",
    name: "Dark Mode Design",
    description:
      "Galería curada de sitios web con diseño en modo oscuro, destacando su estética visual y funcionalidad.",
    url: "https://www.darkmodedesign.com/",
    tags: ["diseño web", "inspiración", "frontend", "UI/UX", "galería"],
    category: "inspiraciones",
  },
  {
    id: "76",
    name: "Stack Sorted",
    description:
      "Colección de diseños web destacados organizados por elementos específicos de la interfaz de usuario, ideal para encontrar inspiración en componentes concretos.",
    url: "https://stacksorted.com/",
    tags: ["diseño", "UI/UX", "inspiración", "componentes", "frontend"],
    category: "inspiraciones",
  },
  {
    id: "77",
    name: "Uiverse.io",
    description:
      "Biblioteca comunitaria de UI elements open-source y gratuitos (botones, tarjetas, formularios y más) listos para copiar como HTML/CSS, Tailwind, React o usar en Figma.",
    url: "https://uiverse.io/",
    tags: ["ui", "componentes", "css", "tailwindcss", "react"],
    category: "componentes",
  },
  {
    id: "78",
    name: "Bestfolios",
    description:
      "Galería curada de portafolios, currículos y estudios de caso de diseñadores UI/UX, gráficos y motion designers.",
    url: "https://www.bestfolios.com/portfolios",
    tags: ["portafolios", "inspiración", "diseño", "UI/UX", "galería"],
    category: "inspiraciones",
  },
  {
    id: "79",
    name: "Killer Portfolio",
    description:
      "Galería curada de sitios web de portafolio bellamente diseñados y funcionales, además de recursos para crear portafolios visualmente impactantes.",
    url: "https://www.killerportfolio.com/",
    tags: ["portafolios", "inspiración", "diseño web", "showcase", "UI/UX"],
    category: "inspiraciones",
  },
  {
    id: "80",
    name: "Mobbin",
    description:
      "Biblioteca de inspiración UI/UX con cientos de miles de pantallas reales, flujos completos y patrones de diseño de apps iOS, Android y Web, con integración a Figma.",
    url: "https://mobbin.com",
    tags: ["inspiración", "ui", "ux", "patrones", "diseño", "figma"],
    category: "inspiraciones",
  },
  {
    id: "81",
    name: "Landingfolio",
    description:
      "Galería curada de inspiración para landing pages, con componentes reutilizables (Tailwind, Webflow, Figma), plantillas y tips de diseño orientados a conversión.",
    url: "https://www.landingfolio.com/",
    tags: ["inspiración", "landing pages", "plantillas", "tailwindcss"],
    category: "inspiraciones",
  },
  {
    id: "82",
    name: "Josh W. Comeau",
    description:
      "Blog educativo e interactivo creado por Josh W. Comeau, desarrollador y educador indie, con artículos y cursos visuales sobre CSS, React, SVG y animaciones.",
    url: "https://www.joshwcomeau.com/",
    tags: ["blog", "tutoriales", "CSS", "React", "SVG", "educación"],
    category: "blogs",
  },
  {
    id: "83",
    name: "PokeAPI",
    description:
      "API RESTful gratuita y open-source que ofrece acceso completo a datos de Pokémon (especies, tipos, movimientos, habilidades, evoluciones, etc.).",
    url: "https://pokeapi.co/",
    tags: ["API", "REST", "Pokémon", "datos", "open-source"],
    category: "apis",
  },
  {
    id: "84",
    name: "Valorant-API",
    description:
      "API no oficial que proporciona datos del juego VALORANT como agentes, mapas y assets para uso en proyectos de desarrollo.",
    url: "https://dash.valorant-api.com/",
    tags: ["API", "Valorant", "datos del juego", "assets", "gaming"],
    category: "apis",
  },
  {
    id: "85",
    name: "React Bootstrap",
    description:
      "Biblioteca de componentes UI construida en React que reemplaza el JavaScript de Bootstrap por componentes accesibles, manteniendo compatibilidad con estilos y temas existentes.",
    url: "https://react-bootstrap.github.io/",
    tags: ["React", "Bootstrap", "componentes", "UI"],
    category: "librerias",
  },
  {
    id: "86",
    name: "roadmap.sh",
    description:
      "Plataforma colaborativa con roadmaps interactivos, guías y recursos estructurados (por rol o habilidad) para guiar el aprendizaje y crecimiento de desarrolladores.",
    url: "https://roadmap.sh/",
    tags: ["carreras", "roadmap", "aprendizaje", "guias", "interactivo"],
    category: "didactico",
  },
  {
    id: "87",
    name: "Refactoring.Guru",
    description:
      "Plataforma educativa que ofrece guías prácticas sobre refactorización, patrones de diseño y principios SOLID para mejorar la calidad del código.",
    url: "https://refactoring.guru/",
    tags: ["refactorización", "patrones de diseño", "SOLID", "código limpio"],
    category: "didactico",
  },
  {
    id: "88",
    name: "Patterns.dev",
    description:
      "Guía gratuita sobre patrones de diseño, renderizado y optimización de rendimiento para aplicaciones web modernas, con enfoque en JavaScript y frameworks como React.",
    url: "https://www.patterns.dev/",
    tags: ["patrones de diseño", "JavaScript", "React", "rendimiento"],
    category: "didactico",
  },
  {
    id: "89",
    name: "awesome-interview-questions",
    description:
      "Colección curada de listas de preguntas de entrevistas técnicas organizadas por lenguaje, framework, plataforma y tema, útil para la preparación de entrevistas técnicas.",
    url: "https://github.com/DopplerHQ/awesome-interview-questions",
    tags: [
      "entrevistas técnicas",
      "recursos",
      "GitHub",
      "entrevistas de programación",
    ],
    category: "repositorios",
  },
  {
    id: "90",
    name: "Coding Interview University",
    description:
      "Plan de estudio gratuito y de código abierto para prepararse para entrevistas técnicas en empresas de tecnología, cubriendo ciencias de la computación, estructuras de datos, algoritmos y más.",
    url: "https://github.com/jwasham/coding-interview-university",
    tags: [
      "entrevistas técnicas",
      "ciencias de la computación",
      "algoritmos",
      "estructuras de datos",
    ],
    category: "repositorios",
  },
  {
    id: "91",
    name: "50 Projects in 50 Days",
    description:
      "Desafío educativo que consiste en construir 50 mini proyectos web utilizando HTML, CSS y JavaScript en 50 días, diseñado para enseñar y reforzar habilidades fundamentales de desarrollo frontend.",
    url: "https://github.com/bradtraversy/50projects50days",
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "proyectos",
      "frontend",
      "educación",
      "repositorio",
      "desarrollo web",
    ],
    category: "repositorios",
  },
  {
    id: "92",
    name: "Interview challenges",
    description:
      "Colección de ejercicios prácticos para prepararse para entrevistas técnicas, organizados en algoritmos, proyectos en vivo y proyectos para llevar a casa.",
    url: "https://github.com/goncy/interview-challenges",
    tags: [
      "entrevistas técnicas",
      "preparación",
      "algoritmos",
      "proyectos",
      "JavaScript",
      "React",
    ],
    category: "repositorios",
  },
  {
    id: "93",
    name: "Linkedin skill assessments quizzes",
    description:
      "Colección de respuestas y preguntas de las evaluaciones de habilidades de LinkedIn, útil para prepararse para las evaluaciones o reforzar conocimientos en diferentes áreas tecnológicas.",
    url: "https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes",
    tags: [
      "LinkedIn",
      "evaluaciones de habilidades",
      "JavaScript",
      "React",
      "Git",
      "HTML",
      "MongoDB",
      "Java",
      "Python",
      "Machine Learning",
      "PowerPoint",
      "Excel",
    ],
    category: "repositorios",
  },
  {
    id: "94",
    name: "JSON Data AI",
    description:
      "Genera datos JSON estructurados a partir de prompts personalizados y convierte esos datos en endpoints de API funcionales.",
    url: "https://www.jsondataai.com/",
    tags: [
      "API",
      "JSON",
      "inteligencia artificial",
      "datos estructurados",
      "generación de datos",
    ],
    category: "herramientas",
  },
  {
    id: "95",
    name: "Color.review",
    description:
      "Herramienta web gratuita para explorar y verificar la accesibilidad de combinaciones de colores en diseño digital, garantizando legibilidad para todos.",
    url: "https://color.review/",
    tags: ["accesibilidad", "contraste", "diseño web", "colores"],
    category: "herramientas",
  },
  {
    id: "96",
    name: "Ideogram AI",
    description:
      "Generador de imágenes basado en inteligencia artificial que convierte descripciones textuales en imágenes de alta calidad con integración precisa de texto.",
    url: "https://ideogram.ai/",
    tags: [
      "Generación de imágenes",
      "Inteligencia artificial",
      "Diseño gráfico",
      "ia",
      "diseño",
    ],
    category: "herramientas",
  },
  {
    id: "97",
    name: "SocialEcho",
    description:
      "Plataforma de redes sociales de código abierto con moderación automatizada de contenido y autenticación basada en contexto, construida con el stack MERN.",
    url: "https://github.com/nz-m/SocialEcho",
    tags: [
      "MERN",
      "Redes sociales",
      "Moderación de contenido",
      "Autenticación",
      "Código abierto",
      "React",
      "Node.js",
      "MongoDB",
      "Express.js",
    ],
    category: "repositorios",
  },
  {
    id: "98",
    name: "Next.js Learn",
    description:
      "Curso interactivo gratuito que enseña los fundamentos de Next.js y la construcción de aplicaciones web completas utilizando las últimas funciones del framework.",
    url: "https://nextjs.org/learn",
    tags: ["Next.js", "Desarrollo web", "Vercel", "Framework", "Full-stack"],
    category: "didactico",
  },
  {
    id: "99",
    name: "Desafío Latam",
    description:
      "Academia digital que ofrece formación práctica y accesible en tecnología para personas en América Latina, con carreras, cursos y talleres gratuitos.",
    url: "https://desafiolatam.com/",
    tags: [
      "Educación",
      "Desarrollo web",
      "Ciencia de datos",
      "UX/UI",
      "Cursos gratuitos",
    ],
    category: "cursos",
  },
  {
    id: "100",
    name: "HTTP Cats",
    description:
      "API gratuita que asocia cada código de estado HTTP con una imagen de un gato, combinando humor y aprendizaje técnico.",
    url: "https://http.cat/",
    tags: ["API", "Códigos de estado HTTP", "Desarrollo web", "Educación"],
    category: "didactico",
  },
  {
    id: "101",
    name: "Ant Design",
    description: "Biblioteca de componentes de diseño empresarial para React.",
    url: "https://ant.design",
    tags: ["react", "componentes", "design system"],
    category: "componentes",
  },
  {
    id: "102",
    name: "Material-UI",
    description:
      "Componentes de React que implementan Material Design de Google.",
    url: "https://mui.com",
    tags: ["react", "componentes", "design system", "google"],
    category: "componentes",
  },
  {
    id: "103",
    name: "Chakra UI",
    description:
      "Biblioteca de componentes simple, modular y accesible para React.",
    url: "https://chakra-ui.com",
    tags: ["react", "componentes", "accesibilidad", "modular"],
    category: "componentes",
  },
  {
    id: "104",
    name: "Headless UI",
    description:
      "Componentes de UI completamente sin estilo y totalmente accesibles.",
    url: "https://headlessui.com",
    tags: ["react", "vue", "headless", "accesibilidad"],
    category: "componentes",
  },
  {
    id: "105",
    name: "Mantine",
    description:
      "Biblioteca completa de componentes y hooks de React con tema oscuro nativo.",
    url: "https://mantine.dev",
    tags: ["react", "componentes", "hooks"],
    category: "componentes",
  },
  {
    id: "106",
    name: "Arco Design",
    description:
      "Sistema de diseño empresarial completo y solución de componentes de UI.",
    url: "https://arco.design",
    tags: ["react", "componentes", "empresarial"],
    category: "componentes",
  },
  {
    id: "107",
    name: "Semantic UI React",
    description:
      "Integración de React para Semantic UI con componentes declarativos.",
    url: "https://react.semantic-ui.com",
    tags: ["react", "semantic-ui", "componentes", "declarativo"],
    category: "componentes",
  },
  {
    id: "108",
    name: "Next.js",
    description:
      "Framework de React para producción con renderizado del lado del servidor y generación estática.",
    url: "https://nextjs.org",
    tags: ["react", "ssr", "framework", "vercel", "fullstack"],
    category: "librerias",
  },
  {
    id: "109",
    name: "Vue.js",
    description:
      "Framework progresivo de JavaScript para construir interfaces de usuario.",
    url: "https://vuejs.org",
    tags: ["javascript", "framework", "reactivo", "progresivo"],
    category: "librerias",
  },
  {
    id: "110",
    name: "Nuxt.js",
    description:
      "Framework intuitivo de Vue.js para crear aplicaciones universales.",
    url: "https://nuxt.com",
    tags: ["vue", "ssr", "framework", "universal"],
    category: "librerias",
  },
  {
    id: "111",
    name: "SvelteKit",
    description:
      "Framework web que usa Svelte para construir aplicaciones de cualquier tamaño.",
    url: "https://kit.svelte.dev",
    tags: ["svelte", "framework", "rendimiento", "compilador"],
    category: "librerias",
  },
  {
    id: "112",
    name: "Astro",
    description:
      "Framework web moderno para construir sitios web rápidos y centrados en el contenido.",
    url: "https://astro.build",
    tags: ["estatico", "rendimiento", "islas", "multi-framework"],
    category: "librerias",
  },
  {
    id: "113",
    name: "Remix",
    description:
      "Framework web full-stack centrado en estándares web y experiencia de usuario moderna.",
    url: "https://remix.run",
    tags: ["react", "fullstack", "estandares-web", "ssr"],
    category: "librerias",
  },
  {
    id: "114",
    name: "SolidJS",
    description:
      "Framework JavaScript declarativo, eficiente y flexible para construir interfaces de usuario.",
    url: "https://solidjs.com",
    tags: ["javascript", "reactivo", "rendimiento", "declarativo"],
    category: "librerias",
  },
  {
    id: "115",
    name: "Angular",
    description:
      "Plataforma de desarrollo para construir aplicaciones web, móviles y de escritorio.",
    url: "https://angular.io",
    tags: ["typescript", "framework", "google", "empresarial"],
    category: "librerias",
  },
  {
    id: "116",
    name: "Qwik",
    description:
      "Framework web que permite carga instantánea de aplicaciones de cualquier tamaño.",
    url: "https://qwik.builder.io",
    tags: ["rendimiento", "framework", "javascript"],
    category: "librerias",
  },
  {
    id: "117",
    name: "Fresh",
    description:
      "Framework web moderno para JavaScript y TypeScript basado en Deno.",
    url: "https://fresh.deno.dev",
    tags: ["deno", "framework", "typescript"],
    category: "librerias",
  },
  {
    id: "118",
    name: "VS Code",
    description:
      "Editor de código gratuito y open source, el estándar de la industria con miles de extensiones.",
    url: "https://code.visualstudio.com",
    tags: ["editor", "ide", "productividad", "gratis"],
    category: "herramientas",
  },
  {
    id: "119",
    name: "GitHub Copilot",
    description:
      "Asistente de IA para programar con autocompletado y chat integrado en tu editor.",
    url: "https://github.com/features/copilot",
    tags: ["ia", "asistente", "autocompletado", "productividad"],
    category: "herramientas",
  },
  {
    id: "120",
    name: "Claude Code",
    description:
      "Agente de IA de terminal para programar con Claude, que escribe, refactoriza y ejecuta código.",
    url: "https://claude.com/claude-code",
    tags: ["ia", "agente", "terminal", "coding"],
    category: "herramientas",
  },
  {
    id: "121",
    name: "Cursor",
    description:
      "Editor de código basado en VS Code diseñado para programar con la ayuda de IA.",
    url: "https://www.cursor.com",
    tags: ["ia", "editor", "asistente", "coding"],
    category: "herramientas",
  },
  {
    id: "122",
    name: "OpenCode",
    description:
      "Agente de programación open source con IA que trabaja desde la terminal.",
    url: "https://opencode.ai",
    tags: ["ia", "agente", "terminal", "open-source"],
    category: "herramientas",
  },
  {
    id: "123",
    name: "Ollama",
    description:
      "Ejecuta modelos de lenguaje como LLM locales en tu propia máquina, gratis y privado.",
    url: "https://ollama.com",
    tags: ["ia", "llm", "local", "privacidad"],
    category: "herramientas",
  },
  {
    id: "124",
    name: "Postman",
    description:
      "Plataforma para diseñar, probar y documentar APIs con colaboración en equipo.",
    url: "https://www.postman.com",
    tags: ["api", "testing", "http", "rest"],
    category: "herramientas",
  },
  {
    id: "125",
    name: "Bruno",
    description:
      "Herramienta open source de testing de APIs con una interfaz simplificada y archivos locales.",
    url: "https://www.usebruno.com",
    tags: ["api", "testing", "http", "open-source"],
    category: "herramientas",
  },
  {
    id: "126",
    name: "The Modern JavaScript Tutorial",
    description:
      "Curso completo y gratuito de JavaScript desde cero hasta nivel avanzado.",
    url: "https://javascript.info",
    tags: ["javascript", "curso", "gratis", "es6"],
    category: "didactico",
  },
  {
    id: "127",
    name: "CS50 - Introducción a la Ciencia de la Computación",
    description:
      "Curso de Harvard sobre fundamentos de programación, gratuito y en línea.",
    url: "https://cs50.harvard.edu",
    tags: ["curso", "harvard", "fundamentos", "gratis"],
    category: "cursos",
  },
  {
    id: "128",
    name: "Machine Learning Crash Course",
    description:
      "Curso gratuito de Google con visualizaciones interactivas para aprender los fundamentos de ML.",
    url: "https://developers.google.com/machine-learning/crash-course",
    tags: ["machine-learning", "google", "gratis", "ia"],
    category: "cursos",
  },
  {
    id: "129",
    name: "DeepLearning.AI",
    description:
      "Cursos cortos paguitos gratis y estructurados de IA por pioneros del campo como Andrew Ng.",
    url: "https://www.deeplearning.ai",
    tags: ["ia", "cursos", "machine-learning", "deeplearning"],
    category: "cursos",
  },
  {
    id: "130",
    name: "Anthropic Academy",
    description:
      "Cursos gratuitos de Anthropic sobre IA con certificado, de alfabetización en IA hasta desarrollo de agentes.",
    url: "https://academy.anthropic.com",
    tags: ["ia", "cursos", "prompting", "agentes"],
    category: "didactico",
  },
  {
    id: "131",
    name: "OpenAI Cookbook",
    description:
      "Ejemplos de código listos para ejecutar con los modelos de OpenAI, de RAG a agentes y funciones.",
    url: "https://cookbook.openai.com",
    tags: ["ia", "openai", "ejemplos", "llm"],
    category: "documentacion",
  },
  {
    id: "132",
    name: "Anthropic Docs & Prompt Engineering",
    description:
      "Documentación oficial de Claude, incluye una de las mejores guías de prompt engineering.",
    url: "https://docs.anthropic.com",
    tags: ["ia", "docs", "prompt-engineering", "llm"],
    category: "documentacion",
  },
  {
    id: "133",
    name: "Hugging Face",
    description:
      "La mayor comunidad de modelos open source, datasets y demos de IA ejecutables en la nube.",
    url: "https://huggingface.co",
    tags: ["ia", "modelos", "open-source", "datasets"],
    category: "repositorios",
  },
  {
    id: "134",
    name: "Simon Willison's Blog",
    description:
      "Blog práctico de IA de uno de los desarrolladores más respetados, con reseñas honestas de cada modelo.",
    url: "https://simonwillison.net",
    tags: ["blog", "ia", "llm", "actualidad"],
    category: "blogs",
  },
  {
    id: "135",
    name: "Hacker News",
    description:
      "El foro de tecnología con más influencia del mundo: noticias, discusión y proyectos nuevos.",
    url: "https://news.ycombinator.com",
    tags: ["comunidad", "noticias", "foro", "tech"],
    category: "blogs",
  },
  {
    id: "136",
    name: "Latent Space",
    description:
      "Podcast y newsletter para ingenieros de IA, con entrevistas profundas a quienes construyen los modelos.",
    url: "https://www.latent.space",
    tags: ["podcast", "ia", "noticias", "entrevistas"],
    category: "blogs",
  },
  {
    id: "137",
    name: "PyTorch",
    description:
      "Framework de aprendizaje profundo open source, dominante en investigación e IA.",
    url: "https://pytorch.org",
    tags: ["python", "machine-learning", "torch", "deeplearning"],
    category: "librerias",
  },
  {
    id: "138",
    name: "TensorFlow",
    description:
      "Ecosistema open source de Google para machine learning y deep learning de producción.",
    url: "https://www.tensorflow.org",
    tags: ["python", "machine-learning", "google", "ia"],
    category: "librerias",
  },
  {
    id: "139",
    name: "Gradio",
    description:
      "Crea demos de interfaces para tus modelos de ML en segundos con Python.",
    url: "https://www.gradio.app",
    tags: ["python", "ia", "demo", "ui"],
    category: "herramientas",
  },
  {
    id: "140",
    name: "The Book of Shaders",
    description:
      "Guía interactiva y gratuita para aprender shaders GLSL desde cero.",
    url: "https://thebookofshaders.com",
    tags: ["shaders", "glsl", "gpu", "graficos"],
    category: "didactico",
  },
  {
    id: "141",
    name: "LeetCode",
    description:
      "La plataforma de retos de algoritmos y entrevistas técnicas más usada del mundo.",
    url: "https://leetcode.com",
    tags: ["algoritmos", "entrevistas", "estructuras-de-datos", "retos"],
    category: "challenges",
  },
  {
    id: "142",
    name: "Advent of Code",
    description:
      "Calendario de adviento con 25 desafíos de programación cada diciembre.",
    url: "https://adventofcode.com",
    tags: ["retos", "algoritmos", "navidad", "anual"],
    category: "challenges",
  },
  {
    id: "143",
    name: "CodeSignal",
    description:
      "Retos de código y evaluaciones para practicar habilidades y conseguir entrevistas.",
    url: "https://codesignal.com",
    tags: ["retos", "entrevistas", "algoritmos", "evaluaciones"],
    category: "challenges",
  },
  {
    id: "144",
    name: "HackerRank",
    description:
      "Ejercicios de programación en muchos lenguajes y entrevistas técnicas.",
    url: "https://www.hackerrank.com",
    tags: ["retos", "algoritmos", "entrevistas", "certificaciones"],
    category: "challenges",
  },
  {
    id: "145",
    name: "Project Euler",
    description:
      "Desafíos matemáticos y computacionales para resolver con programación.",
    url: "https://projecteuler.net",
    tags: ["matematicas", "algoritmos", "retos", "numeros"],
    category: "challenges",
  },
  {
    id: "146",
    name: "TypeScript Docs",
    description:
      "Documentación oficial de TypeScript: handbook, manual de referencia y guías.",
    url: "https://www.typescriptlang.org/docs",
    tags: ["typescript", "docs", "tipado", "backend"],
    category: "documentacion",
  },
  {
    id: "147",
    name: "Node.js Docs",
    description:
      "Documentación oficial del runtime de JavaScript del lado del servidor.",
    url: "https://nodejs.org/docs",
    tags: ["nodejs", "docs", "backend", "javascript"],
    category: "documentacion",
  },
  {
    id: "148",
    name: "Python Docs",
    description:
      "Documentación oficial de Python: tutoriales, referencia del lenguaje y la librería estándar.",
    url: "https://docs.python.org",
    tags: ["python", "docs", "referencia", "lenguaje"],
    category: "documentacion",
  },
  {
    id: "149",
    name: "Docker Docs",
    description:
      "Guías y referencia de Docker para contenedores, imágenes y despliegues.",
    url: "https://docs.docker.com",
    tags: ["docker", "contenedores", "devops", "docs"],
    category: "documentacion",
  },
  {
    id: "150",
    name: "PostgreSQL Docs",
    description:
      "Documentación oficial de PostgreSQL, la base de datos open source más avanzada.",
    url: "https://www.postgresql.org/docs",
    tags: ["postgres", "base-de-datos", "sql", "docs"],
    category: "documentacion",
  },
  {
    id: "151",
    name: "Google Fonts",
    description:
      "Colección gratuita de tipografías web listas para usar con un enlace o import.",
    url: "https://fonts.google.com",
    tags: ["fuentes", "tipografia", "web", "gratis"],
    category: "diseño",
  },
  {
    id: "152",
    name: "Coolors",
    description:
      "Generador y explorador de paletas de colores para tus proyectos de UI.",
    url: "https://coolors.co",
    tags: ["colores", "paletas", "ui", "inspiracion"],
    category: "diseño",
  },
  {
    id: "153",
    name: "Iconify",
    description:
      "Más de 150.000 iconos open source de múltiples sets en una sola API.",
    url: "https://iconify.design",
    tags: ["iconos", "svg", "open-source", "ui"],
    category: "diseño",
  },
  {
    id: "154",
    name: "Fontshare",
    description:
      "Tipografías libres y de calidad, seleccionadas por ITF y listas para usar.",
    url: "https://www.fontshare.com",
    tags: ["fuentes", "tipografia", "gratis", "itf"],
    category: "diseño",
  },
  {
    id: "155",
    name: "Canva",
    description:
      "Diseñá gráficos, presentaciones y mockups sin ser diseñador profesional.",
    url: "https://www.canva.com",
    tags: ["diseño", "plantillas", "mockups", "graficos"],
    category: "diseño",
  },
  {
    id: "156",
    name: "web.dev",
    description:
      "Guías oficiales de Google para construir experiencias web rápidas y accesibles.",
    url: "https://web.dev",
    tags: ["rendimiento", "accesibilidad", "web", "google"],
    category: "blogs",
  },
  {
    id: "157",
    name: "Kent C. Dodds Blog",
    description:
      "Blog y cursos de React, testing y desarrollo de software moderno.",
    url: "https://www.kentcdodds.com",
    tags: ["react", "testing", "javascript", "blog"],
    category: "blogs",
  },
  {
    id: "158",
    name: "Overreacted",
    description:
      "Blog de Dan Abramov sobre React y JavaScript, con explicaciones profundas.",
    url: "https://overreacted.io",
    tags: ["react", "javascript", "blog", "conceptos"],
    category: "blogs",
  },
  {
    id: "159",
    name: "ByteByteGo",
    description:
      "Explicaciones visuales de sistemas, arquitecturas y patrones del back-end.",
    url: "https://bytebytego.com",
    tags: ["arquitectura", "distribuido", "system-design", "blog"],
    category: "blogs",
  },
  {
    id: "160",
    name: "Refactoring UI",
    description:
      "Guías para mejorar el diseño de interfaces sin ser diseñador profesional.",
    url: "https://www.refactoringui.com",
    tags: ["diseño", "ui", "tipografia", "spacing"],
    category: "blogs",
  },
  {
    id: "161",
    name: "GitHub REST API",
    description:
      "Documentación de la API para interactuar con repos, issues, pull requests y más.",
    url: "https://docs.github.com/rest",
    tags: ["github", "api", "rest", "integraciones"],
    category: "apis",
  },
  {
    id: "162",
    name: "JSONPlaceholder",
    description:
      "API fake gratuita con datos reales para probar y prototipar frontends.",
    url: "https://jsonplaceholder.typicode.com",
    tags: ["api", "demo", "mock", "testing"],
    category: "apis",
  },
  {
    id: "163",
    name: "The Movie Database API",
    description:
      "API gratuita con miles de datos de películas, series y actores.",
    url: "https://developer.themoviedb.org",
    tags: ["api", "peliculas", "entretenimiento", "data"],
    category: "apis",
  },
  {
    id: "164",
    name: "RandomUser",
    description:
      "Genera usuarios y datos de prueba realistas para los projetos frontend.",
    url: "https://randomuser.me",
    tags: ["api", "datos-fake", "testing", "demo"],
    category: "apis",
  },
  {
    id: "165",
    name: "API Ninjas",
    description:
      "Más de 75 APIs públicas gratuitas: texto, historia, finanzas, geografía y más.",
    url: "https://api-ninjas.com",
    tags: ["api", "gratis", "saas", "multiples"],
    category: "apis",
  },
];
