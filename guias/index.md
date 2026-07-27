---
layout: page
title: Guías
permalink: /guias/
---

<div class="guias-page">
  <div id="guias-status" class="small text-dim" style="margin:1rem 0;opacity:.8">
    Cargando Guías &#x23F3;…
  </div>
  <div id="guias-list" class="guias-list"></div>
</div>

{% assign DC = site.data.drive_config %}
<script>
  // Se usa solo como fallback en vivo; la carga normal lee la cache
  // estática (ver /scripts/sync-drive-data.js).
  window.LIST_CONFIG = {
    APP_URL:  '{{ DC.app_url }}',
    FILE_ID:  '{{ DC.file_id }}',  // mismo JSON unificado
    FILE_TYPE:'json',
    KIND:     'guia'
  };
  window.DRIVE_CACHE_URL = '{{ "/assets/data/clases-cache.json" | relative_url }}';
</script>

<link rel="stylesheet" href="{{ '/assets/css/guias.css' | relative_url }}">
<script src="{{ '/assets/js/guias.js' | relative_url }}" defer></script>
