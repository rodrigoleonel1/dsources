# Dsources

Directorio curado y colaborativo de recursos para desarrolladores: cursos,
challenges, herramientas, documentación, diseño, inspiración, blogs, APIs,
librerías, componentes, repositorios y contenido didáctico.

Construido con **Next.js 15 (App Router)**, **MongoDB**, **Tailwind v4** y
**shadcn/ui**. Todo lo que trae el proyecto funciona sin pagar nada ni
contratar servicios externos: la única pieza de infraestructura que
necesitás es una base MongoDB (tenés un tier gratuito con Atlas).

## Índice

- [Funcionalidades](#funcionalidades)
- [Requisitos](#requisitos)
- [Configuración](#configuración)
- [Scripts](#scripts)
- [Tests end-to-end](#tests-end-to-end)
- [PWA](#pwa)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Notas de seguridad](#notas-de-seguridad)
- [Sobre el costo (¿es todo gratis?)](#sobre-el-costo-es-todo-gratis)
- [Ideas para seguir mejorando](#ideas-para-seguir-mejorando)

## Funcionalidades

### Cuentas y permisos
- Registro e inicio de sesión con email y contraseña (bcrypt para el hash,
  sesión vía cookie `httpOnly` firmada con JWT).
- Dos roles: `user` y `admin`.
- **Rate limiting** propio (sin servicios externos, todo en Mongo):
  login (por IP y por cuenta), registro (por IP), envío de recursos
  (por usuario) y reportes de links rotos (por usuario/IP).

### Recursos
- **Favoritos**, con orden por popularidad disponible en el listado
  principal ("Recientes" / "Populares").
- **Envío de recursos** (`/enviar`): queda `pending` hasta que un admin lo
  revisa. Se filtra automáticamente con una **blacklist** básica de
  palabras y dominios (acortadores de URL, spam evidente) antes de llegar
  a la cola de revisión.
- **Detección de duplicados** por URL normalizada (ignora `http/https`,
  `www.`, `/` final y mayúsculas).
- **"Mis envíos"** (`/mis-envios`): cada usuario ve el estado de lo que
  mandó (pendiente/aprobado/rechazado) y puede **editar o retirar** sus
  envíos mientras sigan pendientes.
- **Notificaciones in-app** (sin email): al aprobar o rechazar un envío,
  el usuario que lo mandó recibe una notificación que ve desde la
  campanita del header.
- **Reportar link roto**: cualquiera puede reportar un recurso desde su
  página de detalle; los admins ven y resuelven los reportes en
  `/admin/reportes`.
- **`/tags`**: nube de tags de todo el catálogo, con contador, para
  navegar por temática.
- **Recursos relacionados** en cada página de detalle (misma categoría o
  tags en común).

### Panel de administración (`/admin`, solo rol `admin`)
Dividido en secciones propias para no mezclar todo en una sola pantalla:
- `/admin` — resumen con contadores y accesos rápidos.
- `/admin/pendientes` — aprobar o rechazar envíos.
- `/admin/recursos` — buscar, **editar** o **eliminar** cualquier recurso
  publicado.
- `/admin/agregar` — publicar un recurso directo, sin pasar por revisión.
- `/admin/reportes` — ver y resolver reportes de links rotos.
- **Exportar backup en JSON** de todo el catálogo (botón en
  `/admin/recursos`), por si necesitás un respaldo manual.

### SEO
- Metadata dinámica por categoría/búsqueda (`generateMetadata`).
- `sitemap.xml`, `robots.txt` y un **feed RSS** (`/feed.xml`) con los
  recursos más recientes.
- JSON-LD (`WebSite`, `ItemList`, `CreativeWork`) en las páginas
  relevantes.
- Página de detalle indexable por recurso (`/recurso/[id]`), con
  recursos relacionados para mejorar el linking interno.
- Contenido renderizado en el servidor.

### Rendimiento
- Filtrado, búsqueda, orden y paginación resueltos en MongoDB (con
  índices), no enviando todo el catálogo al cliente.
- Cache de los contadores por categoría (`unstable_cache`, invalidado al
  instante con `revalidateTag` en cada mutación relevante).
- Hashing de contraseñas (bcrypt, Node-only) separado de las funciones de
  sesión (Edge-safe), así el middleware no carga bcrypt de más.
- Componentes servidor por defecto; cliente solo donde hace falta
  interactividad real.

### UX/UI
- **Command palette (Cmd/Ctrl+K)** para saltar a cualquier categoría,
  página o acción sin usar el mouse (con `cmdk`, sin costo).
- Menú de usuario, campanita de notificaciones, sidebar con accesos a
  Favoritos/Enviar/Mis envíos/Admin/Tags.
- Layout responsivo: el header ahora es parte del flujo normal del layout
  (`sticky`, no `fixed`), así que sigue correctamente el ancho del
  contenido al abrir/cerrar el sidebar — antes quedaba desalineado. El
  contenido de páginas como "Enviar recurso" o "Favoritos" está centrado
  en vez de pegarse a la izquierda cuando el sidebar está colapsado.
- **PWA instalable**: `manifest.ts` nativo de Next.js + un service worker
  liviano (cache-first para assets estáticos, network-first con fallback
  para el resto) — sin servidor ni servicio adicional.
- **Accesibilidad**: link "saltar al contenido", `prefers-reduced-motion`
  respetado en las animaciones de las tarjetas, semántica de diálogo en
  el command palette, `aria-label`/`aria-pressed` en botones de ícono,
  navegación por teclado (heredada de los componentes Radix que ya usa
  el proyecto: sidebar, dropdown, sheet).

## Requisitos

- Node.js 18.18+ (recomendado 20+)
- Una base de datos MongoDB (local o [MongoDB Atlas](https://www.mongodb.com/atlas), tiene un tier gratuito)

## Configuración

1. Instalar dependencias:

   ```bash
   npm install
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
   | `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` / `SEED_ADMIN_NAME` | Opcionales, usadas solo por `npm run seed` para crear tu primer usuario admin |
   | `NEXT_PUBLIC_SITE_URL` | URL pública del sitio, usada en SEO (sitemap, canonical, JSON-LD, RSS) |

3. Sembrar la base de datos con el catálogo original (117 recursos) y,
   opcionalmente, crear tu usuario administrador:

   ```bash
   npm run seed
   ```

   Podés volver a correrlo cuando quieras: no duplica recursos ya
   existentes (se identifican por URL normalizada) y solo crea/actualiza el
   admin si definiste `SEED_ADMIN_EMAIL` y `SEED_ADMIN_PASSWORD`.

   Si preferís no usar el seed para el admin, registrate desde `/register`
   y después actualizá manualmente el campo `role` a `"admin"` en el
   documento del usuario, en la colección `users`.

   > Si ves un error `IndexOptionsConflict` sobre el índice de `email` al
   > arrancar el server, es porque ya existe un índice con otro nombre
   > sobre ese campo (por ejemplo, creado por una corrida vieja del seed).
   > No rompe nada, pero para sacarlo corré `db.users.dropIndex("email_1")`
   > en tu base y reiniciá el server.

4. Levantar el entorno de desarrollo:

   ```bash
   npm run dev
   ```

   Abrí [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — desarrollo con Turbopack
- `npm run build` — build de producción
- `npm run start` — levanta el build de producción
- `npm run lint` — lint
- `npm run seed` — siembra MongoDB con el catálogo inicial (y opcionalmente un admin)
- `npm run test:e2e` — corre los tests end-to-end con Playwright

## Tests end-to-end

Los tests viven en `tests/e2e/` y usan [Playwright](https://playwright.dev/).

1. Instalá los navegadores de Playwright (una sola vez):

   ```bash
   npx playwright install --with-deps chromium
   ```

2. Levantá la app apuntando a tu base de datos (`npm run dev` en otra
   terminal), o descomentá el bloque `webServer` en `playwright.config.ts`
   para que Playwright la levante por vos.

3. Corré los tests:

   ```bash
   npm run test:e2e
   ```

El test de aprobación admin (`tests/e2e/admin-approve.spec.ts`) necesita
un admin ya creado; pasale sus credenciales por variables de entorno:

```bash
E2E_ADMIN_EMAIL=admin@dsources.dev E2E_ADMIN_PASSWORD=tu-password npm run test:e2e
```

Si no las definís, ese test se saltea automáticamente (los demás corren
igual, ya que crean su propio usuario de prueba).

## PWA

El sitio es instalable (manifest + service worker), sin depender de
`next-pwa` ni de ningún servicio externo:

- `app/manifest.ts` genera el manifest nativamente con Next.js.
- `public/sw.js` cachea los assets estáticos (`_next/static/`) con una
  estrategia cache-first, y el resto de las páginas con network-first +
  fallback a cache cuando no hay conexión. Las rutas `/api/*` nunca se
  cachean.
- El ícono actual (`public/icon.svg`) es un SVG simple con la marca "d.".
  Para soporte completo en iOS (que todavía prefiere PNG para el ícono de
  pantalla de inicio), lo ideal es sumar también un `apple-touch-icon.png`
  de 180×180 en `public/`.

## Estructura del proyecto

```
app/
  page.tsx                    # Home: listado + filtros + orden (server component)
  recurso/[id]/page.tsx       # Detalle de un recurso + relacionados (SEO)
  tags/page.tsx                # Explorar por tags
  login/ register/             # Autenticación
  enviar/                      # Enviar un recurso (requiere sesión)
  mis-envios/                  # Estado de tus propios envíos (requiere sesión)
  favoritos/                   # Recursos guardados (requiere sesión)
  admin/                        # Resumen (requiere rol admin)
  admin/pendientes/             # Aprobar/rechazar envíos
  admin/recursos/                # Editar/eliminar publicados + export backup
  admin/agregar/                  # Alta directa de recursos
  admin/reportes/                 # Reportes de links rotos
  api/                          # Route handlers (auth, resources, favorites, notifications, admin)
  feed.xml/route.ts             # RSS
  manifest.ts sitemap.ts robots.ts  # SEO/PWA
lib/
  mongodb.ts                    # Conexión singleton a MongoDB
  auth.ts                       # Sesión (JWT en cookie httpOnly), guards de auth/admin
  password.ts                   # Hash/verify de contraseñas (bcrypt, Node-only)
  rate-limit.ts                  # Rate limiting por ventana fija, backed por Mongo (TTL index)
  url.ts                         # Normalización de URLs para detectar duplicados
  blacklist.ts                   # Filtro de palabras/dominios en envíos
  cache.ts                       # Cache de contadores por categoría + invalidación
  db/                            # Acceso a datos: users, resources, favorites, notifications, reports, indexes
data/
  resources.ts                   # Catálogo estático original (usado solo por el seed)
  types.ts                       # Tipos compartidos
scripts/seed.ts                  # Script de siembra de MongoDB
tests/e2e/                        # Tests end-to-end (Playwright)
middleware.ts                     # Protege /admin, /favoritos, /enviar y /mis-envios
```

## Notas de seguridad

- Las contraseñas se guardan hasheadas con bcrypt, nunca en texto plano.
- La sesión es un JWT firmado (HS256) en una cookie `httpOnly`,
  `sameSite=lax` y `secure` en producción. Cambiá `AUTH_SECRET` por un
  valor propio y secreto.
- Las rutas de administración están protegidas tanto en el middleware
  (redirección) como en cada API route (chequeo de rol).
- Las acciones de edición/borrado del propio usuario ("Mis envíos") están
  acotadas por `userId` y por estado (`pending`) directamente en la
  consulta a Mongo, no solo en la UI.
- El rate limiting corta ráfagas de intentos de login/registro/envío/reporte
  antes de que lleguen a pegarle a la base de datos con volumen alto, pero
  no reemplaza un WAF: para un sitio con tráfico serio conviene sumar
  protección a nivel de red (Cloudflare, etc.).

## Sobre el costo (¿es todo gratis?)

Todo lo implementado en este proyecto —autenticación, favoritos, envío y
aprobación de recursos, rate limiting, detección de duplicados, blacklist,
edición/borrado de recursos, notificaciones in-app, reportes, tags,
recursos relacionados, orden por popularidad, export/backup, RSS, command
palette, PWA— corre enteramente en tu código y tu base MongoDB. **No
depende de ningún servicio de pago.** Los únicos costos posibles son de
infraestructura, no de features:

- **MongoDB Atlas**: el tier M0 es gratis (512 MB de almacenamiento, de
  sobra para miles de recursos).
- **Hosting** (Vercel, Netlify, etc.): los tiers gratuitos alcanzan para
  un proyecto chico o mediano.
- **GitHub Actions** (si armás CI para correr los tests): tiene minutos
  gratis por mes, generosos para este tamaño de proyecto.

Cosas que **no** están implementadas porque típicamente requieren un
servicio externo (aunque casi todos tienen tier gratuito razonable si más
adelante querés sumarlas): envío de emails (verificación de cuenta, reset
de contraseña), CAPTCHA, error tracking (Sentry) y screenshots automáticos
de recursos.

## Ideas para seguir mejorando

- Reset de contraseña y verificación de email (requiere un servicio de
  envío de emails; Resend y Brevo tienen tier gratuito).
- Categorías dinámicas en vez de hardcodeadas en código.
- Auditoría de acciones admin (quién aprobó/editó/borró qué).
- Acciones en lote en `/admin/pendientes` (aprobar varios de una).
- `apple-touch-icon.png` y capturas de pantalla en el manifest para una
  experiencia de instalación más pulida en iOS.
