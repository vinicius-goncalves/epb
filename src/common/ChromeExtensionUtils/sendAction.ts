import { Actions } from '../../ts/enums';

export function sendAction(tabId: number, actions: Actions | string) {
	chrome.tabs.sendMessage(tabId, actions);
}
