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

  <div id="exams-status" style="margin:1rem 0;opacity:.7">Cargando exámenes…</div>

  <div class="exam-columns">
    <div class="exam-col">
      <h3>1er Parcial</h3>
      <div id="col-p1" class="chip-list"></div>
    </div>
    <div class="exam-col">
      <h3>2do Parcial</h3>
      <div id="col-p2" class="chip-list"></div>
    </div>
    <div class="exam-col">
      <h3>Final</h3>
      <div id="col-final" class="chip-list"></div>
    </div>
  </div>

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
.exams-page .exam-columns{
  display:grid;
  grid-template-columns: repeat(auto-fit,minmax(260px,1fr));
  gap:1rem; margin-top:1rem; align-items:start;
}
.exams-page .exam-col{
  display:flex; flex-direction:column; gap:.5rem;
  background: var(--card, rgba(24,24,28,.10));
  border: 1px solid var(--border,#2a2a2e);
  border-radius:12px; padding:1rem;
}
.exams-page .exam-col h3{ font-weight:700; margin:0 0 .5rem; }

/* ===== Buscador + Botón Drive ===== */
.exams-page .exams-actions{
  display:flex; gap:.75rem; align-items:center; justify-content:flex-end;
  margin-top:.5rem; margin-bottom:.25rem;
  flex-wrap: wrap;
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
  padding:.6rem 1rem;
  border-radius:10px;
  text-decoration:none;
  border:1px solid var(--border,#2a2a2e);
  background: color-mix(in srgb, var(--accent,#0a84ff) 25%, var(--bg,#0b0b0c));
  color:#fff; font-weight:600;
  white-space:nowrap;
  transition: background .2s ease, transform .08s ease;
}
.exams-page .btn-drive:hover{
  background: color-mix(in srgb, var(--accent,#0a84ff) 50%, var(--bg,#0b0b0c));
}
.exams-page .btn-drive:active{ transform: translateY(1px); }

@media (max-width: 600px){
  .exams-page .exams-actions{ flex-direction:column; align-items:stretch; }
  .exams-page .search{ width:100%; }
  .exams-page .btn-drive{ width:100%; }
}

/* ===== Chips con scroll (solo 3 visibles) ===== */
.exams-page .chip-list{
  height: calc(3 * 48px + 2 * .5rem);
  overflow: auto;
  padding-right: .25rem;
  display:flex; flex-direction:column; gap:.5rem;
  scrollbar-width: thin;
  scrollbar-color: var(--border,#5b5b60) transparent;
}
.exams-page .chip-list::-webkit-scrollbar{ width: 10px; }
.exams-page .chip-list::-webkit-scrollbar-track{ background: transparent; }
.exams-page .chip-list::-webkit-scrollbar-thumb{
  background: var(--border,#2a2a2e); border-radius: 8px;
  border: 2px solid transparent; background-clip: padding-box;
}
.exams-page .chip-list::-webkit-scrollbar-thumb:hover{
  background: color-mix(in srgb, var(--accent,#0a84ff) 55%, var(--border,#2a2a2e));
}

/* ===== Chips ===== */
.exams-page .chip{
  width:100%; min-height:48px;
  padding:.6rem .8rem;
  border-radius:10px;
  border:1px solid color-mix(in srgb, var(--fg,#fff) 12%, var(--border,#2a2a2e));
  background: color-mix(in srgb, var(--bg,#fff) 86%, transparent);
  color: var(--fg,#f5f5f7);
  display:flex; justify-content:space-between; align-items:center;
  cursor:pointer;
  text-decoration:none !important;
  transition: outline-color .15s ease, background .15s ease, box-shadow .15s ease, color .15s ease;
}
.exams-page .chip span.title{
  flex:1; text-align:left;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.exams-page .chip .badge{
  flex:0; margin-left:.6rem; padding:.15rem .5rem;
  border-radius:8px; font-weight:700; font-size:.75rem;
  color: #fff; opacity:.95;
}
.badge-simulacro{ background:#4FC3F7; }
.badge-recu{ background:#EF5350; }
.badge-exam{ background:#66BB6A; }

.exams-page .chip.active{
  outline: 2.5px solid color-mix(in srgb, var(--accent,#0a84ff) 80%, transparent);
  background: color-mix(in srgb, var(--accent,#0a84ff) 18%, var(--bg,#fff));
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent,#0a84ff) 18%, transparent);
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
  padding:.6rem .9rem;
  font-weight:600;
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
  padding:.45rem .8rem;
  border-radius:10px;
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
const APPS_SCRIPT_URL="https://script.google.com/macros/s/AKfycbwA5EYn_Id6-QwCgINyEPG8D3Y1C0sHG-zZADuV6biXGt5IImLMllOVvFnqc5DVxLor/exec";
const DRIVE_FOLDER_ID="1w8S--7_W_Tr1DqjTSs2MFHavYgc_LoGd";

const $ = (q)=>document.querySelector(q);
const $$= (q)=>document.querySelectorAll(q);
const previewURL = (id)=>`https://drive.google.com/file/d/${id}/preview`;
const viewURL    = (id)=>`https://drive.google.com/file/d/${id}/view`;

function cleanTitle(s=""){
  return (s||"").replace(/[\u200B\u200C\u200D\uFEFF]/g,"").replace(/\s+/g," ").trim();
}
function detectType(name=""){
  const t=name.toLowerCase();
  if(/\b1p\b|parcial\s*1|1er\s*parcial/.test(t)) return "P1";
  if(/\b2p\b|parcial\s*2|2do\s*parcial/.test(t)) return "P2";
  if(/\bfinal\b/.test(t)) return "FINAL";
  return null;
}
function detectBadge(name=""){
  const t=name.toLowerCase();
  if(/simulacro|repaso/.test(t)) return {txt:"Simulacro",cls:"badge-simulacro"};
  if(/recup/.test(t)) return {txt:"Recuperatorio",cls:"badge-recu"};
  return {txt:"Examen",cls:"badge-exam"};
}
function render(files){
  const sorted=[...files].sort((a,b)=>String(b.date||"").localeCompare(String(a.date||""))).reverse();
  $("#col-p1").innerHTML=""; $("#col-p2").innerHTML=""; $("#col-final").innerHTML="";
  const grouped={P1:[],P2:[],FINAL:[]};
  for(const f of sorted){
    const title=cleanTitle((f.title||f.name||"").replace(/\.pdf$/i,""));
    const type=detectType(title);
    if(type) grouped[type].push({...f,title,badge:detectBadge(title)});
  }
  for(const key of ["P1","P2","FINAL"]){
    const col=key==="P1"?"#col-p1":key==="P2"?"#col-p2":"#col-final";
    grouped[key].forEach(it=>{
      const el=document.createElement("button");
      el.className="chip"; el.type="button";
      el.innerHTML=`<span class="title">${it.title}</span><span class="badge ${it.badge.cls}">${it.badge.txt}</span>`;
      el.addEventListener("click",()=>{
        $$('.chip').forEach(x=>x.classList.remove('active'));
        el.classList.add('active');
        $('#v-title').textContent=it.title;
        const tipoTxt=key==='P1'?'1er Parcial':key==='P2'?'2do Parcial':'Final';
        $('#v-meta').textContent=tipoTxt+" · "+it.badge.txt;
        $('#v-iframe').src=previewURL(it.id);
        $('#v-open').href=viewURL(it.id);
        $('#viewer').hidden=false;
      });
      $(col).appendChild(el);
    });
  }
  $('#exams-status').hidden=sorted.length>0;
  if(sorted.length) $$('.chip')[0]?.click();
}

let ALL=[];
async function loadExams(){
  try{
    const url=`${APPS_SCRIPT_URL}?folderId=${encodeURIComponent(DRIVE_FOLDER_ID)}&onlyPublic=false`;
    const res=await fetch(url,{cache:'no-store'});
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const data=await res.json();
    const raw=Array.isArray(data.files)?data.files:Array.isArray(data.items)?data.items:[];
    ALL=raw.map(f=>({id:f.id,title:(f.name||f.title||'').trim(),date:f.modifiedTime||null}));
    render(ALL);
  }catch(err){
    console.error(err);
    $('#exams-status').textContent="No se pudieron cargar los exámenes.";
  }
}
$('#exams-search').addEventListener('input',(e)=>{
  const q=cleanTitle(e.target.value).toLowerCase();
  const filtered=q?ALL.filter(f=>(f.title||"").toLowerCase().includes(q)):ALL;
  render(filtered);
});
loadExams();
</script>
