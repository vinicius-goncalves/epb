export function promisify(fn: unknown) {
	if (typeof fn !== 'function')
		throw new TypeError('"fn" argument must be a Function.');

	return function (this: unknown, ...args: unknown[]) {
		return new Promise((resolve, reject) => {
			try {
				const res = fn.apply(this, args);
				resolve(res);
			} catch (err) {
				reject(err);
			}
		});
	};
}
