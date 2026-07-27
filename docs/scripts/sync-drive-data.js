// scripts/sync-drive-data.js
// Fetches the master JSON + released classes' folder listings from Google Drive
// (via the existing Apps Script web apps) and writes a static cache file that
// the site can read instantly, without hitting Google on every page load.
//
// Run with: node scripts/sync-drive-data.js
// (Node 18+ required for global fetch.)

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, '_data', 'drive_config.json');

function loadConfig() {
  const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
  return JSON.parse(raw);
}

async function fetchItems(config) {
  const q = new URLSearchParams({ id: config.file_id, type: 'json', _: Date.now() });
  const url = `${config.app_url}?${q.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Items fetch failed: HTTP ${res.status}`);
  const items = await res.json();
  if (!Array.isArray(items)) throw new Error('Unexpected items format (expected array)');
  return items;
}

async function fetchFolderFiles(config, folderId) {
  const url = `${config.list_app_url}?folderId=${encodeURIComponent(folderId)}&depth=6`;
  const res = await fetch(url);
  const text = await res.text();

  let json;
  try { json = JSON.parse(text); }
  catch { throw new Error('Respuesta no-JSON del Web App: ' + text.slice(0, 200)); }

  if (Array.isArray(json)) return json;
  if (json.ok === false) throw new Error(json.error || 'ok:false');
  if (Array.isArray(json.files)) return json.files;
  throw new Error('Formato de respuesta desconocido');
}

function isReleasedClass(item) {
  if (String(item.kind).toLowerCase() !== 'clase') return false;
  if (!item.folder_id || !item.release) return false;
  const t = new Date(item.release).getTime();
  return !Number.isNaN(t) && t <= Date.now();
}

async function main() {
  const config = loadConfig();
  const outPath = path.join(ROOT, config.cache_path);

  let previousFiles = {};
  if (fs.existsSync(outPath)) {
    try { previousFiles = JSON.parse(fs.readFileSync(outPath, 'utf8')).files || {}; }
    catch { /* ignore corrupt previous cache */ }
  }

  const items = await fetchItems(config);
  const releasedClasses = items.filter(isReleasedClass);

  const files = {};
  for (const cls of releasedClasses) {
    const label = cls.title || `Clase ${cls.number ?? ''}`;
    try {
      files[cls.folder_id] = await fetchFolderFiles(config, cls.folder_id);
      console.log(`OK   ${label} -> ${files[cls.folder_id].length} archivo(s)`);
    } catch (e) {
      console.error(`FAIL ${label} (${cls.folder_id}): ${e.message}`);
      if (previousFiles[cls.folder_id]) {
        files[cls.folder_id] = previousFiles[cls.folder_id];
        console.warn(`  -> se conserva la cache anterior para esta carpeta`);
      }
    }
  }

  const output = {
    generatedAt: new Date().toISOString(),
    items,
    files
  };

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n', 'utf8');
  console.log(`\nEscrito ${config.cache_path} (${items.length} items, ${Object.keys(files).length} carpetas cacheadas)`);
}

main().catch((err) => {
  console.error('sync-drive-data failed:', err);
  process.exit(1);
});
