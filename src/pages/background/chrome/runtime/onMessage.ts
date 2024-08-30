import { UserPreferences } from '../../../../common/classes/userPreferences';
import { Actions } from '../../../../ts/enums';

type MsgParam =
	| { action: Actions | string; data: never }
	| { action: 'video-details' | Actions.GET_EPB_RESPONSE; data?: unknown };

const syncStorage = chrome.storage.sync;
const sessionStorage = chrome.storage.session;
const userPreferences = new UserPreferences();

chrome.runtime.onMessage.addListener((message: MsgParam, _s, sendResponse) => {
	if (message.action === Actions.GET_DEFAULT_FORUM) {
		syncStorage.get('default_forum').then((defaultForum) => {
			sendResponse(defaultForum ? defaultForum : 0);
		});
	}

	if (message.action === Actions.EPB_RESPONSE) {
		sessionStorage.get('epb_responses').then(({ epb_responses }) => {
			const prevResponses = Array.isArray(epb_responses) ? epb_responses : [];
			const nextResponses = [...prevResponses, message.data];

			sessionStorage.set({ epb_responses: nextResponses });
		});
	}

	if (message.action === Actions.GET_EPB_RESPONSE) {
		chrome.storage.session.get('epb_responses').then((res) => {
			sendResponse(res);
		});
	}

	if (message.action === Actions.GET_USER_PREFERENCES) {
		userPreferences.getPreferences().then((res) => {
			sendResponse(res);
		});
	}

	return true;
});
