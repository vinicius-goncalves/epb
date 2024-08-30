import '@assets/styles/tailwind.css';
import './chrome/runtime/onMessage';

import { findWebResourcePath } from '../../common/ChromeExtensionUtils';
import { defaultPreferences, UserPreferences } from '../../common/classes/userPreferences';
import { injectDOMScript } from '../../common/DOMUtils';
import { Actions } from '../../ts/enums';

import './features/initFeatures';
import './features/lookForDefaultForum.feature';

(() => {
	const path = findWebResourcePath('XHRInterceptor');
	injectDOMScript(path as string);

	const userPreferences = new UserPreferences();
	userPreferences.getPreferences().then((res) => {
		localStorage.setItem('epb_user_preferences', JSON.stringify(res ?? defaultPreferences));
	});
})();

window.addEventListener('EPBCustomResponse', ((ev: CustomEvent) => {
	const response = ev.detail;
	chrome.runtime.sendMessage({ action: Actions.EPB_RESPONSE, data: response });
}) as EventListener);
