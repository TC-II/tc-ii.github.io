// Controles del visor PDF
function setPdfZoom(z) {
  var f = document.getElementById('pdfFrame');
  if (!f) return;
  var base = f.src.split('#')[0];
  f.src = base + '#zoom=' + z + '&view=FitH';
}

// Pantalla completa del contenedor del visor
function toggleFull() {
  var wrap = document.getElementById('pdfWrapper');
  if (!wrap) return;

  if (!document.fullscreenElement) {
    wrap.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}
