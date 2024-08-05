import { PropsWithChildren } from 'react';
import { tv } from 'tailwind-variants';

interface Props extends PropsWithChildren {
	title: string;
}

const toolSectionWrapper = tv({
	slots: {
		wrapper: 'my-4 rounded-md border border-gray-400 p-5',
		title: 'mb-3 font-medium',
	},
});

function ToolSectionWrapper({ title, children }: Props): JSX.Element {
	return (
		<div className={toolSectionWrapper().wrapper()}>
			<h2 className={toolSectionWrapper().title()}>{title}</h2>
			<div>{children}</div>
		</div>
	);
}

export default ToolSectionWrapper;
