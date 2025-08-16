(function(){
  const root = document.querySelector('.playlists');
  if(!root) return;

  const iframe = root.querySelector('.pl-player iframe');
  const chips  = Array.from(root.querySelectorAll('.pl-chip[data-video]'));
  if(!iframe || !chips.length) return;

  const playlistId = iframe.dataset.list || '';

  function setActive(el){
    chips.forEach(i => i.classList.remove('is-active'));
    el.classList.add('is-active');
  }

  function play(id){
    iframe.src = `https://www.youtube.com/embed/${id}?list=${encodeURIComponent(playlistId)}`;
  }

  chips.forEach((el, i) => {
    el.addEventListener('click', () => {
      setActive(el);
      play(el.dataset.video);
    });
    if(i === 0) setActive(el);
  });
})();
