import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
    image: {
      // Use Sharp for image optimization (faster and recommended)
      service: {
        entrypoint: 'astro/assets/services/sharp',
      },
    },
});