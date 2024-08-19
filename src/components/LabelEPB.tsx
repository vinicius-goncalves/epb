import { tv } from 'tailwind-variants';

interface Props {
	useLogo?: boolean;
}

const twClasses = tv({
	slots: {
		wrapper: 'mt-5 flex items-center gap-3 rounded-md border border-gray-500/20 bg-gray-500/10 p-1.5',
		img: 'inline-block',
	},
})();

const logoUrl = chrome.runtime.getURL('icon.png');

function LogoEPB() {
	return <img src={logoUrl} width="16" className={twClasses.img()} />;
}

function LabelEPB({ useLogo = true }: Props): JSX.Element {
	return (
		<div className={twClasses.wrapper()}>
			{useLogo && LogoEPB()}
			<small>Funcionalidade adicionada através da EPB.</small>
		</div>
	);
}

export default LabelEPB;
