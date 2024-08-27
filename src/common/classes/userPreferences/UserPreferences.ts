import { AbstractUserPreferences, Preferences } from '.';
import { Entries } from '../../../ts/types/Entries.type';

interface PreferenceReturn {
	preferenceKey: string;
	isPreferenceActive: boolean;
}

export class UserPreferences extends AbstractUserPreferences {
	async getPreferences(): Promise<unknown> {
		const preferences = await chrome.runtime.sendMessage({ action: 'get-user-preferences' });
		return preferences as Entries<Preferences>;
	}

	async getPreference(preference: keyof Preferences): Promise<PreferenceReturn> {
		const preferences = await this.getPreferences();
		const foundPreference = Object.entries(preferences as Entries<Preferences>).find(
			([k]) => k === preference,
		);

		if (!foundPreference) {
			throw new Error(`Preference "${preference}" not found.`);
		}

		const [preferenceKey, isPreferenceActive] = foundPreference;
		return { preferenceKey, isPreferenceActive: !!isPreferenceActive ?? false };
	}
}
