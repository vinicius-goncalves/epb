import { defineManifest, ManifestV3Export } from '@crxjs/vite-plugin';
import _manifest from './manifest.json';

export function _defineContentScripts(paths: (() => string[]) | string[], relativePath?: string) {
	const resolvedPaths = typeof paths === 'function' ? paths() : paths;
	return relativePath ? resolvedPaths.map((path) => `${relativePath}/${path}`) : resolvedPaths;
}

const featuresContentScripts = _defineContentScripts(['piiHeightLimit.feature.ts'], 'src/pages/content/features');

const manifest = defineManifest({
	..._manifest,
	content_scripts: [
		..._manifest.content_scripts,
		{ js: featuresContentScripts, matches: ['https://support.google.com/*'], world: 'MAIN' },
	],
} as ManifestV3Export);

export default manifest;
