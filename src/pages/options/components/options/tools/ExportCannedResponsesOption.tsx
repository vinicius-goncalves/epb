import Button from '../../../../../components/Button';
import ToolSection from '../../../../content/components/tool-section/ToolSection';
import createTab from '../../../utils/createTab';

function ExportCannedResponsesOption(): JSX.Element {
	const createConsoleTab = () => {
		createTab({
			path: 'cannedresponses',
			query: 'export=true&content=cannedresponses',
		});
	};

	return (
		<ToolSection
			title="Exportar respostas automáticas"
			description="Clique no botão abaixo para exportar as respostas
							que você criou, ao final do processo, um arquivo
							.TXT será criado com todas suas respostas.">
			<>
				<Button
					title="Exportar respostas automáticas"
					onClick={createConsoleTab}
				/>
			</>
		</ToolSection>
	);
}

export default ExportCannedResponsesOption;
