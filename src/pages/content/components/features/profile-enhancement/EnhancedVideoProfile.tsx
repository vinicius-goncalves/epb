import { useEffect, useState } from 'react';
import { tv } from 'tailwind-variants';
import LabelEPB from '../../../../../components/LabelEPB';
import VideoDetail from './VideoDetail';

interface Props {
	videoDetails: {
		videoId: string;
		channelTitle: string;
		publishedAt: string;
		viewCount: number;
	};
}

interface Details {
	key: string;
	title: string;
	detail?: unknown;
}

const enhancedVideoProfile = tv({
	slots: {
		container: 'hover:white z-[998] m-3.5 rounded-md border border-gray-500/50 p-5 shadow-md',
		title: 'text-start text-gray-500',
		detailsWrapper: 'flex min-h-fit w-full flex-col gap-3 rounded-md text-center',
		redirectVideoBtn: 'w-full rounded-md border border-blue-500 p-2',
	},
});

const SeeOnYouTubeBtn = ({ videoId }: { videoId: string }): JSX.Element => {
	return (
		<a
			href={`https://youtube.com/watch?v=${videoId}`}
			role="button"
			className={enhancedVideoProfile().redirectVideoBtn()}
			target="_blank"
			rel="noopener noreferrer">
			Ver vídeo no YouTube ↗
		</a>
	);
};

const DetailsContent = ({ details, videoId }: { details: Details[]; videoId: string }) => {
	return (
		<>
			{details.map(({ title, detail }) => (
				<VideoDetail
					title={title}
					description={String(detail)}
				/>
			))}
			<SeeOnYouTubeBtn videoId={videoId} />
		</>
	);
};

export default function EnhancedVideoProfile({ videoDetails }: Props) {
	const [details, setDetails] = useState<Details[]>([
		{ key: 'videoId', title: 'ID' },
		{ key: 'channelTitle', title: 'Nome do canal' },
		{ key: 'publishedAt', title: 'Data de publicação' },
		{ key: 'viewCount', title: 'Visualizações (exatas)' },
	]);

	const { title, container, detailsWrapper } = enhancedVideoProfile();

	useEffect(() => {
		setDetails((prevDetails) =>
			prevDetails.map((d) => ({
				...d,
				detail: videoDetails[d.key as keyof Props['videoDetails']],
			})),
		);
	}, [videoDetails]);

	return (
		<div
			className={container()}
			onClick={(ev) => ev.stopPropagation()}>
			<h2 className={title()}>Detalhes do vídeo</h2>
			<hr className="my-3" />
			<div className={detailsWrapper()}>
				<DetailsContent
					details={details}
					videoId={videoDetails.videoId}
				/>
			</div>
			<LabelEPB useLogo={false} />
		</div>
	);
}
