import Joi from "joi";

export const borrowSchema = Joi.object({
	userId: Joi.string().required().min(1),
	bookId: Joi.string().required().min(1)
});

export const returnSchema = Joi.object({
	userId: Joi.string().required().min(1),
	bookId: Joi.string().required().min(1),
	score: Joi.number().required().min(1).max(10)
});
