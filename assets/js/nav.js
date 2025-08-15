(function () {
  const btn  = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  // Conecta accesibilidad
  btn.setAttribute('aria-controls', 'mobileMenu');
  if (!btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', 'false');

  let open = false;
  let animating = false;

  const isDesktop = () => window.matchMedia('(min-width: 900px)').matches;
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Estado inicial coherente
  const initState = () => {
    if (isDesktop()) {
      // Desktop: menú visible y sin animación
      menu.hidden = false;
      menu.style.height = 'auto';
      menu.style.overflow = 'visible';
      btn.setAttribute('aria-expanded', 'true');
      open = true;
      animating = false;
    } else {
      // Mobile: menú cerrado
      menu.hidden = true;
      menu.style.height = '0px';
      menu.style.overflow = 'hidden';
      btn.setAttribute('aria-expanded', 'false');
      open = false;
      animating = false;
    }
  };

  const openMenu = () => {
    if (open || animating) return;
    if (prefersReduce) {
      menu.hidden = false;
      menu.style.height = 'auto';
      btn.setAttribute('aria-expanded', 'true');
      open = true;
      return;
    }

    animating = true;
    menu.hidden = false;
    // Forzar punto de partida
    menu.style.height = '0px';

    requestAnimationFrame(() => {
      const target = menu.scrollHeight;
      menu.style.height = target + 'px';
      btn.setAttribute('aria-expanded', 'true');
    });

    const onEnd = (e) => {
      if (e.propertyName !== 'height') return;
      menu.style.height = 'auto'; // para crecimiento dinámico
      menu.removeEventListener('transitionend', onEnd);
      menu.removeEventListener('transitioncancel', onEnd);
      open = true;
      animating = false;
    };
    menu.addEventListener('transitionend', onEnd);
    menu.addEventListener('transitioncancel', onEnd);
  };

  const closeMenu = () => {
    if (!open || animating) return;
    if (prefersReduce) {
      menu.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      open = false;
      return;
    }

    animating = true;
    // Fijar altura actual (auto → px)
    const current = menu.scrollHeight;
    menu.style.height = current + 'px';

    requestAnimationFrame(() => {
      menu.style.height = '0px';
      btn.setAttribute('aria-expanded', 'false');
    });

    const onEnd = (e) => {
      if (e.propertyName !== 'height') return;
      menu.hidden = true;
      menu.removeEventListener('transitionend', onEnd);
      menu.removeEventListener('transitioncancel', onEnd);
      open = false;
      animating = false;
    };
    menu.addEventListener('transitionend', onEnd);
    menu.addEventListener('transitioncancel', onEnd);
  };

  // Toggle por click
  btn.addEventListener('click', () => (open ? closeMenu() : openMenu()));

  // Cierra al clickear un link
  menu.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a && open && !isDesktop()) closeMenu();
  });

  // Cierra con Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open && !isDesktop()) closeMenu();
  });

  // Reacciona al cambio de ancho (mobile ⇄ desktop)
  const mq = window.matchMedia('(min-width: 900px)');
  mq.addEventListener('change', initState);

  // Si el contenido del menú cambia dinámicamente, ajusta la altura en abierto
  const ro = new ResizeObserver(() => {
    if (open && !isDesktop() && getComputedStyle(menu).height !== '0px') {
      // Si estaba en 'auto', lo pasamos a px para animaciones posteriores
      if (menu.style.height === 'auto') {
        menu.style.height = menu.scrollHeight + 'px';
        // luego de un frame, devolvemos a 'auto' para permitir crecimiento
        requestAnimationFrame(() => (menu.style.height = 'auto'));
      }
    }
  });
  ro.observe(menu);

  // Inicializa
  initState();
})();
