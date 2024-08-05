import handleExports from '../../handlers/handleExports';
import handleVideosResponses from '../../handlers/handleVideosResponses';
import injectContentScript from '../injectContentScript';

const funcs = [injectContentScript, handleExports, handleVideosResponses];

chrome.tabs.onUpdated.addListener(() => {
	for (const func of funcs) func();
});
