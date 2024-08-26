import { findWebResourcePath } from '../../../common/ChromeExtensionUtils';
import { injectDOMScript } from '../../../common/DOMUtils';

interface IPreferencesMapValue {
	isPreferenceActive: boolean;
	scriptPath: string;
}

const preferencesMap = new Map<string, IPreferencesMapValue>([['piiHeightLimit', <IPreferencesMapValue>{}]]);

function initiateFeatures() {
	chrome.runtime.sendMessage({ action: 'get-user-preferences' }).then((res) => {
		for (const [preference, isPreferenceActive] of Object.entries(res)) {
			if (isPreferenceActive && preferencesMap.has(preference)) {
				const path = findWebResourcePath(`${preference}.feature`)!;
				injectDOMScript(path);
			}
		}
	});
}

initiateFeatures();
