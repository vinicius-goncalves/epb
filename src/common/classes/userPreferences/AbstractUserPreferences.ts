import { Preferences } from '.';

export abstract class AbstractUserPreferences {
	savePreferences?(preferences: Preferences): Promise<unknown | undefined>;
	updatePreferences?(preferenceKey: keyof Preferences, newValue: boolean): Promise<unknown>;
	getStoredPreferences?(): Promise<void>;

	abstract getPreferences(): Promise<unknown>;
	abstract getPreference(preference: keyof Preferences): Promise<unknown>;
}
