export const defaultPreferences = {
	threadDetection: false,
	piiHeightLimit: false,
	enhanceProfiles: false,
	enhanceThreads: false,
	advancedExportMode: false,
	showDebugInformation: false,
};

const storage = chrome.storage.sync;

async function savePreferences(preferences: typeof defaultPreferences) {
	try {
		await storage.set({ preferences });
	} catch (err) {
		console.log(err);
	}
}

async function getStoredPreferences() {
	try {
		const res = await storage.get('preferences');
		return res.preferences ?? null;
	} catch (err) {
		console.log(err);
	}
}

export async function getUserPreferences() {
	const preferences = await getStoredPreferences();

	if (!preferences) {
		await storage.set(defaultPreferences);
		return defaultPreferences;
	}

	return preferences;
}

export async function updateUserPreferences(preferenceKey: keyof typeof defaultPreferences, newValue: boolean) {
	const currPreferences = await getUserPreferences();
	const newPreferences = { ...currPreferences, [preferenceKey]: newValue };

	savePreferences(newPreferences);
}
