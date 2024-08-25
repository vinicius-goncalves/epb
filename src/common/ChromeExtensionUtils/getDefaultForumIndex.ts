import Actions from '../../ts/enums/actions.enum';

export function getDefaultForumIndex() {
	return chrome.runtime.sendMessage({ action: Actions.GET_DEFAULT_FORUM }).then((res) => {
		return res.default_forum;
	});
}
