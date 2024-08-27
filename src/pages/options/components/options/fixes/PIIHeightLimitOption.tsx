import { usePreferenceManager } from '../../../../../hooks';
import ToolSection from '../../tool-section/ToolSection';

const componentDetails = {
	title: 'Limitar o height de questões com PII**',
	description: `Isso irá limitar o tamanho da height de questões
            identificadas com PII, evitando precisar diminuir o
            zoom do browser para aparecer os botões de
            interação.`,
};

function HeightLimit(): JSX.Element {
	const { isPreferenceActive, togglePreference } = usePreferenceManager('piiHeightLimit');

	return (
		<ToolSection
			name={componentDetails.title}
			description={componentDetails.description}
			checked={isPreferenceActive}
			updateCheckboxValue={togglePreference}
		/>
	);
}

export default HeightLimit;
