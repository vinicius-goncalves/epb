import { usePreferenceManager } from '../../../../../hooks';
import ToolSection from '../../tool-section/ToolSection';

function ShowDebugInformation(): JSX.Element {
	const { isPreferenceActive, togglePreference } = usePreferenceManager('showDebugInformation');

	return (
		<ToolSection
			name="Show debug information"
			checked={isPreferenceActive}
			updateCheckboxValue={togglePreference}
		/>
	);
}

export default ShowDebugInformation;
