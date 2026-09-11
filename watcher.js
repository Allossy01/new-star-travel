const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const IGNORE = ['.git', 'node_modules', '.next', '.vercel'];
let debounceTimer = null;

function shouldIgnore(filePath) {
  return IGNORE.some(ig => filePath.includes(ig));
}

function autoPush() {
  try {
    const status = execSync('git status --porcelain', { cwd: ROOT }).toString().trim();
    if (!status) { console.log('No changes to push.'); return; }
    console.log('\n Changes detected — pushing to GitHub...');
    execSync('git add .', { cwd: ROOT });
    execSync('git commit -m "auto-update"', { cwd: ROOT });
    execSync('git push', { cwd: ROOT });
    console.log(' Pushed! Vercel is deploying...\n');
  } catch (e) {
    console.error('Push error:', e.message);
  }
}

function triggerDebounce() {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(autoPush, 3000);
}

function watchDir(dir) {
  try {
    fs.watch(dir, { recursive: true }, (event, filename) => {
      if (!filename) return;
      const full = path.join(dir, filename);
      if (shouldIgnore(full)) return;
      console.log(`Change: ${filename}`);
      triggerDebounce();
    });
    console.log('Watching: ' + dir);
  } catch (e) {
    console.error('Watch error:', e.message);
  }
}

console.log('Watching for changes — auto-push to GitHub enabled');
console.log('Every change will deploy to Vercel in ~1 min\n');

watchDir(ROOT);
