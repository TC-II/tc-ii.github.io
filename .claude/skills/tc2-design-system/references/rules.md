# Reglas

## Hacer / No hacer

| No hacer | Por qué (esto ya pasó acá) |
|---|---|
| Agregar un `:root` fuera de `tokens.css` | El sitio tuvo 5. `site.css` pisaba la paleta de `main.css` y volvía el sitio oscuro **por accidente**, dejando muerto todo el modo claro. El `:root` de `repositorios/index.md` le cambiaba el acento y el fondo del navbar a esa página sola. |
| Escribir `var(--card, #141414)` | Todos esos fallbacks apuntaban a hex oscuros. `--surface` y `--fg-dim` ni siquiera existían: siempre ganaba el fallback, y nadie se enteraba. |
| Meter un `<style>` en una página | `examenes/index.md` tenía 130 líneas y `repositorios/index.md` 450. Fuera del sistema, sin caché y sin revisión. |
| Usar `!important` | `guias.css` tenía un muro de 4 bloques apilados… apuntando a `.guides-list` cuando el HTML dice `guias-list`. Nunca matcheó: peleaba contra un problema inexistente. |
| Renombrar clases que emite el JS | `guias.js`, `tps.js`, `clases.js` y los inline de exámenes/repositorios generan HTML con nombres fijos. Para unificar, **agrupá selectores**. |
| Duplicar un componente "para esta sección" | `.guide-card` y `.tp-card` eran idénticas byte a byte: ~220 líneas repetidas, incluidos los modales. |
| Subir los radios a 12–16px | La dirección Osciloscopio es de esquinas duras. `--radius-md` es 4px y está bien así. |
| `filter: brightness(0) invert(1)` en imágenes nuevas | Está solo en el escudo, y es deliberado (identidad). Aplicarlo a otra cosa aplana colores que importan. |
| Poner `letter-spacing` en `body`, `.prose` o `p` | KaTeX lo hereda y se le desalinean fracciones y radicales. |

| Hacer | |
|---|---|
| Poner CSS de sección en su archivo + `extra_css:` | Convención ya establecida por `playlists`. |
| Dejar que la cascada resuelva | `extra_css` se emite después de las globales: la sección gana sin `!important`. |
| Agrupar selectores para unificar | `.media-card, .guide-card, .tp-card { … }` — cero riesgo para el JS. |
| Agregar el token que falte a `tokens.css` | Y documentarlo en `tokens.md`. |

## Accesibilidad

- **`:focus-visible` en todo lo interactivo.** El proyecto no tenía ninguno: los
  usuarios de teclado solo veían el outline del navegador, y varias reglas lo
  quitaban. La primitiva está en `base.css`.
- **Contraste:** AA 4.5:1 para texto, 3:1 para bordes de UI. La paleta actual da
  AAA en todos los pares documentados.
- **Targets táctiles de `--tap-target` (44px).** Antes había varios de 36px:
  `.calendar-chip`, `.chevron-toggle`, `.tool-btn`, los cierres de modal.
- **`prefers-reduced-motion` a `.01ms`, nunca `none`.** `nav.js` escucha
  `transitionend` para terminar de abrir el menú: con `none` el evento no
  dispara y el menú queda trabado. Con `.01ms` sigue disparando.
- **Skip-link** a `#contenido` en `default.html`.
- No quitar `outline` sin reemplazarlo.

## KaTeX

El stack renderiza matemática **dos veces**: `kramdown-math-katex` en el build y
`auto-render.min.js` en el browser. Las dos rutas producen spans `.katex` que
estila la hoja del CDN.

1. **Nunca `font-family` en `.katex` ni descendientes.** Sus métricas están
   atadas a KaTeX_Main / KaTeX_Math / KaTeX_AMS / KaTeX_Size*.
2. **Nunca `letter-spacing` heredable** en `body` / `.prose` / `p`.
3. **`.katex svg, .katex img { max-width: none }`** — el
   `img, svg { max-width: 100% }` de `base.css` aplasta acentos y flechas
   estirables.
4. **`.katex-display { overflow-x: auto }`** — las derivaciones largas reventaban
   el viewport móvil.
5. **La hoja de KaTeX se carga última**, para que gane por cascada sin
   `!important`. No adelantarla.

`renderMathInElement` recibe `{ ignoredClasses:['no-math'], throwOnError:false }`
para no intentar renderizar `$…$` dentro de bloques de código.

## Fuentes

IBM Plex Sans + IBM Plex Mono, self-hosted en `assets/fonts/`
(`IBMPlexSans-Variable.woff2`, `IBMPlexMono-Regular.woff2`,
`IBMPlexMono-SemiBold.woff2`).

No usar el CDN de Google Fonts: manda IPs de estudiantes a un tercero y agrega
una dependencia de red en aulas con wifi flojo.

Si los archivos no están, `--font-sans` / `--font-mono` caen al stack del sistema
y no se rompe nada. El `preload` de `head.html` está comentado justamente para no
dejar un 404 en cada página mientras falten; descomentarlo al agregarlos.

## Al terminar un cambio

```
bundle exec jekyll build          # tiene que salir limpio
```

Verificar el invariante en el browser (debe dar **1**):

```js
[...document.styleSheets].flatMap(s=>{try{return[...s.cssRules]}catch(e){return[]}})
  .filter(r=>r.selectorText===':root').length
```

Y antes de commitear: `assets/data/clases-cache.json` lo reescribe CI desde
Drive — **no debe entrar en un commit de estilos**. `build_prod.ps1` hace
`git add .` a lo bruto, así que revisá el diff.
