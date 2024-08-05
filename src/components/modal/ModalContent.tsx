import { PropsWithChildren } from 'react';
import { tv } from 'tailwind-variants';
import EPBLabel from '../EPBLabel';

{
	/* <Modal isOpen={true}>
			<div className="w-full max-w-md rounded-md bg-white p-6 shadow-sm">
				<div className="text-center">
					<h2 className="text-xl font-bold">Em progresso...</h2>
					<div className="my-3">
						<p className="text-lg">
							Carregado {progress.canned_answers.total} respostas.
						</p>
						<Button
							title="Download"
							onClick={() => {
								setTimeout(() => {
									const a = document.createElement('a');
									a.href = URL.createObjectURL(
										new Blob([
											JSON.stringify(finished, null, 2),
										]),
									);
									a.download = 'answers';
									a.click();
									a.remove();
								}, 1000);
							}}
						/>
					</div>
				</div>
				<AddedByEPB />
			</div>
		</Modal> */
}

{
	/* <Modal isOpen={progress.isModalOpen}>
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
		</Modal> */
}

interface Props extends PropsWithChildren {
	menuBtns: React.ReactNode;
}

const modalContent = tv({
	slots: {
		base: 'w-full max-w-md rounded-md bg-white p-6 shadow-sm',
		menu: 'min-w-full justify-end text-center',
	},
});

function ModalContent({ menuBtns, children }: Props): JSX.Element {
	const { base, menu } = modalContent();
	return (
		<div className={base()}>
			<div>{children}</div>
			<menu className={menu()}>{menuBtns}</menu>
			<EPBLabel />
		</div>
	);
}

export default ModalContent;
