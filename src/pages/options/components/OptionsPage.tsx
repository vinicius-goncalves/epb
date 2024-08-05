import CheckboxInput from '../../../components/CheckboxInput';
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
						title="Aprimorar visualização de perfil**"
						description="Os perfis (/user | /profile) serão aprimorados com ainda mais visualizações sobre os
							vídeos postados, guias criados e outros detalhes sobre um perfil. ATENÇÃO: Ao ativar esse recurso, poderá aparecer uma informação de debugger na janela do browser,
							isso é normal pois é necessário interceptar resultado de 'respostas' de requisições (responses from http requests), e essa informação irá aparecer apenas quando você acessar um perfil.">
						<CheckboxInput text="Aprimorar perfis" />
					</ToolSection>
				</ToolSectionWrapper>

				<ToolSectionWrapper title="Ferramentas">
					<ExportCreatedFiltersOption />
					<ExportCannedResponsesOption />
				</ToolSectionWrapper>

				<ToolSectionWrapper title="For developers">
					<ToolSection title="Show debug information**">
						<>
							<CheckboxInput text="Show debug information" />
						</>
					</ToolSection>
				</ToolSectionWrapper>
			</main>
		</div>
	);
}

export default OptionsPage;
