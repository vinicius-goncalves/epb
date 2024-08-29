import '@assets/styles/tailwind.css';
import './chrome/runtime/onMessage';

import './features/initFeatures';
import './features/lookForDefaultForum';

window.addEventListener('EPBCustomResponse', ((ev: CustomEvent) => {
	const response = ev.detail;
	chrome.runtime.sendMessage({ action: 'epb-response', data: response });
}) as EventListener);
