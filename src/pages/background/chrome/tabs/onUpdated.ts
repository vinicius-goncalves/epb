import handleExports from '../../handlers/handleExports.handler';
import handleProfileEnhancement from '../../handlers/handleProfileEnhancement.handler';
import injectContentScript from '../injectContentScript';

const funcs = [injectContentScript, handleExports, handleProfileEnhancement];

chrome.tabs.onUpdated.addListener(() => {
	for (const func of funcs) func();
});
