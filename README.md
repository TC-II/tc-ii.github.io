# TC2 Jekyll Site

## Uso rápido
1. Copiar el contenido de este zip en tu carpeta del proyecto (raíz Jekyll).
2. Instalar dependencias:
   ```bash
   bundle install
   ```
3. Levantar en local:
   ```bash
   bundle exec jekyll serve
   ```
4. Abrir http://localhost:4000

## Estructura
- `_layouts`, `_includes`: layouts e includes personalizados.
- `assets/css/main.css`: estilo moderno con glass/gradientes y dark mode (prefiere el modo del SO).
- Colecciones: `guias`, `examenes`, `clases`, `recursos`, `playlists`.
- Páginas índice para cada colección.
- Ejemplos de ítems en cada colección.

## Notas
- Colocá tus PDFs en `assets/guias`, `assets/examenes`, `assets/clases` y ajustá `archivo:` en el front matter.
- El diseño evita dependencias externas (sin Tailwind) para simplicidad.
- Si usás GitHub Pages clásico, estos plugins pueden requerir build vía Actions.
