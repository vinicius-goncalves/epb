import { tv } from 'tailwind-variants';

const logo = chrome.runtime.getURL('icon.png');

const addedByEPB = tv({
	base: 'mt-5 flex items-center gap-3 rounded-md border border-gray-500/20 bg-gray-500/10 p-1.5',
});

function EPBLabel(): JSX.Element {
	return (
		<div className={addedByEPB()}>
			<img
				src={logo}
				width="16"
				className="inline-block"
			/>
			<small>Funcionalidade adicionada através da EPB.</small>
		</div>
	);
}

export default EPBLabel;
