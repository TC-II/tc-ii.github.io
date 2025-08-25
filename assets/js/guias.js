// /assets/js/guias.js
(function () {
  const $ = (s, r=document) => r.querySelector(s);

  // === Config ===
  const CFG = window.LIST_CONFIG || window.GUIAS_CONFIG || {};
  const USE_NEW = !!(CFG.APP_URL && CFG.FILE_ID);

  // IDs del HTML de /guias/
  const listEl   = $("#guias-list");
  const statusEl = $("#guias-status");

  // ---- Drive helpers
  const driveView     = (id) => `https://drive.google.com/file/d/${encodeURIComponent(id)}/view#page=1`;
  const drivePreview  = (id) => `https://drive.google.com/file/d/${encodeURIComponent(id)}/preview`;
  const driveThumb    = (id, sz="w2000") => `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=${sz}`;
  const driveDownload = (id) => `https://docs.google.com/uc?export=download&id=${encodeURIComponent(id)}`;

  // ---- Fechas (AR -03:00)
  const parseDateAR = (ymd) => {
    if (!ymd) return null;
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(ymd).trim());
    if (!m) return null;
    return new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00-03:00`);
  };
  const fmtDDMMYYYY = (d) =>
    d ? `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}` : "";

  // ---- Normalización
  const normalize = (arr) => (arr || []).map(o => ({
    kind: String(o.kind || o.type || '').toLowerCase().trim(),
    title: (o.title||"").trim(),
    description: (o.description||o.descripcion||"").trim(),
    pdf_id: (o.pdf_id||o.drive_id||o.archivo_id||"").trim(),
    release: o.release ? String(o.release).trim()
            : (o.date||o.fecha ? String(o.date||o.fecha).trim() : ''),
    deadline: o.deadline ? String(o.deadline).trim() : '',
    unidad: (o.unidad||"").trim(),
    tema: (o.tema||"").trim(),
  })).filter(r => r.title && r.pdf_id);

  // ---- URL de carga
  function buildUrl() {
    if (USE_NEW) {
      const { APP_URL, FILE_ID, FILE_TYPE } = CFG;
      const usp = new URLSearchParams();
      if (FILE_ID)   usp.set('id', FILE_ID);
      if (FILE_TYPE) usp.set('type', FILE_TYPE);
      usp.set('_', Date.now().toString()); // rompo caché
      return `${APP_URL}?${usp.toString()}`;
    }
    const u = new URL(CFG.jsonUrl, location.href);
    u.searchParams.set('_', Date.now().toString());
    return u.toString();
  }

  async function loadRows() {
    const res = await fetch(buildUrl(), { cache: "no-store", credentials: "omit" });
    if (!res.ok) throw new Error("HTTP "+res.status);
    return normalize(await res.json());
  }

  // ---- Render
  function renderCard(item, index=0) {
    const release  = item.release ? parseDateAR(item.release) : null;
    const deadline = item.deadline ? parseDateAR(item.deadline) : null;
    const releaseStr  = fmtDDMMYYYY(release);
    const deadlineStr = fmtDDMMYYYY(deadline);

    const art = document.createElement('article');
    art.className = 'guide-card';
    if (index % 2 === 1) art.classList.add('alt');

    // Portada
    const cover = document.createElement('div');
    cover.className = 'guide-cover';
    if (item.pdf_id) {
      const img = document.createElement('img');
      img.alt = `Portada ${item.title || ""}`;
      img.loading = "lazy";
      img.decoding = "async";
      img.src = driveThumb(item.pdf_id, "w2000");
      img.onerror = () => {
        cover.classList.add('no-thumb');
        cover.innerHTML = `<div class="guide-cover-fallback">PDF</div>`;
      };
      cover.appendChild(img);
    } else {
      cover.classList.add('no-thumb');
      cover.innerHTML = `<div class="guide-cover-fallback">Sin PDF</div>`;
    }

    // Info
    const info = document.createElement('div');
    info.className = 'guide-info';

    const titleEl = document.createElement('div');
    titleEl.className = 'guide-title';
    titleEl.textContent = item.title || "Guía";

    const meta = document.createElement('div');
    meta.className = 'guide-meta';
    const chips = [];
    if (item.unidad) chips.push(`<span class="pill pill-muted">Unidad ${item.unidad}</span>`);
    if (item.tema)   chips.push(`<span class="pill pill-muted">${item.tema}</span>`);
    chips.push(`<span class="pill pill-publish">Publicación: ${releaseStr || "—"}</span>`);
    chips.push(`<span class="pill pill-deadline">Entrega: ${deadlineStr || "—"}</span>`);
    meta.innerHTML = chips.join('');

    const desc = document.createElement('p');
    desc.className = 'guide-desc';
    desc.textContent = item.description || '';

    const actions = document.createElement('div');
    actions.className = 'guide-actions';

    if (item.pdf_id) {
      const btnOpen = document.createElement('a');
      btnOpen.className = 'btn-primary';
      btnOpen.href = driveView(item.pdf_id);
      btnOpen.target = '_blank';
      btnOpen.rel = 'noopener';
      btnOpen.textContent = 'Abrir PDF';

      const btnDl = document.createElement('a');
      btnDl.className = 'btn-outline';
      btnDl.href = driveDownload(item.pdf_id);
      btnDl.textContent = 'Descargar';

      actions.appendChild(btnOpen);
      actions.appendChild(btnDl);
    }

    const btnDetails = document.createElement('a');
    btnDetails.className = 'btn-outline';
    btnDetails.href = 'javascript:void(0)';
    btnDetails.textContent = 'Ver detalles';
    actions.appendChild(btnDetails);

    btnDetails.addEventListener('click', () => {
      openModal({ title: item.title, description: item.description, pdf_id: item.pdf_id });
    });

    info.appendChild(titleEl);
    info.appendChild(meta);
    if (item.description) info.appendChild(desc);
    info.appendChild(actions);

    art.appendChild(cover);
    art.appendChild(info);

    return art;
  }

  // ---- Modal
  function openModal({ title, description, pdf_id }) {
    const overlay = document.createElement('div');
    overlay.className = 'g-modal-overlay';
    overlay.innerHTML = `
      <div class="g-modal" role="dialog" aria-modal="true" aria-label="${title || "Detalles de la Guía"}">
        <div class="g-modal-header">
          <h3 class="g-modal-title">${title || "Detalles de la Guía"}</h3>
          <button class="g-modal-close" aria-label="Cerrar" aria-keyshortcuts="Esc">×</button>
        </div>
        ${description ? `<p class="g-modal-desc">${description}</p>` : ''}
        ${pdf_id ? `
          <div class="g-modal-viewer">
            <iframe src="${drivePreview(pdf_id)}" loading="lazy" allow="autoplay"></iframe>
          </div>
        ` : `<div class="g-modal-empty">No hay archivo para previsualizar.</div>`}
        <div class="g-modal-actions">
          ${pdf_id ? `<a class="btn-primary" href="${driveView(pdf_id)}" target="_blank" rel="noopener">Abrir PDF</a>` : ''}
          ${pdf_id ? `<a class="btn-outline" href="${driveDownload(pdf_id)}" target="_blank" rel="noopener">Descargar</a>` : ''}
        </div>
      </div>
    `;

    const close = () => {
      document.body.classList.remove('g-modal-open');
      window.removeEventListener('keydown', onKey);
      overlay.remove();
    };
    const onKey = (e) => { if (e.key === 'Escape' || e.key === 'Esc') close(); };

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.classList.contains('g-modal-close')) close();
    });
    window.addEventListener('keydown', onKey);

    document.body.classList.add('g-modal-open');
    document.body.appendChild(overlay);
  }

  // ---- Init
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      if (!listEl || !statusEl) return;
      if (!USE_NEW && !CFG.jsonUrl) throw new Error('Falta LIST_CONFIG (APP_URL/FILE_ID) o GUIAS_CONFIG.jsonUrl.');

      const wanted = String(CFG.KIND || 'guia').toLowerCase();
      const all = await loadRows();

      // Filtrar por kind
      let rows = all.filter(r => !wanted || r.kind === wanted || (!r.kind && wanted === 'guia'));

      // >>> Filtrar por release: solo mostrar guías publicadas (release <= hoy)
      const today = new Date();
      today.setHours(0,0,0,0); // medianoche
      rows = rows.filter(r => {
        if (!r.release) return false; // si no hay fecha, no mostrar
        const rel = parseDateAR(r.release);
        return rel && rel.getTime() <= today.getTime();
      });

      // Orden: por publicación desc, luego título
      rows.sort((a,b) => {
        const da = a.release ? parseDateAR(a.release)?.getTime() || 0 : 0;
        const db = b.release ? parseDateAR(b.release)?.getTime() || 0 : 0;
        return db - da || a.title.localeCompare(b.title, 'es');
      });

      statusEl.textContent = '';
      listEl.innerHTML = '';
      rows.forEach((it, i) => listEl.appendChild(renderCard(it, i)));
    } catch (err) {
      console.error('[Guías] Error:', err);
      statusEl.textContent = 'No se pudieron cargar las Guías. Revisá la configuración y permisos.';
    }
  });
})();