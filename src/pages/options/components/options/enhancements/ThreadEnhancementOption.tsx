import { usePreferenceManager } from '../../../../../hooks';
import ToolSection from '../../tool-section/ToolSection';

function ThreadEnhancementOption(): JSX.Element {
	const { isPreferenceActive, togglePreference } = usePreferenceManager('enhanceThreads');

	return (
		<ToolSection
			name="Melhorar visualização no nome de usuários em threads**"
			description="Ativando essa opção, será corrigido espaçamento no nome de usuários e encurtar textos como &#34;Usuário que fez a postagem original&#34; apenas para &#34;OP&#34;"
			checked={isPreferenceActive}
			updateCheckboxValue={togglePreference}></ToolSection>
	);
}

export default ThreadEnhancementOption;
