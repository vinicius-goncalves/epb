import './chrome/debugger/onResponseReceived';

import './chrome/runtime/onInstalled';
import './chrome/runtime/onMessage';

import './chrome/tabs/onUpdated';

declare global {
	interface JSON {
		isValid<T = unknown>(target: T): boolean;
	}
}

Object.defineProperty(JSON, 'isValid', {
	enumerable: true,
	configurable: false,
	writable: false,
	value<T = unknown>(target: T) {
		try {
			const o = JSON.parse(target as string);
			return typeof o === 'object';
		} catch (_) {
			return false;
		}
	},
});
