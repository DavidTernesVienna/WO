const fs = require('fs/promises');
const path = require('path');

async function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const repoRoot = path.resolve(projectRoot, '..');
  const docsDir = path.join(repoRoot, 'docs');
  const publicDir = path.join(projectRoot, 'public');
  const swSrc = path.join(projectRoot, 'src', 'service-worker.js');

  await fs.rm(docsDir, { recursive: true, force: true });
  await fs.mkdir(docsDir, { recursive: true });

  await fs.cp(publicDir, docsDir, { recursive: true });
  await fs.copyFile(swSrc, path.join(docsDir, 'service-worker.js'));
  await fs.writeFile(path.join(docsDir, '.nojekyll'), '');

  console.log('Docs built to', docsDir);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
