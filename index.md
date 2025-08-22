---
layout: default
title: ""   # evita el H1 automático fuera del hero
---

<style>
/* ====== Gradiente "Apple-like" y tarjetas a color ====== */

/* Gradiente multicolor base (largo para repartirlo entre 6 tarjetas) */
:root{
  --ai-grad: linear-gradient(90deg,
    #0a84ff 0%,
    #6f6cff 16%,
    #b86bff 33%,
    #ff6bd6 50%,
    #ff7e6e 66%,
    #ff9f0a 100%
  );
}

/* Hero azul sobrio como el que te gustaba */
.hero-azul{
  padding:2rem;
  background:
    radial-gradient(120% 160% at 0% 0%, rgba(34,86,180,.40), rgba(22,34,58,.40) 40%, rgba(18,24,38,.65) 100%),
    linear-gradient(180deg, rgba(18,30,60,.65), rgba(18,18,22,.65));
  border:1px solid var(--border);
}

/* Grid responsivo */
.grid-home{
  display:grid; gap:1rem;
  grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
}

/* Tarjetas clickeables */
.card-link{ text-decoration:none; color:inherit; display:block; height:100%; }

/* Tarjeta con color de fondo tomado del gradiente global.
   Capa 1: velo oscuro para mantener legibilidad
   Capa 2: el gradiente global (nos quedamos con un tramo distinto por tarjeta)
*/
.card-spectrum{
  position:relative;
  padding:1.25rem;
  border-radius: var(--radius, 16px);
  border:1px solid var(--border);
  background-image:
    linear-gradient(180deg, rgba(10,10,12,.62), rgba(10,10,12,.68)),   /* velo */
    var(--ai-grad);                                                    /* gradiente global */
  background-size: 100% 100%, 600% 100%;                               /* gradiente largo */
  background-position: 0 0, var(--pos, 0%) 0;                          /* tramo elegido */
  box-shadow: var(--shadow);
  transition: transform .12s ease, filter .15s ease, box-shadow .15s ease;
}
.card-spectrum:hover{
  transform: translateY(-3px);
  filter: brightness(1.06);
  box-shadow: 0 14px 40px rgba(0,0,0,.35);
}

/* Repartimos el gradiente entre las 6 tarjetas */
.s1{ --pos: 0%;  }
.s2{ --pos: 20%; }
.s3{ --pos: 40%; }
.s4{ --pos: 60%; }
.s5{ --pos: 80%; }
.s6{ --pos: 100%; }

/* Tipografía secundaria sutil */
.lead-muted{ margin:0 0 1rem 0; opacity:.85; }

/* ====== Botones del HERO con colores coordinados y misma saturación ======
   Usamos los mismos pares de colores que en las tarjetas: s1, s4 y s6.
   Agregamos interacción (hover/active) y un leve shadow.
*/
.btn.btn-color{
  color:#fff !important;
  border-color: rgba(255,255,255,.12) !important;
  box-shadow: 0 8px 22px rgba(0,0,0,.25);
  transition: transform .10s ease, filter .15s ease, box-shadow .15s ease;
}
.btn.btn-color:hover{
  transform: translateY(-2px);
  filter: brightness(1.08) saturate(1.08);
  box-shadow: 0 14px 36px rgba(0,0,0,.35);
}
.btn.btn-color:active{
  transform: translateY(0);
  filter: brightness(0.98);
}

/* Guías: mismo gradiente que s1 */
.btn-guias{ background: linear-gradient(135deg,#0a84ff,#6f6cff) !important; }
/* Exámenes: mismo gradiente que s4 */
.btn-examenes{ background: linear-gradient(135deg,#ff6bd6,#ff7e6e) !important; }
/* Trabajos Prácticos: mismo gradiente que s6 */
.btn-tps{ background: linear-gradient(135deg,#ff9f0a,#ff7e6e) !important; }
</style>

<!-- HERO -->
<section class="container after-header">
  <article class="card hero-azul">
    <h1 class="title-lg" style="margin:0 0 .5rem 0;">Teoría de Circuitos II</h1>
    <p class="text-dim lead-muted">
      Guías, exámenes, material didáctico, herramientas, playlists y trabajos prácticos para acompañar el cursado.
    </p>

    <!-- Botones ahora con misma saturación y con interacción -->
    <div style="display:flex; gap:.6rem; flex-wrap:wrap;">
      <a class="btn btn-color btn-guias" href="{{ '/guias/' | relative_url }}">Guías</a>
      <a class="btn btn-color btn-examenes" href="{{ '/examenes/' | relative_url }}">Exámenes</a>
      <a class="btn btn-color btn-tps" href="{{ '/tps/' | relative_url }}">Trabajos Prácticos</a>
    </div>
  </article>
</section>

<!-- GRID DE TARJETAS: 6 bloques con color (gradiente continuo en conjunto) -->
<section class="container" style="margin-top:1rem;">
  <div class="grid-home">

    <!-- 1: Guías -->
    <a href="{{ '/guias/' | relative_url }}" class="card-link">
      <article class="card-spectrum s1">
        <h2 style="margin:.25rem 0 0 0;">Guías</h2>
        <p class="text-dim" style="margin-top:.5rem;">Listados por unidad y tema. Incluye PDF.</p>
      </article>
    </a>

    <!-- 2: Material didáctico -->
    <a href="{{ '/material-didactico/' | relative_url }}" class="card-link">
      <article class="card-spectrum s2">
        <h2 style="margin:.25rem 0 0 0;">Material didáctico</h2>
        <p class="text-dim" style="margin-top:.5rem;">Documentos y archivos complementarios.</p>
      </article>
    </a>

    <!-- 3: Herramientas -->
    <a href="{{ '/herramientas/' | relative_url }}" class="card-link">
      <article class="card-spectrum s3">
        <h2 style="margin:.25rem 0 0 0;">Herramientas</h2>
        <p class="text-dim" style="margin-top:.5rem;">Apps, repos y utilidades (LTspice, Python, etc.).</p>
      </article>
    </a>

    <!-- 4: Exámenes -->
    <a href="{{ '/examenes/' | relative_url }}" class="card-link">
      <article class="card-spectrum s4">
        <h2 style="margin:.25rem 0 0 0;">Exámenes</h2>
        <p class="text-dim" style="margin-top:.5rem;">Enunciados por año y turno.</p>
      </article>
    </a>

    <!-- 5: Playlists -->
    <a href="{{ '/playlists/' | relative_url }}" class="card-link">
      <article class="card-spectrum s5">
        <h2 style="margin:.25rem 0 0 0;">Playlists</h2>
        <p class="text-dim" style="margin-top:.5rem;">Listas de reproducción con tutoriales y clases.</p>
      </article>
    </a>

    <!-- 6: Trabajos Prácticos -->
    <a href="{{ '/tps/' | relative_url }}" class="card-link">
      <article class="card-spectrum s6">
        <h2 style="margin:.25rem 0 0 0;">Trabajos Prácticos</h2>
        <p class="text-dim" style="margin-top:.5rem;">Enunciados y material para los TPs.</p>
      </article>
    </a>

  </div>
</section>
