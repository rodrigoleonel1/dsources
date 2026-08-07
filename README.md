# Dsources

Directorio curado y colaborativo de recursos para desarrolladores: cursos,
challenges, herramientas, documentación, diseño, inspiración, blogs, APIs,
librerías, componentes, repositorios y contenido didáctico.

Construido con **Next.js 16 (App Router)**, **MongoDB**, **Tailwind v4** y
**shadcn/ui**. Todo lo que trae el proyecto funciona sin pagar nada ni
contratar servicios externos: la única pieza de infraestructura que
necesitás es una base MongoDB (tenés un tier gratuito con Atlas).

## Índice

- [Funcionalidades](#funcionalidades)
- [Requisitos](#requisitos)
- [Configuración](#configuración)
- [Scripts](#scripts)
- [PWA](#pwa)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Notas de seguridad](#notas-de-seguridad)
- [Sobre el costo (¿es todo gratis?)](#sobre-el-costo-es-todo-gratis)
- [Ideas para seguir mejorando](#ideas-para-seguir-mejorando)

## Funcionalidades

### Cuentas y permisos
- El acceso con cuenta es solo para **administradores**. No hay registro
  público: el primer admin se crea con `pnpm run seed` (variables
  `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`).
- Login en `/admin/login` (el proxy redirige ahí cualquier ruta `/admin`
  sin sesión). Sesión en cookie `httpOnly` firmada con JWT (HS256).
- **Rate limiting** propio (sin servicios externos, todo en Mongo):
  login (por IP y por cuenta) y envío de recursos (por IP).

### Recursos
- **Favoritos locales**: el corazón en cada tarjeta guarda favoritos en
  `localStorage` del navegador (sin cuenta) y se ven en `/favoritos`.
- **Envío de recursos** (`/enviar`, **sin sesión**): queda `pending` hasta
  que un admin lo revisa. Se filtra automáticamente con una **blacklist**
  básica de palabras y dominios (acortadores de URL, spam evidente) antes
  de llegar a la cola de revisión.
- **Detección de duplicados** por URL normalizada (ignora `http/https`,
  `www.`, `/` final y mayúsculas).
- **Categorías dinámicas**: la lista de categorías vive en MongoDB
  (colección `categories`), no hardcodeada en código. Agregá, renombrá,
  reordená o deshabilitá categorías editando la colección (o vía el seed
  inicial en `data/categories.ts`).
- **`/tags`**: nube de tags de todo el catálogo, con contador, para
  navegar por temática.
- **Recursos relacionados** en cada página de detalle (misma categoría o
  tags en común).

### Panel de administración (`/admin`, solo rol `admin`)
Dividido en secciones propias para no mezclar todo en una sola pantalla:
- `/admin` — resumen con contadores y accesos rápidos.
- `/admin/pendientes` — aprobar o rechazar envíos (con selección múltiple
  para acciones en lote).
- `/admin/recursos` — buscar, **editar** o **eliminar** cualquier recurso
  publicado.
- `/admin/agregar` — publicar un recurso directo, sin pasar por revisión.
- **Exportar backup en JSON** de todo el catálogo (botón en
  `/admin/recursos`), por si necesitás un respaldo manual.

### SEO
- Metadata dinámica por categoría/búsqueda (`generateMetadata`).
- `sitemap.xml` y `robots.txt` con los
  recursos más recientes.
- JSON-LD (`WebSite`, `ItemList`, `CreativeWork`) en las páginas
  relevantes.
- Página de detalle indexable por recurso (`/recurso/[id]`), con
  recursos relacionados para mejorar el linking interno.
- Contenido renderizado en el servidor.

### Rendimiento
- Filtrado, búsqueda y paginación resueltos en MongoDB (con índices), no
  enviando todo el catálogo al cliente.
- Verificación de contraseñas (bcrypt, Node-only) separada de las
  funciones de sesión (Edge-safe), así el proxy no carga bcrypt de más.
- Componentes servidor por defecto; cliente solo donde hace falta
  interactividad real.

### UX/UI
- Menú de usuario (solo admins), sidebar con accesos a
  Favoritos/Enviar/Admin/Tags.
- Layout responsivo: el header es parte del flujo normal del layout
  (`sticky`, no `fixed`), así que sigue correctamente el ancho del
  contenido al abrir/cerrar el sidebar. El contenido de páginas como
  "Enviar recurso" o "Favoritos" está centrado en vez de pegarse a la
  izquierda cuando el sidebar está colapsado.
- **PWA instalable**: `manifest.ts` nativo de Next.js + un service worker
  liviano (cache-first para assets estáticos, network-first con fallback
  para el resto) — sin servidor ni servicio adicional.
- **Accesibilidad**: link "saltar al contenido", `prefers-reduced-motion`
  respetado en las animaciones de las tarjetas, `aria-label`/`aria-pressed`
  en botones de ícono, navegación por teclado (heredada de los componentes
  Radix que ya usa el proyecto: sidebar, dropdown, sheet).

## Requisitos

- Node.js 18.18+ (recomendado 20+)
- Una base de datos MongoDB (local o [MongoDB Atlas](https://www.mongodb.com/atlas), tiene un tier gratuito)

## Configuración

1. Instalar dependencias:

   ```bash
   pnpm install
   ```

2. Copiar el archivo de entorno de ejemplo y completarlo:

   ```bash
   cp .env.local.example .env.local
   ```

   Variables:

   | Variable | Descripción |
   | --- | --- |
   | `MONGODB_URI` | Cadena de conexión a MongoDB (requerida) |
   | `MONGODB_DB` | Nombre de la base (default `dsources`) |
   | `AUTH_SECRET` | Secreto para firmar las cookies de sesión. Generalo con `openssl rand -base64 32` |
   | `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` / `SEED_ADMIN_NAME` | Opcionales, usadas solo por `pnpm run seed` para crear tu primer usuario admin |
   | `NEXT_PUBLIC_SITE_URL` | URL pública del sitio, usada en SEO (sitemap, canonical, JSON-LD) |

3. Sembrar la base de datos con el catálogo original (117 recursos) y
   crear tu usuario administrador:

   ```bash
   pnpm run seed
   ```

   Podés volver a correrlo cuando quieras: no duplica recursos ya
   existentes (se identifican por URL normalizada) y solo crea/actualiza el
   admin si definiste `SEED_ADMIN_EMAIL` y `SEED_ADMIN_PASSWORD`. Es la
   única vía para crear cuentas (no hay registro público): cualquier otra
   cuenta de la colección `users` se crea/ajusta a mano en Mongo.

4. Levantar el entorno de desarrollo:

   ```bash
   pnpm run dev
   ```

   Abrí [http://localhost:3000](http://localhost:3000).

## Scripts

- `pnpm run dev` — desarrollo con Turbopack
- `pnpm run build` — build de producción
- `pnpm run start` — levanta el build de producción
- `pnpm run lint` — lint
- `pnpm run seed` — siembra MongoDB con el catálogo inicial (y opcionalmente un admin)

## PWA

El sitio es instalable (manifest + service worker), sin depender de
`next-pwa` ni de ningún servicio externo:

- `app/manifest.ts` genera el manifest nativamente con Next.js, incluyendo
  `apple-touch-icon.png` y capturas de pantalla (desktop y mobile) para una
  experiencia de instalación más pulida.
- `public/apple-touch-icon.png` (180×180, PNG opaco) cubre el ícono de
  pantalla de inicio de iOS.
- `public/screenshots/` contiene las capturas reales del sitio usadas en el
  manifest (`form_factor` wide/narrow).
- `public/sw.js` cachea los assets estáticos (`_next/static/`) con una
  estrategia cache-first, y el resto de las páginas con network-first +
  fallback a cache cuando no hay conexión. Las rutas `/api/*` nunca se
  cachean.

## Estructura del proyecto

```
app/
  page.tsx                    # Home: listado + filtros (server component)
  recurso/[id]/page.tsx       # Detalle de un recurso + relacionados (SEO)
  tags/page.tsx                # Explorar por tags
  enviar/                      # Enviar un recurso (sin sesión)
  favoritos/                   # Favoritos guardados en localStorage
  admin/login/                 # Login de administración
  admin/                        # Resumen (requiere rol admin)
  admin/pendientes/             # Aprobar/rechazar envíos
  admin/recursos/                # Editar/eliminar publicados + export backup
  admin/agregar/                  # Alta directa de recursos
  api/                          # Route handlers (auth, resources, categories, admin)
  manifest.ts sitemap.ts robots.ts  # SEO/PWA
lib/
  mongodb.ts                    # Conexión singleton a MongoDB
  auth.ts                       # Sesión (JWT en cookie httpOnly), guard de admin
  password.ts                   # Verificación de contraseñas (bcrypt, Node-only)
  rate-limit.ts                  # Rate limiting por ventana fija, backed por Mongo (TTL index)
  url.ts                         # Normalización de URLs para detectar duplicados
  blacklist.ts                   # Filtro de palabras/dominios en envíos
  db/                            # Acceso a datos: users, resources, categories, indexes
data/
  resources.ts                   # Catálogo estático original (usado solo por el seed)
  categories.ts                  # Catálogo inicial de categorías (defaults del seed)
  types.ts                       # Tipos compartidos
scripts/seed.ts                  # Script de siembra de MongoDB (recursos, categorías y admin)
proxy.ts                         # Protege /admin (redirige a /admin/login)
```

## Notas de seguridad

- Las contraseñas se guardan hasheadas con bcrypt, nunca en texto plano.
- La sesión es un JWT firmado (HS256) en una cookie `httpOnly`,
  `sameSite=lax` y `secure` en producción. Cambiá `AUTH_SECRET` por un
  valor propio y secreto.
- Las rutas de administración están protegidas tanto en el proxy
  (redirección a `/admin/login`) como en cada API route (chequeo de rol).
- Los favoritos viven en `localStorage` del navegador: son datos locales
  del visitante y no se almacenan en el servidor.
- El rate limiting corta ráfagas de intentos de login/envío antes
  de que lleguen a pegarle a la base de datos con volumen alto, pero no
  reemplaza un WAF: para un sitio con tráfico serio conviene sumar
  protección a nivel de red (Cloudflare, etc.).

## Sobre el costo (¿es todo gratis?)

Todo lo implementado en este proyecto —login de administración, favoritos
locales, envío y aprobación de recursos, rate limiting, detección de
duplicados, blacklist, edición/borrado de recursos, tags,
recursos relacionados, export/backup, PWA— corre
enteramente en tu código y tu base MongoDB. **No depende de ningún
servicio de pago.** Los únicos costos posibles son de infraestructura, no
de features:

- **MongoDB Atlas**: el tier M0 es gratis (512 MB de almacenamiento, de
  sobra para miles de recursos).
- **Hosting** (Vercel, Netlify, etc.): los tiers gratuitos alcanzan para
  un proyecto chico o mediano.
- **GitHub Actions** (si armás CI para correr lint/typecheck/build):
  tiene minutos gratis por mes, generosos para este tamaño de proyecto.

Cosas que **no** están implementadas porque típicamente requieren un
servicio externo (aunque casi todos tienen tier gratuito razonable si más
adelante querés sumarlas): envío de emails (verificación de cuenta, reset
de contraseña), CAPTCHA, error tracking (Sentry) y screenshots automáticos
de recursos.

## Ideas para seguir mejorando

- Reset de contraseña y verificación de email (requiere un servicio de
  envío de emails; Resend y Brevo tienen tier gratuito).
- Auditoría de acciones admin (quién aprobó/editó/borró qué).
