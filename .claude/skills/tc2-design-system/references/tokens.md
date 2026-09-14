# Tokens

Todos viven en `assets/css/tokens.css`, en el único `:root` del proyecto.
Si necesitás un valor que no está acá, **agregalo a `tokens.css` y a esta tabla** —
no lo escribas suelto en una hoja de sección.

## Color

| Token | Valor | Para | Nunca para |
|---|---|---|---|
| `--bg` | `#07090a` | Fondo de página | Superficies elevadas |
| `--bg-subtle` | `#0a0e10` | Fondo de hero, `pre`, viewports de PDF, campos | Fondo de página |
| `--surface` | `#0d1113` | Cards, navbar, footer | Modales |
| `--elevated` | `#141a1d` | Modales, popovers, hover de chips | Superficie base |
| `--overlay` | `rgba(3,5,6,.78)` | Fondo detrás de modales | Cualquier otra cosa |
| `--fg` | `#e6efec` | Texto principal, títulos | Texto secundario |
| `--fg-muted` | `#8fa39d` | Descripciones, metadata, links de footer | Texto principal |
| `--fg-subtle` | `#61736e` | Disclaimers, placeholders, legales | Texto que haya que leer |
| `--fg-on-accent` | `#04120c` | Texto sobre relleno `--accent` | Sobre fondos oscuros |
| `--border` | `#1b2226` | Bordes por defecto | Estados hover |
| `--border-strong` | `#2b3639` | Bordes en hover/activo, separadores | Reposo |
| `--grid-line` | `#12181a` | Grilla de graticule (hero, cards de la home) | Bordes |
| `--accent` | `#7ef2c1` | Links, botón primario, foco, sección activa | Grandes áreas de relleno |
| `--accent-hover` / `--accent-active` | `#a3f7d5` / `#5cd9a5` | Estados del acento | Reposo |
| `--accent-soft` | `color-mix` 12% | Fondos de pill, chips activos | Texto |
| `--accent-ring` | `color-mix` 45% | Anillo de foco, bordes de pill | Texto |
| `--danger` | `#ff6b5e` | **Texto** de entregas vencidas | Relleno con texto blanco encima |
| `--danger-soft` | `color-mix` 14% | Fondo de `.pill-deadline` | Texto |
| `--warning` | `#ffc14d` | Avisos, pill de final | Texto de cuerpo |
| `--gradient-spectrum` | cyan→fósforo→ámbar | Rampa compartida entre las 6 cards de la home y el rail de clases | Fondos grandes |

### Contraste verificado (WCAG 2.1)

| Par | Ratio | |
|---|---|---|
| `--fg` / `--bg` | 17.0:1 | AAA |
| `--fg` / `--surface` | 16.2:1 | AAA |
| `--fg-muted` / `--bg` | 7.5:1 | AAA |
| `--fg-muted` / `--surface` | 7.1:1 | AAA |
| `--accent` / `--bg` | 14.6:1 | AAA |
| `--fg-on-accent` / `--accent` | 14.0:1 | AAA (botón lleno) |
| `--danger` / `--bg` | 7.1:1 | AAA (como texto) |

**`--danger` nunca se usa como relleno sólido con texto blanco.** Esa combinación
(`#fff` sobre `#ff3b30` = 3.55:1 a 14.4px bold) es la que hacía fallar AA a
`.pill-deadline`, justo en el dato más importante de `/guias/` y `/tps/`.

## Tipografía

`--font-sans` = IBM Plex Sans · `--font-mono` = IBM Plex Mono.
Ambas con fallback al stack del sistema: si los `.woff2` no están en
`assets/fonts/`, el sitio sigue funcionando.

**La mono es el elemento de display de esta dirección visual.** Va en: navegación,
títulos de sección del footer, pills, fechas, números de guía, eyebrows, botones,
metadata. El cuerpo de texto va en sans.

| Token | Valor |
|---|---|
| `--fs-xs` … `--fs-md` | 12 / 14 / 16 / 18 px |
| `--fs-lg` … `--fs-3xl` | fluidos con `clamp()`: 20→24, 24→32, 30→44, 36→56 |
| `--lh-tight` / `--lh-snug` / `--lh-normal` | 1.12 / 1.3 / 1.6 |
| `--fw-regular` … `--fw-bold` | 400 / 500 / 600 / 700 |
| `--tracking-tight` / `--tracking-wide` | −0.015em / 0.08em |
| `--measure` | 68ch |

**`--tracking-*` solo en headings y labels.** Nunca en `body`, `.prose` ni `p`:
KaTeX lo hereda y se le desalinean las fracciones (ver `rules.md`).

Para fechas y numerales usar `font-variant-numeric: tabular-nums`, así alinean
en columna.

## Espacio, forma y movimiento

| Grupo | Tokens |
|---|---|
| Espacio (base 4px) | `--space-1`…`--space-9` = .25 / .5 / .75 / 1 / 1.5 / 2 / 3 / 4 / 6 rem |
| Fluidos | `--section-y` (2–4rem), `--gutter` (1–2rem) |
| Radio | `--radius-xs`…`--radius-xl` = 2 / 3 / 4 / 6 / 8 px, `--radius-full` = 999px |
| Ancho | `--width-prose` 72ch · `--width-content` 1120px · `--width-wide` 1320px |
| Táctil | `--tap-target` = 44px |
| Capas | `--z-sticky` 100 · `--z-dropdown` 200 · `--z-overlay` 900 · `--z-modal` 1000 · `--z-toast` 1100 |
| Duración | `--dur-fast` 120ms · `--dur-base` 200ms · `--dur-slow` 320ms |
| Easing | `--ease-out` · `--ease-in-out` |
| Sombra | `--shadow-1` reposo · `--shadow-2` hover · `--shadow-3` modales · `--shadow-focus` |

Los radios son **chicos a propósito**: la dirección Osciloscopio pide esquinas
duras. No subir a 12–16px "porque se ve más moderno".

`--radius-full` es solo para puntos, badges circulares y el chip de calendario.

## Recetas derivadas

```css
/* Tinte del acento, en vez de inventar un hex nuevo */
background: color-mix(in srgb, var(--accent) 12%, transparent);

/* Anillo de foco */
outline: 2px solid var(--accent);
outline-offset: 2px;

/* Elevación: reposo → hover */
box-shadow: var(--shadow-1);
:hover { box-shadow: var(--shadow-2); transform: translateY(-2px); }

/* Muestreo del barrido de instrumento (6 tramos) */
background-image: var(--gradient-spectrum);
background-size: 600% 100%;
background-position: var(--pos, 0%) 0;   /* 0% 20% 40% 60% 80% 100% */
```
