import Actions from '../../ts/enums/actions.enum';

const primaryUrl = 'https://support.google.com/*';

function hasExport(searchParams: URLSearchParams) {
	return searchParams.has('export') && searchParams.get('export') == 'true';
}

function isValidExportPage(url: URL) {
	const pathname = url.pathname.split('/')[3];
	return ['settings', 'cannedresponses'].includes(pathname);
}

function sendAction(tabId: number, actions: Actions | string) {
	chrome.tabs.sendMessage(tabId, actions);
}

async function handleExports() {
	const q: chrome.tabs.QueryInfo = {
		status: 'complete',
		active: true,
		currentWindow: true,
		url: primaryUrl,
	};

	for (const tab of await chrome.tabs.query(q)) {
		if (!tab || !tab.url) continue;

		const url = new URL(tab.url);
		const searchParams = url.searchParams;

		if (!hasExport(searchParams) || !isValidExportPage(url)) return;

		const content = searchParams.get('content');
		const tabId = tab.id!;

		switch (content) {
			case 'filters':
				sendAction(tabId, 'export-filters');
				break;

			case 'cannedresponses':
				sendAction(tabId, 'export-canned-responses');
				break;
		}
	}
}

export default handleExports;
