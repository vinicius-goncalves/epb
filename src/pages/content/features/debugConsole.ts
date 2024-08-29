import { UserPreferences } from '../../../common/classes/userPreferences';

const preferences = new UserPreferences();

export async function debugConsole(message: string, { epbPrefix = true }: { epbPrefix?: boolean } = {}) {
	const preference = await preferences.getPreference('showDebugInformation');

	if (preference.isPreferenceActive) {
		console.log(`${epbPrefix ? '[EPB]' : ''} ${message}`);
	}
}
