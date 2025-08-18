(function () {
  const $ = (s, r=document) => r.querySelector(s);
  const cfg = window.TPS_CONFIG || {};
  const listEl = $("#tps-list");
  const statusEl = $("#tps-status");

  // ---- Drive helpers
  const driveView     = (id) => `https://drive.google.com/file/d/${encodeURIComponent(id)}/view#page=1`;
  const drivePreview  = (id) => `https://drive.google.com/file/d/${encodeURIComponent(id)}/preview`;
  const driveThumb    = (id, sz="w2000") => `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=${sz}`;
  const driveDownload = (id) => `https://docs.google.com/uc?export=download&id=${encodeURIComponent(id)}`;

  // ---- Dates (AR -03:00)
  const parseDateAR = (ymd) => {
    if (!ymd) return null;
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(ymd).trim());
    if (!m) return null;
    return new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00-03:00`);
  };
  const todayAR = () => {
    const n = new Date();
    return parseDateAR(`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,'0')}-${String(n.getDate()).padStart(2,'0')}`);
  };
  const fmtDDMMYYYY = (d) =>
    d ? `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}` : "";

  const stateFromDeadline = (deadlineDate, now) => {
    if (!deadlineDate) return { label: "Sin fecha de entrega", kind: "neutral" };
    const dl = parseDateAR(`${deadlineDate.getFullYear()}-${String(deadlineDate.getMonth()+1).padStart(2,'0')}-${String(deadlineDate.getDate()).padStart(2,'0')}`);
    const n  = parseDateAR(`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`);
    if (dl < n) return { label: "Vencido", kind: "danger" };
    if (dl.getTime() === n.getTime()) return { label: "Vence hoy", kind: "warning" };
    return { label: "Abierto", kind: "success" };
  };

  // Google Calendar (evento 1h a las 12:00Z)
  const gcalUrlForDeadline = (title, deadlineDate) => {
    if (!deadlineDate) return null;
    const y = deadlineDate.getFullYear();
    const m = String(deadlineDate.getMonth() + 1).padStart(2, "0");
    const d = String(deadlineDate.getDate()).padStart(2, "0");
    const start = `${y}${m}${d}T120000Z`;
    const end   = `${y}${m}${d}T130000Z`;
    const text  = encodeURIComponent(`Entrega ${title}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}`;
  };

  // ---- Modal (detalles + visor PDF)
  function openModal({ title, description, pdf_id }) {
  const overlay = document.createElement('div');
  overlay.className = 'tp-modal-overlay';
  overlay.innerHTML = `
    <div class="tp-modal" role="dialog" aria-modal="true" aria-label="${title || "Detalles del Trabajo Práctico"}">
      <div class="tp-modal-header">
        <h3 class="tp-modal-title">${title || "Detalles del Trabajo Práctico"}</h3>
        <button class="tp-modal-close" aria-label="Cerrar" aria-keyshortcuts="Esc">×</button>
      </div>
      ${description ? `<p class="tp-modal-desc">${description}</p>` : ''}
      ${pdf_id ? `
        <div class="tp-modal-viewer">
          <iframe src="${drivePreview(pdf_id)}" loading="lazy" allow="autoplay"></iframe>
        </div>
      ` : `<div class="tp-modal-empty">No hay archivo para previsualizar.</div>`}
      <div class="tp-modal-actions">
        ${pdf_id ? `<a class="btn-primary" href="${driveView(pdf_id)}" target="_blank" rel="noopener">Abrir PDF</a>` : ''}
        ${pdf_id ? `<a class="btn-outline" href="${driveDownload(pdf_id)}" target="_blank" rel="noopener">Descargar</a>` : ''}
      </div>
    </div>
  `;

  // Cerrar al hacer click fuera o en el botón
  const close = () => {
    document.body.classList.remove('tp-modal-open');
    window.removeEventListener('keydown', onKey);
    overlay.remove();
  };
  const onKey = (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') close();
  };

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.classList.contains('tp-modal-close')) close();
  });
  window.addEventListener('keydown', onKey);

  document.body.classList.add('tp-modal-open');
  document.body.appendChild(overlay);
}


  // ---- Render de tarjeta (con soporte alternancia por índice)
  const renderCard = (item, index=0) => {
    const releaseStr  = fmtDDMMYYYY(item.release);
    const deadlineStr = fmtDDMMYYYY(item.deadline);
    const st = stateFromDeadline(item.deadline, todayAR());
    const calendarURL = gcalUrlForDeadline(item.title || "TP", item.deadline);

    const el = document.createElement("article");
    el.className = "tp-card";
    if (index % 2 === 1) el.classList.add("alt"); // alternancia en pares

    // Portada (imagen 1ª hoja)
    const cover = document.createElement('div');
    cover.className = 'tp-cover';
    if (item.pdf_id) {
      const img = document.createElement('img');
      img.alt = `Portada ${item.title || ""}`;
      img.loading = "lazy";
      img.src = driveThumb(item.pdf_id, "w2000");
      img.onerror = () => {
        cover.classList.add('no-thumb');
        cover.innerHTML = `<div class="tp-cover-fallback">PDF</div>`;
      };
      cover.appendChild(img);
    } else {
      cover.classList.add('no-thumb');
      cover.innerHTML = `<div class="tp-cover-fallback">Sin PDF</div>`;
    }

    // Info
    const info = document.createElement('div');
    info.className = 'tp-info';
    info.innerHTML = `
      <div class="tp-title">${item.title || "Trabajo Práctico"}</div>

      <div class="tp-dates">
        <span class="pill pill-publish">Publicación: ${releaseStr || "—"}</span>
        <span class="pill pill-deadline">Entrega: ${deadlineStr || "—"}</span>
        ${calendarURL ? `
          <a class="calendar-chip" href="${calendarURL}" target="_blank" rel="noopener" title="Añadir a Calendar" aria-label="Añadir a Calendar">
            <svg class="cal-ico" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="4" width="18" height="17" rx="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
            </svg>
          </a>
        ` : ""}
      </div>

      ${item.description ? `<p class="tp-desc">${item.description}</p>` : ""}

      <div class="tp-actions">
        ${item.pdf_id ? `<a class="btn-primary" href="${driveView(item.pdf_id)}" target="_blank" rel="noopener">Abrir PDF</a>` : ""}
        ${item.pdf_id ? `<a class="btn-outline" href="${driveDownload(item.pdf_id)}" target="_blank" rel="noopener">Descargar</a>` : ""}
        <a class="btn-outline btn-details" href="javascript:void(0)">Ver detalles</a>
      </div>
    `;

    el.appendChild(cover);
    el.appendChild(info);

    // “Ver detalles”
    info.querySelector('.btn-details')?.addEventListener('click', () => {
      openModal({ title: item.title, description: item.description, pdf_id: item.pdf_id });
    });

    return el;
  };

  // ---- Data helpers
  const normalize = (arr) => (arr || []).map(o => ({
    title: (o.title||"").trim(),
    description: (o.description||"").trim(),
    pdf_id: (o.pdf_id||"").trim(),
    release: o.release ? parseDateAR(String(o.release)) : null,
    deadline: o.deadline ? parseDateAR(String(o.deadline)) : null,
  }));

  async function loadFromWebApp(url) {
    const u = new URL(url, location.href);
    u.searchParams.set("_", Date.now().toString()); // evitar caché
    const res = await fetch(u.toString(), { cache: "no-store", credentials: "omit" });
    if (!res.ok) throw new Error("HTTP "+res.status);
    const data = await res.json();
    return normalize(data);
  }

  // ---- Init
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      if (!cfg.jsonUrl) throw new Error("Falta jsonUrl en TPS_CONFIG.");
      const items = await loadFromWebApp(cfg.jsonUrl);

      const now = todayAR();
      const published = items
        .filter(it => it.release && it.release.getTime() <= now.getTime())
        .sort((a,b) => (b.release?.getTime()||0) - (a.release?.getTime()||0));

      statusEl.textContent = "";
      listEl.innerHTML = "";
      published.forEach((it, i) => listEl.appendChild(renderCard(it, i))); // <<< alternancia
    } catch (err) {
      console.error("[TPs] Error:", err);
      statusEl.textContent = "No se pudieron cargar los Trabajos Prácticos. Revisá la configuración y permisos.";
    }
  });
})();
