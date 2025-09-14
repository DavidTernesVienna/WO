import fs from 'fs/promises';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function build(outDir, base) {
  base = base.startsWith('/') ? base : '/' + base;
  if (!base.endsWith('/')) base += '/';

  const projectRoot = path.resolve(__dirname, '..');
  const publicDir = path.join(projectRoot, 'public');
  const swSrc = path.join(projectRoot, 'src', 'service-worker.js');
  const outPath = path.resolve(projectRoot, outDir);

  await fs.rm(outPath, { recursive: true, force: true });
  await fs.mkdir(outPath, { recursive: true });
  await fs.cp(publicDir, outPath, { recursive: true });

  const indexPath = path.join(outPath, 'index.html');
  let indexHtml = await fs.readFile(indexPath, 'utf8');
  indexHtml = indexHtml.replace(/%BASE_URL%/g, base);
  await fs.writeFile(indexPath, indexHtml);

  const manifestPath = path.join(outPath, 'manifest.json');
  let manifest = await fs.readFile(manifestPath, 'utf8');
  manifest = manifest.replace(/%BASE_URL%/g, base);
  await fs.writeFile(manifestPath, manifest);

  let sw = await fs.readFile(swSrc, 'utf8');
  sw = sw.replace(/%BASE_URL%/g, base);
  await fs.writeFile(path.join(outPath, 'service-worker.js'), sw);

  if (path.basename(outPath) === 'docs') {
    await fs.writeFile(path.join(outPath, '.nojekyll'), '');
  }

  console.log(`Built to ${outPath} with base ${base}`);
}

const [,, outDir = 'dist', base = '/'] = process.argv;
build(outDir, base).catch(err => {
  console.error(err);
  process.exit(1);
});
