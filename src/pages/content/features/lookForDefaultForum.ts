import { getDefaultForumIndex } from '../../../common/ChromeExtensionUtils';
import { waitUntil } from '../../../common/utils';
import { CCClasses, CCElements } from '../../../ts/enums';
import URLChangeEvent from '../events/url-change.event';
import { debugConsole } from './debugConsole';

interface Forum {
	forum: HTMLElement;
	index: number;
}

(() => {
	const urlChangeEvent = new URLChangeEvent();
	urlChangeEvent.startEvent();
})();

async function getEscalationMenu(): Promise<HTMLElement> {
	const fn = () => {
		const selector = CCClasses.TEXT_FORUM_ESCALATION_SELECTION;
		const textForumEscalation = document.querySelector<HTMLSpanElement>(selector);

		if (!textForumEscalation || textForumEscalation.className.indexOf(selector) > -1) {
			return false;
		}

		const escalationMenu = textForumEscalation.closest('.wrapper');
		return escalationMenu;
	};

	const res = (await waitUntil(fn, { wait: 50, sleepThread: true })) as HTMLElement;
	return res;
}

async function openForumsList() {
	const escalationMenu = await getEscalationMenu();

	const fn = () => {
		const btnText = escalationMenu.querySelector<HTMLSpanElement>(CCClasses.BUTTON_LIKE_FORUM_SELECTION);
		if (btnText) btnText.click();
	};

	await waitUntil(fn, { wait: 50, sleepThread: true });
}

async function getForumsOptions(): Promise<Forum[]> {
	await openForumsList();
	const forumOptions = document.querySelectorAll(CCElements.INDIVIDUAL_FORUM_OPTION);
	const forumOptionsReversed = [...forumOptions].map((forum, index) => ({ forum, index })).reverse();
	return forumOptionsReversed as { forum: HTMLElement; index: number }[];
}

async function selectEscalationMenu() {
	const forumOptions = await getForumsOptions();
	const forumIndex = await getDefaultForumIndex();

	const forumTarget = forumOptions[forumIndex];
	forumTarget.forum.click();
}

function handleWithDefaultForum() {
	selectEscalationMenu();
}

window.addEventListener('URLChanged', () => {
	debugConsole('URL change detected in "lookForDefaultForum" feature.');
	handleWithDefaultForum();
});
