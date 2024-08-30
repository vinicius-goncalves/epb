import { LocalUserPreferences, UserPreferences } from '../../../common/classes/userPreferences';
import { getExtensionContext } from '../../../common/utils/getExtensionContext';
const { ContextType } = chrome.runtime;

const preferences = new (
	getExtensionContext() === ContextType.BACKGROUND ? UserPreferences : LocalUserPreferences
)();

export async function debugConsole(message: string, { epbPrefix = true }: { epbPrefix?: boolean } = {}) {
	const preference = (await preferences.getPreference('showDebugInformation')) as {
		isPreferenceActive: boolean;
	};

	if (preference.isPreferenceActive) {
		console.log(`${epbPrefix ? '[EPB]' : ''} ${message}`);
	}
}
