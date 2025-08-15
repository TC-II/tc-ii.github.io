// assets/js/pdf.js

(function initPdfViewer() {
  var frame = document.getElementById('pdfFrame');
  if (!frame) return;

  var pdfUrl = frame.getAttribute('data-pdf');
  if (!pdfUrl) return;

  var ua = navigator.userAgent || '';
  var isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isSafari = /^((?!chrome|android).)*safari/i.test(ua);

  // URLs
  var nativeUrl = pdfUrl + '#view=FitH';
  // Construye absoluta sin regex lookbehind (compatible)
  var absolute = new URL(pdfUrl, window.location.origin).href;
  var gdocsUrl =
    'https://docs.google.com/viewer?embedded=true&url=' +
    encodeURIComponent(absolute);

  // iOS/Safari: ir directo a Google Viewer
  if (isIOS || isSafari) {
    frame.src = gdocsUrl;
    frame.dataset.external = 'gdocs';
    return;
  }

  // Intento nativo primero
  frame.src = nativeUrl;

  // Fallback si no carga (content-type/otros)
  var loaded = false;
  var fallbackTimer = setTimeout(function () {
    if (!loaded) {
      frame.src = gdocsUrl;
      frame.dataset.external = 'gdocs';
    }
  }, 1500);

  frame.addEventListener(
    'load',
    function () {
      loaded = true;
      clearTimeout(fallbackTimer);
    },
    { once: true }
  );
})();

// APIs que ya usabas (expuestas en window para que HTML las llame)
window.setPdfZoom = function setPdfZoom(z) {
  var f = document.getElementById('pdfFrame');
  if (!f) return;
  if (f.dataset.external === 'gdocs') return; // en Google Viewer el hash no aplica
  var base = f.src.split('#')[0];
  f.src = base + '#zoom=' + encodeURIComponent(z) + '&view=FitH';
};

window.toggleFull = function toggleFull() {
  var wrap = document.getElementById('pdfWrapper');
  if (!wrap) return;
  if (!document.fullscreenElement) {
    if (wrap.requestFullscreen) wrap.requestFullscreen();
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
  }
};
