import { toString } from './toString';

export function isArrayBuffer(target: unknown): target is ArrayBuffer {
	return toString(target) === 'ArrayBuffer' && target instanceof ArrayBuffer;
}
