import { Actions } from '../../ts/enums';

export async function getEPBResponses() {
	const res = await chrome.runtime.sendMessage({ action: Actions.GET_EPB_RESPONSE });
	if ('epb_responses' in res) return res.epb_responses;
}
