import { useEffect, useState } from 'react';
import { Preferences, UserPreferences } from '../common/classes/userPreferences';

const userPreferences = new UserPreferences();

export function usePreferenceManager(preferenceKey: keyof Preferences) {
	const [preference, setPreference] = useState<{ isPreferenceActive: boolean } | null>(null);

	const togglePreference = () => {
		userPreferences.getPreferences().then((preferences) => {
			const oldPreferenceValue = preferences[preferenceKey] as boolean;
			const newPreferenceValue = !oldPreferenceValue;

			userPreferences.updatePreferences(preferenceKey, newPreferenceValue);
			setPreference({ isPreferenceActive: newPreferenceValue });
		});
	};

	useEffect(() => {
		userPreferences.getPreferences().then((preferences) => {
			const isPreferenceActive = preferences[preferenceKey];
			setPreference({ isPreferenceActive });
		});
	}, [preferenceKey]);

	return { isPreferenceActive: preference?.isPreferenceActive, togglePreference };
}
