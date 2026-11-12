# CloudWatch · Dashboard SPA responsivo

Panel de monitoreo de servidores e instancias cloud. HTML5 semántico, CSS nativo y JavaScript vanilla (sin Bootstrap ni Tailwind).

## Cómo ejecutarlo
Usa módulos ES, así que necesita un servidor local (no abrir con doble clic):
- VS Code: extensión **Live Server** → clic derecho en `index.html` → *Open with Live Server*
- O en terminal: `python -m http.server 5500` y abre http://localhost:5500

## Estructura
```
index.html
css/  variables.css · base.css (mobile-first) · layout.css (Grid + Flexbox) · components.css
js/   app.js · router.js · theme.js · modal.js · drawer.js · ui.js
docs/ persona.md · wireframes.md · reporte.md
```

## Qué incluye
- **Zona 1:** header fijo, sidebar retráctil en móvil, breadcrumbs, `aria-current` y enlace "Volver".
- **Zona 2:** tarjetas Bento Grid, gráfica SVG, tabla con filtro y paginación, datos simulados cada 2 s.
- **Zona 3:** drawer de configuración (texto, textarea, fecha, switch, dropdown) y modal de confirmación.
- **Estados:** Default, Hover, Focus, Disabled y Loading en `#/componentes`.
- **Modo oscuro:** variables CSS, `prefers-color-scheme` y toggle manual.
- **Atajos:** `Esc` cierra modal/drawer · `/` abre la búsqueda de servidores.

## Commits sugeridos
```
git init && git add docs README.md && git commit -m "docs: persona, wireframes y reporte base"
git add css/variables.css css/base.css && git commit -m "feat: variables de tema y base mobile-first"
git add index.html css/layout.css && git commit -m "feat: layout grid, bento y flexbox"
git add css/components.css js/ui.js js/modal.js js/drawer.js && git commit -m "feat: componentes, estados, drawer y modal"
git add js/router.js js/theme.js js/app.js && git commit -m "feat: router SPA, modo oscuro y vistas"
```
