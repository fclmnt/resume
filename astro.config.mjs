import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';

// GitHub Pages: served from https://fclmnt.github.io/resume
export default defineConfig({
  site: 'https://fclmnt.github.io',
  base: '/resume',
  trailingSlash: 'always',
  vite: {
    plugins: [yaml()],
  },
});
