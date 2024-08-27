import { AbstractUserPreferences, defaultPreferences, DefaultPreferences } from './index';

const storage = chrome.storage.sync;

export class ChromeStorageUserPreferences extends AbstractUserPreferences {
	constructor() {
		super();
	}

	async savePreferences(preferences: DefaultPreferences): Promise<unknown> {
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
			console.log(err);
		}
	}

	async getPreferences() {
		const preferences = await this.getStoredPreferences();

		if (!preferences) {
			await storage.set(defaultPreferences);
			return preferences;
		}
	}

	async updatePreferences(preferenceKey: keyof DefaultPreferences, newValue: boolean) {
		const currPreferences = await this.getPreferences();
		const newPreferences = { ...currPreferences, [preferenceKey]: newValue } as DefaultPreferences;

		this.savePreferences(newPreferences);
	}
}
