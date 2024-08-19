import { tv } from 'tailwind-variants';

const header = tv({
	slots: {
		base: 'my-3 flex flex-col items-center justify-center text-center',
		title: 'text-lg font-bold',
	},
});

const headerDetails = {
	title: 'Extensão para PEs Brasileiros [EPB]',
};

function Header(): JSX.Element {
	return (
		<header className={header().base()}>
			<h1 className={header().title()}>{headerDetails.title}</h1>
			<small className="-my-0.5 text-gray-500/80">
				As configurações serão salvas em sua conta Google logada no
				navegador
			</small>
			<small className="my-2 text-red-500">
				As opções com (**) significa que estão em desenvolvimento,
				nenhuma ação será realizada ao utilizá-las.
			</small>
		</header>
	);
}

export default Header;
