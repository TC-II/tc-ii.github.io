---
layout: page
title: Guías
permalink: /guias/
---

{% comment %}
PRIORIDAD: _guias/. Si está vacío, buscar páginas bajo /guias/, excluyendo el index.
Solo ítems que tengan PDF (archivo o pdf_file).
{% endcomment %}

{%- assign items = site.guias | where_exp: "g", "g.archivo or g.pdf_file" -%}

{%- if items == empty or items == nil -%}
  {%- assign candidates = site.pages | where_exp: "p", "p.path contains '/guias/'" -%}
  {%- assign items = "" | split: "" -%}
  {%- for p in candidates -%}
    {%- assign is_index_name = p.name == 'index.md' or p.name == 'index.markdown' or p.name == 'index.html' -%}
    {%- assign is_index_url  = p.url == page.url or p.permalink == page.permalink or p.url == '/guias/' or p.permalink == '/guias/' -%}
    {%- assign has_pdf = p.archivo or p.pdf_file -%}
    {%- if not is_index_name and not is_index_url and has_pdf and (p.layout == 'item' or p.tipo == 'Guía') -%}
      {%- assign items = items | push: p -%}
    {%- endif -%}
  {%- endfor -%}
{%- endif -%}

{%- comment -%} Extraer número de guía del título y usarlo para ordenar {%- endcomment -%}
{%- assign items = items | sort_natural: "title" -%}


<section class="guides-alt">
  {%- if items == empty -%}
    <p class="text-dim">No hay guías publicadas todavía.</p>
  {%- endif -%}

  {%- for g in items -%}
    {%- assign odd = forloop.index0 | modulo: 2 -%}

    {%- comment -%} normalizo rutas y campos {%- endcomment -%}
    {%- assign raw_pdf   = g.pdf_file | default: g.archivo -%}
    {%- assign raw_thumb = g.preview  | default: g.thumb -%}
    {%- assign pdf_url   = raw_pdf   | replace: '\', '/' | relative_url -%}
    {%- if raw_thumb -%}{%- assign thumb_url = raw_thumb | replace: '\', '/' | relative_url -%}{%- endif -%}

    <article class="gcard {% if odd == 1 %}flip{% endif %}">
      <a class="gthumb" href="{{ g.url | relative_url }}">
        {%- if thumb_url -%}
          <img src="{{ thumb_url }}" alt="Vista previa de {{ g.title }}">
        {%- else -%}
          <!-- sin miniatura, no muestres placeholder para evitar el 'card' vacío -->
        {%- endif -%}
      </a>

      <div class="gbody">
        <div class="guide-meta small text-dim">
          <span class="pill">Guía</span>{% if g.unidad %} · Unidad {{ g.unidad }}{% endif %}
        </div>

        <h2 class="gtitle"><a href="{{ g.url | relative_url }}">{{ g.title }}</a></h2>

        {%- assign desc = g.descripcion | default: g.description -%}
        {%- if desc -%}<p class="gdesc">{{ desc }}</p>{%- endif -%}

        <div class="actions">
          <a class="btn" href="{{ g.url | relative_url }}">Ver detalles</a>
          <a class="btn ghost"
             href="{{ pdf_url }}"
             download
             type="application/pdf">
             Descargar
          </a>
        </div>
      </div>
    </article>
  {%- endfor -%}
</section>
