const { ContextType } = chrome.runtime;

export function getExtensionContext() {
	const protocol = globalThis.location.protocol;
	return protocol.startsWith('chrome-extension') ? ContextType.BACKGROUND : ContextType.TAB;
}
