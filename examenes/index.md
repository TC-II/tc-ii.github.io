---
layout: page
title: Exámenes
permalink: /examenes/
extra_css:
  - /assets/css/examenes.css
---

<div class="exams-page">

  <div class="exams-actions">
    <input id="exams-search" class="search" type="search" placeholder="Buscar por título, tipo o año…">
    <a class="btn-drive" href="https://drive.google.com/drive/folders/1w8S--7_W_Tr1DqjTSs2MFHavYgc_LoGd" target="_blank" rel="noopener">
      Abrir carpeta en Drive
    </a>
  </div>

  <div id="exams-status" style="margin:1rem 0;opacity:.7">Cargando exámenes &#x23F3;…</div>

  <!-- LISTA ÚNICA (1 COLUMNA, 5 VISIBLES + SCROLL) -->
  <div id="exams-list" class="exams-list"></div>

  <!-- VISOR -->
  <div id="viewer" class="viewer" hidden>
    <div class="viewer-header">
      <div class="viewer-left">
        <span id="v-title"></span>
        <span id="v-meta"></span>
      </div>
      <div class="viewer-right">
        <a id="v-open" class="btn-open" href="#" target="_blank" rel="noopener">Abrir en nueva pestaña</a>
      </div>
    </div>
    <iframe id="v-iframe" allow="autoplay; fullscreen"></iframe>
  </div>

</div>



{% assign DC = site.data.drive_config %}
<script>
/* Fallback en vivo si la cache estática no está disponible (ver /scripts/sync-drive-data.js) */
const APPS_SCRIPT_URL="{{ DC.exam_app_url }}";
const DRIVE_FOLDER_ID="{{ DC.exam_folder_id }}";
const DRIVE_CACHE_URL="{{ '/assets/data/clases-cache.json' | relative_url }}";

/* Testing: agregar ?live=1 a la URL para forzar la carga en vivo desde Drive,
   saltando la cache estática (útil para probar cambios recién hechos en Drive). */
const FORCE_LIVE = new URLSearchParams(location.search).has('live');

const $ = (q)=>document.querySelector(q);
const $$= (q)=>document.querySelectorAll(q);
const previewURL = (id)=>`https://drive.google.com/file/d/${id}/preview`;
const viewURL    = (id)=>`https://drive.google.com/file/d/${id}/view`;

function cleanTitle(s=""){
  return (s||"").replace(/[\u200B\u200C\u200D\uFEFF]/g,"").replace(/\s+/g," ").trim();
}

/* Año si está al INICIO del título; si no, 0 */
function leadingYear(title=""){
  const m = String(title).match(/^\s*(19|20)\d{2}\b/);
  return m ? parseInt(m[0],10) : 0;
}

/* Tipo principal */
function detectType(name=""){
  const t=name.toLowerCase();
  if(/\b1p\b|parcial\s*1|1er\s*parcial|primer\s*parcial/.test(t)) return "P1";
  if(/\b2p\b|parcial\s*2|2do\s*parcial|segundo\s*parcial/.test(t)) return "P2";
  if(/\bfinal\b/.test(t)) return "FINAL";
  return null;
}
function typeText(t){
  if(t==="P1") return "1er parcial";
  if(t==="P2") return "2do parcial";
  if(t==="FINAL") return "final";
  return "examen";
}
function typeClass(t){
  if(t==="P1") return "pill-1p";
  if(t==="P2") return "pill-2p";
  if(t==="FINAL") return "pill-final";
  return "";
}

/* Calificadores secundarios (simulacro/recuperatorio) */
function detectQualifier(name=""){
  const t=name.toLowerCase();
  if(/simulacro|repaso/.test(t)) return "simulacro";
  if(/recup/.test(t)) return "recuperatorio";
  return "";
}

/* Render en UNA lista, ordenado por año inicial desc */
function render(files){
  const withIndex = files.map((f,i)=>({f,i}));
  const sorted = withIndex.sort((A,B)=>{
    const aTitle = cleanTitle((A.f.title||A.f.name||""));
    const bTitle = cleanTitle((B.f.title||B.f.name||""));
    const ay = leadingYear(aTitle);
    const by = leadingYear(bTitle);
    if(by !== ay) return ay - by;           // año ascendente
    return A.i - B.i;                        // estable
  }).map(x=>x.f);

  const list = $("#exams-list");
  list.innerHTML = "";

  for(const f of sorted){
    const title = cleanTitle((f.title||f.name||"").replace(/\.pdf$/i,""));
    const t = detectType(title) || "EXAM";             // fallback “examen”
    const qual = detectQualifier(title);               // "" | "simulacro" | "recuperatorio"
    const pillCls = "pill-type " + typeClass(t);
    const metaText = typeText(t) + (qual ? ` · ${qual}` : ""); // para el visor

    const el = document.createElement("button");
    el.className = "chip"; el.type = "button";
    el.innerHTML = `
      <span class="title">${title}</span>
      <span class="pill-group">
        <span class="${pillCls}">${typeText(t)}</span>
        ${qual ? `<span class="pill-qual ${qual==='simulacro'?'pill-simulacro':'pill-recu'}">${qual}</span>` : ""}
      </span>
    `;
    el.addEventListener("click", ()=>{
      $$('.chip').forEach(x=>x.classList.remove('active'));
      el.classList.add('active');
      $('#v-title').textContent = title;
      $('#v-meta').textContent  = metaText;
      $('#v-iframe').src = previewURL(f.id);
      $('#v-open').href  = viewURL(f.id);
      $('#viewer').hidden = false;
    });
    list.appendChild(el);
  }

  $('#exams-status').hidden = sorted.length>0;
  if(sorted.length) $$('.chip')[0]?.click();

  // Ajustar alto para que se vean EXACTAMENTE 5 ítems
  setMaxHeightToFive();
}

/* Calcula la altura justa para 5 items */
function setMaxHeightToFive(){
  const list = $("#exams-list");
  const cards = list.querySelectorAll(".chip");
  if(cards.length===0) return;

  const first = cards[0];
  const listCS = getComputedStyle(list);
  const gap = parseFloat(listCS.gap || "10") || 10;
  const padTop = parseFloat(listCS.paddingTop||"12")||12;
  const padBot = parseFloat(listCS.paddingBottom||"12")||12;
  const h = first.getBoundingClientRect().height;

  const count = Math.min(5, cards.length);
  const maxH = (h * count) + (gap * (count - 1)) + padTop + padBot;
  list.style.maxHeight = Math.round(maxH) + "px";
}

let ALL=[];

async function loadFromCache(){
  const r = await fetch(DRIVE_CACHE_URL, {cache:'no-store'});
  if(!r.ok) return null;
  const data = await r.json();
  if(!data || !Array.isArray(data.examenes) || !data.examenes.length) return null;
  return data.examenes;
}

async function loadFromWebApp(){
  const url=`${APPS_SCRIPT_URL}?folderId=${encodeURIComponent(DRIVE_FOLDER_ID)}&onlyPublic=false`;
  const res=await fetch(url,{cache:'no-store'});
  if(!res.ok) throw new Error(`HTTP ${res.status}`);
  const data=await res.json();
  const raw=Array.isArray(data.files)?data.files:Array.isArray(data.items)?data.items:[];
  return raw.map(f=>({id:f.id,title:(f.name||f.title||'').trim()})); // sin fechas
}

async function loadExams(){
  try{
    // Cache estática generada por GitHub Actions; si falla o está vacía, cae al Web App en vivo.
    // ?live=1 en la URL fuerza omitir la cache y pedir datos en vivo a Drive.
    let items = null;
    if (!FORCE_LIVE) {
      try { items = await loadFromCache(); }
      catch (e) { console.warn('[Exámenes] No se pudo leer la cache estática, se usa el Web App en vivo.', e); }
    } else {
      console.info('[Exámenes] ?live=1 detectado: se omite la cache estática y se carga en vivo desde Drive.');
    }

    ALL = items || await loadFromWebApp();
    render(ALL);
  }catch(err){
    console.error(err);
    $('#exams-status').textContent="No se pudieron cargar los exámenes.";
  }
}

/* Buscador (por texto en título) */
$('#exams-search').addEventListener('input',(e)=>{
  const q=cleanTitle(e.target.value).toLowerCase();
  const filtered=q?ALL.filter(f=>(f.title||"").toLowerCase().includes(q)):ALL;
  render(filtered);
});

/* Init + responsive height */
window.addEventListener('resize', setMaxHeightToFive);
loadExams();
</script>
