import { isWithinAThread } from '../../utils/utils';

class URLChangeEvent {
	private evt: (() => void) | null = null;
	private interval: ReturnType<typeof window.setInterval> | null = null;

	private prevURL: string = this.URLToString();
	private currURL: string = this.URLToString();

	constructor(initialURL: URL | string = this.getURL()) {
		this.prevURL =
			typeof initialURL === 'string' ? initialURL : initialURL.toString();
	}

	startEvent() {
		this.evt = () => {
			this.interval = setInterval(() => {
				this.currURL = this.URLToString();

				if (
					this.currURL !== this.prevURL ||
					isWithinAThread(this.currURL)
				) {
					const URLChangedEvent = new CustomEvent('URLChanged');
					window.dispatchEvent(URLChangedEvent);
					this.prevURL = this.currURL;
				}
			}, 100);
		};

		this.evt();
	}

	stopEvent() {
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = null;
		}

		if (this.evt) {
			window.removeEventListener('URLChanged', this.evt);
			this.evt = null;
		}
	}

	getURL() {
		return new URL(window.location.toString());
	}

	URLToString() {
		return this.getURL().toString();
	}
}

export default URLChangeEvent;
