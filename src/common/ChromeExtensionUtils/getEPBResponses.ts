export async function getEPBResponses() {
	return chrome.runtime
		.sendMessage({ action: 'get-epb-responses' })
		.then((res) => {
			return res['epb-responses'];
		});
}
