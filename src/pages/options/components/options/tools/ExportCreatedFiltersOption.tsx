import Button from '../../../../../components/ui/Button';
import { createTab } from '../../../../common/ChromeExtensionUtils';
import ToolSection from '../../../../content/components/tool-section/ToolSection';

const componentDetails = {
	title: 'Filtros criados',
	description: `Clique no botão abaixo para exportar os filtros, ao
            final do processo, um arquivo JSON será criado com
            eles.`,
};

function ExportCreatedFiltersOption(): JSX.Element {
	const createConsoleTab = () => {
		createTab({ path: 'settings', query: 'export=true&content=filters' });
	};

	return (
		<ToolSection
			title={componentDetails.title}
			description={componentDetails.description}>
			<>
				<Button
					title="Exportar filtros"
					onClick={createConsoleTab}
				/>
			</>
		</ToolSection>
	);
}

export default ExportCreatedFiltersOption;
