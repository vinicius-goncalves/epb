export interface EPBResponse<T = unknown> {
	responseUrl: string;
	response: T;
}
