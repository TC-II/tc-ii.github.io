---
layout: page
title: Guías
permalink: /guias/
---

{% comment %}
PRIORIDAD: si existe la colección _guias/ úsala. Si no, toma páginas dentro de /guias/ (excluye index.md)
y, para evitar falsos positivos, quedate con las que tengan layout:item o tipo:"Guía".
{% endcomment %}

{% assign items = site.guias %}
{% if items == empty or items == nil %}
  {% assign candidates = site.pages | where_exp: "p", "p.path contains '/guias/' and p.name != 'index.md'" %}
  {% assign items = "" | split: "" %}
  {% for p in candidates %}
    {% if p.layout == 'item' or p.tipo == 'Guía' %}
      {% assign items = items | push: p %}
    {% endif %}
  {% endfor %}
{% endif %}

{% assign items = items | sort: 'date' | reverse %}

<section class="guides-alt">
  {% if items == empty %}
    <p class="text-dim">No hay guías publicadas todavía.</p>
  {% endif %}

  {% for g in items %}
    {% assign odd = forloop.index0 | modulo: 2 %}
    <article class="gcard {% if odd == 1 %}flip{% endif %}">
      <a class="gthumb" href="{{ g.url | relative_url }}">
        {% if g.preview %}
          <img src="{{ g.preview | relative_url }}" alt="Vista previa de {{ g.title }}">
        {% elsif g.archivo %}
          <div class="gthumb-placeholder"><span class="badge">PDF</span></div>
        {% else %}
          <div class="gthumb-placeholder"><span class="badge">Guía</span></div>
        {% endif %}
      </a>

      <div class="gbody">
        <div class="guide-meta small text-dim">
          <span class="pill">Guía</span>{% if g.unidad %} · Unidad {{ g.unidad }}{% endif %}
        </div>

        <h2 class="gtitle"><a href="{{ g.url | relative_url }}">{{ g.title }}</a></h2>

        {% if g.descripcion %}
          <p class="gdesc">{{ g.descripcion }}</p>
        {% endif %}

        <div class="actions">
          <a class="btn" href="{{ g.url | relative_url }}">Ver detalles</a>
          {% if g.archivo %}
            <a class="btn ghost" href="{{ g.archivo | relative_url }}" target="_blank" rel="noopener">Descargar</a>
          {% endif %}
        </div>
      </div>
    </article>
  {% endfor %}
</section>
