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
    if (!status) return;
    console.log('\n📦 Changes detected — pushing to GitHub...');
    execSync('git add .', { cwd: ROOT });
    execSync('git commit -m "auto-update"', { cwd: ROOT });
    execSync('git push', { cwd: ROOT });
    console.log('✅ Pushed! Vercel is deploying...\n');
  } catch (e) {
    console.error('Push error:', e.message);
  }
}

function watchDir(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const full = path.join(dir, entry.name);
    if (shouldIgnore(full)) return;
    if (entry.isDirectory()) {
      watchDir(full);
      fs.watch(full, () => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(autoPush, 3000);
      });
    }
  });
}

console.log('👁️  Watching for changes — auto-push to GitHub enabled');
console.log('   Every change Claude makes will deploy to Vercel in ~1 min\n');

fs.watch(ROOT, () => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(autoPush, 3000);
});

watchDir(ROOT);
