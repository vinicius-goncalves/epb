import { UserPreferences } from '../classes/userPreferences';

const preferences = new UserPreferences();

export async function isWithinAThread(url: string | URL): Promise<boolean | undefined> {
	const { isPreferenceActive } = await preferences.getPreference('threadDetection');
	if (!isPreferenceActive) return;

	const u = new URL(url);
	const href = u.href;
	return href.indexOf('thread') > -1;
}
