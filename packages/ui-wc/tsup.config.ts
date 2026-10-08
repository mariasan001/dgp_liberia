import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  // No borrar dist en cada build: Next.dev se cae / pierde el modulo
  // mientras tsup limpia la carpeta.
  clean: false,
  outDir: 'dist',
  target: 'es2020',
  splitting: false, // ✅ 1 solo bundle para librería
});
