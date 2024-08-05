const primaryUrl = 'https://support.google.com/s/community/user/*';

function attachTab(tabId: number) {
	return chrome.debugger.attach({ tabId }, '1.3');
}

function sendNetworkCommand(tabId: number) {
	return chrome.debugger.sendCommand({ tabId }, 'Network.enable');
}

async function handleVideosResponses() {
	const q: chrome.tabs.QueryInfo = {
		status: 'complete',
		active: true,
		currentWindow: true,
		url: primaryUrl,
	};

	for (const tab of await chrome.tabs.query(q)) {
		if (!tab || !tab.url) return;

		const tabId = tab.id!;
		await Promise.all([attachTab(tabId), sendNetworkCommand(tabId)]);
	}
}

export default handleVideosResponses;
