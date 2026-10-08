import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const smokeRoot = path.resolve(__dirname, '..');
const viteRoot = path.join(smokeRoot, 'vite-react');

const child = spawn('pnpm', ['--dir', viteRoot, '--ignore-workspace', 'dev', '--', '--host', '127.0.0.1'], {
  cwd: viteRoot,
  stdio: 'inherit',
  shell: true,
});

try {
  const ready = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(true), 8000);

    child.once('exit', (code) => {
      clearTimeout(timer);
      reject(new Error(`Vite dev server exited early with code ${code ?? 'unknown'}.`));
    });
  });

  if (!ready) {
    throw new Error('Vite dev server did not stay up long enough.');
  }
} finally {
  child.kill('SIGTERM');
  await new Promise((resolve) => child.once('exit', resolve));
}
