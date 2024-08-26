import { tv } from 'tailwind-variants';

interface Props {
	name: string;
	description: string;
	showCheckbox?: boolean;
	checked?: boolean;
	updateCheckboxValue?: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
}

const tool = tv({
	base: 'rounded-full px-4 py-1 text-sm font-semibold text-white active:opacity-80',
	slots: {
		name: 'text-[.9rem] font-medium',
		description: 'max-w-lg text-[.70rem] text-gray-500/90',
		status: '',
	},
});

const status = tv({
	variants: {
		status: {
			active: 'text-blue-500',
			inactive: 'text-red-500',
		},
	},
});

function ToolSectionHeader({ name, description, showCheckbox, checked, updateCheckboxValue }: Props): JSX.Element {
	const ToolStatus = () => (
		<small className={status({ status: checked ? 'active' : 'inactive' })}>
			({checked ? 'Ativado' : 'Desativado'})
		</small>
	);

	return (
		<div className="flex flex-col">
			<header className="flex w-full gap-2">
				{showCheckbox && <input type="checkbox" onChange={updateCheckboxValue} checked={checked} />}
				<h2 className={tool().name()}>{name}</h2>
				{showCheckbox && <ToolStatus />}
			</header>
			<p className={tool().description()}>{description}</p>
		</div>
	);
}

export default ToolSectionHeader;
