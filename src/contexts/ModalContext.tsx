import { createContext, PropsWithChildren, useState } from 'react';
import ModalContent from '../components/modal/ModalContent';
import ModalWrapper from '../components/modal/ModalWrapper';

export interface ModalContextProps {
	isOpen: boolean;
	title?: string;
	description?: string;
	className?: string;
	menuBtns?: React.ReactNode;
}

export interface ModalContextType {
	modalProps: ModalContextProps;
	setModalProps: React.Dispatch<React.SetStateAction<ModalContextProps>>;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: PropsWithChildren) {
	const [modalProps, setModalProps] = useState<ModalContextProps>({ isOpen: false });

	return (
		<ModalContext.Provider value={{ modalProps, setModalProps }}>
			<ModalWrapper isOpen={modalProps.isOpen}>
				<ModalContent>{children}</ModalContent>
			</ModalWrapper>
		</ModalContext.Provider>
	);
}
