import { resolve } from 'path';
import { defineConfig } from 'vite';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const assetsDir = resolve(root, 'assets');

export default defineConfig({
	resolve: {
		alias: {
			'@src': root,
			'@assets': assetsDir,
			'@pages': resolve(outDir, 'pages'),
			'@dist': outDir,
		},
	},
	build: {
		emptyOutDir: false,
		rollupOptions: {
			input: 'src/pages/content/index.tsx',
			output: {
				entryFileNames: 'src/pages/content/[name].js',
				format: 'iife',
				inlineDynamicImports: true,
			},
		},
		outDir,
	},
});
