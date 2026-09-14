# Componentes

Estas son las clases **canónicas**. Antes de inventar una variante, buscá si ya
existe. Este sitio llegó a tener cinco implementaciones de card y tres de `.pill`
que se veían distinto según qué hoja cargara la página.

## Quién emite qué

Muchas clases las genera JavaScript, no Liquid. **Renombrarlas rompe el JS en
silencio.** Si hace falta unificar estilos, agrupá selectores
(`.a, .b { … }`) en vez de renombrar.

| Clase | La emite |
|---|---|
| `.guide-card` `.guide-cover` `.guide-info` `.guide-title` `.guide-desc` `.guide-meta` `.guide-actions` | `assets/js/guias.js` |
| `.g-modal*`, `.g-modal-empty` | `assets/js/guias.js` |
| `.tp-card` `.tp-cover` `.tp-info` `.tp-title` `.tp-desc` `.tp-dates` `.tp-actions`, `.tp-modal*` | `assets/js/tps.js` |
| `.class-card` `.class-badge` `.class-head` `.chevron-toggle` `.btn-ghost` `.iconbtn` `.clase-modal*` | `assets/js/clases.js` |
| `.chip` `.pill-type` `.pill-qual` `.pill-1p` `.pill-2p` `.pill-final` | `examenes/index.md` (inline) |
| `.repo-card` `.repo-front` `.repo-back` `.app` `.btn-round` | `repositorios/index.md` (inline) |
| `.pl-card` `.pl-chip` `.pl-badge` | `assets/js/playlist.js` |
| `.pill` `.card.soft` `.pdf-fit` `.meta` | `_layouts/item.html`, `_layouts/post.html` |

## Layout

| Clase | Qué hace | Archivo |
|---|---|---|
| `.container` | 1120px, gutter fluido. **La única.** | `layout.css` |
| `.container--wide` / `--prose` | 1320px / 72ch | `layout.css` |
| `.after-header` | separa del header pegajoso | `layout.css` |
| `.error-page` | 600px centrado, solo para `404.html` | `layout.css` |

`404.html` tenía un `.container` propio de 600px que aplastaba también navbar y
footer. Por eso existe `.error-page`: **no volver a overridear `.container`.**

## Header y navegación

`.site-header` · `.navwrap` · `.site-title` · `.logo` · `.nav` · `.nav-toggle` · `#mobileMenu`

- Breakpoint **900px**, y tiene que coincidir con `nav.js:9`
  (`matchMedia('(min-width: 900px)')`). Antes el CSS usaba 820px en un archivo y
  899.98px en otro, así que el menú quedaba roto entre 820 y 900.
- En `<900px`: `#mobileMenu { overflow:hidden; height:0 }` + transición de
  `height`. **`nav.js` anima esa propiedad y escucha `transitionend`.**
- En `≥900px`: `display:flex !important; height:auto !important;
  overflow:visible !important`. Esos `!important` sostienen el estado si el CSS
  resuelve antes de que corra el JS: no sacarlos.
- `.site-header.is-scrolled` la pone `nav.js` con un `IntersectionObserver`.
- Sección activa: `aria-current="page"` desde Liquid en `navbar.html`.

## Hero

`.hero` (y los alias históricos `.hero-card`, `.hero-azul`) · `.hero-eyebrow`

Fondo: halo radial de `--accent` + doble grilla de graticule (110px mayores,
22px menores) + filo iluminado superior vía `::before`.

`.hero-eyebrow` necesita especificidad extra porque `.hero p` (0,1,1) le gana a
una clase suelta (0,1,0). Ya está resuelto en `layout.css`.

## Botones

`.btn` = `.btn-primary` (relleno acento) · `.btn-outline` = `.btn.ghost` (contorno) ·
`.btn-ghost` (neutro, contorno gris) · `.btn-round` (circular, repositorios)

Todos: mono, `--tap-target` de alto mínimo, `--radius-md`, `:active` con
`translateY(1px)`.

## Pills

`.pill` base + `.pill-publish` · `.pill-muted` / `.pill-neutral` · `.pill-deadline`

Mono, mayúsculas, `--tracking-wide`, `tabular-nums`.
**`.pill-deadline` es texto `--danger` sobre `--danger-soft`**, nunca relleno
sólido con texto blanco (ver `tokens.md`).

## Cards

| Clase | Uso |
|---|---|
| `.card` | superficie base |
| `.card--interactive` | agrega hover elevado + foco |
| `.card--flush` | sin padding, para media a sangre |
| `.card.soft` | caja tenue de sección ("Contenido") |
| `.card-spectrum` | las 6 de la home; franja de color por `nth-child` |
| `.media-card` = `.guide-card` = `.tp-card` | guías y TPs, unificadas por agrupación |
| `.class-card` + `.class-badge` | material didáctico; el rail muestrea `--gradient-spectrum` |
| `.repo-card` | tarjeta con giro 3D |

`.card.soft` está acotado **a propósito** a `.card.soft` y no a `.soft` suelto:
`repositorios/index.md` usa `<hr class="soft">` para otra cosa.

## Modales

`.g-modal*` y `.tp-modal*` comparten estilos por agrupación.
`.clase-modal*` es aparte (tiene modo full-screen en mobile con `100dvh`).

Todos: overlay `--overlay` + blur, superficie `--elevated`, `--shadow-3`,
`z-index: var(--z-modal)`, botón de cierre de 44×44.

## Visor de PDF

`.pdf-fit` (en `_layouts/item.html`) · `.g-modal-viewer` / `.tp-modal-viewer` ·
`.iframe-viewport` (clases) · `.exams-page .viewer iframe`

`.pdf-fit` **estuvo sin definir mucho tiempo**: el iframe quedaba sin altura en
cada página de guía/examen/clase. Hoy: `min(80vh, 900px)`, 70vh en mobile.

> Nota: hoy las colecciones `_guias/`, `_examenes/`, `_clases/` y `_recursos/`
> están vacías — el contenido se arma en el cliente desde
> `assets/data/clases-cache.json`. Así que `item.html` no renderiza ninguna
> página por ahora, aunque sigue siendo código vivo.
