interface URLChangeEventOptions {
	initialURL?: URL | string;
	forceFirstInit?: boolean;
}

class URLChangeEvent extends EventTarget {
	private handleURLChange: (() => void) | null = null;
	private interval: ReturnType<typeof window.setInterval> | null = null;

	private currURL: string;
	private prevURL: string;
	private initialURL?: string;

	constructor({ initialURL = globalThis.location.href, forceFirstInit = false }: URLChangeEventOptions = {}) {
		super();
		this.initialURL = typeof initialURL === 'string' ? initialURL : initialURL.toString();
		this.currURL = this.initialURL;
		this.prevURL = forceFirstInit ? '' : this.initialURL;
	}

	start() {
		if (this.interval !== null) return;

		this.handleURLChange = () => {
			this.currURL = this.getCurrentURL().toString();

			if (this.currURL !== this.prevURL) {
				this.dispatchEvent(new CustomEvent('URLChanged'));
				this.prevURL = this.currURL;
			}
		};

		this.interval = setInterval(this.handleURLChange, 25);
	}

	stop() {
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = null;
		}

		if (this.handleURLChange) {
			this.removeEventListener('URLChanged', this.handleURLChange);
			this.handleURLChange = null;
		}
	}

	getCurrentURL(): URL {
		return new URL(globalThis.location.toString());
	}
}

export default URLChangeEvent;
