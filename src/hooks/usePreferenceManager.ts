import { useEffect, useState } from 'react';
import {
	defaultPreferences,
	getUserPreferences,
	updateUserPreferences,
} from '../pages/background/chrome/userPreferences';

export function usePreferenceManager(preferenceKey: keyof typeof defaultPreferences) {
	const [preference, setPreference] = useState<{ isPreferenceActive: boolean } | null>(null);

	const togglePreference = () => {
		getUserPreferences().then((preferences) => {
			const oldPreferenceValue = preferences[preferenceKey] as boolean;
			const newPreferenceValue = !oldPreferenceValue;

			updateUserPreferences(preferenceKey, newPreferenceValue);
			setPreference((prevState) => ({ ...prevState, isPreferenceActive: newPreferenceValue }));
		});
	};

	useEffect(() => {
		getUserPreferences().then((preferences) => {
			const isActive = preferences[preferenceKey];
			setPreference((prevState) => ({ ...prevState, isPreferenceActive: isActive }));
		});
	}, [preferenceKey]);

	return { isPreferenceActive: preference?.isPreferenceActive, togglePreference };
}
