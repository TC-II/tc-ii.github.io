# 📚 Teoría de Circuitos II – ITBA

Repositorio oficial para la página de **Teoría de Circuitos II (ITBA)**, construida con [Jekyll](https://jekyllrb.com/) y publicada en **GitHub Pages**.

Este sitio centraliza **guías, exámenes, material de clases, recursos y playlists** de la materia, con un diseño moderno y soporte para modo oscuro.

---

## 🚀 Requisitos para trabajar en el sitio

Antes de empezar, asegurate de tener instalado:
- **Ruby** (>= 3.0)
- **Bundler** (`gem install bundler`)
- Git (opcional para colaborar, pero necesario si querés hacer commits desde consola)

---

## 📂 Estructura del proyecto

```
mi-sitio/
│
├── _config.yml               # Configuración de Jekyll
├── _layouts/                 # Plantillas base de páginas y colecciones
├── _includes/                # Fragmentos reutilizables (navbar, footer, etc.)
├── assets/
│   ├── css/main.css           # Estilos globales
│   ├── guias/                 # PDFs de guías
│   ├── examenes/              # PDFs de exámenes
│   ├── clases/                # PDFs de clases
│   ├── recursos/              # PDFs u otros recursos
│   └── playlists/             # Archivos o enlaces relacionados
│
├── _guias/                    # Páginas de cada guía (YAML + Markdown)
├── _examenes/                 # Páginas de cada examen
├── _clases/                   # Páginas de cada clase
├── _recursos/                 # Páginas de cada recurso
├── _playlists/                # Páginas de cada playlist
│
├── docs/                      # Carpeta compilada que se publica en GitHub Pages
└── README.md                  # Este archivo
```

---

## 📥 Agregar material nuevo

1. **Guardar el archivo PDF** en la carpeta de `assets` correspondiente:
   - Guías → `assets/guias/`
   - Exámenes → `assets/examenes/`
   - Clases → `assets/clases/`
   - Recursos → `assets/recursos/`
   - Playlists → `assets/playlists/`

2. **Crear la página del recurso** en la colección correspondiente:
   - `_guias/` para guías
   - `_examenes/` para exámenes
   - `_clases/` para clases
   - `_recursos/` para recursos
   - `_playlists/` para playlists

3. **Ejemplo de front matter** para un PDF en `_guias/`:
   ```yaml
   ---
   title: "Guía 1 – Análisis de Circuitos"
   date: 2025-08-14
   file: /assets/guias/guia1.pdf
   layout: item
   tipo: "Guía"
   ---
   ```

4. **Probar localmente** (ver sección más abajo) y luego publicar.

---

## 🖥 Probar el sitio en local

1. **Instalar dependencias** (solo la primera vez o si cambió el Gemfile):
   ```bash
   bundle install
   ```

2. **Levantar el servidor local**:
   ```bash
   bundle exec jekyll serve
   ```
   Abrir [http://localhost:4000](http://localhost:4000) para ver el sitio.

---

## 🌐 Publicar el sitio en GitHub Pages

Este repositorio está configurado para **publicar el contenido de la carpeta `/docs`** en GitHub Pages.  
⚠️ Esto significa que **no se compila automáticamente en GitHub**, sino que **vos debés generar el HTML antes de subir**.

### Pasos para publicar:

1. **Generar la carpeta `/docs` actualizada**:
   ```bash
   bundle exec jekyll build --destination docs
   ```

2. **Verificar** que los archivos HTML, CSS y assets estén en `/docs`.

3. **Subir cambios a GitHub**:
   ```bash
   git add .
   git commit -m "Actualización del sitio"
   git push
   ```

4. En pocos minutos, el sitio estará actualizado en la URL configurada de GitHub Pages.

---

## 📌 Buenas prácticas

- Siempre probá localmente antes de publicar (`jekyll serve`).
- No edites directamente los archivos dentro de `/docs`, ya que se regeneran cada vez que compilás.
- Mantené los nombres de archivos cortos y sin espacios (usar `guia1.pdf`, no `Guía 1.pdf`).
- Usá fechas correctas en el front matter para mantener el orden cronológico.

---

## 📄 Licencia y colaboración

Este repositorio es de uso académico para la cátedra de **Teoría de Circuitos II – ITBA**.  
Podés proponer mejoras o corregir errores mediante *pull requests*.
