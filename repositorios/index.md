---
layout: page
title: Herramientas
permalink: /repositorios/
extra_css:
  - /assets/css/recursos.css
---
{% assign R = site.data.recursos %}
<div class="resources">
  {% assign F = R.featured_app %}
  {% if F %}
  <a class="featured-tool" href="{{ F.url | escape }}" target="_blank" rel="noopener noreferrer" style="--tool-color: {{ F.color | default: '#7aa2f7' }}" aria-labelledby="featured-title" aria-describedby="featured-tagline featured-desc app-new-tab">
    <div class="featured-copy">
      <h2 id="featured-title" class="featured-brand">
        <svg class="featured-logo" viewBox="-38 -38 76 76" aria-hidden="true" focusable="false" fill="currentColor"><path d="M-3 -9 L5 -34 A34 34 0 0 1 31 -15 L7 -4Z"/><path d="M-3 -9 L5 -34 A34 34 0 0 1 31 -15 L7 -4Z" transform="rotate(72)"/><path d="M-3 -9 L5 -34 A34 34 0 0 1 31 -15 L7 -4Z" transform="rotate(144)"/><path d="M-3 -9 L5 -34 A34 34 0 0 1 31 -15 L7 -4Z" transform="rotate(216)"/><path d="M-3 -9 L5 -34 A34 34 0 0 1 31 -15 L7 -4Z" transform="rotate(288)"/></svg>
        <span><span class="featured-turbo">Turbo</span>Spice</span>
      </h2>
      <p id="featured-tagline" class="featured-tagline">{{ F.tagline | escape }}</p>
      {% if F.desc %}<p id="featured-desc" class="featured-desc">{{ F.desc | escape }}</p>{% endif %}
    </div>
    <div class="featured-art" aria-hidden="true">
      <svg viewBox="0 0 384 150" fill="none" focusable="false">
        <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <g transform="translate(-30.6 -39.9) scale(1.33)">
            <g stroke-width="1.65">
              <path d="M40 81V62h38m30 0h42v26m0 8v32H40v-19"/>
              <path d="M78 55h30v14H78z" fill="currentColor" fill-opacity=".1"/>
              <circle cx="40" cy="95" r="14" fill="currentColor" fill-opacity=".08"/>
              <path d="M33 95c2.4-7 4.6-7 7 0s4.6 7 7 0"/>
              <path d="M136 88h28M136 96h28"/>
              <path d="M95 128v6m-9 0h18m-13 5h8"/>
            </g>
            <circle cx="150" cy="62" r="3.4" fill="currentColor" stroke="none"/>
            <circle cx="150" cy="62" r="9" stroke-width="1.05" opacity=".45"/>
            <g transform="translate(133 30.55) scale(1.7)">
              <path class="featured-probe-fill" stroke="none" d="M7.5 1.5h5a1.5 1.5 0 0 1 1.5 1.5v7.5L12 13.5H8L6 10.5V3a1.5 1.5 0 0 1 1.5-1.5z"/>
              <path class="featured-probe" stroke-width="1" d="M7.5 1.5h5a1.5 1.5 0 0 1 1.5 1.5v7.5L12 13.5H8L6 10.5V3a1.5 1.5 0 0 1 1.5-1.5zM8 4h4v3.5H8zM8 10h.01M12 10h.01M8.5 13.5v2.5h3v-2.5M10 16v2.5"/>
            </g>
          </g>
          <g transform="translate(24 0)">
            <path opacity=".18" stroke-width="1" d="M200 22h145v106H200zM200 48.5h145M200 75h145M200 101.5h145M236 22v106M272 22v106M309 22v106"/>
            <path stroke-width="2.6" d="M200.0 75.0 201.5 69.8 203.0 64.8 204.5 59.9 206.0 55.2 207.5 50.9 209.0 47.0 210.5 43.6 212.0 40.7 213.5 38.4 215.0 36.7 216.5 35.6 218.0 35.3 219.5 35.5 221.0 36.5 222.5 38.1 224.0 40.3 225.5 43.1 227.0 46.4 228.5 50.3 230.0 54.5 231.5 59.1 233.0 64.0 234.5 69.0 236.0 74.1 237.5 79.3 239.0 84.4 240.5 89.3 242.0 94.0 243.5 98.4 245.0 102.3 246.5 105.8 248.0 108.8 249.5 111.3 251.0 113.1 252.5 114.2 254.0 114.7 255.5 114.6 257.0 113.7 258.5 112.2 260.0 110.1 261.5 107.4 263.0 104.2 264.5 100.4 266.0 96.2 267.5 91.7 269.0 86.9 270.5 81.9 272.0 76.7 273.5 71.6 275.0 66.5 276.5 61.5 278.0 56.8 279.5 52.3 281.0 48.3 282.5 44.7 284.0 41.6 285.5 39.1 287.0 37.2 288.5 35.9 290.0 35.3 291.5 35.4 293.0 36.1 294.5 37.5 296.0 39.5 297.5 42.1 299.0 45.3 300.5 48.9 302.0 53.1 303.5 57.5 305.0 62.3 306.5 67.3 308.0 72.4 309.5 77.6 311.0 82.7 312.5 87.7 314.0 92.5 315.5 96.9 317.0 101.1 318.5 104.7 320.0 107.9 321.5 110.5 323.0 112.5 324.5 113.9 326.0 114.6 327.5 114.7 329.0 114.1 330.5 112.8 332.0 110.9 333.5 108.4 335.0 105.3 336.5 101.7 338.0 97.7 339.5 93.2 341.0 88.5 342.5 83.5 344.0 78.4"/>
            <path opacity=".75" stroke-width="2" stroke-dasharray="5 5" d="M200.0 94.9 201.5 92.1 203.0 89.1 204.5 85.8 206.0 82.4 207.5 78.8 209.0 75.2 210.5 71.5 212.0 67.9 213.5 64.5 215.0 61.2 216.5 58.1 218.0 55.3 219.5 52.9 221.0 50.8 222.5 49.2 224.0 48.0 225.5 47.2 227.0 46.9 228.5 47.1 230.0 47.7 231.5 48.8 233.0 50.4 234.5 52.4 236.0 54.7 237.5 57.4 239.0 60.4 240.5 63.6 242.0 67.0 243.5 70.6 245.0 74.2 246.5 77.9 248.0 81.5 249.5 85.0 251.0 88.3 252.5 91.4 254.0 94.2 255.5 96.7 257.0 98.8 258.5 100.6 260.0 101.9 261.5 102.7 263.0 103.1 264.5 103.0 266.0 102.4 267.5 101.4 269.0 99.9 270.5 98.0 272.0 95.7 273.5 93.1 275.0 90.1 276.5 86.9 278.0 83.5 279.5 80.0 281.0 76.4 282.5 72.7 284.0 69.1 285.5 65.6 287.0 62.2 288.5 59.1 290.0 56.2 291.5 53.7 293.0 51.5 294.5 49.7 296.0 48.3 297.5 47.4 299.0 46.9 300.5 47.0 302.0 47.5 303.5 48.4 305.0 49.8 306.5 51.7 308.0 53.9 309.5 56.5 311.0 59.4 312.5 62.5 314.0 65.9 315.5 69.4 317.0 73.0 318.5 76.7 320.0 80.3 321.5 83.8 323.0 87.2 324.5 90.4 326.0 93.3 327.5 95.9 329.0 98.2 330.5 100.0 332.0 101.5 333.5 102.5 335.0 103.0 336.5 103.1 338.0 102.7 339.5 101.8 341.0 100.4 342.5 98.7 344.0 96.5"/>
          </g>
        </g>
      </svg>
    </div>
    <span class="tool-arrow" aria-hidden="true">&#x2197;&#xfe0e;</span>
  </a>
  {% endif %}
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
    </div>
  </section>
</div>
