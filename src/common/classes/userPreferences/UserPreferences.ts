import { Entries } from '../../../ts/types/Entries.type';
import { AbstractUserPreferences, defaultPreferences, Preferences } from './index';

const storage = chrome.storage.sync;

export class UserPreferences extends AbstractUserPreferences {
	constructor() {
		super();
	}

	async savePreferences(preferences: Preferences): Promise<unknown> {
		try {
			await storage.set({ preferences });
			return preferences;
		} catch (err) {
			console.log(err);
		}
	}

	async getStoredPreferences() {
		try {
			const res = await storage.get('preferences');
			return res.preferences ?? null;
		} catch (err) {
			const res = await storage.get('preferences');
			return res.preferences ?? null;
		}
	}

	async getPreferences() {
		const preferences = await this.getStoredPreferences();

		if (!preferences) {
			await storage.set(defaultPreferences);
			return preferences;
		}

		return preferences;
	}

	async getPreference(preference: keyof Preferences) {
		const preferences = await this.getPreferences();
		const foundPreference = Object.entries(preferences as Entries<Preferences>).find(
			([k]) => k === preference,
		);

		if (!foundPreference) {
			throw new Error(`Preference "${preference}" not found.`);
		}

		const [preferenceKey, isPreferenceActive] = foundPreference;
		return { preferenceKey, isPreferenceActive: Boolean(isPreferenceActive) ?? false };
	}

	async updatePreferences(preferenceKey: keyof Preferences, newValue: boolean) {
		const currPreferences = await this.getPreferences();
		const newPreferences = { ...currPreferences, [preferenceKey]: newValue } as Preferences;

		this.savePreferences(newPreferences);
	}
}
