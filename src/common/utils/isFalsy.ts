export function isFalsy(target: unknown) {
	if (Array.isArray(target)) {
		return target.length === 0;
	}

	if (typeof target === 'object') {
		return JSON.stringify(target) == '{}';
	}

	if (typeof target === 'string') {
		return target.length === 0;
	}

	if (typeof target === 'number') {
		return target == 0;
	}

	return Boolean(target) == false;
}
