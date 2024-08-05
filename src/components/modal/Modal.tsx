import { PropsWithChildren } from 'react';
import { tv } from 'tailwind-variants';
import ModalContent from './ModalContent';

interface Props extends PropsWithChildren {
	isOpen: boolean;
	menuBtns?: React.ReactNode;
}

const modal = tv({
	base: 'z-50 flex h-screen w-screen flex-col items-center justify-center bg-black/50 opacity-90',
});

function Modal({ isOpen, menuBtns, children }: Props): JSX.Element {
	return (
		<>
			{isOpen && (
				<div className={modal()}>
					<ModalContent menuBtns={menuBtns}>{children}</ModalContent>
				</div>
			)}
		</>
	);
}

export default Modal;
