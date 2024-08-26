import { waitUntil } from '../../../common/utils';

const piiSharedContentStyle: Partial<CSSStyleDeclaration> = {
	maxHeight: '250px',
	overflowY: 'auto',
	margin: '15px 0',
};

const piiPopupStyle: Partial<CSSStyleDeclaration> = {
	position: 'absolute',
	top: '50%',
	transform: 'translateY(-50%)',
};

function defineStyle(target: HTMLElement, style: Partial<CSSStyleDeclaration>) {
	if (!(target instanceof Element)) {
		throw new TypeError('"target" argument in "defineStyle" must be a instance of HTMLElement.');
	}

	for (const [k, v] of Object.entries(style)) {
		const cssKey = k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
		const cssValue = typeof v === 'string' ? v : '';

		target.style.setProperty(cssKey, cssValue);
	}
}

async function waitForPiiContainer() {
	const cbWaitUntil = () => {
		const piiDialogContainer = document.querySelector('sc-tailwind-shared-pii-dialog');
		return piiDialogContainer || false;
	};

	const piiContainer = await waitUntil(cbWaitUntil, { wait: 25 });
	return piiContainer;
}

(async () => {
	const piiContainer = await waitForPiiContainer();

	if (!piiContainer || !(piiContainer instanceof HTMLElement)) {
		return;
	}

	const piiSharedContent = piiContainer.querySelector<HTMLElement>('.scTailwindSharedPiidialogfindings');
	const piiPopup = piiSharedContent?.closest<HTMLElement>('.scSharedMaterialpopuppopup');

	if (piiSharedContent) defineStyle(piiSharedContent, piiSharedContentStyle);
	if (piiPopup) defineStyle(piiPopup, piiPopupStyle);
})();
