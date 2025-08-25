# 📚 Teoría de Circuitos II – ITBA

Repositorio oficial para la página de **Teoría de Circuitos II (ITBA)**, construida con Jekyll y [publicada](https://teoria-de-circuitos-ii.github.io/Pagina_material/) en **GitHub Pages**.

Este sitio centraliza **guías, exámenes, material de clases, recursos y playlists** de la materia, con un diseño moderno y soporte para modo oscuro.

---

Este README está pensado **para docentes** que cargan material. Explica cómo agregar **elementales, guías, TPs y clases** (JSON en Drive), cómo crear **playlists** (archivos `.md`), cómo actualizar **recursos** (repos y apps), y cómo se muestran los **exámenes** (desde Drive, con convención de nombres). También incluye cómo **compilar** localmente.

---

## 1) Fuentes de datos

* **Contenido académico (unificado)** → **JSON en Google Drive**.

  * Incluye: `elemental`, `tp`, `guia`, `clase`.
  * Se **edita directamente en Drive** (un único archivo para todo lo anterior).
* **Playlists** → carpeta `/playlists/` con **archivos `.md`** (uno por playlist).
* **Recursos** → `_data/recursos.yml` (repos y apps).
* **Exámenes** → PDFs en **carpeta de Drive** con **convención de nombres** (la web los lista automáticamente).

---

## 2) Cómo agregar/editar contenido académico (JSON en Drive)

Abrir el **JSON de contenido** en Drive y agregar un objeto por ítem. El sitio consume los campos tal cual.

### Tipos soportados

| `kind`      | Campos obligatorios                                     | Opcionales |
| ----------- | ------------------------------------------------------- | ---------- |
| `elemental` | `title`, `pdf_id`                                       | `emoji`    |
| `tp`        | `title`, `description`, `pdf_id`, `release`, `deadline` | —          |
| `guia`      | `title`, `description`, `pdf_id`, `release`, `deadline` | —          |
| `clase`     | `number`, `title`, `folder_id`, `release`               | —          |

* **Fechas**: usar el mismo formato que ya está en el JSON. Ej.: `YYYY-MM-DD` para TPs/guías y **ISO con zona horaria** para clases (`2025-08-19T22:00-03:00`).
* **Visibilidad**: los ítems se muestran a partir de `release`.
* **Permisos Drive**: los PDFs y carpetas deben estar **accesibles con link** (cualquiera con el enlace, Viewer).

### Ejemplos reales (copiables)

**Elemental**

```json
{ "kind": "elemental", "title": "Cronograma", "pdf_id": "1TuTVeDv8e72o6-eU8HkRxWhDQaQD8sps", "emoji": "📅" }
```

**TP**

```json
{ "kind": "tp", "title": "TP1", "description": "Amplificador Operacional: Configuraciones elementales y límites físicos", "pdf_id": "1TiNSsf665b4F-qAnP0VUznc1K-nYxP05", "release": "2025-08-05", "deadline": "2025-08-18" }
```

**Guía**

```json
{ "kind": "guia", "title": "Guía 3 - Funciones de Aproximación: Síntesis de Filtros", "description": "Desarrollo de funciones de aproximación y su aplicación en la síntesis de filtros", "pdf_id": "1_PK4PFVQcZCy4YK_xs7Pe1Q3xcCLqOIW", "release": "2025-08-14", "deadline": "2025-09-01" }
```

**Clase**

```json
{ "kind": "clase", "number": 3, "title": "Clase 3 (19-08) – Fuentes de corriente, Howland, NIC", "folder_id": "1pq9kpb8f7jI26WPhppnIc-o_-gfTX47e", "release": "2025-08-19T22:00-03:00" }
```

**Notas**

* **`pdf_id`**: ID del archivo en Drive (URL tipo `.../file/d/<ID>/view`).
* **`folder_id`**: ID de carpeta en Drive (`.../drive/folders/<ID>`). La página de **Clases** muestra el **contenido de esa carpeta**.
* **Emojis**: solo en `elemental`.

---

## 3) Playlists (archivos `.md` en `/playlists/`)

Cada playlist es un archivo Markdown con front matter. **Ejemplo real**:

```yaml
---
layout: playlist_item
title: "KiCad — Playlist"
tipo: "Playlist"
desc: "Diseño de circuitos impresos con KiCad: librerías, routing, auto-routing y creación de componentes."
yt_list_id: "PLHE9SVLH2-ZyCvdS6fNOSjTgGBWA5UjKF"

# Video inicial grande (el primero de la lista)
start_video_id: "YnOdnGcWLI4"
cover_id: "YnOdnGcWLI4"
date: 2025-08-16

extra_css:
  - /assets/css/playlists.css
extra_js:
  - /assets/js/playlist.js

videos:
  - id: "YnOdnGcWLI4"
    title: "Kicad + TC Lib"
    desc: "Introducción al flujo de trabajo en KiCad y uso de librerías personalizadas de la cátedra."
  - id: "jqaJH9Kj2a0"
    title: "L2 - Kicad - Routing y Auto-Routing"
    desc: "Enrutamiento manual y automático de pistas en un PCB usando KiCad."
  - id: "NFGs-zMEIwY"
    title: "L2 - Kicad - Crear componentes (muy fácil)"
    desc: "Creación rápida y práctica de símbolos y huellas personalizadas en KiCad."
---
```

**Pasos para agregar una playlist**

1. Crear archivo en `/playlists/` (ej.: `kicad.md`).
2. Copiar el front matter del ejemplo y actualizar `title`, `desc`, `yt_list_id` y la lista de `videos`.
3. (Opc.) Ajustar `start_video_id`/`cover_id` si el inicial no es el primero.

---

## 4) Recursos (repos y apps)

Archivo: **`_data/recursos.yml`**

* **Repos destacados** (por nombre/código de repo):

  ```yml
  featured_repos:
    - TC2Lib---LTSPICE
    - TC2Lib---KiCad
    - TC2-PlotTool
    - L2-Recursos-Python
    - Spice-a-PDF
    - TC2-FilterTool
  ```
* **Apps** (con posibilidad de embeber):

  ```yml
  apps:
    - title: Calculadora de seno elíptico (Streamlit)
      url: https://tc2-sntool.streamlit.app
      embed: true
      height: 680
  ```
* **Links** opcionales:

  ```yml
  links: []
  ```

---

## 5) Exámenes (Drive → listado automático)

Colocar los PDFs en la **carpeta de Drive de exámenes** usando esta **convención de nombres**:

* **Finales**: `AAAA Final Teoría de Circuitos 2 - Mes.pdf`

  * Ej.: `2025 Final Teoría de Circuitos 2 - Jul.pdf`, `2024 Final Teoría de Circuitos 2 - Dic.pdf`.
* **Parciales**: `AAAA <1P|2P> Teoría de Circuitos 2 <sufijo>.pdf`

  * Sufijos posibles: `I`, `II`, `Simulacro`, `Recu`.
  * Ej.: `2024 2P Teoría de Circuitos 2 - Simulacro.pdf`, `2024 1P Teoría de Circuitos 2 II.pdf`, `2024 2P Teoría de Circuitos 2 - Recu.pdf`.

> **Permisos**: dejar visibles con enlace (Viewer). El sitio toma el listado automáticamente; no hay que editar archivos del repo.

---

## 6) Compilar y previsualizar el sitio

### Opción rápida (Windows, con scripts del repo)

1. **Instalar Ruby** (RubyInstaller + Devkit). Al finalizar, ejecutar `ridk install`.
2. Abrir **PowerShell** en la carpeta del repo.
3. Ejecutar:

   * `./build_only.ps1` → genera el sitio.
   * `./build_prod.ps1` → build listo para publicar (carpeta `docs/`).

### Opción manual (macOS / Linux / Windows)

1. Instalar Ruby y Bundler.
2. En la carpeta del repo:

   ```bash
   bundle install
   bundle exec jekyll serve
   # abre en http://127.0.0.1:4000
   ```
3. Build de producción (si se necesita):

   ```bash
   JEKYLL_ENV=production bundle exec jekyll build
   ```

> En GitHub Pages, el contenido publicado suele salir de `docs/`. Si tu flujo usa los scripts, no hace falta correr comandos manuales.

---

## 7) Checklist para docentes

* [ ] **Drive**: subir el PDF/carpeta y copiar `pdf_id` / `folder_id`.
* [ ] **JSON (Drive)**: agregar el objeto con `kind` y campos correctos.
* [ ] **Permisos**: “Cualquiera con el enlace – Visualizador”.
* [ ] **Fechas**: completar `release` (y `deadline` en guías/TPs).
* [ ] **Playlists**: crear `.md` en `/playlists/` con el front matter del ejemplo.
* [ ] **Recursos**: actualizar `_data/recursos.yml`.
* [ ] **Exámenes**: subir PDF con la **convención de nombres**.

---

## 8) Preguntas frecuentes

* **No se ve un PDF** → revisar que el `pdf_id` sea correcto y que el archivo esté visible con enlace.
* **Una clase no lista archivos** → revisar `folder_id` y permisos de la carpeta.
* **Fechas** → respetar el formato usado en el JSON; los ítems se muestran desde `release`.
