export function findNode<T extends Node | Element | HTMLElement>(
	selector: string,
	options?: Partial<{ parent: Element; many: boolean; toArray: boolean }>,
) {
	const { parent, many, toArray } = options || {};

	const root = parent || document;

	const queryResult = many
		? root.querySelectorAll(selector)
		: root.querySelector(selector);

	return many && toArray ? [...(queryResult as NodeListOf<T>)] : queryResult;
}
