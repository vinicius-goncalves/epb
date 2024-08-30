import { createRoot, Root } from 'react-dom/client';
import { waitUntil } from '../utils';

function createContainer() {
	const container = document.createElement('div');
	document.body.appendChild(container);
	return container;
}

function getContainer(container?: string | Element): Element | null {
	if (container instanceof Element) {
		return container;
	}

	return document.querySelector(container!);
}

function getParent(parent?: string) {
	return parent ? (document.querySelector(parent) as HTMLElement) : undefined;
}

function unmountWhenChange(root: Root) {
	const prevLocation = window.location.href;

	waitUntil(
		() => {
			const currLocation = window.location.href;
			return currLocation !== prevLocation;
		},
		{ wait: 25 },
	).then(() => {
		root.unmount();
	});
}

export function initComponent(
	component: React.ReactNode,
	options: Partial<{
		container: string | HTMLElement;
		parent: string;
		topComponent: boolean;
		autoUnmount: boolean;
	}> = { autoUnmount: true },
) {
	const container = getContainer(options?.container) || createContainer();
	const parentTarget = getParent(options.parent);

	if (options.parent && parentTarget) {
		if (options.topComponent) {
			parentTarget?.prepend(container);
		} else {
			parentTarget.appendChild(container);
		}
	}

	const root = createRoot(container);
	root.render(component);

	if (options?.autoUnmount) {
		unmountWhenChange(root);
	}
}
