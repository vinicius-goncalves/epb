import { useEffect, useState } from 'react';
import Modal from '../../../components/modal/Modal';

function useExportCannedAnswers() {
	const [finished, setFinished] = useState<string[]>([]);

	const [cannedAnswers, setCannedAnswers] = useState<Element[]>([]);
	const [progress, setProgress] = useState({
		canned_answers: {
			total: 0,
			loaded: 0,
			downloaded: 0,
		},
		isModalOpen: false,
	});

	useEffect(() => {
		const rows = document.querySelectorAll('ec-canned-response-row');
		const observer = new MutationObserver((mutations) => {
			for (let i = 0, j = 0; i < mutations.length; i++) {
				if (!mutations[i].addedNodes) continue;

				const addedNode = mutations[i].addedNodes[0];
				if (!(addedNode instanceof Element)) continue;
				const tagName = addedNode.tagName?.toLowerCase();
				if (tagName !== 'ec-canned-response-row') continue;

				setCannedAnswers((s) => [...s, addedNode]);
				setProgress((progress) => ({
					...progress,
					isModalOpen: true,
				}));
			}
		});

		observer.observe(document.body, { subtree: true, childList: true });
	}, []);

	useEffect(() => {
		setProgress((progress) => ({
			...progress,
			canned_answers: {
				...progress.canned_answers,
				total: cannedAnswers.length,
			},
		}));

		const answers = cannedAnswers.slice(0, 3);
		console.log(answers);

		answers.forEach((c) => {
			// const expandBtn = c.querySelector('.expand-button') as HTMLElement;
			// expandBtn.click();
			// setTimeout(() => {
			// 	const content = c.querySelector('.payload > span');
			// 	if (content) {
			// 		const elements = content.children as HTMLCollection;
			// 		const words = [...elements]
			// 			.map((div) => div.textContent)
			// 			.join('\n');
			// 		// const stringify = JSON.stringify(words);
			// 		console.log(words);
			// 	}
			// }, 300);
			// setTimeout(() => {
			// 	const content = c.querySelector('.payload > span');
			// 	const elements = content?.children as HTMLCollection;
			// 	const wordsExtracted = [...elements]
			// 		.map((div) => div.textContent + '\n')
			// 		.join(' ');
			// 	// const cleanedText = wordsExtracted
			// 	// 	.replace(/\s*\n\s*/g, ' ')
			// 	// 	.trim();
			// 	const str = JSON.stringify(wordsExtracted, null, 2);
			// 	setFinished((s) => [...s, str]);
			// 	console.log(finished);
			// }, 100);
		});
	}, [cannedAnswers, finished]);
	return { progress, finished };
}

function ExportCannedAnswers(): JSX.Element {
	const { progress, finished } = useExportCannedAnswers();

	return (
		<Modal isOpen={true}></Modal>
		// <Modal isOpen={true}>
		// 	<div className="w-full max-w-md rounded-md bg-white p-6 shadow-sm">
		// 		<div className="text-center">
		// 			<h2 className="text-xl font-bold">Em progresso...</h2>
		// 			<div className="my-3">
		// 				<p className="text-lg">
		// 					Carregado {progress.canned_answers.total} respostas.
		// 				</p>
		// 				<Button
		// 					title="Download"
		// 					onClick={() => {
		// 						setTimeout(() => {
		// 							const a = document.createElement('a');
		// 							a.href = URL.createObjectURL(
		// 								new Blob([
		// 									JSON.stringify(finished, null, 2),
		// 								]),
		// 							);
		// 							a.download = 'answers';
		// 							a.click();
		// 							a.remove();
		// 						}, 1000);
		// 					}}
		// 				/>
		// 			</div>
		// 		</div>
		// 		<AddedByEPB />
		// 	</div>
		// </Modal>
	);
}

export default ExportCannedAnswers;
