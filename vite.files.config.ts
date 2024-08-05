import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const root = resolve(__dirname, 'src');
const pagesDir = resolve(root, 'pages');
const publicDir = resolve(__dirname, 'public');
const outDir = resolve(__dirname, 'dist');

const srcDist = resolve(outDir, 'src');

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@src': root,
			'@pages': pagesDir,
			'@dist': outDir,
			'@src_dist': srcDist,
		},
	},
	publicDir,
	build: {
		outDir,
		emptyOutDir: false,
		rollupOptions: {
			input: {
				default_forum: '@pages/content/default-forum.ts',
			},
			output: {
				entryFileNames() {
					return 'assets/[name].js';
				},
			},
		},
	},
});
