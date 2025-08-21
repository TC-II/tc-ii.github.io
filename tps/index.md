---
layout: page
title: Trabajos Prácticos
permalink: /tps/
---

<div class="tps-page">
  {% include tp-guidelines.md %}

  <div id="tps-status" class="small text-dim" style="margin:1rem 0;opacity:.8">
    Cargando Trabajos Prácticos…
  </div>
  <div id="tps-list" class="tps-list"></div>
</div>

<script>
  // Config centralizada: un SOLO archivo en Drive con TPs + Guías
  // y el mismo Apps Script (Web App) que ya usás.
  window.LIST_CONFIG = {
    APP_URL:  'https://script.google.com/macros/s/AKfycbyj-wGGjtdzh_41BjqJJLAGYH7IDPrEhIUGGBQh59IY0YBCO1jGukCa9_KORALgr2mpbg/exec',
    FILE_ID:  '1uWoOFG4sKfvmX_RxcK8z0Mhrwn9rpmba',  // JSON con TPs + Guías
    FILE_TYPE:'json',
    KIND:     'tp'
  };
</script>

<link rel="stylesheet" href="{{ '/assets/css/tps.css' | relative_url }}">
<script src="{{ '/assets/js/tps.js' | relative_url }}" defer></script>
