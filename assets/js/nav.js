(function () {
  const btn  = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) { console.error('[nav] faltan #navToggle o #mobileMenu'); return; }

  // Si por error quedó el atributo hidden en el HTML, lo desactivamos
  if (menu.hasAttribute('hidden')) menu.removeAttribute('hidden');

  const mq = window.matchMedia('(min-width: 900px)');
  let open = false, animating = false;

  const isDesktop = () => mq.matches;

  const setDesktop = () => {
    menu.style.height = 'auto';
    menu.style.overflow = 'visible';
    btn.setAttribute('aria-expanded', 'true');
    open = true; animating = false;
  };

  const setMobileClosed = () => {
    menu.style.overflow = 'hidden';
    menu.style.height = '0px';
    btn.setAttribute('aria-expanded', 'false');
    open = false; animating = false;
  };

  const openMenu = () => {
    if (open || animating || isDesktop()) return;
    animating = true;
    // punto de partida
    menu.style.height = '0px';
    // Forzar reflow (Safari)
    // eslint-disable-next-line no-unused-expressions
    menu.offsetHeight;
    requestAnimationFrame(() => {
      menu.style.height = menu.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    });
    const end = (e) => {
      if (e.propertyName !== 'height') return;
      menu.style.height = 'auto';
      menu.removeEventListener('transitionend', end);
      open = true; animating = false;
    };
    menu.addEventListener('transitionend', end);
  };

  const closeMenu = () => {
    if (!open || animating || isDesktop()) return;
    animating = true;
    const h = menu.scrollHeight;
    menu.style.height = h + 'px';
    // reflow
    // eslint-disable-next-line no-unused-expressions
    menu.offsetHeight;
    requestAnimationFrame(() => {
      menu.style.height = '0px';
      btn.setAttribute('aria-expanded', 'false');
    });
    const end = (e) => {
      if (e.propertyName !== 'height') return;
      menu.removeEventListener('transitionend', end);
      open = false; animating = false;
    };
    menu.addEventListener('transitionend', end);
  };

  btn.addEventListener('click', () => (open ? closeMenu() : openMenu()));

  menu.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a && open && !isDesktop()) closeMenu();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open && !isDesktop()) closeMenu();
  });

  mq.addEventListener('change', () => {
    if (isDesktop()) setDesktop(); else setMobileClosed();
  });

  // Estado inicial
  if (isDesktop()) setDesktop(); else setMobileClosed();

  // DEBUG opcional:
  // console.log('[nav] listo');
})();
