import Header from './Header';

import ToolSection from './tool-section/ToolSection';
import ToolSectionWrapper from './tool-section/ToolSectionWrapper';

import { usePreferenceManager } from '../../../hooks';
import ShowDebugInformation from './options/dev/ShowDebugInformation';
import ThreadEnhancementOption from './options/enhancements/ProfileEnhancementOption';
import ProfileEnhancementOption from './options/enhancements/ThreadEnhancementOption';
import PIIHeightLimitOption from './options/fixes/PIIHeightLimitOption';
import DefaultForumSelectOption from './options/functions/DefaultForumSelectOption';
import ThreadDetectionOption from './options/functions/ThreadDetectionOption';
import ExportCannedResponsesOption from './options/tools/ExportCannedResponsesOption';
import ExportCreatedFiltersOption from './options/tools/ExportCreatedFiltersOption';

function OptionsPageDescription() {
	return (
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
	);
}

function OptionsPage(): JSX.Element {
	const { isPreferenceActive, togglePreference } = usePreferenceManager('advancedExportMode');

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
					<ThreadEnhancementOption />
					<ProfileEnhancementOption />
				</ToolSectionWrapper>

				<ToolSectionWrapper title="Ferramentas">
					<ExportCreatedFiltersOption />
					<ToolSectionWrapper>
						<ExportCannedResponsesOption />
						<ToolSection
							name="Usar modo avançado**"
							description="Com o modo avançado, será possível filtrar quais respostas baixar, como através de IDs ou respostas que tenham palavras-chaves (tags) inclusas."
							checked={isPreferenceActive}
							updateCheckboxValue={togglePreference}
						/>
					</ToolSectionWrapper>
				</ToolSectionWrapper>

				<ToolSectionWrapper title="For developers">
					<ShowDebugInformation />
				</ToolSectionWrapper>
			</main>
			<footer className="text-center">
				<OptionsPageDescription />
			</footer>
		</div>
	);
}

export default OptionsPage;
