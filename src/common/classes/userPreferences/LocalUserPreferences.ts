import { Preferences } from '.';
import { AbstractUserPreferences } from './AbstractUserPreferences';

export class LocalUserPreferences extends AbstractUserPreferences {
	async getPreferences(): Promise<unknown> {
		const req = globalThis.localStorage?.getItem('epb_user_preferences');
		if (typeof req === 'string') {
			try {
				const preferences = JSON.parse(req);
				return preferences;
			} catch (err) {
				console.warn(err);
			}
		}
	}

	async getPreference(preference: keyof Preferences): Promise<unknown> {
		const preferences = (await this.getPreferences()) as Preferences;
		const preferenceFound = preferences[preference];
		return { isPreferenceActive: preferenceFound };
	}
}
