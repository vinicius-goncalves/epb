import './promiseResolvers';

import { promisify, sleep } from './index';

type Func<R = unknown> = (this: unknown, ...args: unknown[]) => R;

interface IWaitUntilOptions {
	wait?: number;
	stopOnError?: boolean;
	debug?: boolean;
	sleepThread?: boolean;
}

class WaitUntil {
	private _fn: unknown;
	private _fnToExecute!: () => Promise<unknown>;

	private _wait: number;

	private _sleepThread: boolean;
	private _stopOnError: boolean;
	private debug: boolean;

	private resolve: ((value?: unknown) => unknown) | undefined;
	private reject: ((reason?: unknown) => unknown) | undefined;
	private promise: Promise<unknown> | undefined;

	constructor(
		fn: unknown,
		{ stopOnError = false, wait = 1000, debug = false, sleepThread = false }: IWaitUntilOptions = {},
	) {
		this._fn = fn;
		this._stopOnError = stopOnError;
		this._sleepThread = sleepThread;
		this._wait = wait;
		this.debug = debug;
	}

	private _consoleLog(...params: unknown[]) {
		if (this.debug) {
			console.log(...params);
		}
	}

	private _promiseResolvers() {
		const { promise, resolve, reject } = Promise.withResolvers();
		[this.promise, this.resolve, this.reject] = [promise, resolve, reject];
	}

	public initiateWaitUntil(): Promise<unknown> {
		this._consoleLog('[EPB] Initiate WaitUtil function.');
		this._promiseResolvers();

		this._fnToExecute = promisify(this._fn) as () => Promise<unknown>;

		this._initiateFunc();
		return this.promise!;
	}

	private _prepareFunc() {
		this._fnToExecute()
			.then((res: unknown) => {
				if (res == false) {
					this._reexecuteFunc();
					return;
				}

				this._consoleLog('[EPB] Truthy value found.');
				this.resolve?.(res);
			})
			.catch((reason: unknown) => {
				this._consoleLog('[EPB] Wait Until caught into a reject.');
				if (this._stopOnError) return this.reject?.(reason);
				return this._reexecuteFunc();
			});
	}

	private _initiateFunc() {
		if (this._sleepThread) {
			sleep(this._wait).then(this._prepareFunc.bind(this));
		} else {
			this._prepareFunc();
		}
	}

	private _reexecuteFunc() {
		this._consoleLog('[EPB] Falsy value found, re-executing the function.');
		setTimeout(this._initiateFunc.bind(this), this._wait);
	}
}

export function waitUntil(fn: Func, options?: IWaitUntilOptions) {
	return new WaitUntil(fn, options).initiateWaitUntil();
}
