export function isWithinAThread(url: string | URL): boolean {
	const u = new URL(url);
	const href = u.href;
	return href.indexOf('thread') > -1;
}
