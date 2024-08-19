export function toString(target: unknown) {
	return Object.prototype.toString.call(target).slice(8, -1);
}
