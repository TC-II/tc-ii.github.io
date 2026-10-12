---
layout: page
title: Herramientas
permalink: /repositorios/
extra_css:
  - /assets/css/recursos.css
---
{% assign R = site.data.recursos %}
<div class="resources">
  <section aria-label="Aplicaciones online">
    <div class="resources-grid">
      {% for app in R.apps %}
      <a class="tool-card" href="{{ app.url | escape }}" target="_blank" rel="noopener noreferrer" style="--tool-color: {{ app.color | default: '#99c6ff' }}" aria-labelledby="app-title-{{ forloop.index }}" aria-describedby="app-desc-{{ forloop.index }} app-new-tab">
        <div class="tool-art" aria-hidden="true">
          {% include resource-icon.svg icon=app.icon %}
          <span class="tool-arrow">&#x2197;&#xfe0e;</span>
        </div>
        <div class="tool-copy">
          <span class="tool-category">{{ app.category | escape }}</span>
          <h3 id="app-title-{{ forloop.index }}">{{ app.title | escape }}</h3>
          <p id="app-desc-{{ forloop.index }}">{{ app.desc | escape }}</p>
        </div>
      </a>
      {% endfor %}
    </div>
    <span id="app-new-tab" class="resources-sr-only">Se abre en otra pestaña.</span>
  </section>
  <section class="resources-repos" aria-labelledby="repositories-title">
    <h2 id="repositories-title">Repositorios</h2>
    <div class="repository-list">
      {% for repo in R.featured_repos %}
      {% unless repo.online %}
      <article class="repository-capsule">
        <details>
          <summary><span>{{ repo.title | default: repo.name | escape }}</span><span class="repository-chevron" aria-hidden="true">{% include resource-chevron.svg %}</span></summary>
          <p>{{ repo.desc | escape }}</p>
        </details>
        {% assign repo_url = repo.url %}
        {% unless repo_url %}{% capture repo_url %}https://github.com/TC-II/{{ repo.name }}{% endcapture %}{% endunless %}
        <a class="repository-link" href="{{ repo_url | escape }}" target="_blank" rel="noopener noreferrer" aria-label="Ver {{ repo.title | escape }} en GitHub (otra pestaña)">Ver en GitHub <span aria-hidden="true">&#x2197;&#xfe0e;</span></a>
      </article>
      {% endunless %}
      {% endfor %}
      {% for link in R.links %}
      <article class="repository-capsule">
        {% if link.desc %}
        <details>
          <summary><span>{{ link.title | escape }}</span><span class="repository-chevron" aria-hidden="true">{% include resource-chevron.svg %}</span></summary>
          <p>{{ link.desc | escape }}</p>
        </details>
        {% else %}
        <span class="repository-name">{{ link.title | escape }}</span>
        {% endif %}
        <a class="repository-link" href="{{ link.url | escape }}" aria-label="Descargar {{ link.title | escape }}">Descargar <span aria-hidden="true">↓</span></a>
      </article>
      {% endfor %}
    </div>
  </section>
</div>
