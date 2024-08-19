export function isValidJSON<T = unknown>(target: T): boolean {
	try {
		const o = JSON.parse(target as string);
		return typeof o === 'object';
	} catch (_) {
		return false;
	}
}
// Object.defineProperty(JSON, 'isValid', {
// 	enumerable: true,
// 	configurable: false,
// 	writable: false,
// 	value<T = unknown>(target: T) {
// 		try {
// 			const o = JSON.parse(target as string);
// 			return typeof o === 'object';
// 		} catch (_) {
// 			return false;
// 		}
// 	},
// });
