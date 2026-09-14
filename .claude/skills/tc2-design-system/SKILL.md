---
name: tc2-design-system
description: >-
  Sistema de diseño del sitio Teoría de Circuitos II (Jekyll, CSS plano, sin
  build step, salida a docs/). Usar al editar assets/css/, _layouts/, _includes/
  o cualquier bloque <style> de página; al crear o restilar cards, pills,
  botones, modales, navbar, hero o footer; al elegir colores, espaciados,
  tamaños de fuente, radios o sombras; y ante pedidos de "modernizar",
  "restilar", "unificar estilos", "cambiar el color de acento", "arreglar el
  tema" o "agregar modo claro". Impone los tokens semánticos de
  assets/css/tokens.css, prohíbe nuevos bloques :root y fallbacks hex
  hardcodeados, y protege el renderizado de KaTeX.
---

# Sistema de diseño — Teoría de Circuitos II

Dirección visual: **Osciloscopio**. Instrumento de laboratorio, no web genérica.
Negro instrumento, verde fósforo, grilla de graticule, esquinas duras (radios de
2–8px), monoespaciada para todo lo que sea dato: fechas, números de guía,
etiquetas, navegación.

Tema **único y oscuro**. No hay modo claro y no se agrega sin pedido explícito:
el escudo se sirve en blanco (`filter: brightness(0) invert(1)`), que es una
decisión de identidad tomada, y en fondo claro desaparecería.

## Innegociables

1. **Un solo `:root`, en `assets/css/tokens.css`.** Ninguna otra hoja ni
   ningún `<style>` de página define variables globales. Este sitio llegó a
   tener cinco `:root` compitiendo, y uno de ellos (`repositorios/index.md`)
   le cambiaba el acento y el fondo del navbar a esa página sola.
2. **Prohibida la forma `var(--x, #hex)`.** Un fallback que solo dispara si el
   token falta es un bug silencioso. Si falta un token, se agrega a `tokens.css`.
3. **Prohibido agregar `<style>` a una página.** El CSS por sección va en su
   propio archivo y se enlaza con `extra_css:` en el front matter.
4. **Prohibido tocar `.katex` y descendientes.** Ver `references/rules.md`.
5. **Todo elemento interactivo necesita `:focus-visible`** y un target táctil de
   `var(--tap-target)` (44px).

## Orden de carga

`_includes/head.html` enlaza, en este orden exacto:

```
tokens → base → layout → components → [extra_css de la página] → KaTeX
```

`_layouts/default.html` emite `page.extra_css` después del include, así que una
hoja de sección siempre le gana a las globales **sin necesidad de `!important`**.
KaTeX va último a propósito, para que gane sobre `.katex*` por cascada.

Hojas de sección y quién las carga:

| Hoja | Página | Cómo |
|---|---|---|
| `home.css` | `/` | `extra_css` |
| `guias.css` | `/guias/` | `extra_css` |
| `tps.css` | `/tps/` | `extra_css` |
| `clases.css` | `/material-didactico/` | `extra_css` |
| `examenes.css` | `/examenes/` | `extra_css` |
| `repositorios.css` | `/repositorios/` | `extra_css` |
| `playlists.css` | `/playlists/*` | `extra_css` |

## Dónde buscar

| Tarea | Leer |
|---|---|
| Elegir cualquier valor: color, tamaño, espaciado, radio, sombra | `references/tokens.md` |
| Crear o restilar un componente de UI | `references/components.md` |
| Revisar un cambio, o dudar de si algo está permitido | `references/rules.md` |

## Verificar

El preview ya está configurado (`.claude/launch.json`, nombre `jekyll`, puerto 4321).

```
preview_start { name: "jekyll" }
navigate a: / /guias/ /tps/ /material-didactico/ /examenes/ /repositorios/ /playlists/ /404.html
read_console_messages { onlyErrors: true }
read_network_requests { urlPattern: "\\.(css|woff2)$" }    # 404 de hojas renombradas
```

Chequeo de invariante — debe dar **1** en toda página:

```js
[...document.styleSheets].flatMap(s=>{try{return[...s.cssRules]}catch(e){return[]}})
  .filter(r=>r.selectorText===':root').length
```

Ojo: con la pane del navegador oculta `requestAnimationFrame` no corre, y el
menú móvil (`assets/js/nav.js`) anima con rAF. Si el menú "no abre" en una
prueba headless, es el entorno, no el código.
