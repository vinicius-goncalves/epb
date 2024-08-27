import { defineManifest, ManifestV3Export } from '@crxjs/vite-plugin';
import _manifest from './manifest.json';

export function _defineContentScripts(paths: string[], options?: { relativePath?: string }) {
	return options ? paths.map((path) => `${options.relativePath}/${path}`) : paths;
}

const featuresContentScripts = _defineContentScripts(['piiHeightLimit.feature.ts'], {
	relativePath: 'src/pages/content/features',
});

const content_scripts: Partial<ManifestV3Export> = {
	content_scripts: [{ js: featuresContentScripts, matches: ['support.google.com/*'] }],
};

const manifest = defineManifest({ ..._manifest, ...content_scripts } as ManifestV3Export);

export default manifest;
