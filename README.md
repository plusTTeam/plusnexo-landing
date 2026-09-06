# +Nexo — Landing

Landing pública de **+Nexo**, el ERP AI-native que convierte una
conversación en facturas, pedidos y clientes organizados — sin
formularios, sin capacitación de semanas.

Sitio: https://plustteam.github.io/plusnexo-landing/

Construida con [Astro](https://astro.build), Tailwind CSS y GSAP. Se
despliega automáticamente a GitHub Pages al pushear a `main`.

## Correr localmente

```sh
git clone https://github.com/plusTTeam/plusnexo-landing.git
cd plusnexo-landing
npm install
npm run dev
```

## Comandos

| Comando                | Acción                                       |
| ---------------------- | -------------------------------------------- |
| `npm run dev`          | Dev server en `localhost:4321`               |
| `npm run build`        | Build de producción a `./dist/`              |
| `npm run preview`      | Preview local del build                      |
| `npm run lint`         | ESLint (incluye `.astro`)                    |
| `npm run format`       | Prettier — aplica formato (incluye `.astro`) |
| `npm run format:check` | Prettier — solo verifica, no escribe         |

## Estructura

```text
/
├── public/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   │   └── index.astro
│   ├── scripts/
│   └── styles/
└── package.json
```
