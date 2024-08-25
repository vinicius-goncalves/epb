import { usePreferenceManager } from '../../../../../hooks';
import ToolSection from '../../../../content/components/tool-section/ToolSection';

function ProfileEnhancementOption(): JSX.Element {
	const { isPreferenceActive, togglePreference } = usePreferenceManager('enhanceProfiles');

	return (
		<ToolSection
			title="Melhorar visualização no nome de usuários em threads**"
			description="Ativando essa opção, será corrigido espaçamento no nome de usuários e encurtar textos como &#34;Usuário que fez a postagem original&#34; apenas para &#34;OP&#34;"
			checked={isPreferenceActive}
			updateCheckboxValue={togglePreference}></ToolSection>
	);
}

export default ProfileEnhancementOption;
