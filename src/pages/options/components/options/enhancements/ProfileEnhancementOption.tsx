import { usePreferenceManager } from '../../../../../hooks';
import ToolSection from '../../tool-section/ToolSection';

function ProfileEnhancementOption(): JSX.Element {
	const { isPreferenceActive, togglePreference } = usePreferenceManager('enhanceProfiles');

	return (
		<ToolSection
			name="Aprimorar visualização de perfil"
			description="Os perfis (/user | /profile) serão aprimorados com ainda mais visualizações sobre os
            vídeos postados, guias criados e outros detalhes sobre um perfil."
			checked={isPreferenceActive}
			updateCheckboxValue={togglePreference}></ToolSection>
	);
}

export default ProfileEnhancementOption;
