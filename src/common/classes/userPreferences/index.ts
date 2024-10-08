export const defaultPreferences = {
	threadDetection: false,
	piiHeightLimit: false,
	enhanceProfiles: false,
	enhanceThreads: false,
	advancedExportMode: false,
	showDebugInformation: false,
};

export type Preferences = typeof defaultPreferences;

export { AbstractUserPreferences } from './AbstractUserPreferences';
export { LocalUserPreferences } from './LocalUserPreferences';
export { UserPreferences } from './UserPreferences';
