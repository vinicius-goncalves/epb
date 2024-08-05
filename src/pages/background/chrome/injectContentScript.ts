const url = 'https://support.google.com/*';

async function injectContentScript(tabOptions?: chrome.tabs.QueryInfo) {
	const cs = chrome.runtime.getManifest().content_scripts;

	if (!cs) {
		throw new Error(
			'[EPB] "content_scripts" property was not found in manifest.json',
		);
	}

	const q: chrome.tabs.QueryInfo = {
		...tabOptions,
		url,
		currentWindow: true,
	};

	for (const tab of await chrome.tabs.query(q)) {
		if (!tab) continue;

		await chrome.scripting.executeScript({
			files: cs[0].js || [url],
			target: { tabId: tab.id! },
			injectImmediately: true,
		});

		console.info('[EBP] Content script was injected to %s', tab.url);
	}
}

export default injectContentScript;
