import { PropsWithChildren } from 'react';
import { tv } from 'tailwind-variants';
import LabelEPB from '../LabelEPB';

interface Props extends PropsWithChildren {
	title?: string;
	description?: string;
	className?: string;
	menuBtns?: React.ReactNode;
}

const modalContent = tv({
	slots: {
		base: 'w-full rounded-md bg-white p-6 shadow-sm',
		menu: 'min-w-full justify-end text-center',
		headerTitle: 'text-2xl font-bold text-black',
		smallDescription: 'text-sm text-gray-500',
	},
});

function ModalContent({ title, description, className, menuBtns, children }: Props): JSX.Element {
	const { base, menu, headerTitle, smallDescription } = modalContent();
	return (
		<div className={base({ className })}>
			{title && (
				<header className="mb-2.5">
					<h2 className={headerTitle()}>{title}</h2>
					<small className={smallDescription()}>{description}</small>
					<hr className="my-2.5" />
				</header>
			)}
			{children}
			<menu className={menu()}>{menuBtns}</menu>
			<LabelEPB />
		</div>
	);
}

export default ModalContent;
