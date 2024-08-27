import { findNode } from '../../../../common/DOMUtils';
import { initComponent } from '../../../../common/ReactUtils';
import { waitUntil } from '../../../../common/utils';
import { ProgressProvider } from '../../../../contexts/ProgressContext';
import { Actions, CCClasses } from '../../../../ts/enums';
import ExportCannedAnswers from '../../components/features/exports/ExportCannedAnswers';
import ExportFilters from '../../components/features/exports/ExportFilters';
import ProfileEnhancement from '../../components/features/profile-enhancement/ProfileEnhancement';

chrome.runtime.onMessage.addListener(async (message) => {
	if (message === 'export-filters') {
		initComponent(
			<ProgressProvider>
				<ExportFilters />
			</ProgressProvider>,
			{ topComponent: true },
		);
	}

	if (message === 'export-canned-responses') {
		initComponent(
			<ProgressProvider>
				<ExportCannedAnswers />
			</ProgressProvider>,
			{ topComponent: true },
		);
	}

	if (message === Actions.ENHANCE_PROFILE) {
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
