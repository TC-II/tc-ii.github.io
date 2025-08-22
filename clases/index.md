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

  <div id="clases-status" class="small text-dim" style="margin:1rem 0;opacity:.8">Cargando clases…</div>
  <div id="clases-list" class="classes-list"></div>
</div>

<script>
  /* MISMO Web App para datos y para listar carpetas */
  const APP_URL = 'https://script.google.com/macros/s/AKfycbyj-wGGjtdzh_41BjqJJLAGYH7IDPrEhIUGGBQh59IY0YBCO1jGukCa9_KORALgr2mpbg/exec';

  /* JSON maestro (el mismo de TPs/Guías) */
  window.LIST_CONFIG = {
    APP_URL:  APP_URL,
    FILE_ID:  '1uWoOFG4sKfvmX_RxcK8z0Mhrwn9rpmba',
    FILE_TYPE:'json'
  };

  /* Para listar archivos de una carpeta, el JS usa ?folderId=... sobre el mismo Web App */
  window.DRIVE_LIST_APP_URL = APP_URL;
</script>

<link rel="stylesheet" href="{{ '/assets/css/clases.css' | relative_url }}">
<script src="{{ '/assets/js/clases.js' | relative_url }}" defer></script>
