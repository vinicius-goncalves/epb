import Actions from '../../ts/enums/actions.enum';

export function sendAction(tabId: number, actions: Actions | string) {
	chrome.tabs.sendMessage(tabId, actions);
}
