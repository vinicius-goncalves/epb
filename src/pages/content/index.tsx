import '@assets/styles/tailwind.css';
import { injectDOMScript } from '../../common/DOMUtils';
import './chrome/runtime/onMessage';
import './features/index';
import './features/lookForDefaultForum';

(() => {
	const manifest = chrome.runtime.getManifest();
	const webResources = manifest.web_accessible_resources;

	if (webResources && Array.isArray(webResources)) {
		for (const webResource of webResources) {
			const wr = webResource as { resources: string[] };
			if (Array.isArray(wr.resources)) {
				for (const resource of wr.resources) {
					if (resource.indexOf('XHRInterceptor') > -1) {
						injectDOMScript(chrome.runtime.getURL(resource));
					}
				}
			}
		}
	}
})();

window.addEventListener('EPBCustomResponse', ((ev: CustomEvent) => {
	const response = ev.detail;
	chrome.runtime.sendMessage({ action: 'epb-response', data: response });
}) as EventListener);
