import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  },
  output: 'static'
  // When the portfolio has a real domain, add: site: 'https://your-domain.tld'
  // (it enables canonical URLs and absolute Open Graph image URLs).
});
