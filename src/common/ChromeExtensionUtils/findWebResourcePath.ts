const manifest = chrome.runtime.getManifest();
const webResources = manifest.web_accessible_resources;

export function findWebResourcePath(value: string) {
	if (webResources && Array.isArray(webResources)) {
		for (const webResource of webResources) {
			const wr = webResource as { resources: string[] };
			if (Array.isArray(wr.resources)) {
				for (const resource of wr.resources) {
					if (resource.indexOf(value) > -1) {
						return chrome.runtime.getURL(resource);
					}
				}
			}
		}
	}
}
