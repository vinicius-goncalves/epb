(() => {
	if ('onpopstate' in window) return;

	let prevURL = document.location.href;

	setInterval(() => {
		const currURL = document.location.href;
		if (currURL !== prevURL) {
			const popstate = new CustomEvent('pop', {
				detail: { state: history.state },
			});

			window.dispatchEvent(popstate);
			prevURL = currURL;
		}
	}, 10);
})();

export default {};
