import { waitUntil } from '../utils';

export function closeCCMenu() {
	waitUntil(
		() => {
			const ccMenu = document.querySelector('material-drawer');
			return ccMenu ? (ccMenu as HTMLElement) : false;
		},
		{ wait: 10 },
	).then((target) => {
		const ccMenu = target as HTMLElement;
		ccMenu.classList.remove('mat-drawer-expanded');
		ccMenu.classList.add('mat-drawer-collapsed');
	});
}
