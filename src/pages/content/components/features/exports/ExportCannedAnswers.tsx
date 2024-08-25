import { useEffect, useState } from 'react';
import { tv } from 'tailwind-variants';
import ModalContent from '../../../../../components/modal/ModalContent';
import ModalWrapper from '../../../../../components/modal/ModalWrapper';
import Button from '../../../../../components/ui/Button';
import { useProgressContext } from '../../../../../hooks';
import { createDownloadFile } from '../../../../../common/DOMUtils';
import { waitUntil } from '../../../../../common/utils';
import { CCElements } from '../../../../../ts/enums/cc-elements.enum';

const twClasses = tv({
	slots: {
		pulseText: 'm-auto w-full animate-pulse text-lg',
		progressStatusContainer: 'my-5 w-full min-w-9 text-center',
		flexCol: 'flex flex-col gap-2',
		flexRow: '',
	},
})();

interface ITransformedCannedResponse {
	id: ReturnType<typeof crypto.randomUUID>;
	response: string;
}

function stringifyAndFormat(target: unknown) {
	return JSON.stringify(target, null, 2);
}

function useExportProgress() {
	const [cannedResponses, setCannedResponses] = useState<HTMLElement[]>([]);
	const [transformedCannedResponses, setTransformedCannedResponses] = useState<ITransformedCannedResponse[]>([]);
	const { progress, setProgress } = useProgressContext();

	useEffect(() => {
		const getResponseContainer = async () => {
			const cbWaitUntil = () => {
				const responsesContainer = document.querySelector(CCElements.CANNED_RESPONSES_CONTAINER);
				return responsesContainer ? responsesContainer : false;
			};

			return await waitUntil(cbWaitUntil, { wait: 25 });
		};

		const getAllResponses = async (): Promise<NodeList | undefined> => {
			const responseContainer = await getResponseContainer();
			if (!(responseContainer instanceof HTMLElement)) return;

			const cbWaitUntil = () => {
				const responses = responseContainer.querySelectorAll(CCElements.CANNED_RESPONSES_ROW);
				return responses.length > 0 ? responses : false;
			};

			return (await waitUntil(cbWaitUntil, { wait: 25 })) as NodeListOf<HTMLElement>;
		};

		const handleWithResponses = async () => {
			const responses = await getAllResponses();
			if (!(responses instanceof NodeList)) return;

			const responsesToArr = [...responses] as HTMLElement[];

			setProgress((prevProgress) => ({ ...prevProgress, total: responses.length }));
			setCannedResponses((prevResponses) => [...prevResponses, ...responsesToArr]);
		};

		handleWithResponses();
	}, [setProgress]);

	useEffect(() => {
		if (cannedResponses.length === 0) return;

		const transformCannedResponses = async () => {
			for (const cannedResponse of cannedResponses) {
				const crSnippet = cannedResponse.querySelector('.snippet');
				const crStringified = stringifyAndFormat(crSnippet?.textContent || '');
				const newTransformedCannedResponse = { id: crypto.randomUUID(), response: crStringified };

				setTransformedCannedResponses((prevResponses) => [...prevResponses, newTransformedCannedResponse]);
				setProgress((prevProgress) => ({ ...prevProgress, concluded: prevProgress.concluded + 1 }));
			}
		};

		transformCannedResponses();
	}, [cannedResponses, setProgress]);

	useEffect(() => {
		if (!progress.isFinished) {
			return;
		}

		const responsesToStr = stringifyAndFormat(transformedCannedResponses)
			.replace(/\\n/g, '\n')
			.replace(/\\/g, '');

		createDownloadFile(responsesToStr, 'respostas.txt');
	}, [progress, transformedCannedResponses]);
}

const ModalExportCannedAnswersContent = ({ closeModal }: { closeModal: () => void }) => {
	useExportProgress();
	const { progress } = useProgressContext();

	const LoadingComponent = () => (
		<div className={twClasses.flexCol()}>
			<span className={twClasses.pulseText()}>Processando respostas...</span>
		</div>
	);

	const FinishedComponent = () => (
		<div>
			<div>
				<p>Um arquivo .TXT com suas respostas foi gerado e baixado automaticamente.</p>
			</div>
			<div>
				<Button title="Fechar janela" onClick={closeModal} />
			</div>
		</div>
	);

	return (
		<div className={twClasses.progressStatusContainer()}>
			{progress.isLoading && <LoadingComponent />}
			{progress.isFinished && <FinishedComponent />}
		</div>
	);
};

function ExportCannedAnswers(): JSX.Element {
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
			description: 'Suas respostas foram criadas e exportadas com sucesso.',
		}));
	}, [progress]);

	return (
		<ModalWrapper isOpen={modalProps.isOpen}>
			<ModalContent title={modalProps.title} description={modalProps.description} className="max-w-lg">
				<ModalExportCannedAnswersContent closeModal={closeModal} />
			</ModalContent>
		</ModalWrapper>
	);
}

export default ExportCannedAnswers;
