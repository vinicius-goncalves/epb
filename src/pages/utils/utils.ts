import Actions from '../types/actions.enum';

const rt = chrome.runtime;

function isWithinAThread(currPath: string) {
	const paths = currPath.split('/');
	return paths.includes('thread');
}

async function getDefaultForumByIndex(): Promise<number> {
	const defaultForum = await rt.sendMessage({
		action: Actions.GET_DEFAULT_FORUM,
	});

	return Number.parseInt(defaultForum);
}

async function findNode(selector: string, options?: { singleMatch: boolean }) {
	return new Promise((resolve) => {
		if (options?.singleMatch) {
			const nodes = document.querySelectorAll(selector);
			resolve(nodes);
			return;
		}

		const node = document.querySelector(selector);
		resolve(node);
	});
}

export { findNode, getDefaultForumByIndex, isWithinAThread };
