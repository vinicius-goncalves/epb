import { findWebResourcePath } from '../../../common/ChromeExtensionUtils';
import { UserPreferences } from '../../../common/classes/userPreferences';
import { injectDOMScript } from '../../../common/DOMUtils';

const userPreferences = new UserPreferences();

async function initFeatures() {
	const preferences = await userPreferences.getPreferences();
	for (const [preference, isPreferenceActive] of Object.entries(preferences)) {
		if (!isPreferenceActive) continue;
		const path = findWebResourcePath(`${preference}.feature`)!;
		injectDOMScript(path);
	}
}

initFeatures();
