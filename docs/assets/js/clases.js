// /assets/js/clases.js
(function () {
  const $ = (s, r=document) => r.querySelector(s);
  const IS_MOBILE = () => window.matchMedia('(max-width: 680px)').matches;

  // === Config ===
  const CFG  = window.LIST_CONFIG || {};
  const APP  = CFG.APP_URL;
  const FID  = CFG.FILE_ID;
  const FTY  = CFG.FILE_TYPE || 'json';
  const LIST = window.DRIVE_LIST_APP_URL || APP;

  const elElem   = $("#elementales");
  const elList   = $("#clases-list");
  const elStatus = $("#clases-status");

  // ---- Drive helpers
  const drivePreview  = (id) => `https://drive.google.com/file/d/${encodeURIComponent(id)}/preview`;
  const driveView     = (id) => `https://drive.google.com/file/d/${encodeURIComponent(id)}/view`;
  const driveDownload = (id) => `https://drive.google.com/uc?export=download&id=${encodeURIComponent(id)}`;
  const driveFolder   = (id) => `https://drive.google.com/drive/folders/${encodeURIComponent(id)}`;

  // ---- Fecha/hora
  const parseRelease = (s) => { const d = new Date(s); return isNaN(d.getTime()) ? null : d; };
  const now = () => new Date();

  // ---- Data del JSON central
  function buildDataUrl() {
    const q = new URLSearchParams({ id: FID, type: FTY, _: Date.now() });
    return `${APP}?${q.toString()}`;
  }
  async function loadAllItems() {
    const res = await fetch(buildDataUrl(), { cache: "no-store", credentials: "omit" });
    if (!res.ok) throw new Error("HTTP "+res.status);
    return res.json();
  }

  // ---- WebApp que lista archivos de una carpeta de Drive
  async function listFolderFiles(folderId) {
    const url = `${LIST}?folderId=${encodeURIComponent(folderId)}&depth=6`;
    const r = await fetch(url, { cache: "no-store", credentials: "omit" });
    const text = await r.text();
    let json;
    try { json = JSON.parse(text); }
    catch { throw new Error("Respuesta no-JSON del Web App:\n" + text.slice(0,400)); }
    if (json.ok === false) throw new Error(json.error || "ok:false");
    if (!Array.isArray(json.files)) throw new Error("Sin 'files' en respuesta");
    return json.files;
  }

  // ========= Caché de archivos (folderId -> files[]) =========
  const fileCache = new Map();

  // ========= Scroll lock robusto (mobile) =========
  let scrollState = { locked: false, top: 0 };
  function lockScroll() {
    if (scrollState.locked) return;
    scrollState.top = window.scrollY || window.pageYOffset || 0;
    document.body.dataset.scrollTop = String(scrollState.top);
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollState.top}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.classList.add('clase-modal-open'); // además de overflow hidden
    scrollState.locked = true;
  }
  function unlockScroll() {
    if (!scrollState.locked) return;
    const top = parseInt(document.body.dataset.scrollTop || '0', 10) || 0;
    document.body.classList.remove('clase-modal-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    delete document.body.dataset.scrollTop;
    window.scrollTo(0, top);
    scrollState.locked = false;
  }

  // ========= Modal (desktop con herramientas / mobile minimal) =========
  function closeAnyOpenModal() {
    // cierra overlays huérfanos si existieran
    document.querySelectorAll('.clase-modal-overlay').forEach(ov => {
      // stop drive stream
      ov.querySelectorAll('iframe').forEach(fr => { try { fr.src = ''; } catch {} });
      ov.remove();
    });
    unlockScroll();
  }

  function openModal({ title, iframeSrc, description, openUrl }) {
    const isMobile = IS_MOBILE();

    // evita overlays duplicados
    closeAnyOpenModal();

    const overlay = document.createElement('div');
    overlay.className = 'clase-modal-overlay';

    let onKey;

    if (isMobile) {
      // ----- Mobile: modal fullscreen minimal -----
      overlay.innerHTML = `
        <div class="clase-modal clase-modal--mobile" role="dialog" aria-modal="true" aria-label="${title || 'Vista rápida'}">
          <div class="clase-modal-header">
            <h3 class="clase-modal-title">${title || 'Vista rápida'}</h3>
            <div class="clase-modal-tools">
              ${openUrl ? `<a class="tool-btn" href="${openUrl}" target="_blank" rel="noopener" title="Abrir en Drive">Abrir</a>` : ""}
              <button class="clase-modal-close" aria-label="Cerrar">×</button>
            </div>
          </div>
          <div class="clase-modal-viewer clase-modal-viewer--fill">
            <iframe src="${iframeSrc || ''}" loading="lazy" allow="autoplay"></iframe>
          </div>
        </div>
      `;

      const close = () => {
        // corta video / visor en iOS para evitar leaks y glitches
        overlay.querySelectorAll('iframe').forEach(fr => { try { fr.src = ''; } catch {} });
        unlockScroll();
        window.removeEventListener('keydown', onKey);
        overlay.remove();
      };
      onKey = (e) => { if (e.key === 'Escape' || e.key === 'Esc') close(); };
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.classList.contains('clase-modal-close')) close();
      });
      window.addEventListener('keydown', onKey);

      // Bloqueo de scroll robusto
      lockScroll();
      document.body.appendChild(overlay);
      return;
    }

    // ----- Desktop: con herramientas (zoom / fit / abrir / full) -----
    overlay.innerHTML = `
      <div class="clase-modal" role="dialog" aria-modal="true" aria-label="${title || 'Vista rápida'}">
        <div class="clase-modal-header">
          <h3 class="clase-modal-title">${title || 'Vista rápida'}</h3>
          <div class="clase-modal-tools">
            <button class="tool-btn tool-zoom-out" title="Zoom -">−</button>
            <button class="tool-btn tool-zoom-reset" title="Zoom 100%">100%</button>
            <button class="tool-btn tool-zoom-in" title="Zoom +">+</button>
            <span class="tool-sep"></span>
            <button class="tool-btn tool-fit-w" title="Ajustar ancho">⇱⇲</button>
            <button class="tool-btn tool-fit-h" title="Ajustar alto">↕</button>
            <span class="tool-sep"></span>
            ${openUrl ? `<a class="tool-btn" href="${openUrl}" target="_blank" rel="noopener" title="Abrir en Drive">Abrir</a>` : ""}
            <button class="tool-btn tool-full" title="Pantalla completa">⛶</button>
            <button class="clase-modal-close" aria-label="Cerrar">×</button>
          </div>
        </div>
        ${description ? `<p class="clase-modal-desc">${description}</p>` : ''}
        <div class="clase-modal-viewer">
          <div class="iframe-viewport">
            <div class="iframe-scaler">
              <iframe src="${iframeSrc || ''}" loading="lazy" allow="autoplay"></iframe>
            </div>
          </div>
        </div>
      </div>
    `;

    const modal   = overlay.querySelector('.clase-modal');
    const scaler  = overlay.querySelector('.iframe-scaler');
    const viewport= overlay.querySelector('.iframe-viewport');

    let scale = 1;
    const apply = () => {
      scaler.style.transform       = `scale(${scale})`;
      scaler.style.transformOrigin = 'top left';
      scaler.style.width           = `${100/scale}%`;
      scaler.style.height          = 'auto';
    };
    function fitWidth()  { scale = 1; apply(); }
    function fitHeight() {
      const viewH = viewport.clientHeight;
      const base  = 800;
      scale = Math.max(0.5, Math.min(1.6, viewH / base));
      apply();
    }
    function zoom(delta){ scale = Math.max(0.5, Math.min(2, +(scale+delta).toFixed(2))); apply(); }
    function zoomReset(){ scale = 1; apply(); }

    overlay.querySelector('.tool-zoom-in')   ?.addEventListener('click', () => zoom(+0.1));
    overlay.querySelector('.tool-zoom-out')  ?.addEventListener('click', () => zoom(-0.1));
    overlay.querySelector('.tool-zoom-reset')?.addEventListener('click', zoomReset);
    overlay.querySelector('.tool-fit-w')     ?.addEventListener('click', fitWidth);
    overlay.querySelector('.tool-fit-h')     ?.addEventListener('click', fitHeight);
    overlay.querySelector('.tool-full')      ?.addEventListener('click', () => {
      if (modal.requestFullscreen) modal.requestFullscreen().catch(()=>{});
    });

    const close = () => {
      overlay.querySelectorAll('iframe').forEach(fr => { try { fr.src = ''; } catch {} });
      document.body.classList.remove('clase-modal-open');
      window.removeEventListener('keydown', onKey);
      overlay.remove();
    };
    onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') close();
      if (e.ctrlKey && e.key === '+') { e.preventDefault(); zoom(+0.1); }
      if (e.ctrlKey && e.key === '-') { e.preventDefault(); zoom(-0.1); }
      if (e.ctrlKey && (e.key === '0' || e.key === 'º')) { e.preventDefault(); zoomReset(); }
    };

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.classList.contains('clase-modal-close')) close();
    });
    window.addEventListener('keydown', onKey);

    document.body.classList.add('clase-modal-open');
    document.body.appendChild(overlay);

    fitWidth();
  }

  // ========= Animación para clases (expansión suave) =========
  const EASE = 'cubic-bezier(.22,.61,.36,1)';
  const DURATION = 420;

  function expandSmooth(el) {
    if (!el) return;
    el.style.willChange = 'height, opacity';
    el.style.overflow = 'hidden';
    el.style.opacity = '0';
    el.style.height = '0px';
    el.hidden = false;
    const target = el.scrollHeight;
    requestAnimationFrame(() => {
      el.style.transition = `height ${DURATION}ms ${EASE}, opacity ${DURATION}ms ${EASE}`;
      el.style.height = target + 'px';
      el.style.opacity = '1';
      const onEnd = (ev) => {
        if (ev.propertyName !== 'height') return;
        el.style.transition = '';
        el.style.height = 'auto';
        el.style.overflow = '';
        el.style.willChange = '';
        el.removeEventListener('transitionend', onEnd);
      };
      el.addEventListener('transitionend', onEnd);
    });
  }
  function collapseSmooth(el) {
    if (!el) return;
    el.style.willChange = 'height, opacity';
    el.style.overflow = 'hidden';
    el.style.transition = '';
    const start = el.scrollHeight;
    el.style.height = start + 'px';
    el.style.opacity = '1';
    requestAnimationFrame(() => {
      el.style.transition = `height ${DURATION}ms ${EASE}, opacity ${DURATION}ms ${EASE}`;
      el.style.height = '0px';
      el.style.opacity = '0';
      const onEnd = (ev) => {
        if (ev.propertyName !== 'height') return;
        el.hidden = true;
        el.style.transition = '';
        el.style.height = '';
        el.style.overflow = '';
        el.style.willChange = '';
        el.removeEventListener('transitionend', onEnd);
      };
      el.addEventListener('transitionend', onEnd);
    });
  }

  // Re-sincroniza altura si el contenido se cargó estando abierto
  function resyncExpandedHeight(el) {
    if (!el || el.hidden) return;
    const prev = el.style.transition;
    el.style.transition = '';
    const h = el.scrollHeight;
    el.style.height = h + 'px';
    requestAnimationFrame(() => {
      el.style.transition = prev || `height 150ms ${EASE}`;
      setTimeout(() => { if (!el.hidden) el.style.height = 'auto'; }, 160);
    });
  }

  // ========= UI: Elementales (SIN despliegue / SIN flecha) =========
  function renderElemental(item, idx=0) {
    if (!item.pdf_id) return null;
    const variant = (idx % 6) + 1;

    const card = document.createElement("article");
    card.className = "class-card class-card--elemental";
    card.innerHTML = `
      <div class="class-head">
        <div class="class-badge badge-var-${variant}" aria-hidden="true"><span>${item.emoji || "⭐"}</span></div>
        <div class="class-title">${item.title || "Documento"}</div>
        <div class="class-meta pill">PDF</div>
      </div>
      <div class="class-actions">
        <a class="btn btn-primary" href="${driveView(item.pdf_id)}" target="_blank" rel="noopener">Abrir</a>
        <a class="btn" href="${driveDownload(item.pdf_id)}">Descargar</a>
        <button class="btn btn-ghost btn-quickview" type="button">Vista rápida</button>
      </div>
    `;
    card.querySelector('.btn-quickview')?.addEventListener('click', () => {
      openModal({
        title: item.title,
        iframeSrc: drivePreview(item.pdf_id),
        openUrl: driveView(item.pdf_id)
      });
    });
    return card;
  }

  // ========= UI: Clase (con despliegue y flecha) =========
  function renderClassCard(item, badgeNum) {
    const rel = parseRelease(item.release);
    const relText = rel ? rel.toLocaleString() : "—";

    const card = document.createElement("article");
    card.className = "class-card class-card--class is-collapsed";
    card.innerHTML = `
      <div class="class-head">
        <div class="class-badge" aria-hidden="true"><span>${badgeNum}</span></div>
        <div class="class-title">${item.title || "Clase"}</div>
        <div class="class-meta pill">Liberada ${relText}</div>
        <button class="chevron-toggle" type="button" aria-expanded="false" aria-label="Mostrar detalles de la clase">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M8 9l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="class-actions">
        <a class="btn btn-primary" href="${driveFolder(item.folder_id)}" target="_blank" rel="noopener">Abrir carpeta</a>
      </div>

      <div class="class-collapse" hidden>
        <div class="class-groups"></div>
      </div>
    `;

    const collapse  = card.querySelector('.class-collapse');
    const groupsEl  = card.querySelector('.class-groups');
    const chevron   = card.querySelector('.chevron-toggle');

    let loaded = false;

    const paintFiles = (files) => {
      groupsEl.innerHTML = '';
      const map = new Map();
      files.forEach(f => {
        const key = (f.path || '').trim(); // "" = raíz
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(f);
      });

      const sortedPaths = Array.from(map.keys()).sort((a,b) => (a||'').localeCompare(b||'', 'es'));
      sortedPaths.forEach(path => {
        const box = document.createElement('div');
        box.className = 'group-box';
        box.innerHTML = `
          <div class="group-head">
            <div class="group-title">${path || 'Raíz'}</div>
          </div>
          <div class="group-body"></div>
        `;
        const body = box.querySelector('.group-body');

        map.get(path).sort((a,b) => a.name.localeCompare(b.name,'es')).forEach(f => {
          body.appendChild(renderFileRow(f));
        });

        groupsEl.appendChild(box);
      });

      if (!files.length) {
        const msg = document.createElement('div');
        msg.className = 'text-dim small';
        msg.textContent = 'Esta carpeta no tiene archivos visibles.';
        groupsEl.appendChild(msg);
      }
    };

    const toggle = async () => {
      const expanded = chevron.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        chevron.setAttribute('aria-expanded', 'false');
        card.classList.remove('is-expanded');
        card.classList.add('is-collapsed');
        collapseSmooth(collapse);
        return;
      }

      chevron.setAttribute('aria-expanded', 'true');
      card.classList.add('is-expanded');
      card.classList.remove('is-collapsed');
      expandSmooth(collapse);

      if (loaded) return;

      // Pinta desde caché (precargado en init). Si por alguna razón no está, trae ahora.
      let files = fileCache.get(item.folder_id);
      if (!files) {
        try { files = await listFolderFiles(item.folder_id); }
        catch { files = []; }
        fileCache.set(item.folder_id, files);
      }
      paintFiles(files);
      loaded = true;
      resyncExpandedHeight(collapse);
    };

    chevron.addEventListener('click', toggle);
    chevron.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });

    return card;
  }

  function labelForKind(k){
    return ({
      pdf:'PDF', gdoc:'Google Doc', gslides:'Google Slides', gsheets:'Google Sheets',
      image:'Imagen', audio:'Audio', video:'Video', archive:'Archivo', code:'Código'
    }[k] || 'Archivo');
  }

  function renderFileRow(f) {
    const mobile = IS_MOBILE();
    const row = document.createElement('div');
    row.className = 'item-row';

    const actionsHTML = mobile
      ? `
        <div class="item-actions item-actions--mobile">
          ${f.previewPdf || f.exportPdf ? `<button class="iconbtn btn-quickview" type="button" title="Vista rápida" aria-label="Vista rápida">🔍</button>` : ``}
          <a class="iconbtn" href="${f.webViewLink}" target="_blank" rel="noopener" title="Abrir" aria-label="Abrir">🔗</a>
          <a class="iconbtn" href="${f.downloadUrl}" title="Descargar" aria-label="Descargar">⬇️</a>
        </div>
      `
      : `
        <div class="item-actions">
          ${f.previewPdf || f.exportPdf ? `<button class="btn btn-ghost btn-quickview" type="button">Vista rápida</button>` : ``}
          <a class="btn" href="${f.webViewLink}" target="_blank" rel="noopener">Abrir</a>
          <a class="btn" href="${f.downloadUrl}">Descargar</a>
        </div>
      `;

    row.innerHTML = `
      <div class="item-left">
        <span class="pill">${labelForKind(f.kind)}</span>
        <span class="item-name">${f.name}</span>
      </div>
      ${actionsHTML}
    `;

    const quick = row.querySelector('.btn-quickview');
    if (quick) quick.addEventListener('click', () => {
      const src = f.previewPdf || f.exportPdf || '';
      openModal({ title: f.name, iframeSrc: src, openUrl: f.webViewLink });
    });
    const quickIcon = row.querySelector('.iconbtn.btn-quickview');
    if (quickIcon) quickIcon.addEventListener('click', () => {
      const src = f.previewPdf || f.exportPdf || '';
      openModal({ title: f.name, iframeSrc: src, openUrl: f.webViewLink });
    });

    return row;
  }

  // ============= INIT =============
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const all = await loadAllItems();

      const elementales = all.filter(x => String(x.kind).toLowerCase() === "elemental" && x.pdf_id);
      const clases = all.filter(x => String(x.kind).toLowerCase() === "clase" && x.folder_id && x.release);

      // Elementales
      elElem.innerHTML = "";
      elementales.forEach((it, i) => {
        const card = renderElemental(it, i);
        if (card) elElem.appendChild(card);
      });

      // Clases liberadas
      const released = clases
        .filter(c => {
          const d = parseRelease(c.release);
          return d && d.getTime() <= now().getTime();
        })
        .sort((a,b) => {
          const na = Number(a.number || 0), nb = Number(b.number || 0);
          if (na && nb && na !== nb) return na - nb;
          return (parseRelease(a.release)?.getTime() || 0) - (parseRelease(b.release)?.getTime() || 0);
        });

      if (!released.length) {
        elStatus.style.display = 'block';
        elStatus.textContent = 'Aún no hay clases liberadas.';
        return;
      }

      // Precarga real (espera a que terminen TODAS antes de dibujar tarjetas)
      elStatus.style.display = 'block';
      elStatus.textContent = 'Precargando material de clases…';
      await Promise.all(
        released.map(async cls => {
          try {
            const files = await listFolderFiles(cls.folder_id);
            fileCache.set(cls.folder_id, files);
          } catch (e) {
            console.error('[Clases] Precarga falló', cls.folder_id, e);
            fileCache.set(cls.folder_id, []);
          }
        })
      );

      // Render de tarjetas (ya con todo precargado)
      elList.innerHTML = "";
      released.forEach((cls, i) => {
        const num = Number(cls.number || (i + 1));
        const card = renderClassCard(cls, num);
        elList.appendChild(card);
      });

      elStatus.textContent = '';
      elStatus.style.display = 'none';

      // por si hay algún overlay viejo por recarga parcial
      closeAnyOpenModal();

    } catch (err) {
      console.error("[Clases] Init:", err);
      elStatus.style.display = 'block';
      elStatus.textContent = 'No se pudieron cargar las clases. Revisá la configuración.';
    }
  });
})();
