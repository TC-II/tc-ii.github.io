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

async function fetchExamFiles(config) {
  if (!config.exam_app_url || !config.exam_folder_id) return null;
  const url = `${config.exam_app_url}?folderId=${encodeURIComponent(config.exam_folder_id)}&onlyPublic=false`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Exams fetch failed: HTTP ${res.status}`);
  const data = await res.json();
  const raw = Array.isArray(data.files) ? data.files
            : Array.isArray(data.items) ? data.items
            : [];
  return raw.map(f => ({ id: f.id, title: (f.name || f.title || '').trim() }));
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

  let previousItems = [];
  let previousFiles = {};
  let previousExamenes = [];
  if (fs.existsSync(outPath)) {
    try {
      const previous = JSON.parse(fs.readFileSync(outPath, 'utf8'));
      previousItems = previous.items || [];
      previousFiles = previous.files || {};
      previousExamenes = previous.examenes || [];
    } catch { /* ignore corrupt previous cache */ }
  }

  const items = await fetchItems(config);
  const releasedClasses = items.filter(isReleasedClass);

  let examenes = previousExamenes;
  try {
    const fetched = await fetchExamFiles(config);
    if (fetched) {
      examenes = fetched;
      console.log(`OK   Examenes -> ${examenes.length} archivo(s)`);
    }
  } catch (e) {
    console.error(`FAIL Examenes: ${e.message}`);
    console.warn('  -> se conserva la cache anterior de examenes');
  }

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

  // Compara solo el contenido real (sin generatedAt) contra lo que ya está en disco.
  // Si no cambió nada, no se reescribe el archivo: evita que cada corrida programada
  // genere un commit vacío (el único cambio sería el timestamp).
  const contentUnchanged =
    JSON.stringify(items) === JSON.stringify(previousItems) &&
    JSON.stringify(files) === JSON.stringify(previousFiles) &&
    JSON.stringify(examenes) === JSON.stringify(previousExamenes);

  if (contentUnchanged) {
    console.log(`\nSin cambios respecto a la última sincronización; no se reescribe ${config.cache_path}.`);
    return;
  }

  const output = {
    generatedAt: new Date().toISOString(),
    items,
    files,
    examenes
  };

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n', 'utf8');
  console.log(`\nEscrito ${config.cache_path} (${items.length} items, ${Object.keys(files).length} carpetas cacheadas, ${examenes.length} examenes)`);
}

main().catch((err) => {
  console.error('sync-drive-data failed:', err);
  process.exit(1);
});
