const { tabs } = chrome;

type CreateTabOptions = {
	path?: string;
	query?: string;
};

const primaryUrl = 'https://support.google.com/s/community';

export default function createTab(options: CreateTabOptions) {
	const url = new URL(primaryUrl);

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
