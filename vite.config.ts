import { resolve } from 'path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte(),
		VitePWA({
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
			},
			// devOptions: {
			// 	enabled: true,
			// },
		}),
	],
	resolve: {
		alias: {
			src: resolve(__dirname, './src'),
		},
	},
});
