import { PropsWithChildren } from 'react';
import ToolSectionTitle from './ToolSectionTitle';

interface Props extends PropsWithChildren {
	title: string;
	description?: string;
}

function ToolSection({ title, description, children }: Props): JSX.Element {
	return (
		<div>
			<ToolSectionTitle
				title={title}
				description={description || ''}
			/>
			<div className="mb-3">{children}</div>
		</div>
	);
}

export default ToolSection;
