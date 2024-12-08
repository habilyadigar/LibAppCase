import Joi from "joi";

export const getBookByIdSchema = Joi.object({
	bookId: Joi.string().required().min(1)
});