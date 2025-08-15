<script>
(function initPdfViewer(){
  const frame = document.getElementById('pdfFrame');
  if(!frame) return;

  const pdfUrl = frame.getAttribute('data-pdf');
  if(!pdfUrl) return;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  // Construye URLs
  const nativeUrl  = pdfUrl + '#view=FitH'; // tu modo actual con hash
  // Para Google Viewer usamos URL absoluta si tenés site.url, si no, el relative_url también suele andar.
  const absolute = (window.location.origin + pdfUrl).replace(/(?<!:)\/{2,}/g, '/').replace(':/','://');
  const gdocsUrl  = 'https://docs.google.com/viewer?embedded=true&url=' + encodeURIComponent(absolute);

  // iOS/Safari: ir directo a Google Viewer. En el resto: probar nativo y hacer fallback si falla.
  if (isIOS || isSafari) {
    frame.src = gdocsUrl;
    frame.dataset.external = 'gdocs';
    return;
  }

  // Modo nativo primero
  frame.src = nativeUrl;

  // Fallback defensivo si no carga (p. ej., servidor sin Content-Type application/pdf)
  let loaded = false;
  const fallbackTimer = setTimeout(() => {
    if (!loaded) {
      frame.src = gdocsUrl;
      frame.dataset.external = 'gdocs';
    }
  }, 1500);

  frame.addEventListener('load', () => { loaded = true; clearTimeout(fallbackTimer); }, { once: true });
})();
</script>
