export function injectDOMScript(src: string) {
	const root = document.head || document.documentElement;
	if (root) {
		const script = document.createElement('script');
		script.src = src;
		script.type = 'module';
		root.prepend(script);
	}
}
