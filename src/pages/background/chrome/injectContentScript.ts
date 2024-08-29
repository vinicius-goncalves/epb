import { debugConsole } from '../../content/features/debugConsole';

const MAIN_GOOGLE_URL = 'https://support.google.com/*';

async function injectContentScript(tabOptions?: chrome.tabs.QueryInfo) {
	const cs = chrome.runtime.getManifest().content_scripts;

	if (!cs) {
		throw new Error('[EPB] "content_scripts" property was not found in manifest.json');
	}

	const q: chrome.tabs.QueryInfo = {
		...tabOptions,
		url: MAIN_GOOGLE_URL,
		currentWindow: true,
	};

	for (const tab of await chrome.tabs.query(q)) {
		if (!tab) continue;

		await chrome.scripting.executeScript({
			files: cs[0].js || [MAIN_GOOGLE_URL],
			target: { tabId: tab.id! },
		});

		debugConsole(`Content script was injected to ${tab.url}`);
	}
}

export default injectContentScript;
