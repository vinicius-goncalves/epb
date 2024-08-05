import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import AddedBy from '../../../components/EPBLabel';
import Modal from '../../../components/modal/Modal';

function ExportFilters({ startup }: { startup: string }) {
	const [progress, setProgress] = useState({
		isLoading: true,
		isFinished: false,
		isModalOpen: true,
	});

	useEffect(() => {
		const filters = JSON.parse(startup)[1][4];

		const a = document.createElement('a');
		a.download = 'filtros';
		a.href = URL.createObjectURL(
			new Blob([JSON.stringify(filters, null, 2)]),
		);

		a.click();
		a.remove();

		setProgress((s) => ({ ...s, isFinished: true, isLoading: false }));
	}, [startup]);

	return (
		<Modal isOpen={progress.isModalOpen}>
			<div className="w-full max-w-md rounded-md bg-white p-6 shadow-sm">
				{progress.isLoading && <p>Carregando filtros...</p>}
				{progress.isFinished && (
					<div className="text-center">
						<h2 className="text-xl font-bold">Sucesso!</h2>
						<div className="my-3">
							<p className="text-lg">
								O download de seus filtros foi finalizado.
							</p>
							<small className="text-gray-500">
								Clique no botão abaixo para fechar esse modal.
							</small>
						</div>
					</div>
				)}
				<menu className="min-w-full justify-end text-center">
					<Button
						title="Finalizar"
						className="w-28 p-2"
						onClick={() =>
							setProgress((s) => ({ ...s, isModalOpen: false }))
						}
					/>
				</menu>
				<AddedBy />
			</div>
		</Modal>
	);
}

export default ExportFilters;
