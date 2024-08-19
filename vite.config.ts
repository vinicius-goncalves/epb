import { crx, ManifestV3Export } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import manifest from './manifest.json';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const assetsDir = resolve(root, 'assets');
const pagesDir = resolve(root, 'pages');

export default defineConfig({
	plugins: [react(), crx({ manifest: manifest as ManifestV3Export })],
	resolve: {
		alias: {
			'@assets': assetsDir,
			'@pages': pagesDir,
		},
	},
	build: {
		outDir,
		emptyOutDir: false,
	},
});
