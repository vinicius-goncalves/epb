import handleExports from '../../handlers/handleExports.handler';
import handleProfileEnhancement from '../../handlers/handleProfileEnhancement.handler';
import { handleUserPreferences } from '../../handlers/handleUserPreferences.handler';
import injectContentScript from '../injectContentScript';

const funcs = [injectContentScript, handleExports, handleProfileEnhancement, handleUserPreferences];

chrome.tabs.onUpdated.addListener(() => {
	for (const func of funcs) func();
});
