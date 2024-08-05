const youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/videos';

chrome.debugger.onEvent.addListener((source, method, params) => {
	if (method !== 'Network.responseReceived') return;
	if (!params.response.url.includes(youtubeApiUrl)) return;

	const requestId = params.requestId;

	chrome.debugger
		.sendCommand({ tabId: source.tabId }, 'Network.getResponseBody', {
			requestId,
		})
		.then((response) => {
			const body = response.body as unknown as string;
			if (JSON.isValid(body) && 'items' in JSON.parse(body)) {
				chrome.tabs.sendMessage(source.tabId!, {
					action: 'video-details',
					data: JSON.parse(body).items,
				});
			}
		});

	// if(!params.response.url.includes('api')) return
});
