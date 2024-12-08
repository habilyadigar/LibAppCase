import { Response, NextFunction } from "express";
import { CustomError } from "../utils/CustomError";

function handleError(err: TypeError | CustomError, req: any, res: Response, _next: NextFunction) {
	let customError = err;
	if (!(err instanceof CustomError)) {
		customError = new CustomError(err.message, 500);
	}
	res
		.status((customError as CustomError).status)
		.json({
			error: (customError as CustomError).message,
			success: false,
		});
}
export default handleError;
