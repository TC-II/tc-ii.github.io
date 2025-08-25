# build_prod.ps1 — Compila Jekyll a /docs y pushea a main
$ErrorActionPreference = "Stop"

Write-Host "==> Limpiando build previo..."
bundle exec jekyll clean

Write-Host "==> Compilando para producción (baseurl /)..."
bundle exec jekyll build --config _config.yml,_config_prod.yml -d docs

Write-Host "==> Commit & push a main (incluye /docs)..."
git add .
git commit -m "Build estático en /docs para GitHub Pages" | Out-Null
git push

Write-Host "==> Listo. Activá GitHub Pages: Settings → Pages → Source: main /docs"
