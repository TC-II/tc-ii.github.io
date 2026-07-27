---
layout: page
title: Trabajos Prácticos
permalink: /tps/
---

<div class="tps-page">
  <!-- {% include tp-guidelines.md %} -->

  <div id="tps-status" class="small text-dim" style="margin:1rem 0;opacity:.8">
    Cargando Trabajos Prácticos &#x23F3;…
  </div>
  <div id="tps-list" class="tps-list"></div>
</div>

{% assign DC = site.data.drive_config %}
<script>
  // Config centralizada: un SOLO archivo en Drive con TPs + Guías
  // y el mismo Apps Script (Web App) que ya usás. Se usa solo como
  // fallback en vivo; la carga normal lee la cache estática (ver
  // /scripts/sync-drive-data.js).
  window.LIST_CONFIG = {
    APP_URL:  '{{ DC.app_url }}',
    FILE_ID:  '{{ DC.file_id }}',
    FILE_TYPE:'json',
    KIND:     'tp'
  };
  window.DRIVE_CACHE_URL = '{{ "/assets/data/clases-cache.json" | relative_url }}';
</script>

<link rel="stylesheet" href="{{ '/assets/css/tps.css' | relative_url }}">
<script src="{{ '/assets/js/tps.js' | relative_url }}" defer></script>
