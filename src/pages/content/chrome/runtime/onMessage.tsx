import { ProgressProvider } from '../../../../contexts/ProgressContext';
import { findNode } from '../../../common/DOMUtils';
import { initComponent } from '../../../common/ReactUtils';
import { waitUntil } from '../../../common/utils';
import Actions from '../../../ts/enums/actions.enum';
import CCC from '../../../ts/enums/cc-classes.enum';
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
				const userVideosProfile = findNode(CCC.PROFILE_VIDEO_WRAPPER);
				return userVideosProfile ? userVideosProfile : false;
			},
			{ wait: 25 },
		)) as HTMLElement;

		initComponent(<ProfileEnhancement userVideosProfile={userVideosProfile} />);
	}
});
