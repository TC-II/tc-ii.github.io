---
layout: page
title: Exámenes
permalink: /examenes/
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

<style>
/* ===== Layout general ===== */
.exams-page .exams-actions{
  display:flex; gap:.75rem; align-items:center; justify-content:flex-end;
  margin-top:.5rem; margin-bottom:.25rem; flex-wrap:wrap;
}
.exams-page .search{
  flex:1; min-width:200px; max-width:520px;
  border:1px solid var(--border,#2a2a2e);
  border-radius:10px;
  padding:.6rem .8rem;
  font-size:.95rem;
  background:var(--bg,#0b0b0c); color:#fff;
}
.exams-page .search::placeholder{ color:#bbb; }
.exams-page .btn-drive{
  display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
  padding:.6rem 1rem; border-radius:10px; text-decoration:none;
  border:1px solid var(--border,#2a2a2e);
  background: color-mix(in srgb, var(--accent,#0a84ff) 25%, var(--bg,#0b0b0c));
  color:#fff; font-weight:600; white-space:nowrap;
  transition: background .2s ease, transform .08s ease;
}
.exams-page .btn-drive:hover{
  background: color-mix(in srgb, var(--accent,#0a84ff) 50%, var(--bg,#0b0b0c));
}
.exams-page .btn-drive:active{ transform: translateY(1px); }
@media (max-width: 600px){
  .exams-page .exams-actions{ flex-direction:column; align-items:stretch; }
  .exams-page .search, .exams-page .btn-drive{ width:100%; }
}

/* ===== Lista única con scroll (5 visibles) ===== */
.exams-page .exams-list{
  display:flex; flex-direction:column; gap:.6rem;
  border:1px solid var(--border,#2a2a2e);
  border-radius:12px; padding:12px;
  background: color-mix(in srgb, var(--bg,#fff) 92%, transparent);
  overflow:auto; padding-right:.25rem;
  scrollbar-width: thin;
  scrollbar-color: var(--border,#5b5b60) transparent;
  max-height: 900px; /* fallback si JS no corre */
}
.exams-page .exams-list::-webkit-scrollbar{ width:10px; }
.exams-page .exams-list::-webkit-scrollbar-track{ background:transparent; }
.exams-page .exams-list::-webkit-scrollbar-thumb{
  background: var(--border,#2a2a2e); border-radius:8px;
  border:2px solid transparent; background-clip: padding-box;
}
.exams-page .exams-list::-webkit-scrollbar-thumb:hover{
  background: color-mix(in srgb, var(--accent,#0a84ff) 55%, var(--border,#2a2a2e));
}

/* ===== Ítems (chips) ===== */
.exams-page .chip{
  width:100%; min-height:56px;
  padding:.7rem .85rem;
  border-radius:10px;
  border:1px solid color-mix(in srgb, var(--fg,#fff) 12%, var(--border,#2a2a2e));
  background: color-mix(in srgb, var(--bg,#fff) 86%, transparent);
  color: var(--fg,#f5f5f7);
  display:grid; grid-template-columns: 1fr auto; align-items:center; gap:.6rem;
  cursor:pointer; text-decoration:none !important;
  transition: outline-color .15s ease, background .15s ease, box-shadow .15s ease, color .15s ease;
}
.exams-page .chip .title{
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  text-align:left;
}

/* Base pill para TIPO (la que ya usabas) */
.exams-page .chip .pill-type{
  border:1px solid var(--border,#2a2a2e);
  border-radius:999px; padding:.2rem .6rem;
  font-size:.78rem; font-weight:700; color:#fff; opacity:.95;
}

/* NUEVO: contenedor de 2 pills a la derecha */
.exams-page .chip .pill-group{            /* NUEVO */
  display:flex; gap:.35rem; justify-self:end;
}

/* Colores para TIPO (igual que antes) */
.pill-1p{ box-shadow: inset 0 0 0 999px rgba(10,132,255,0.16); }
.pill-2p{ box-shadow: inset 0 0 0 999px rgba(50,215,75,0.18); }
.pill-final{ box-shadow: inset 0 0 0 999px rgba(255,159,10,0.20); }

/* NUEVO: pill para CALIFICADOR + colores */
.exams-page .chip .pill-qual{             /* NUEVO */
  border:1px solid var(--border,#2a2a2e);
  border-radius:999px; padding:.2rem .6rem;
  font-size:.78rem; font-weight:700; color:#fff; opacity:.95;
}
.pill-simulacro{ background: rgba(79,195,247,0.45); }   /* NUEVO */
.pill-recu{       background: rgba(239,83,80,0.50); }   /* NUEVO */

.exams-page .chip.active{
  outline: 2.5px solid color-mix(in srgb, var(--accent,#0a84ff) 80%, transparent);
  background: color-mix(in srgb, var(--accent,#0a84ff) 12%, var(--bg,#fff));
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent,#0a84ff) 12%, transparent);
}

/* ===== Visor ===== */
.exams-page .viewer{
  margin-top:1.25rem;
  border:1px solid var(--border,#2a2a2e);
  border-radius:12px;
  background: color-mix(in srgb, var(--bg,#fff) 92%, transparent);
  overflow:hidden;
}
.exams-page .viewer-header{
  padding:.6rem .9rem; font-weight:600;
  border-bottom:1px solid var(--border,#2a2a2e);
  display:flex; justify-content:space-between; gap:.75rem; align-items:center;
  background: color-mix(in srgb, var(--bg,#fff) 85%, transparent);
}
.exams-page .viewer-left{ display:flex; flex-direction:column; gap:.25rem; min-width:0; }
.exams-page #v-title{ max-width:70%; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.exams-page #v-meta{ opacity:.75; font-size:.9rem; }
.exams-page .viewer-right{ display:flex; align-items:center; gap:.5rem; }
.exams-page .btn-open{
  display:inline-flex; align-items:center; justify-content:center;
  padding:.45rem .8rem; border-radius:10px;
  border:1px solid var(--border,#2a2a2e);
  background: color-mix(in srgb, var(--bg,#fff) 88%, transparent);
  color: var(--fg,#fff); text-decoration:none; font-weight:600; font-size:.9rem;
  transition: background .2s ease, transform .08s ease;
}
.exams-page .btn-open:hover{ background: color-mix(in srgb, var(--accent,#0a84ff) 18%, var(--bg,#fff)); }
.exams-page .btn-open:active{ transform: translateY(1px); }

.exams-page .viewer iframe{ width:100%; height:80vh; border:0; }
</style>

<script>
/*URL PARA EJECUTAR EL SCRIPT "Examenes" */
const APPS_SCRIPT_URL="https://script.google.com/macros/s/AKfycbw_lzGrgMdH4mtB1tXRg6QIPm0ulEuWx9_qRJiz6AFERY_urAzqJQJ63QuQMucPcvN3DA/exec";
/*ID DE LA CARPETA DE DRIVE DONDE ESTAN LOS EXAMENES */
const DRIVE_FOLDER_ID="1w8S--7_W_Tr1DqjTSs2MFHavYgc_LoGd";

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
async function loadExams(){
  try{
    const url=`${APPS_SCRIPT_URL}?folderId=${encodeURIComponent(DRIVE_FOLDER_ID)}&onlyPublic=false`;
    const res=await fetch(url,{cache:'no-store'});
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const data=await res.json();
    const raw=Array.isArray(data.files)?data.files:Array.isArray(data.items)?data.items:[];
    ALL=raw.map(f=>({id:f.id,title:(f.name||f.title||'').trim()})); // sin fechas
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
