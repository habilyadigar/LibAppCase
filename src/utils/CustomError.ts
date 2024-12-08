export class CustomError extends Error {
	status: number;
	message: string;
	cause?: unknown = null;

	constructor(message: string, status: number, cause?: unknown) {
		super(message);
		this.cause = cause;
		this.status = status;
		this.message = message;
	}
}
