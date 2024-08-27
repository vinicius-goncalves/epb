import { DefaultPreferences } from '.';

export abstract class AbstractUserPreferences {
	savePreferences?(preferences: DefaultPreferences): Promise<unknown | undefined>;
	updatePreferences?(preferenceKey: keyof DefaultPreferences, newValue: boolean): Promise<unknown>;
	abstract getPreferences(): Promise<unknown>;
}
