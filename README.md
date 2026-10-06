# Prosource Solutions · Sitio web

Sitio corporativo de **Prosource Solutions S.A.S.** (BPO, operación 24/7 y desarrollo de software), en español e inglés.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Sass (CSS Modules) · framer-motion · cobe (globo 3D) · Resend (correos del formulario).

## Requisitos

- Node.js 20 o superior
- Una cuenta en [Resend](https://resend.com) para que funcione el formulario de contacto

## Instalación y desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). La raíz redirige a `/es` o `/en` según el idioma del navegador.

| Comando | Para qué sirve |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Build de producción |
| `npm start` | Sirve el build de producción |
| `npm run lint` | Revisa el código con ESLint |

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto. Git lo ignora, así que **nunca se sube al repositorio**. En producción, configura las mismas variables en el hosting.

```bash
RESEND_API_KEY=re_xxxxxxxx
CONTACT_EMAIL=correo@empresa.com
# CONTACT_FROM=Prosource Solutions <web@tu-dominio.com>
# NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
# NEXT_PUBLIC_GA_ID=G-XXXXXXX
```

| Variable | Obligatoria | Descripción |
|---|---|---|
| `RESEND_API_KEY` | Sí | API key de Resend para enviar los correos del formulario. |
| `CONTACT_EMAIL` | Sí | Correo que recibe las solicitudes del formulario. |
| `CONTACT_FROM` | En producción | Remitente con tu dominio verificado en Resend. Sin esta variable se usa el remitente de prueba de Resend, que solo entrega al correo de la cuenta de Resend, y no se envía la confirmación al cliente. |
| `NEXT_PUBLIC_SITE_URL` | En producción | Dominio público. Lo usan el sitemap, los enlaces canónicos y las vistas previas en redes sociales. |
| `NEXT_PUBLIC_GA_ID` | No | ID de Google Analytics 4. Si está definido, aparece el aviso de cookies y GA solo carga si el visitante acepta. |

> Next.js lee `.env.local` al arrancar. Si lo cambias, reinicia `npm run dev`.

## Estructura

```
src/
├─ app/
│  ├─ [lang]/               Páginas por idioma: inicio, privacy, terms e imagen para redes
│  ├─ api/contact/          Formulario de contacto: validación, envío con Resend y plantillas de correo
│  ├─ robots.ts, sitemap.ts
│  └─ globals.scss          Estilos globales y tokens de tema (claro/oscuro)
├─ components/              Una carpeta por sección (Hero, Services, Contact, Navbar…)
│  └─ useModal.ts           Comportamiento compartido de diálogos (Escape, foco, bloqueo de scroll)
├─ data/                    Datos que no se traducen: contacto, redes, equipo, NIT
├─ i18n/                    Textos en español (es.ts) e inglés (en.ts) y textos legales
├─ styles/variables.scss    Colores, breakpoints y sombras de la marca
└─ proxy.ts                 Redirección de idioma (/ → /es o /en)
public/                     Imágenes (logos, servicios, equipo)
```

## Cómo editar el contenido

- **Textos del sitio:** `src/i18n/es.ts` y `src/i18n/en.ts`. Las dos versiones deben tener las mismas claves; TypeScript avisa si falta alguna.
- **Teléfono, correo, direcciones, redes y NIT:** `src/data/company.ts`.
- **Equipo:** `src/data/team.ts`. Los cargos y las biografías están en los archivos de `i18n`.
- **Políticas de privacidad y términos:** `src/i18n/legal.ts`.
- **Imágenes:** usa WebP o JPG optimizados. Una foto de unos 1.400 px de ancho no debería pasar de unos 200 KB.

## Formulario de contacto

1. El visitante envía el formulario y la página llama a `/api/contact`.
2. El servidor valida los datos (campos obligatorios, largo máximo, correo válido y autorización de datos), descarta bots con un campo trampa y limita a 5 envíos cada 10 minutos por IP.
3. Resend envía a `CONTACT_EMAIL` un correo con el diseño de Prosource. Al responderlo, la respuesta le llega directamente al cliente.
4. Si `CONTACT_FROM` está configurado, el cliente también recibe una confirmación en su idioma.

Si algo falla, el motivo aparece en la terminal (o en los logs del hosting) con el prefijo `[contact]`.

Las plantillas están en `src/app/api/contact/email.ts`. El logo va dentro del correo, así que se ve aunque el sitio no tenga dominio todavía.

## Seguridad

- Cabeceras de seguridad en `next.config.ts`: CSP, HSTS, `X-Frame-Options`, `nosniff`, `Referrer-Policy` y `Permissions-Policy`. Si agregas un servicio externo (scripts, iframes o APIs del navegador), agrégalo también a la CSP o el navegador lo bloqueará.
- Las claves y los correos de destino viven solo en variables de entorno, nunca en el código.
- Google Analytics respeta el consentimiento del visitante (Ley 1581 de 2012).

## Publicar en producción

1. Despliega el repositorio en un hosting compatible con Next.js (por ejemplo [Vercel](https://vercel.com)).
2. Configura las variables de entorno de la tabla anterior.
3. Verifica tu dominio en Resend (registros DNS) y define `CONTACT_FROM` con ese dominio.
4. Define `NEXT_PUBLIC_SITE_URL` con el dominio final.
5. Envía el formulario una vez y confirma que llega el correo.
