import Actions from '../../../ts/enums/actions.enum';

type MsgParam =
	| { action: Actions | string; data: never }
	| { action: 'video-details' | 'epb-response'; data?: unknown };

chrome.runtime.onMessage.addListener((message: MsgParam, _s, sendResponse) => {
	if (message.action === Actions.GET_DEFAULT_FORUM) {
		chrome.storage.sync.get('default_forum').then((defaultForum) => {
			sendResponse(defaultForum ? defaultForum : 0);
		});
	}

	if (message.action === 'epb-response') {
		chrome.storage.session.get('epb-responses').then(({ ['epb-responses']: responses }) => {
			const prevResponses = Array.isArray(responses) ? responses : [];
			const nextResponses = [...prevResponses, message.data];

			chrome.storage.session.set({
				'epb-responses': nextResponses,
			});
		});
	}

	if (message.action === 'get-epb-responses') {
		chrome.storage.session.get('epb-responses').then((res) => {
			sendResponse(res);
		});
	}

	return true;
});
