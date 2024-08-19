import { useEffect } from 'react';
import { getEPBResponses } from '../../../../common/ChromeExtensionUtils';
import { initComponent } from '../../../../common/ReactUtils';
import { EPBResponse } from '../../../../ts/types/EPBResponse';
import EnhancedVideoProfile from './EnhancedVideoProfile';

interface Props {
	userVideosProfile: HTMLElement;
}

function initEPBContainer(wrapper: HTMLElement) {
	const container = document.createElement('div');
	container.classList.add('epb-container');
	container.style.setProperty('width', '100%');

	wrapper.style.setProperty('height', 'fit-content');
	wrapper.appendChild(container);

	return container;
}

async function filterYouTubeAPIResponses() {
	const epbResponses = await getEPBResponses();
	const responsesFiltered = epbResponses.filter((r: EPBResponse) => 'items' in (r.response as object));
	return responsesFiltered;
}

async function getUserVideoDetails() {
	const youtubeApiResponses = await filterYouTubeAPIResponses();

	const videoDetails = youtubeApiResponses.map((responseFiltered: EPBResponse) => {
		const { response, responseUrl } = responseFiltered as EPBResponse<{
			items: Array<unknown>;
		}>;

		const details = response.items[0] as {
			contentDetails: object;
			snippet: object;
			statistics: object;
		};

		return {
			...details,
			videoId: new URL(responseUrl).searchParams.get('id') as string,
		};
	});

	return videoDetails;
}

function ProfileEnhancement({ userVideosProfile }: Props): null {
	useEffect(() => {
		(async () => {
			const videoDetails = await getUserVideoDetails();

			for (const detail of videoDetails) {
				const { videoId } = detail;

				const videoWrapper = userVideosProfile.querySelector(`[data-videoid="${videoId}"]`);

				if (!videoWrapper) continue;

				const EPBContainer = videoWrapper.querySelector('.epb-container');

				if (EPBContainer) {
					EPBContainer.remove();
				}

				const newEPBContainer = initEPBContainer(videoWrapper as HTMLElement);

				const { statistics, snippet } = detail;

				const videoDetails = {
					...statistics,
					...snippet,
					videoId,
				} as {
					videoId: string;
					channelTitle: string;
					publishedAt: string;
					viewCount: number;
				};

				initComponent(<EnhancedVideoProfile videoDetails={videoDetails} />, { container: newEPBContainer });
			}
		})();
	}, [userVideosProfile]);

	return null;
}

export default ProfileEnhancement;
