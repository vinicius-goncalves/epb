import { PropsWithChildren } from 'react';
import ToolSectionHeader from './ToolSectionHeader';

interface Props extends PropsWithChildren {
	name: string;
	description?: string;
	showCheckbox?: boolean;
	checked?: boolean;
	updateCheckboxValue?: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
}

function ToolSection({
	name,
	description,
	showCheckbox = true,
	checked = false,
	updateCheckboxValue,
	children,
}: Props): JSX.Element {
	return (
		<div>
			<ToolSectionHeader
				name={name}
				description={description || ''}
				showCheckbox={showCheckbox}
				checked={checked}
				updateCheckboxValue={updateCheckboxValue}
			/>
			<div className="mb-3">{children}</div>
		</div>
	);
}

export default ToolSection;
