import { usePreferenceManager } from '../../../../../hooks';
import ToolSection from '../../../../content/components/tool-section/ToolSection';

const componentDetails = {
	title: 'Detectar threads',
	description: `Ao ativar essa opção, será detectado automaticamente se você está em uma thread de escalação logo na
        primeira visita, por exemplo: quando a página fecha
        e você retorna, ou quando uma página é recarregada,
        ajudando a detectar o menu de escalação sem precisar
        retornar para a lista de threads.`,
};

function ThreadDetectionOption(): JSX.Element {
	const { isPreferenceActive, togglePreference } = usePreferenceManager('threadDetection');

	return (
		<ToolSection
			title={componentDetails.title}
			description={componentDetails.description}
			checked={isPreferenceActive}
			updateCheckboxValue={togglePreference}
		/>
	);
}

export default ThreadDetectionOption;
