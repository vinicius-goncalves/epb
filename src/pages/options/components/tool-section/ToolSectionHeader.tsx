import { tv } from 'tailwind-variants';

interface Props {
	title: string;
	description: string;
	showCheckbox?: boolean;
	checked?: boolean;
	updateCheckboxValue?: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
}

const toolSectionTitle = tv({
	slots: {
		flexCol: 'flex flex-col',
		flexWidth: 'flex w-full gap-2',
		title: 'text-[.9rem] font-medium',
		description: 'max-w-lg text-[.70rem] text-gray-500/90',
	},
});

function ToolSectionHeader({
	title,
	description,
	showCheckbox,
	checked,
	updateCheckboxValue,
}: Props): JSX.Element {
	return (
		<div className={toolSectionTitle().flexCol()}>
			<div className={toolSectionTitle().flexWidth()}>
				{showCheckbox && <input type="checkbox" onChange={updateCheckboxValue} checked={checked} />}
				<h2 className={toolSectionTitle().title()}>{title}</h2>
			</div>
			<p className={toolSectionTitle().description()}>{description}</p>
		</div>
	);
}

export default ToolSectionHeader;
