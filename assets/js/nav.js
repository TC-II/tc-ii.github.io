(function(){
  const btn = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  let open = false;
  let animating = false;

  const openMenu = () => {
    if (open || animating) return;
    animating = true;
    menu.hidden = false;
    menu.style.height = '0px';
    requestAnimationFrame(() => {
      menu.style.height = menu.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    });
    menu.addEventListener('transitionend', function end(e){
      if (e.propertyName === 'height') {
        menu.style.height = 'auto';
        menu.removeEventListener('transitionend', end);
        open = true;
        animating = false;
      }
    });
  };

  const closeMenu = () => {
    if (!open || animating) return;
    animating = true;
    menu.style.height = menu.scrollHeight + 'px';
    requestAnimationFrame(() => {
      menu.style.height = '0px';
      btn.setAttribute('aria-expanded', 'false');
    });
    menu.addEventListener('transitionend', function end(e){
      if (e.propertyName === 'height') {
        menu.hidden = true;
        menu.removeEventListener('transitionend', end);
        open = false;
        animating = false;
      }
    });
  };

  btn.addEventListener('click', () => {
    open ? closeMenu() : openMenu();
  });

  // Cierra al hacer clic en un link
  menu.addEventListener('click', e => {
    if (e.target.tagName === 'A' && open) closeMenu();
  });

})();
