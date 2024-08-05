import Actions from '../../../types/actions.enum';

type MsgParam =
	| { action: Actions | string; data: never }
	| { action: 'video-details'; data?: unknown };

chrome.runtime.onMessage.addListener((message: MsgParam, _s, sendResponse) => {
	if (message.action === Actions.GET_DEFAULT_FORUM) {
		return chrome.storage.sync.get('default_forum').then((defaultForum) => {
			sendResponse(defaultForum ? defaultForum : 0);
		});
	}
});
