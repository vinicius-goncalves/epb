import { tv } from 'tailwind-variants';

interface Props {
	title: string;
	description: string;
	addCheckbox?: boolean;
}

const toolSectionTitle = tv({
	slots: {
		title: 'text-[.9rem] font-medium',
		description: 'max-w-lg text-[.70rem] text-gray-500/90',
	},
});

function ToolSectionTitle({ title, description, addCheckbox }: Props): JSX.Element {
	return (
		<div className="flex flex-col">
			<div className="flex w-full gap-2">
				{addCheckbox && <input type="checkbox" />}
				<h2 className={toolSectionTitle().title()}>{title}</h2>
			</div>
			<p className={toolSectionTitle().description()}>{description}</p>
		</div>
	);
}

export default ToolSectionTitle;
