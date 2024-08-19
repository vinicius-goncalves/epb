import { PropsWithChildren } from 'react';
import { tv } from 'tailwind-variants';

interface Props extends PropsWithChildren {
	isOpen: boolean;
	className?: string;
}

const modal = tv({
	base: 'absolute z-[999] flex h-screen w-screen flex-col items-center justify-center bg-black/50',
});

function ModalWrapper({ isOpen, children, className }: Props): JSX.Element {
	return <>{isOpen && <div className={modal({ className })}>{children}</div>}</>;
}

export default ModalWrapper;
