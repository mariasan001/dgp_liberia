import { mkdir, readdir, rename, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const smokeRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(smokeRoot, '..', '..');
const tarballsDir = path.join(smokeRoot, 'tarballs');

function run(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: true,
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`Command failed: ${command} ${args.join(' ')}`));
    });
  });
}

await mkdir(tarballsDir, { recursive: true });

for (const entry of await readdir(tarballsDir, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.tgz')) {
    await rm(path.join(tarballsDir, entry.name));
  }
}

await run('pnpm', ['-C', 'packages/ui-wc', 'build'], repoRoot);
await run('pnpm', ['-C', 'packages/styles', 'exec', 'npm', 'pack', '--pack-destination', tarballsDir, '--cache', '.npm-cache'], repoRoot);
await run('pnpm', ['-C', 'packages/ui-wc', 'exec', 'npm', 'pack', '--pack-destination', tarballsDir, '--ignore-scripts', '--cache', '.npm-cache'], repoRoot);

const tarballs = await readdir(tarballsDir);
const stylesTarball = tarballs.find((name) => name.startsWith('mariasan001-styles-') && name.endsWith('.tgz'));
const uiTarball = tarballs.find((name) => name.startsWith('mariasan001-ui-wc-') && name.endsWith('.tgz'));

if (!stylesTarball || !uiTarball) {
  throw new Error('Expected tarballs were not generated.');
}

await rename(path.join(tarballsDir, stylesTarball), path.join(tarballsDir, 'styles.tgz'));
await rename(path.join(tarballsDir, uiTarball), path.join(tarballsDir, 'ui-wc.tgz'));
