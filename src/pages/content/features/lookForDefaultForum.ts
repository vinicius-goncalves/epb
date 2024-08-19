import { getDefaultForumIndex } from '../../common/ChromeExtensionUtils';
import { waitUntil } from '../../common/utils';
import CommunityConsoleClasses from '../../ts/enums/cc-classes.enum';
import URLChangeEvent from '../events/url-change.event';

(() => {
	const urlChangeEvent = new URLChangeEvent();
	urlChangeEvent.startEvent();
})();

async function getEscalationMenu(): Promise<HTMLElement> {
	const cbWaitUntil = () => {
		const defaultForum = document.querySelector(CommunityConsoleClasses.ESCALATION_MENU_OPTIONS);
		if (!defaultForum || !defaultForum.classList.contains('forum-selection-label')) return false;

		const wrapper = defaultForum.closest('.wrapper');
		return wrapper;
	};

	return (await waitUntil(cbWaitUntil, { wait: 50 })) as HTMLElement;
}

async function openForumsList() {
	const escalationMenu = await getEscalationMenu();

	const cbWaitUntil = () => {
		const btnText = escalationMenu.querySelector('.button-text') as HTMLElement;
		btnText.click();
	};

	await waitUntil(cbWaitUntil, { wait: 200, sleepThread: true });
}

async function getForumsOptions(): Promise<{ forum: HTMLElement; index: number }[]> {
	await openForumsList();
	const forumOptions = document.querySelectorAll(CommunityConsoleClasses.INDIVIDUAL_FORUM_OPTION);
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
	handleWithDefaultForum();
});
