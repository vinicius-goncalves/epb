import { UserPreferences } from '../../../common/classes/userPreferences/UserPreferences';

const preferences = new UserPreferences();

export async function debugConsole(message: string, { epbPrefix = true }: { epbPrefix?: boolean } = {}) {
	const { isPreferenceActive } = await preferences.getPreference('showDebugInformation');
	if (!isPreferenceActive) return;

	console.log(`${epbPrefix ? '[EPB]' : ''} ${message}`);
}
