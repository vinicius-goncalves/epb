const manifest = chrome.runtime.getManifest();
const webResources = manifest.web_accessible_resources;

export function findWebResourcePath(value: string) {
	if (!webResources || !Array.isArray(webResources)) {
		throw new Error('"Web Resources" property in manifest.json was not found or is not an array.');
	}

	for (const webResource of webResources) {
		const wr = webResource as { resources: string[] };
		const resources = wr.resources;

		if (!Array.isArray(resources)) continue;

		for (const resource of wr.resources) {
			if (resource.indexOf(value) > -1) {
				return chrome.runtime.getURL(resource);
			}
		}
	}
}
