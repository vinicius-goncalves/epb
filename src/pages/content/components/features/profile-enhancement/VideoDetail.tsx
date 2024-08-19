import { tv } from 'tailwind-variants';

interface Props {
	title: string;
	description: string;
}

const videoDetails = tv({
	slots: {
		$title: 'flex flex-col items-start',
		$description: 'font-bold',
	},
});

export default function VideoDetail({ title, description }: Props) {
	const { $title, $description } = videoDetails();

	return (
		<label className={$title()}>
			<span className={$description()}>{title}</span>
			{description}
		</label>
	);
}
