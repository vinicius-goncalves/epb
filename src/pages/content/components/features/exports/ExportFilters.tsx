import { useEffect, useState } from 'react';
import { createDownloadFile } from '../../../../../common/DOMUtils';
import ModalContent from '../../../../../components/modal/ModalContent';
import ModalWrapper from '../../../../../components/modal/ModalWrapper';
import Button from '../../../../../components/ui/Button';
import { useProgressContext } from '../../../../../hooks';

function useExportProgress() {
	const { setProgress } = useProgressContext();
	const startup = document.querySelector('html')?.dataset.startup;

	useEffect(() => {
		const filters = JSON.parse(startup as unknown as string)[1][4];
		createDownloadFile(JSON.stringify(filters, null, 2), 'filtros.json');
		setProgress((prevProgress) => ({ ...prevProgress, isFinished: true, isLoading: false }));
	}, [setProgress, startup]);
}

function ModalExportFiltersContent({ closeModal }: { closeModal: () => void }) {
	useExportProgress();
	const { progress } = useProgressContext();

	const FinishedComponent = () => (
		<div>
			<div>
				<p>Um arquivo .JSON com seus filtros foi gerado e baixado automaticamente.</p>
			</div>
			<div>
				<Button title="Fechar janela" onClick={closeModal} />
			</div>
		</div>
	);

	return (
		<div className="my-5 w-full min-w-9 text-center">
			{progress.isLoading && <p>Carregando filtros...</p>}
			{progress.isFinished && <FinishedComponent />}
		</div>
	);
}

function ExportFilters() {
	const { progress } = useProgressContext();
	const [modalProps, setModalProps] = useState<{ title: string; description: string; isOpen: boolean }>({
		isOpen: true,
		title: 'Em processo',
		description: 'O processo está em andamento...',
	});

	const closeModal = () => {
		setModalProps((prevProps) => ({ ...prevProps, isOpen: false }));
	};

	useEffect(() => {
		if (!progress.isFinished) {
			return;
		}

		setModalProps((prevProps) => ({
			...prevProps,
			title: 'Processo finalizado',
			description: 'Seus filtros foram exportados com sucesso.',
		}));
	}, [progress]);

	return (
		<ModalWrapper isOpen={modalProps.isOpen}>
			<ModalContent title={modalProps.title} description={modalProps.description} className="max-w-lg">
				<ModalExportFiltersContent closeModal={closeModal} />
			</ModalContent>
		</ModalWrapper>
	);
}

export default ExportFilters;
