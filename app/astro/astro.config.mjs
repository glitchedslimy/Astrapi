import { defineConfig } from 'astro/config';
import nodejs from '@astrojs/node'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
// https://astro.build/config
export default defineConfig({
    adapter: nodejs({
        mode: 'middleware'
    }),
    output: 'hybrid',
    integrations: [react(), tailwind()]
});
