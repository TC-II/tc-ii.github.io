(function () {
  const btn  = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) {
    console.error('[nav] Faltan #navToggle o #mobileMenu');
    return;
  }

  const DESKTOP_MQ = '(min-width: 900px)';
  const mq = window.matchMedia(DESKTOP_MQ);

  // Estado actual
  let open = false;
  let animating = false;

  // Helpers
  const isDesktop = () => mq.matches;

  const setDesktop = () => {
    // Menú visible y sin animación
    menu.style.height = 'auto';
    menu.style.overflow = 'visible';
    menu.style.display = ''; // lo maneja el CSS (display:flex)
    btn.setAttribute('aria-expanded', 'true');
    open = true;
    animating = false;
  };

  const setMobileClosed = () => {
    // Menú cerrado y listo para animar
    menu.style.display = ''; // block por defecto
    menu.style.overflow = 'hidden';
    menu.style.height = '0px';
    btn.setAttribute('aria-expanded', 'false');
    open = false;
    animating = false;
  };

  const openMenu = () => {
    if (open || animating || isDesktop()) return;
    animating = true;
    // punto de partida
    menu.style.height = '0px';
    // next frame → expandir
    requestAnimationFrame(() => {
      menu.style.height = menu.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    });
    const end = (e) => {
      if (e.propertyName !== 'height') return;
      menu.style.height = 'auto'; // permitir crecimiento dinámico
      menu.removeEventListener('transitionend', end);
      open = true;
      animating = false;
    };
    menu.addEventListener('transitionend', end);
  };

  const closeMenu = () => {
    if (!open || animating || isDesktop()) return;
    animating = true;
    // fijar altura actual (auto → px)
    const h = menu.scrollHeight;
    menu.style.height = h + 'px';
    // next frame → colapsar
    requestAnimationFrame(() => {
      menu.style.height = '0px';
      btn.setAttribute('aria-expanded', 'false');
    });
    const end = (e) => {
      if (e.propertyName !== 'height') return;
      menu.removeEventListener('transitionend', end);
      open = false;
      animating = false;
    };
    menu.addEventListener('transitionend', end);
  };

  // Toggle
  btn.addEventListener('click', () => (open ? closeMenu() : openMenu()));

  // Cerrar al clickear un link (en mobile)
  menu.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a && open && !isDesktop()) closeMenu();
  });

  // Cerrar con Escape (en mobile)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open && !isDesktop()) closeMenu();
  });

  // Reaccionar al cambio de viewport
  mq.addEventListener('change', () => {
    if (isDesktop()) setDesktop(); else setMobileClosed();
  });

  // Init (resuelve estado si la página carga en desktop o mobile)
  if (isDesktop()) setDesktop(); else setMobileClosed();

  // DEBUG opcional: descomentá para confirmar
  // console.log('[nav] ready:', { desktop: isDesktop() });
})();
