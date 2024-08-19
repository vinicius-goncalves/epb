import Button from '../../../../../components/ui/Button';
import { createTab } from '../../../../common/ChromeExtensionUtils';
import ToolSection from '../../../../content/components/tool-section/ToolSection';

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
