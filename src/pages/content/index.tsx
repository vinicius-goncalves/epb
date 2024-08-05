// import { createRoot } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import ExportFilters from './components/ExportFilters';

import '@assets/styles/tailwind.css';
import ExportCannedAnswers from './components/ExportCannedAnswers';

chrome.runtime.onMessage.addListener((message) => {
	if (message === 'export-filters') {
		const startup = document.querySelector('html')?.dataset.startup;
		init(<ExportFilters startup={startup as string} />);
	}

	if (message === 'export-canned-responses') {
		init(<ExportCannedAnswers />);
	}

	console.log(message);
});

function init(component: React.ReactNode) {
	const container = document.createElement('div');

	container.id = crypto.randomUUID();
	document.querySelector('.material-content')?.prepend(container);

	const root = createRoot(container);
	root.render(component);
}
