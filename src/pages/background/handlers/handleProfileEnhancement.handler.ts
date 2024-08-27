import { Actions } from '../../../ts/enums';

const CC_PROFILE_URL = 'https://support.google.com/s/community/user/*';

function sendAction(tabId: number, actions: Actions | string) {
	chrome.tabs.sendMessage(tabId, actions);
}

async function handleProfileEnhancement() {
	const q: chrome.tabs.QueryInfo = {
		status: 'complete',
		currentWindow: true,
		url: CC_PROFILE_URL,
		active: true,
	};

	for (const tab of await chrome.tabs.query(q)) {
		if (!tab || !tab.id) continue;

		sendAction(tab.id!, Actions.ENHANCE_PROFILE);
	}
}

export default handleProfileEnhancement;
