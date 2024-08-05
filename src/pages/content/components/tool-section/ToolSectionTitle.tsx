import { tv } from 'tailwind-variants';

interface Props {
	title: string;
	description: string;
}

const toolSectionTitle = tv({
	slots: {
		title: 'text-[.9rem] font-medium',
		description: 'max-w-lg text-[.70rem] text-gray-500/90',
	},
});

function ToolSectionTitle({ title, description }: Props): JSX.Element {
	return (
		<hgroup>
			<h2 className={toolSectionTitle().title()}>{title}</h2>
			<p className={toolSectionTitle().description()}>{description}</p>
		</hgroup>
	);
}

export default ToolSectionTitle;
