# build_only.ps1 — Compila Jekyll a /docs (sin git)
$ErrorActionPreference = "Stop"

Write-Host "==> Limpiando build previo..." -ForegroundColor Cyan
bundle exec jekyll clean

Write-Host "==> Compilando para producción con baseurl /Pagina_material..." -ForegroundColor Cyan
bundle exec jekyll build --config _config.yml,_config_prod.yml -d docs

if (Test-Path ".\docs\index.html") {
  Write-Host "✅ Build OK. Carpeta generada: $(Resolve-Path .\docs)" -ForegroundColor Green
  Write-Host "Subí el contenido de 'docs/' a tu repo (branch main, folder /docs en GitHub Pages Settings)." -ForegroundColor Yellow
} else {
  Write-Host "❌ No se generó docs/index.html. Revisá errores anteriores." -ForegroundColor Red
}
