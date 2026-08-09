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
      "agentes",
    ],
    category: "ia",
  },
  {
    id: "57",
    name: "Napkin AI",
    description:
      "Plataforma de IA que convierte texto en visualizaciones gráficas como diagramas, mapas mentales e infografías.",
url: "https://www.napkin.ai/",
    tags: ["IA", "visualizacion", "presentaciones", "educacion"],
    category: "ia",
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
    category: "ia",
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
    category: "ia",
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
    category: "ia",
  },
  {
    id: "120",
    name: "Claude Code",
    description:
      "Agente de IA de terminal para programar con Claude, que escribe, refactoriza y ejecuta código.",
    url: "https://claude.com/claude-code",
    tags: ["ia", "agente", "terminal", "coding"],
    category: "ia",
  },
  {
    id: "121",
    name: "Cursor",
    description:
      "Editor de código basado en VS Code diseñado para programar con la ayuda de IA.",
    url: "https://www.cursor.com",
    tags: ["ia", "editor", "asistente", "coding"],
    category: "ia",
  },
  {
    id: "122",
    name: "OpenCode",
    description:
      "Agente de programación open source con IA que trabaja desde la terminal.",
    url: "https://opencode.ai",
    tags: ["ia", "agente", "terminal", "open-source"],
    category: "ia",
  },
  {
    id: "123",
    name: "Ollama",
    description:
      "Ejecuta modelos de lenguaje como LLM locales en tu propia máquina, gratis y privado.",
    url: "https://ollama.com",
    tags: ["ia", "llm", "local", "privacidad"],
    category: "ia",
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
  {
    id: "166",
    name: "Cloudflare",
    description:
      "CDN, DNS, protección DDoS y plataforma edge para servir aplicaciones de forma rápida y segura.",
    url: "https://www.cloudflare.com",
    tags: ["cdn", "hosting", "edge", "seguridad"],
    category: "hosting",
  },
  {
    id: "167",
    name: "Vercel",
    description:
      "Plataforma de deploy para frontends y full-stack, la casa de Next.js.",
    url: "https://vercel.com",
    tags: ["deploy", "hosting", "serverless", "nextjs"],
    category: "hosting",
  },
  {
    id: "168",
    name: "Netlify",
    description:
      "Plataforma de hosting y deploy para sitios estáticos y funciones serverless.",
    url: "https://www.netlify.com",
    tags: ["hosting", "deploy", "jamstack", "serverless"],
    category: "hosting",
  },
  {
    id: "169",
    name: "Render",
    description:
      "Nube de hosting para apps web, APIs, cron jobs y bases de datos con deploy simple.",
    url: "https://render.com",
    tags: ["hosting", "deploy", "backend", "pricing-simple"],
    category: "hosting",
  },
  {
    id: "170",
    name: "Deno",
    description:
      "Runtime de JavaScript y TypeScript seguro por defecto, con herramientas integradas.",
    url: "https://deno.com",
    tags: ["runtime", "typescript", "javascript", "backend"],
    category: "librerias",
  },
  {
    id: "171",
    name: "GitHub",
    description:
      "La plataforma de control de versiones y colaboración open source más grande del mundo.",
    url: "https://github.com",
    tags: ["git", "repositorios", "colaboracion", "open-source"],
    category: "repositorios",
  },
  {
    id: "172",
    name: "Supabase",
    description:
      "Backend open source con Postgres, auth, storage y realtime en una sola plataforma.",
    url: "https://supabase.com",
    tags: ["backend", "postgres", "baas", "auth"],
    category: "herramientas",
  },
  {
    id: "173",
    name: "MongoDB Atlas",
    description:
      "Base de datos MongoDB gestionada en la nube, con clusters gratuitos para empezar.",
    url: "https://www.mongodb.com/atlas",
    tags: ["mongodb", "base-de-datos", "cloud", "nosql"],
    category: "herramientas",
  },
  {
    id: "174",
    name: "Neon",
    description:
      "Postgres serverless con branching, escala automática y un tier gratuito generoso.",
    url: "https://neon.tech",
    tags: ["postgres", "serverless", "base-de-datos", "cloud"],
    category: "herramientas",
  },
  {
    id: "175",
    name: "Groq",
    description:
      "Inferencia de LLMs ultrarrápida con chips propios, ideal para streaming y tiempo real.",
    url: "https://groq.com",
    tags: ["ia", "llm", "inferencia", "api"],
    category: "ia",
  },
  {
    id: "176",
    name: "NVIDIA NIM",
    description:
      "Microservicios optimizados de NVIDIA para ejecutar modelos de IA en producción.",
    url: "https://build.nvidia.com",
    tags: ["ia", "gpu", "llm", "microservicios"],
    category: "ia",
  },
  {
    id: "177",
    name: "Google AI Studio",
    description:
      "Plataforma para probar y prototipar con los modelos Gemini de Google gratis.",
    url: "https://aistudio.google.com",
    tags: ["ia", "gemini", "prototipado", "google"],
    category: "ia",
  },
  {
    id: "178",
    name: "NotebookLM",
    description:
      "Asistente de IA de Google que resume, responde y organiza tus documentos y fuentes.",
    url: "https://notebooklm.google.com",
    tags: ["ia", "documentos", "resumen", "google"],
    category: "ia",
  },
  {
    id: "179",
    name: "Cloudflare Workers AI",
    description:
      "Modelos de IA ejecutados en el edge de Cloudflare mediante Workers.",
    url: "https://developers.cloudflare.com/workers-ai",
    tags: ["ia", "edge", "workers", "inferencia"],
    category: "ia",
  },
  {
    id: "180",
    name: "OpenRouter",
    description:
      "Un único API para acceder a cientos de modelos de IA de distintos proveedores.",
    url: "https://openrouter.ai",
    tags: ["ia", "llm", "api", "multi-modelo"],
    category: "ia",
  },
  {
    id: "181",
    name: "Clerk",
    description:
      "Sistema de autenticación y gestión de usuarios listo para integrar en tu app.",
    url: "https://clerk.com",
    tags: ["auth", "usuarios", "login", "saas"],
    category: "herramientas",
  },
  {
    id: "182",
    name: "Auth0",
    description:
      "Plataforma de identidad y autenticación con SSO, MFA y gestión de usuarios.",
    url: "https://auth0.com",
    tags: ["auth", "sso", "identidad", "seguridad"],
    category: "herramientas",
  },
  {
    id: "183",
    name: "Resend",
    description:
      "API de envío de emails para desarrolladores, moderna y simple de integrar.",
    url: "https://resend.com",
    tags: ["email", "api", "transaccional", "react-email"],
    category: "apis",
  },
  {
    id: "184",
    name: "Brevo",
    description:
      "Plataforma de email marketing y transaccional con herramientas de automatización.",
    url: "https://www.brevo.com",
    tags: ["email", "marketing", "transaccional", "automation"],
    category: "apis",
  },
  {
    id: "185",
    name: "Mailtrap",
    description:
      "Inbox de prueba para capturar y testear emails antes de enviarlos de verdad.",
    url: "https://mailtrap.io",
    tags: ["email", "testing", "staging", "inbox"],
    category: "herramientas",
  },
  {
    id: "186",
    name: "Sentry",
    description:
      "Monitoreo de errores y rendimiento en tiempo real para tu aplicación.",
    url: "https://sentry.io",
    tags: ["monitoreo", "errores", "observabilidad", "debugging"],
    category: "herramientas",
  },
  {
    id: "187",
    name: "Google Analytics",
    description:
      "Analítica web de Google para entender el tráfico y comportamiento de usuarios.",
    url: "https://analytics.google.com",
    tags: ["analitica", "metrics", "usuarios", "google"],
    category: "herramientas",
  },
  {
    id: "188",
    name: "Pipedream",
    description:
      "Plataforma de integraciones y automatizaciones con soporte para miles de apps.",
    url: "https://pipedream.com",
    tags: ["automatizacion", "integraciones", "workflows", "api"],
    category: "herramientas",
  },
  {
    id: "189",
    name: "MockAPI",
    description:
      "Crea APIs mock con datos de prueba y prototipa tu frontend al instante.",
    url: "https://mockapi.io",
    tags: ["api", "mock", "prototipado", "testing"],
    category: "apis",
  },
  {
    id: "190",
    name: "Notion",
    description:
      "Espacio de trabajo todo-en-uno para notas, docs, wikis, bases y proyectos.",
    url: "https://www.notion.com",
    tags: ["productividad", "notas", "wiki", "colaboracion"],
    category: "productividad",
  },
  {
    id: "191",
    name: "Trello",
    description:
      "Tableros kanban visuales para organizar proyectos y tareas en equipo.",
    url: "https://trello.com",
    tags: ["kanban", "proyectos", "tareas", "colaboracion"],
    category: "productividad",
  },
  {
    id: "192",
    name: "Linear",
    description:
      "Herramienta de gestión de proyectos y issues rápida, para equipos de producto.",
    url: "https://linear.app",
    tags: ["issues", "proyectos", "producto", "agil"],
    category: "productividad",
  },
  {
    id: "193",
    name: "Miro",
    description:
      "Pizarra colaborativa online para brainstorming, diagramas y planificación.",
    url: "https://miro.com",
    tags: ["pizarra", "colaboracion", "diagramas", "brainstorming"],
    category: "productividad",
  },
  {
    id: "194",
    name: "Discord",
    description:
      "Plataforma de comunidades y comunicación por voz, texto y video.",
    url: "https://discord.com",
    tags: ["comunidad", "chat", "comunicacion", "gaming"],
    category: "productividad",
  },
  {
    id: "195",
    name: "Slack",
    description:
      "Herramienta de comunicación de equipos con canales, integraciones y bots.",
    url: "https://slack.com",
    tags: ["chat", "equipos", "comunicacion", "colaboracion"],
    category: "productividad",
  },
  {
    id: "196",
    name: "Sanity",
    description:
      "CMS headless y plataforma de contenido estructurado con studio personalizable.",
    url: "https://www.sanity.io",
    tags: ["cms", "headless", "contenido", "estructurado"],
    category: "herramientas",
  },
  {
    id: "197",
    name: "Contentful",
    description:
      "CMS headless empresarial para gestionar contenido y distribuirlo a cualquier frontend.",
    url: "https://www.contentful.com",
    tags: ["cms", "headless", "contenido", "api"],
    category: "herramientas",
  },
  {
    id: "198",
    name: "Storybook",
    description:
      "Entorno de desarrollo para construir y documentar componentes UI de forma aislada.",
    url: "https://storybook.js.org",
    tags: ["componentes", "ui", "documentacion", "testing"],
    category: "componentes",
  },
  {
    id: "199",
    name: "Cloudinary",
    description:
      "Plataforma de gestión de imágenes y videos con transformación y CDN.",
    url: "https://cloudinary.com",
    tags: ["imagenes", "video", "cdn", "optimizacion"],
    category: "herramientas",
  },
  {
    id: "200",
    name: "Skills.sh",
    description:
      "Plataforma que evalúa y desarrolla tus habilidades técnicas con ejercicios prácticos.",
    url: "https://www.skills.sh/",
    tags: ["habilidades", "evaluacion", "ejercicios", "productividad"],
    category: "productividad",
  },
  {
    id: "201",
    name: "AutoSkills.sh",
    description:
      "Automatiza la evaluación de habilidades técnicas y la selección de talento con IA.",
    url: "https://www.autoskills.sh/",
    tags: ["habilidades", "ia", "reclutamiento", "evaluacion"],
    category: "ia",
  },
  {
    id: "202",
    name: "Lovable",
    description:
      "Generador de aplicaciones web con IA a partir de una descripción en lenguaje natural.",
    url: "https://lovable.dev",
    tags: ["ia", "generador", "no-code", "producto"],
    category: "ia",
  },
  {
    id: "203",
    name: "LM Studio",
    description:
      "Descarga, ejecuta y prueba modelos de lenguaje locales en tu propia máquina.",
    url: "https://lmstudio.ai",
    tags: ["ia", "llm", "local", "modelos"],
    category: "ia",
  },
  {
    id: "204",
    name: "DeepSeek",
    description:
      "Modelos de IA open source con razonamiento avanzado y muy buena relación costo/rendimiento.",
    url: "https://www.deepseek.com",
    tags: ["ia", "llm", "open-source", "razonamiento"],
    category: "ia",
  },
  {
    id: "205",
    name: "Gemini",
    description:
      "Modelo multimodal de Google con app web, API y capacidades de razonamiento.",
    url: "https://gemini.google.com",
    tags: ["ia", "gemini", "google", "multimodal"],
    category: "ia",
  },
  {
    id: "206",
    name: "Bolt.new",
    description:
      "Crea y despliega aplicaciones full-stack completas con IA directamente desde el navegador.",
    url: "https://bolt.new",
    tags: ["ia", "generador", "fullstack", "no-code"],
    category: "ia",
  },
  {
    id: "207",
    name: "Eldor UI",
    description:
      "Sitio y comunidad de diseños e inspiración de interfaces con estilo moderno.",
    url: "https://www.eldoraui.site",
    tags: ["ui", "inspiracion", "diseño", "landings"],
    category: "inspiraciones",
  },
  {
    id: "208",
    name: "Cosmos",
    description:
      "Colecciona y organiza inspiración y recursos de diseño en tableros visuales.",
    url: "https://www.cosmos.so/",
    tags: ["inspiracion", "coleccion", "diseño", "organizacion"],
    category: "inspiraciones",
  },
  {
    id: "209",
    name: "Craft - Rauno",
    description:
      "Portafolio y tutorial de craft UI: cómo el autor diseñó y codeó sus interfaces.",
    url: "https://rauno.me/craft",
    tags: ["ui", "portfolio", "diseño", "craft"],
    category: "inspiraciones",
  },
  {
    id: "210",
    name: "Fancy Components",
    description:
      "Componentes React y de UI modernos, accesibles y fáciles de copiar.",
    url: "https://www.fancycomponents.dev/",
    tags: ["componentes", "react", "ui", "accesible"],
    category: "componentes",
  },
  {
    id: "211",
    name: "Colour Contrast Checker",
    description:
      "Verifica el contraste de colores y la accesibilidad según WCAG.",
    url: "https://colourcontrast.cc/",
    tags: ["accesibilidad", "contraste", "colores", "wcag"],
    category: "herramientas",
  },
  {
    id: "212",
    name: "Contrast Tools",
    description:
      "Herramienta de accesibilidad para chequear combinaciones de colores de forma rápida.",
    url: "https://contrast.tools/",
    tags: ["accesibilidad", "contraste", "colores", "wcag"],
    category: "herramientas",
  },
  {
    id: "213",
    name: "Who Can Use",
    description:
      "Simula cómo perciben tus colores personas con diferentes tipos de daltonismo.",
    url: "https://www.whocanuse.com/",
    tags: ["accesibilidad", "daltonismo", "colores", "contraste"],
    category: "herramientas",
  },
  {
    id: "214",
    name: "Three.js",
    description:
      "Librería JavaScript para crear gráficos 3D interactivos en el navegador.",
    url: "https://threejs.org",
    tags: ["3d", "webgl", "javascript", "graficos"],
    category: "librerias",
  },
  {
    id: "215",
    name: "Auth.js",
    description:
      "Solución de autenticación open source para Next.js y otras frameworks.",
    url: "https://authjs.dev",
    tags: ["auth", "nextjs", "open-source", "login"],
    category: "librerias",
  },
  {
    id: "216",
    name: "Strapi",
    description:
      "CMS headless open source que construye tus APIs de contenido en minutos.",
    url: "https://strapi.io",
    tags: ["cms", "headless", "api", "open-source"],
    category: "herramientas",
  },
  {
    id: "217",
    name: "Payload",
    description:
      "CMS headless y plataforma de aplicaciones con backend TypeScript nativo.",
    url: "https://payloadcms.com",
    tags: ["cms", "typescript", "headless", "backend"],
    category: "herramientas",
  },
  {
    id: "218",
    name: "CSS Diner",
    description:
      "Juego interactivo para aprender selectores CSS de una forma divertida.",
    url: "https://flukeout.github.io/",
    tags: ["css", "selectores", "juego", "aprender"],
    category: "didactico",
  },
  {
    id: "219",
    name: "DevChallenges",
    description:
      "Challenges de desarrollo para construir proyectos reales y mejorar tu portafolio.",
    url: "https://devchallenges.io/",
    tags: ["retos", "proyectos", "frontend", "portafolio"],
    category: "challenges",
  },
  {
    id: "220",
    name: "Flexbox Froggy",
    description:
      "Juego para aprender flexbox resolviendo niveles con ranas saltarinas.",
    url: "https://flexboxfroggy.com/",
    tags: ["css", "flexbox", "juego", "aprender"],
    category: "didactico",
  },
  {
    id: "221",
    name: "Coding Fantasy",
    description:
      "Convierte retos de código en partidas estilo RPG para aprender mientras juegas.",
    url: "https://codingfantasy.com/",
    tags: ["css", "grid", "juego", "retos"],
    category: "didactico",
  },
  {
    id: "222",
    name: "Codédex",
    description:
      "Curso gamificado e interactivo de desarrollo web con proyectos reales.",
    url: "https://www.codedex.io/",
    tags: ["gamificado", "javascript", "python", "aprender"],
    category: "didactico",
  },
  {
    id: "223",
    name: "CodeCombat",
    description:
      "Aprende programación jugando, diseñado para edades escolares y principiantes.",
    url: "https://codecombat.com/",
    tags: ["juego", "python", "javascript", "aprender"],
    category: "didactico",
  },
  {
    id: "224",
    name: "CodeMonkey",
    description:
      "Plataforma lúdica para enseñar programación a niños y jóvenes.",
    url: "https://www.codemonkey.com/",
    tags: ["juego", "educacion", "programacion", "kids"],
    category: "didactico",
  },
  {
    id: "225",
    name: "JavaScript100",
    description:
      "100 desafíos de JavaScript para mejorar tus habilidades con retos diarios.",
    url: "https://www.javascript100.dev/",
    tags: ["retos", "javascript", "ejercicios", "aprender"],
    category: "challenges",
  },
  {
    id: "226",
    name: "Knight Lab Mystery",
    description:
      "Ejercicio narrativo con historias de misterio para explorar datos periodísticos.",
    url: "https://mystery.knightlab.com/",
    tags: ["misterio", "narrativa", "ejercicio", "aprender"],
    category: "didactico",
  },
  {
    id: "227",
    name: "Styled Components",
    description:
      "Librería CSS-in-JS para escribir estilos por componente en React y React Native.",
    url: "https://styled-components.com/",
    tags: ["css", "styled", "react", "css-in-js"],
    category: "librerias",
  },
  {
    id: "228",
    name: "Neobrutalism",
    description:
      "Sitio e inspiración sobre la estética neobrutalista: bordes duros, sombras y color.",
    url: "https://neobrutalism.com/",
    tags: ["estetica", "inspiracion", "ui", "diseño"],
    category: "inspiraciones",
  },
  {
    id: "229",
    name: "Shapes Gallery",
    description:
      "Galería de formas y siluetas SVG para usar en tus diseños web.",
    url: "https://www.shapes.gallery/",
    tags: ["svg", "shapes", "formas", "recursos"],
    category: "diseño",
  },
  {
    id: "230",
    name: "Radix UI",
    description:
      "Componentes headless accesibles y con API de alto nivel para React.",
    url: "https://www.radix-ui.com/",
    tags: ["componentes", "headless", "accesible", "react"],
    category: "componentes",
  },
  {
    id: "231",
    name: "Panda CSS",
    description:
      "Kit de herramientas CSS-in-JS de estilo con condiciones y temas tipados.",
    url: "https://panda-css.com/",
    tags: ["css", "css-in-js", "typescript", "styling"],
    category: "librerias",
  },
  {
    id: "232",
    name: "Hero UI",
    description:
      "Librería de componentes UI moderna, rápida y accesible para React.",
    url: "https://heroui.com/",
    tags: ["componentes", "react", "ui", "accesible"],
    category: "componentes",
  },
  {
    id: "233",
    name: "NeoBrutalism Dev",
    description:
      "Biblioteca y guía para construir interfaces neobrutalistas con Tailwind.",
    url: "https://www.neobrutalism.dev/",
    tags: ["neobrutalismo", "componentes", "tailwind", "ui"],
    category: "componentes",
  },
  {
    id: "234",
    name: "LuxeUI",
    description:
      "Componentes y template de interfaz premium para construir productos con elegancia.",
    url: "https://www.luxeui.com/",
    tags: ["componentes", "ui", "premium", "plantillas"],
    category: "componentes",
  },
  {
    id: "235",
    name: "HTMLrev",
    description:
      "Colección de plantillas HTML gratuitas para landing pages y sitios web.",
    url: "https://htmlrev.com/",
    tags: ["plantillas", "html", "landing", "gratis"],
    category: "inspiraciones",
  },
  {
    id: "236",
    name: "DaisyUI",
    description:
      "Componentes para Tailwind CSS con clases a base de utilidades y temas.",
    url: "https://daisyui.com/",
    tags: ["tailwind", "componentes", "temas", "css"],
    category: "componentes",
  },
  {
    id: "237",
    name: "Sonner",
    description:
      "Librería de toasts minimalista y elegante para React y Next.js.",
    url: "https://sonner.emilkowal.ski/",
    tags: ["toast", "react", "notificaciones", "ui"],
    category: "componentes",
  },
  {
    id: "238",
    name: "React Day Picker",
    description:
      "Selectores de fechas accesibles, customizables y listos para producción.",
    url: "https://daypicker.dev/",
    tags: ["componentes", "fecha", "calendario", "react"],
    category: "componentes",
  },
  {
    id: "239",
    name: "Color Hunt",
    description:
      "Paletas de colores curadas por la comunidad para tus proyectos de diseño.",
    url: "https://colorhunt.co/",
    tags: ["colores", "paletas", "inspiracion", "combinaciones"],
    category: "diseño",
  },
  {
    id: "240",
    name: "CSS Grid Generator",
    description:
      "Generador visual de cuadriculas CSS Grid con exportación directa del código.",
    url: "https://cssgridgenerator.io/",
    tags: ["css", "grid", "generador", "tool"],
    category: "herramientas",
  },
  {
    id: "241",
    name: "CSS Gradient Text",
    description:
      "Generador de texto con gradientes CSS para aplicar en tus titulares.",
    url: "https://www.cssgradienttext.com/",
    tags: ["css", "gradientes", "texto", "generador"],
    category: "herramientas",
  },
  {
    id: "242",
    name: "Bright (Code Hike)",
    description:
      "Snippets de código en tiempo real con sintaxis resaltada y estilos propios.",
    url: "https://bright.codehike.org/",
    tags: ["codigo", "components", "snippets", "codehike"],
    category: "herramientas",
  },
  {
    id: "243",
    name: "Boring Avatars",
    description:
      "Genera avatares únicos y estilizados a partir de una semilla con múltiples paletas.",
    url: "https://boringavatars.com/",
    tags: ["avatares", "generador", "svg", "ui"],
    category: "herramientas",
  },
  {
    id: "244",
    name: "Ark UI",
    description:
      "Componentes headless de bajo nivel para construir tus propias interfaces accesibles.",
    url: "https://ark-ui.com/",
    tags: ["componentes", "headless", "reactición", "vue", "solid"],
    category: "componentes",
  },
  {
    id: "245",
    name: "AI Colors",
    description:
      "Generador de paletas de colores asistido por IA para interfaces.",
    url: "https://www.bairesdev.com/tools/ai-colors",
    tags: ["colores", "paletas", "ia", "generador"],
    category: "herramientas",
  },
  {
    id: "246",
    name: "3D Transformer",
    description:
      "Aplica transformaciones 3D a imágenes y exportación en formatos modernos.",
    url: "https://www.3dtransformer.com/",
    tags: ["3d", "imagenes", "transformaciones", "tool"],
    category: "herramientas",
  },
  {
    id: "247",
    name: "Expo",
    description:
      "Framework y plataforma para construir apps iOS, Android y web con React Native.",
    url: "https://expo.dev/",
    tags: ["react-native", "movil", "ios", "android"],
    category: "librerias",
  },
  {
    id: "248",
    name: "WC Toast",
    description:
      "Web component de toasts accesibles, ligero y configurable sin dependencias.",
    url: "https://abdmmar.github.io/wc-toast/",
    tags: ["toast", "web-component", "accesible", "ui"],
    category: "componentes",
  },
  {
    id: "249",
    name: "Pheralb Toast",
    description:
      "Colección de toasts inspirada en la estética de los sistemas modernos.",
    url: "https://toast.pheralb.dev/",
    tags: ["toast", "inspiracion", "ui", "design-system"],
    category: "componentes",
  },
  {
    id: "250",
    name: "React Hot Toast",
    description:
      "Librería de notificaciones toast para React, ligera y fácil de usar.",
    url: "https://react-hot-toast.com/",
    tags: ["toast", "react", "notificaciones", "ui"],
    category: "componentes",
  },
  {
    id: "251",
    name: "Vitest",
    description:
      "Framework de testing ultrarrápido para Vite y proyectos modernos de JavaScript.",
    url: "https://vitest.dev/",
    tags: ["testing", "vite", "unit-tests", "javascript"],
    category: "testing",
  },
  {
    id: "252",
    name: "pytest",
    description:
      "Framework de testing maduro y popular para escribir tests simples en Python.",
    url: "https://docs.pytest.org/en/stable/",
    tags: ["testing", "python", "unit-tests", "pytest"],
    category: "testing",
  },
  {
    id: "253",
    name: "Playwright",
    description:
      "Automatización y testing end-to-end de navegadores con un solo API.",
    url: "https://playwright.dev/",
    tags: ["testing", "e2e", "browser", "automatizacion"],
    category: "testing",
  },
  {
    id: "254",
    name: "Mocha",
    description:
      "Framework de testing JavaScript flexible que corre en Node y el navegador.",
    url: "https://mochajs.org/",
    tags: ["testing", "javascript", "unit-tests", "node"],
    category: "testing",
  },
  {
    id: "255",
    name: "Jest",
    description:
      "Framework de testing JavaScript con zero config y snapshot testing.",
    url: "https://jestjs.io/",
    tags: ["testing", "javascript", "react", "snapshots"],
    category: "testing",
  },
  {
    id: "256",
    name: "Cypress",
    description:
      "Testing end-to-end para aplicaciones web modernas, rápido y amigable.",
    url: "https://www.cypress.io/",
    tags: ["testing", "e2e", "component", "cypress"],
    category: "testing",
  },
  {
    id: "257",
    name: "Img.to",
    description:
      "Editor y conversor de imágenes en línea con herramientas de IA incluidas.",
    url: "https://imgto.xyz/",
    tags: ["imagenes", "conversor", "ia", "editor"],
    category: "herramientas",
  },
  {
    id: "258",
    name: "60fps.design",
    description:
      "Colección de técnicas y recursos sobre animaciones fluidas de interfaz.",
    url: "https://60fps.design/",
    tags: ["animacion", "rendimiento", "ui", "60fps"],
    category: "herramientas",
  },
  {
    id: "259",
    name: "Recent Design",
    description:
      "Galería curada de diseño web reciente de inspiración y tendencias.",
    url: "https://recent.design/",
    tags: ["inspiracion", "design", "tendencias", "galeria"],
    category: "inspiraciones",
  },
  {
    id: "260",
    name: "Bento Grids",
    description:
      "Gallery y analisis de diseños de bento grids para interfaces modernas.",
    url: "https://bentogrids.com/",
    tags: ["bento", "grid", "inspiracion", "layout"],
    category: "inspiraciones",
  },
  {
    id: "261",
    name: "Open Peeps",
    description:
      "Ilustraciones de personas estilo hand-drawn en SVG, listas para usar.",
    url: "https://www.openpeeps.com/",
    tags: ["ilustracions", "svg", "personas", "recursos"],
    category: "diseño",
  },
  {
    id: "262",
    name: "Lukasz Adam",
    description:
      "Ilustraciones gratuitas y profesionales para proyectos y productos.",
    url: "https://lukaszadam.com/illustrations",
    tags: ["ilustraciones", "gratis", "svg", "recursos"],
    category: "diseño",
  },
  {
    id: "263",
    name: "Cool Shapes",
    description:
      "Editor de formas coloridas para generar fondos y decoraciones únicas.",
    url: "https://coolshap.es/",
    tags: ["formas", "fondos", "generador", "decoracion"],
    category: "diseño",
  },
  {
    id: "264",
    name: "CSS Peeps",
    description:
      "Personajes y caras expresivas dibujadas enteramente con CSS.",
    url: "https://css-peeps.com/",
    tags: ["css", "personajes", "cara", "divertido"],
    category: "diseño",
  },
  {
    id: "265",
    name: "Simple Icons",
    description:
      "Miles de SVGs de las marcas más populares de la industria tech.",
    url: "https://simpleicons.org/",
    tags: ["iconos", "marcas", "svg", "brands"],
    category: "diseño",
  },
  {
    id: "266",
    name: "Radix Icons",
    description:
      "Set de iconos de Radix, consistentes y disponibles como componentes.",
    url: "https://www.radix-ui.com/icons",
    tags: ["iconos", "svg", "react", "design-system"],
    category: "diseño",
  },
  {
    id: "267",
    name: "Lucide",
    description:
      "Set de iconos open source, cleanos y consistentes con soporte React/Vue/Svelte.",
    url: "https://lucide.dev/",
    tags: ["iconos", "svg", "open-source", "ui"],
    category: "diseño",
  },
  {
    id: "268",
    name: "Heroicons",
    description:
      "Iconos de interfaz creados por el equipo de Tailwind CSS.",
    url: "https://heroicons.com/",
    tags: ["iconos", "svg", "tailwind", "ui"],
    category: "diseño",
  },
  {
    id: "269",
    name: "Devicon",
    description:
      "Iconos de lenguajes, herramientas y tecnologías de desarrollo.",
    url: "https://devicon.dev/",
    tags: ["iconos", "devtools", "svg", "tech"],
    category: "diseño",
  },
  {
    id: "270",
    name: "Feather Icons",
    description:
      "Iconos simples y elegantes de interfaz, open source y personalizables.",
    url: "https://feathericons.com/",
    tags: ["iconos", "svg", "open-source", "ui"],
    category: "diseño",
  },
  {
    id: "271",
    name: "Premade Avatars (alohe)",
    description:
      "Avatares de personas generados con máscaras y colores en el navegador.",
    url: "https://alohe.github.io/avatars/",
    tags: ["avatares", "svg", "generador", "ui"],
    category: "diseño",
  },
  {
    id: "272",
    name: "Spring Boot",
    description:
      "Framework de Java backend para construir microservicios y apps empresariales.",
    url: "https://spring.io/",
    tags: ["java", "backend", "framework", "microservicios"],
    category: "librerias",
  },
  {
    id: "273",
    name: "Ruby on Rails",
    description:
      "Framework web full-stack de Ruby enfocado en convención sobre configuración.",
    url: "https://rubyonrails.org/",
    tags: ["ruby", "framework", "fullstack", "backend"],
    category: "librerias",
  },
  {
    id: "274",
    name: "Reflex",
    description:
      "Crea apps web full-stack en Python puro, sin frontend separado.",
    url: "https://reflex.dev/",
    tags: ["python", "fullstack", "framework", "web"],
    category: "librerias",
  },
  {
    id: "275",
    name: "NestJS",
    description:
      "Framework Node backend progresivo, tipado y con arquitectura modular.",
    url: "https://nestjs.com/",
    tags: ["node", "typescript", "backend", "framework"],
    category: "librerias",
  },
  {
    id: "276",
    name: "Laravel",
    description:
      "Framework web expresivo y elegante para PHP, con ecosistema completo.",
    url: "https://laravel.com/",
    tags: ["php", "framework", "backend", "web"],
    category: "librerias",
  },
  {
    id: "277",
    name: "Express.js",
    description:
      "Framework minimalista y flexible para building Node.js APIs.",
    url: "https://expressjs.com/",
    tags: ["node", "backend", "framework", "api"],
    category: "librerias",
  },
  {
    id: "278",
    name: "Django",
    description:
      "Framework Python full-stack con baterías incluidas y admin automático.",
    url: "https://www.djangoproject.com/",
    tags: ["python", "framework", "fullstack", "backend"],
    category: "librerias",
  },
  {
    id: "279",
    name: "Typeform",
    description:
      "Plataforma de formularios y encuestas con experiencia conversacional.",
    url: "https://www.typeform.com/",
    tags: ["formularios", "encuestas", "questionarios", "ux"],
    category: "herramientas",
  },
  {
    id: "280",
    name: "React Hook Form",
    description:
      "Formularios en React con rendimiento, validación y menos re-renders.",
    url: "https://react-hook-form.com/",
    tags: ["react", "formularios", "validacion", "hooks"],
    category: "librerias",
  },
  {
    id: "281",
    name: "Formik",
    description:
      "Librería de manejo de formularios para React y React Native.",
    url: "https://formik.org/",
    tags: ["react", "formularios", "validacion", "libreria"],
    category: "librerias",
  },
  {
    id: "282",
    name: "UseSend",
    description:
      "API de email transactional simple para desarrolladores, con dashboard intuitivo.",
    url: "https://usesend.com/",
    tags: ["email", "api", "transaccional", "developers"],
    category: "apis",
  },
];
