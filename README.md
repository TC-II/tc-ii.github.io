# 📚 Teoría de Circuitos II – ITBA

Repositorio del sitio web de la materia **Teoría de Circuitos II (ITBA)**, creado con [Jekyll](https://jekyllrb.com/) para centralizar material de estudio: guías, exámenes, material de clases, recursos y playlists.

---

## 🚀 Uso rápido

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Teoria-de-Circuitos-II/Pagina_material.git
   cd Pagina_material
   ```

2. **Instalar dependencias**
   ```bash
   bundle install
   ```

3. **Levantar el servidor local**
   ```bash
   bundle exec jekyll serve
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:4000
   ```

---

## 📂 Estructura del proyecto

- `_layouts`, `_includes` → layouts e includes personalizados.
- `assets/css/main.css` → estilo moderno inspirado en Apple (glassmorphism, gradientes, dark mode automático).
- Colecciones personalizadas:
  - `guias/`
  - `examenes/`
  - `clases/`
  - `recursos/`
  - `playlists/`
- Páginas índice para cada colección.
- Ejemplos de ítems en cada colección.

---

## 📄 Notas para colaborar

- Colocar PDFs en:
  - `assets/guias`
  - `assets/examenes`
  - `assets/clases`
- Ajustar el campo `archivo:` en el **front matter** del Markdown correspondiente.
- El diseño evita dependencias externas (sin Tailwind) para simplicidad y compatibilidad con GitHub Pages.
- Si se usan **plugins no soportados por GitHub Pages**, es posible que se requiera compilar vía **GitHub Actions** y publicar el contenido generado en `/docs`.

---

## 📬 Contacto

**Cátedra TC II – ITBA**  
📧 contacto@itba.edu.ar
