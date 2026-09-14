---
layout: default
title: ""   # evita el H1 automático fuera del hero
extra_css:
  - /assets/css/home.css
---

<!-- HERO -->
<section class="container after-header">
  <div class="hero">
    <p class="hero-eyebrow">ITBA · Cátedra</p>
    <h1>Teoría de Circuitos II</h1>
    <p>
      Repositorio de recursos, creado para el uso de la cátedra y disponible
      para la comunidad.
    </p>
    <div class="actions">
      <a class="btn" href="{{ '/guias/' | relative_url }}">Guías</a>
      <a class="btn-outline" href="{{ '/examenes/' | relative_url }}">Exámenes</a>
      <a class="btn-outline" href="{{ '/tps/' | relative_url }}">Trabajos Prácticos</a>
    </div>
  </div>
</section>

<!-- SECCIONES: seis tarjetas que comparten un único barrido de color -->
<section class="container">
  <div class="home-grid">

    <a href="{{ '/guias/' | relative_url }}" class="card-link">
      <article class="card-spectrum">
        <h2>Guías</h2>
        <p>Listados por unidad y tema.</p>
      </article>
    </a>

    <a href="{{ '/examenes/' | relative_url }}" class="card-link">
      <article class="card-spectrum">
        <h2>Exámenes</h2>
        <p>Enunciados por año y turno.</p>
      </article>
    </a>

    <a href="{{ '/material-didactico/' | relative_url }}" class="card-link">
      <article class="card-spectrum">
        <h2>Material didáctico</h2>
        <p>Documentos y archivos complementarios.</p>
      </article>
    </a>

    <a href="{{ '/repositorios/' | relative_url }}" class="card-link">
      <article class="card-spectrum">
        <h2>Repositorios</h2>
        <p>Apps, repos y utilidades (LTspice, Python, etc.).</p>
      </article>
    </a>

    <a href="{{ '/playlists/' | relative_url }}" class="card-link">
      <article class="card-spectrum">
        <h2>Playlists</h2>
        <p>Listas de reproducción con tutoriales y clases.</p>
      </article>
    </a>

    <a href="{{ '/tps/' | relative_url }}" class="card-link">
      <article class="card-spectrum">
        <h2>Trabajos Prácticos</h2>
        <p>Enunciados y material para los TPs.</p>
      </article>
    </a>

  </div>
</section>
