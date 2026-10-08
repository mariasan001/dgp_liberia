import { rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const smokeRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(smokeRoot, '..', '..');
const storeDir = path.join(repoRoot, '.pnpm-store');

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

for (const projectName of ['vite-react', 'next-app']) {
  const projectDir = path.join(smokeRoot, projectName);
  await rm(path.join(projectDir, 'node_modules'), { recursive: true, force: true });
  await run('pnpm', ['install', '--no-frozen-lockfile', '--ignore-workspace', '--store-dir', storeDir], projectDir);
}
