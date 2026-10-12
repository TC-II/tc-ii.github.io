---
layout: default
title: ""
extra_css:
  - /assets/css/recursos.css
  - /assets/css/home.css
---
<main class="container after-header home-page">
  <article class="card">
    <header class="home-intro">
      <h1 class="title-lg">Teoría de Circuitos II</h1>
      <p>Material de estudio, herramientas y recursos de la cátedra, disponibles para la comunidad.</p>
    </header>
    <nav class="resources home-resources" aria-label="Recursos de la materia">
      <div class="resources-grid">
        {% for section in site.data.home %}
        <a class="tool-card" href="{{ section.url | relative_url }}" style="--tool-color: {{ section.color }}" aria-labelledby="home-title-{{ forloop.index }}" aria-describedby="home-desc-{{ forloop.index }}">
          <div class="tool-art" aria-hidden="true">
            {% include home-icon.svg icon=section.icon %}
            <span class="tool-arrow">&#8594;</span>
          </div>
          <div class="tool-copy">
            <span class="tool-category">{{ section.category }}</span>
            <h2 id="home-title-{{ forloop.index }}">{{ section.title }}</h2>
            <p id="home-desc-{{ forloop.index }}">{{ section.desc }}</p>
          </div>
        </a>
        {% endfor %}
      </div>
    </nav>
  </article>
</main>
