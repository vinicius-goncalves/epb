import CheckboxInput from '../../../components/ui/CheckboxInput';
import Header from './Header';

import ToolSection from '../../content/components/tool-section/ToolSection';
import ToolSectionWrapper from '../../content/components/tool-section/ToolSectionWrapper';

import PIIHeightLimitOption from './options/fixes/PIIHeightLimitOption';
import DefaultForumSelectOption from './options/functions/DefaultForumSelectOption';
import ThreadDetectionOption from './options/functions/ThreadDetectionOption';
import ExportCannedResponsesOption from './options/tools/ExportCannedResponsesOption';
import ExportCreatedFiltersOption from './options/tools/ExportCreatedFiltersOption';

function OptionsPage(): JSX.Element {
	return (
		<div className="m-3">
			<Header />
			<main>
				<ToolSectionWrapper title="Funcionalidades">
					<DefaultForumSelectOption />
					<ThreadDetectionOption />
				</ToolSectionWrapper>

				<ToolSectionWrapper title="Correções">
					<PIIHeightLimitOption />
				</ToolSectionWrapper>

				<ToolSectionWrapper title="Melhorias">
					<ToolSection
						title="Aprimorar visualização de perfil"
						description="Os perfis (/user | /profile) serão aprimorados com ainda mais visualizações sobre os
							vídeos postados, guias criados e outros detalhes sobre um perfil. ">
						<CheckboxInput text="Aprimorar perfis" />
					</ToolSection>
					<ToolSection
						title="Melhorar visualização no nome de usuários em threads**"
						description="Ativando essa opção, será corrigido espaçamento no nome de usuários e encurtar textos como &#34;Usuário que fez a postagem original&#34; apenas para &#34;OP&#34;"
						addedCheckbox={false}>
						<CheckboxInput text="Melhorar visualizações de nomes de usuários" />
					</ToolSection>
				</ToolSectionWrapper>

				<ToolSectionWrapper title="Ferramentas">
					<ExportCreatedFiltersOption />
					<ToolSectionWrapper>
						<ExportCannedResponsesOption />
						<ToolSection
							title="Usar modo avançado**"
							description="Com o modo avançado, será possível filtrar quais respostas baixar, como através de IDs ou respostas que tenham palavras-chaves (tags) inclusas."></ToolSection>
						<>
							<CheckboxInput text="Ativar modo avançado" />
						</>
					</ToolSectionWrapper>
				</ToolSectionWrapper>

				<ToolSectionWrapper title="For developers">
					<ToolSection title="Show debug information**">
						<>
							<CheckboxInput text="Show debug information" />
						</>
					</ToolSection>
				</ToolSectionWrapper>
			</main>
			<footer className="text-center">
				<small>
					Extensão criada por{' '}
					<a
						href="https://support.google.com/profile/1062156"
						rel="noopener noreferrer"
						className="text-blue-500 hover:underline"
						target="_blank">
						Vinícius Gonçalves
					</a>{' '}
					com a ajuda de outros PEs.
				</small>
			</footer>
		</div>
	);
}

export default OptionsPage;
