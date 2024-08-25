export function triggerEvent(
	name: string,
	options?: Partial<{ detail: unknown; root: Node }>,
) {
	const customEvent = new CustomEvent(`EPB${name}`, {
		detail: options?.detail,
	});

	const target = options?.root || window;
	target.dispatchEvent(customEvent);
}
