import injectContentScript from '../injectContentScript';
import '../userPreferences';

chrome.runtime.onInstalled.addListener(async () => {
	console.info('[PEs] Script initialized.');

	chrome.action.onClicked.addListener(() => {
		chrome.runtime.openOptionsPage();
	});

	injectContentScript();
});
