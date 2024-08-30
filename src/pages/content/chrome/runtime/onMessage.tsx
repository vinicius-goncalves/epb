import { UserPreferences } from '../../../../common/classes/userPreferences';
import { findNode } from '../../../../common/DOMUtils';
import { initComponent } from '../../../../common/ReactUtils';
import { waitUntil } from '../../../../common/utils';
import { ProgressProvider } from '../../../../contexts/ProgressContext';
import { Actions, CCClasses } from '../../../../ts/enums';
import ExportCannedAnswers from '../../components/features/exports/ExportCannedAnswers';
import ExportFilters from '../../components/features/exports/ExportFilters';
import ProfileEnhancement from '../../components/features/profile-enhancement/ProfileEnhancement';

const userPreferences = new UserPreferences();

chrome.runtime.onMessage.addListener(async (message) => {
	const { isPreferenceActive: isEnhanceProfilesPreferenceActive } =
		await userPreferences.getPreference('enhanceProfiles');

	if (message === 'export-filters') {
		initComponent(
			<ProgressProvider>
				<ExportFilters />
			</ProgressProvider>,
			{ topComponent: true, parent: 'ec-shell' },
		);
	}

	if (message === 'export-canned-responses') {
		initComponent(
			<ProgressProvider>
				<ExportCannedAnswers />
			</ProgressProvider>,
			{ topComponent: true, parent: 'ec-shell' },
		);
	}

	if (message === Actions.ENHANCE_PROFILE && isEnhanceProfilesPreferenceActive) {
		const userVideosProfile = (await waitUntil(
			() => {
				const userVideosProfile = findNode(CCClasses.PROFILE_VIDEO_WRAPPER);
				return userVideosProfile ? userVideosProfile : false;
			},
			{ wait: 25 },
		)) as HTMLElement;

		initComponent(<ProfileEnhancement userVideosProfile={userVideosProfile} />);
	}
});
