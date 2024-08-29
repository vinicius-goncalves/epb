import { isArrayBuffer, isValidJSON } from '../../common/utils';
import { debugConsole } from '../../pages/content/features/debugConsole';
import { triggerEvent } from './triggerEvent';

const $XHR = window.XMLHttpRequest;
const $XHRPrototype = $XHR.prototype;

(() => {
	const _open = $XHRPrototype.open;
	const _send = $XHRPrototype.send;

	try {
		debugConsole('Initialized XHR Interceptor.');

		$XHRPrototype.open = function () {
			return _open.apply(this, arguments);
		};

		$XHRPrototype.send = function () {
			this.addEventListener('load', (ev) => {
				const target = ev.target;
				if (target.readyState != 4 && target.status != 200) return;

				const response = target.response;
				this.$EPBResponse = response;

				if (typeof response === 'object' && isArrayBuffer(response)) {
					this.$EPBResponse = new TextDecoder().decode(response);
				}

				this.$EPBResponse = isValidJSON(this.$EPBResponse) && JSON.parse(this.$EPBResponse);

				triggerEvent('CustomResponse', {
					detail: {
						responseUrl: this.responseURL,
						response: this.$EPBResponse,
					},
				});
			});

			return _send.apply(this, arguments);
		};
	} catch (err) {
		window.XMLHttpRequest = $XHR;
	}
})();
