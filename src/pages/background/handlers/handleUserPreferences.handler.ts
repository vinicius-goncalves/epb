import { Entries } from '../../../ts/types/Entries.type';
import { defaultPreferences, getStoredPreferences } from '../chrome/userPreferences';

const MAIN_GOOGLE_URL = 'https://support.google.com/*';

interface IPreferencesMapValue {
	isPreferenceActive: boolean;
	scriptPath: string;
}

const preferencesMap = new Map<string, IPreferencesMapValue>([['piiHeightLimit', <IPreferencesMapValue>{}]]);

export async function initiateUserPreferences() {
	const preferences = await getStoredPreferences();
	for (const [preference, isPreferenceActive] of Object.entries(preferences) as Entries<
		typeof defaultPreferences
	>) {
		if (isPreferenceActive && preferencesMap.has(preference)) {
			const prevPreferenceValue = preferencesMap.get(preference)!;
			preferencesMap.set(preference, { ...prevPreferenceValue, isPreferenceActive });
		}
	}

	return preferencesMap;
}

export async function handleUserPreferences() {
	const currUserPreferences = await initiateUserPreferences();

	const q: chrome.tabs.QueryInfo = {
		url: MAIN_GOOGLE_URL,
		active: true,
		currentWindow: true,
		status: 'complete',
	};

	for (const tab of await chrome.tabs.query(q)) {
		if (!tab || !tab.url) continue;

		// for (const [preference, { isPreferenceActive }] of currUserPreferences.entries()) {
		// 	if (isPreferenceActive) {
		// 		// chrome.scripting
		// 		// 	.registerContentScripts([
		// 		// 		{
		// 		// 			id: 'pii',
		// 		// 			js: [chrome.runtime.getURL(piiHeightLimit as string)],
		// 		// 			runAt: 'document_start',
		// 		// 			world: 'MAIN',
		// 		// 		},
		// 		// 	])
		// 		// 	.then((res) => console.log(res));
		// 		// chrome.scripting.executeScript({
		// 		// 	files: [piiHeightLimit],
		// 		// 	target: { tabId: tab.id! },
		// 		// });
		// 	}
		// }
	}
}

handleUserPreferences();
