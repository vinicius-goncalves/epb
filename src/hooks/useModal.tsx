import { PropsWithChildren, useCallback, useMemo, useRef, useState } from 'react';
import ModalContent from '../components/modal/ModalContent';
import ModalWrapper from '../components/modal/ModalWrapper';

export interface ModalProps {
	isOpen: boolean;
	title?: string;
	description?: string;
	className?: string;
	menuBtns?: React.ReactNode;
}

interface IUseModal {
	Modal: ({ children }: PropsWithChildren) => JSX.Element;
	modalProps: ModalProps;

	setModalProps: React.Dispatch<React.SetStateAction<ModalProps>>;
	closeModal: () => void;
}

export function useModal(): IUseModal {
	const [modalProps, setModalProps] = useState<ModalProps>({} as ModalProps);
	const childrenRef = useRef<React.ReactNode>(null);

	const { isOpen, ...contentProps } = modalProps;

	const closeModal = useCallback(() => {
		setModalProps((prevProps) => ({ ...prevProps, isOpen: false }));
	}, []);

	const Modal = useMemo(() => {
		return ({ children }: PropsWithChildren) => {
			// Store children in ref to avoid re-rendering
			if (isOpen && !childrenRef.current) {
				childrenRef.current = children;
			}

			return (
				<ModalWrapper isOpen={isOpen}>
					{isOpen && <ModalContent {...contentProps}>{childrenRef.current}</ModalContent>}
				</ModalWrapper>
			);
		};
	}, [isOpen, contentProps]);

	return { setModalProps, closeModal, modalProps, Modal };
}
