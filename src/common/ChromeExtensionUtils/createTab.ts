const { tabs } = chrome;

type CreateTabOptions = {
	path?: string;
	query?: string;
};

const DEFAULT_CONSOLE_URL = 'https://support.google.com/s/community';

export function createTab(options: CreateTabOptions) {
	const url = new URL(DEFAULT_CONSOLE_URL);

	if (options) {
		if (options.path) {
			url.href = url.href + `/${options.path}`;
		}

		if (options.query) {
			url.href = url.href + `?${options.query}`;
		}
	}

	tabs.create({ url: url.href, active: true });
}
