import { Preferences } from '.';
import { AbstractUserPreferences } from './AbstractUserPreferences';

export class LocalUserPreferences extends AbstractUserPreferences {
	async loadStoredPreferences(): Promise<void> {
		const { preferences } = await chrome.storage.sync.get('preferences');
		localStorage.setItem('epb-user-preferences', JSON.stringify(preferences));
	}

	async getPreferences(): Promise<unknown> {
		await this.loadStoredPreferences();

		const req = localStorage.getItem('epb-user-preferences');
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
		return preferences[preference];
	}
}

const a = new LocalUserPreferences();
a.getPreferences().then((res) => {
	console.log(res);
});
