# +Nexo — Landing pública

Landing pública de +Nexo (ERP AI-native), construida con Astro. Vive
enteramente en esta rama huérfana `website`: no comparte árbol con `main`
(no hay `addons/`, `oca/` ni tooling de Python acá) y no está pensada para
mergearse a `main` — se despliega directo a Netlify desde acá (integración
nativa de Git, `website` como rama de producción).

Change de OpenSpec que originó este proyecto:
`openspec/changes/landing-nexo/` en la rama `main` (proposal, specs,
design, tasks).

## Identidad visual v0 (greenfield)

+Nexo no tenía identidad de marca previa a esta landing — lo que sigue es
la referencia v0, definida acá por primera vez.

**Paleta** (fondo oscuro, un único acento):

| Token                 | Valor     | Uso                                   |
| --------------------- | --------- | ------------------------------------- |
| `--color-bg`          | `#0A0A0B` | Fondo base                            |
| `--color-bg-raised`   | `#16161A` | Tarjetas / superficies elevadas       |
| `--color-border`      | `#26262B` | Bordes sutiles                        |
| `--color-fg`          | `#F5F5F7` | Texto primario                        |
| `--color-fg-muted`    | `#9A9AA2` | Texto secundario                      |
| `--color-accent`      | `#FF7A45` | Único acento de marca (naranja/ámbar) |
| `--color-accent-soft` | `#7A3A20` | Glow / fondos sutiles con el acento   |

No se usa cyan ni violeta como color de marca — fue una decisión explícita
para diferenciarse del acento más repetido en branding "AI-native" (ver
`design.md` del change, Decisión 3).

**Tipografía** (self-hosted vía `@fontsource-variable`, sin requests
externos a Google Fonts):

- **Space Grotesk** — titulares (`--font-heading`)
- **Inter** — cuerpo (`--font-sans`)
- **JetBrains Mono** — reservada específicamente para la porción
  "estructurada" del demo de chat (refuerza visualmente el mensaje "esto
  se convierte en un dato estructurado", sin necesidad de decirlo en el
  copy)

**Marca**: wordmark "+Nexo" (el "+" en el acento, "Nexo" en texto
primario), sin isotipo/símbolo en esta iteración.

**Vocabulario de movimiento**: un único "flourish" fuerte por pantalla (el
glow del acento en el hero); el resto de las secciones usa reveals simples
y consistentes (mismo easing/duración en todo el sitio). Pin/scroll-scrub
con GSAP se reserva para las 2 secciones de mayor peso narrativo ("el
problema" y el demo de chat); todo lo demás usa reveals de fade+translate.
`prefers-reduced-motion` desactiva el pin/scrub globalmente.

Los tokens de color/tipografía viven en `src/styles/global.css` (bloque
`@theme` de Tailwind v4) — esa es la fuente de verdad, esta tabla es
documentación de referencia.

## Estructura del proyecto

```text
/
├── public/
├── src/
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css      # tokens de diseño (@theme) + estilos base
└── package.json
```

## Comandos

Todos corren desde la raíz de este proyecto:

| Comando                | Acción                                       |
| ---------------------- | -------------------------------------------- |
| `npm install`          | Instala dependencias                         |
| `npm run dev`          | Dev server en `localhost:4321`               |
| `npm run build`        | Build de producción a `./dist/`              |
| `npm run preview`      | Preview local del build                      |
| `npm run lint`         | ESLint (incluye `.astro`)                    |
| `npm run format`       | Prettier — aplica formato (incluye `.astro`) |
| `npm run format:check` | Prettier — solo verifica, no escribe         |

## Trabajar en esta rama

Esta rama es huérfana y no comparte historia con `main`. Para clonar/armar
un worktree propio de `website` sin tocar el resto del repo:

```sh
git worktree add --orphan -b website ../website  # solo la primera vez
# o, si la rama ya existe:
git worktree add ../website website
```
