# Teoría de Circuitos II – Sitio Web

Este repositorio contiene el código fuente del sitio web de **Teoría de Circuitos II (ITBA)**, construido con [Jekyll](https://jekyllrb.com/).

## 🚀 Estructura del sitio

- `_layouts/` → Plantillas base para las páginas.
- `_includes/` → Componentes reutilizables (navbar, footer, etc.).
- `assets/css/main.css` → Estilos principales (diseño moderno, soporta *dark mode*).
- Colecciones personalizadas:
  - `_guias/` → Guías de la materia.
  - `_examenes/` → Exámenes previos.
  - `_clases/` → Material de clases.
  - `_recursos/` → Recursos externos y útiles.
  - `_playlists/` → Listas de reproducción y videos recomendados.

## 🛠 Cómo editar el contenido

Cada elemento (guía, examen, clase, recurso, playlist) es un archivo Markdown (`.md`) en la carpeta correspondiente, con un **Front Matter** en YAML al inicio.  
Ejemplo:

```yaml
---
title: "Guía 1 – Análisis de circuitos"
archivo: "/assets/guias/guia1.pdf"
fecha: 2025-03-10
---
Descripción breve de la guía y qué temas cubre.
```

- `title` → Nombre visible en la web.  
- `archivo` → Ruta del archivo PDF u otro recurso.  
- `fecha` → Fecha de publicación o última actualización.  
- El texto debajo del Front Matter será el contenido descriptivo.

Los PDFs y otros archivos deben colocarse en la carpeta `assets/` dentro de su subcarpeta correspondiente (`guias`, `examenes`, `clases`).

## 💻 Probar cambios en local

1. **Clonar este repositorio**
   ```bash
   git clone <url-del-repo>
   cd <nombre-del-repo>
   ```
2. **Instalar dependencias**
   ```bash
   bundle install
   ```
3. **Levantar el servidor local**
   ```bash
   bundle exec jekyll serve
   ```
4. Abrir en el navegador:
   ```
   http://localhost:4000
   ```

El sitio se recargará automáticamente al guardar cambios.

🛠 Cómo modificar el sitio y publicar cambios

Este repositorio usa Jekyll en local y publica en GitHub Pages desde la carpeta /docs.
Por eso, todo cambio que quieras ver online debe compilarse a HTML y quedar dentro de /docs antes de subirlo a main.

Pasos para modificar y publicar

Instalar dependencias (solo la primera vez o si hay cambios en Gemfile):

bundle install


Levantar en local para ver cambios en vivo:

bundle exec jekyll serve


Abrir en http://localhost:4000

Generar el sitio para publicar:

bundle exec jekyll build --destination docs


Esto sobrescribe el contenido de /docs con el HTML actualizado.

Subir cambios a GitHub:

git add .
git commit -m "Actualización del sitio"
git push


En pocos minutos, GitHub Pages actualizará el sitio con lo que haya en /docs.

## 🌐 Publicación

Este repositorio está configurado para publicarse automáticamente en **GitHub Pages** desde la carpeta `/docs`.  
Cuando se suben cambios a `main`, el sitio se actualiza en pocos minutos.

---
