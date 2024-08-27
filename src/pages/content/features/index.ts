import { findWebResourcePath } from '../../../common/ChromeExtensionUtils';
import { injectDOMScript } from '../../../common/DOMUtils';

async function initiateFeatures() {
	const preferences = await chrome.runtime.sendMessage({ action: 'get-user-preferences' });

	for (const [preference, isPreferenceActive] of Object.entries(preferences)) {
		if (!isPreferenceActive) continue;

		const path = findWebResourcePath(`${preference}.feature`)!;
		injectDOMScript(path);
	}
}

initiateFeatures();
