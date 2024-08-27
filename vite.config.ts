import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import manifest from './manifest.config';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const assetsDir = resolve(root, 'assets');
const pagesDir = resolve(root, 'pages');
const featuresDir = resolve(pagesDir, 'content', 'features');

export default defineConfig({
	plugins: [crx({ manifest }), react()],
	resolve: {
		alias: {
			'@assets': assetsDir,
			'@pages': pagesDir,
			'@features': featuresDir,
		},
	},
	build: {
		outDir,
		emptyOutDir: false,
	},
});
