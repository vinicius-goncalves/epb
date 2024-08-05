import TC from '../types/enums/tailwind.enum';
import { getDefaultForumByIndex } from '../utils/utils';
import URLChangeEvent from './events/url-change.event';

(() => {
	const urlChangeEvent = new URLChangeEvent();
	urlChangeEvent.startEvent();
})();

let currentObserver: MutationObserver | null = null;

function waitAndExecute(
	func: () => void,
	wait: number = 1000,
	immediate?: boolean,
) {
	const w = wait;

	let timeout: ReturnType<typeof setTimeout> | null = setTimeout(() => {
		if (!immediate) func();
		return function () {
			timeout = null;
			clearTimeout(timeout!);
		};
	}, wait);

	if (immediate) {
		clearTimeout(timeout);
		timeout = null;
		func();
	}

	return {
		thenWaitAndExecute(func: () => void, wait: number = w) {
			waitAndExecute(func, wait + w);
			return this;
		},
	};
}

async function waitForEscalationMenu() {
	if (currentObserver && currentObserver instanceof MutationObserver) {
		currentObserver.disconnect();
		currentObserver = null;
	}

	return new Promise((resolve) => {
		currentObserver = new MutationObserver((mutations) => {
			for (let i = 0; i < mutations.length; i++) {
				if (!mutations[i].addedNodes.length) continue;

				const mTarget = mutations[i].target as HTMLElement;
				const mClassList = mTarget.classList;
				const node = mTarget.querySelector(TC.ESCALATION_MENU_OPTIONS);

				if (!mClassList.contains('wrapper') || !node) continue;

				const escalationMenu = node.closest('.wrapper');

				if (!escalationMenu) continue;

				console.log(escalationMenu);

				console.info('[EPB] Escalation menu detected.');
				currentObserver?.disconnect();
				resolve(escalationMenu);
				break;
			}
		});

		currentObserver.observe(document.documentElement, {
			subtree: true,
			childList: true,
		});
	});
}

async function openForumsList(escalationMenu: HTMLElement) {
	const buttonText = escalationMenu.querySelector(
		'.button-text',
	) as HTMLSpanElement;

	waitAndExecute(() => {
		escalationMenu.focus();
		buttonText.click();
	}, 200).thenWaitAndExecute(async () => {
		const forumsOptions = document.querySelectorAll(
			TC.INDIVIDUAL_FORUM_OPTION,
		) as NodeListOf<HTMLElement>;

		const arr = [...forumsOptions]
			.map((forum, index) => ({ forum: forum || {}, index }))
			.sort((a, b) => b.index - a.index);

		if (!arr.length) {
			return;
		}

		const defaultForumIndex = await getDefaultForumByIndex();
		arr[defaultForumIndex].forum.click();

		console.log('[EPB] Clicked on label.');
	});
}

window.addEventListener('URLChanged', () => {
	if (!window.location.href.includes('thread')) {
		return;
	}

	console.log('[EPB] URL changes identified (within a thread).');

	waitForEscalationMenu().then((m) => {
		openForumsList(m as HTMLElement);
	});
});
