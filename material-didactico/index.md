---
layout: page
title: Material didáctico
permalink: /material-didactico/
---

<div class="classes-page">

  <div class="card soft">
    <strong>Archivos elementales</strong>
  </div>
  <div id="elementales" class="grid-elem" style="margin-top:1rem"></div>

  <div class="card soft" style="margin-top:2rem">
    <strong>Material por clase</strong>
    <p class="text-dim small">
    El material presentado aquí corresponde a documentos/archivos de carácter complementario a lo dictado en cada clase, 
    no comprende ni busca abarcar la totalidad del contenido dado.
    </p>
  </div>

  <div id="clases-status" class="small text-dim" style="margin:1rem 0;opacity:.8">Cargando clases &#x23F3;…</div>
  <div id="clases-list" class="classes-list"></div>
</div>

{% assign DC = site.data.drive_config %}
<script>
  /* MISMO Web App para datos y para listar carpetas (fallback en vivo si no hay cache) */
  window.LIST_CONFIG = {
    APP_URL:  '{{ DC.app_url }}',
    FILE_ID:  '{{ DC.file_id }}',
    FILE_TYPE:'json'
  };

  /* Para listar archivos de una carpeta cuando no está en la cache */
  window.DRIVE_LIST_APP_URL = '{{ DC.list_app_url }}';

  /* Cache estática generada por GitHub Actions a partir de Drive (ver /scripts/sync-drive-data.js) */
  window.DRIVE_CACHE_URL = '{{ "/assets/data/clases-cache.json" | relative_url }}';
</script>

<link rel="stylesheet" href="{{ '/assets/css/clases.css' | relative_url }}">
<script src="{{ '/assets/js/clases.js' | relative_url }}" defer></script>
