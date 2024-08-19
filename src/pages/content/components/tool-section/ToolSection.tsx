import { PropsWithChildren } from 'react';
import ToolSectionTitle from './ToolSectionTitle';

interface Props extends PropsWithChildren {
	title: string;
	description?: string;
	addedCheckbox?: boolean;
}

function ToolSection({
	title,
	description,
	addedCheckbox,
	children,
}: Props): JSX.Element {
	return (
		<div>
			<ToolSectionTitle
				title={title}
				description={description || ''}
				addCheckbox={addedCheckbox}
			/>
			<div className="mb-3">{children}</div>
		</div>
	);
}

export default ToolSection;
