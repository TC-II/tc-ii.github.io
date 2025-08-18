---
layout: page
title: Guías
permalink: /guias/
---

{% comment %}
PRIORIDAD: _guias/. Si está vacío, buscar páginas bajo /guias/, excluyendo el index.
Solo ítems que tengan PDF (archivo o pdf_file) o un drive_id.
{% endcomment %}

{%- assign items_coll = site.guias -%}
{%- assign items = "" | split: "" -%}

{%- if items_coll and items_coll != empty -%}
  {%- for g in items_coll -%}
    {%- assign has_pdf_field = g.archivo or g.pdf_file -%}
    {%- assign has_drive_id  = g.drive_id or g.archivo_id or g.drive_file_id -%}
    {%- if has_pdf_field or has_drive_id -%}
      {%- assign items = items | push: g -%}
    {%- endif -%}
  {%- endfor -%}
{%- endif -%}

{%- if items == empty -%}
  {%- assign candidates = site.pages | where_exp: "p", "p.path contains '/guias/'" -%}
  {%- for p in candidates -%}
    {%- assign is_index_name = p.name == 'index.md' or p.name == 'index.markdown' or p.name == 'index.html' -%}
    {%- assign is_index_url  = p.url == page.url or p.permalink == page.permalink or p.url == '/guias/' or p.permalink == '/guias/' -%}
    {%- assign has_pdf_field = p.archivo or p.pdf_file -%}
    {%- assign has_drive_id  = p.drive_id or p.archivo_id or p.drive_file_id -%}
    {%- if not is_index_name and not is_index_url and (has_pdf_field or has_drive_id) and (p.layout == 'item' or p.tipo == 'Guía') -%}
      {%- assign items = items | push: p -%}
    {%- endif -%}
  {%- endfor -%}
{%- endif -%}

{%- comment -%} Orden: por título natural {%- endcomment -%}
{%- assign items = items | sort_natural: "title" -%}

<section class="guides-alt">
  {%- if items == empty -%}
    <p class="text-dim">No hay guías publicadas todavía.</p>
  {%- endif -%}

  {%- for g in items -%}
    {%- assign odd = forloop.index0 | modulo: 2 -%}

    {%- comment -%} Normalizo fuentes PDF: local, URL o Drive {%- endcomment -%}
    {%- assign raw_pdf = g.pdf_file | default: g.archivo -%}
    {%- assign drive_id = g.drive_id | default: g.archivo_id | default: g.drive_file_id -%}

    {%- if drive_id -%}
      {%- assign pdf_url = 'https://drive.google.com/uc?export=download&id=' | append: drive_id -%}
      {%- assign pdf_view_url = 'https://drive.google.com/file/d/' | append: drive_id | append: '/view' -%}
    {%- else -%}
      {%- if raw_pdf -%}
        {%- if raw_pdf contains '://' -%}
          {%- assign pdf_url = raw_pdf -%}
          {%- assign pdf_view_url = raw_pdf -%}
        {%- else -%}
          {%- assign pdf_url = raw_pdf | replace: '\', '/' | relative_url -%}
          {%- assign pdf_view_url = pdf_url -%}
        {%- endif -%}
      {%- endif -%}
    {%- endif -%}

    {%- comment -%} Normalizo thumbnail: local, URL o Drive {%- endcomment -%}
    {%- assign raw_thumb = g.preview | default: g.thumb -%}
    {%- assign preview_drive_id = g.preview_drive_id | default: g.thumb_drive_id -%}
    {%- assign thumb_url = nil -%}

    {%- if preview_drive_id -%}
      {%- assign thumb_url = 'https://drive.google.com/uc?export=view&id=' | append: preview_drive_id -%}
    {%- else -%}
      {%- if raw_thumb -%}
        {%- if raw_thumb contains '://' -%}
          {%- assign thumb_url = raw_thumb -%}
        {%- else -%}
          {%- assign thumb_url = raw_thumb | replace: '\', '/' | relative_url -%}
        {%- endif -%}
      {%- endif -%}
    {%- endif -%}

    <article class="gcard {% if odd == 1 %}flip{% endif %}">
      <a class="gthumb" href="{{ g.url | relative_url }}">
        {%- if thumb_url -%}
          <img src="{{ thumb_url }}" alt="Vista previa de {{ g.title }}">
        {%- endif -%}
      </a>

      <div class="gbody">
        <div class="guide-meta small text-dim">
          <span class="pill">Guía</span>{% if g.unidad %} · Unidad {{ g.unidad }}{% endif %}
          {% if g.date %} · {{ g.date | date: "%d/%m/%Y" }}{% endif %}
        </div>

        <h2 class="gtitle"><a href="{{ g.url | relative_url }}">{{ g.title }}</a></h2>

        {%- assign desc = g.descripcion | default: g.description -%}
        {%- if desc -%}<p class="gdesc">{{ desc }}</p>{%- endif -%}

        <div class="actions">
          <a class="btn" href="{{ g.url | relative_url }}">Ver detalles</a>
          {%- if pdf_view_url -%}
            <a class="btn ghost" href="{{ pdf_view_url }}" target="_blank" rel="noopener">Abrir</a>
          {%- endif -%}
          {%- if pdf_url -%}
            <a class="btn ghost" href="{{ pdf_url }}" download type="application/pdf">Descargar</a>
          {%- endif -%}
          {%- if drive_id -%}
            <a class="btn ghost" href="{{ 'https://drive.google.com/file/d/' | append: drive_id | append: '/view' }}" target="_blank" rel="noopener">Ver en Drive</a>
          {%- endif -%}
        </div>
      </div>
    </article>
  {%- endfor -%}
</section>
