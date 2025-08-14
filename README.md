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

## 🌐 Publicación

Este repositorio está configurado para publicarse automáticamente en **GitHub Pages** desde la carpeta `/docs`.  
Cuando se suben cambios a `main`, el sitio se actualiza en pocos minutos.

---
