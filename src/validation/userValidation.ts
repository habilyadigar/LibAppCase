import Joi from "joi";

export const createUserSchema = Joi.object({
	name: Joi.string().required().min(3).max(80)
});

export const getUserByIdSchema = Joi.object({
	userId: Joi.string().required().min(1)
});