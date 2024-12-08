import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.service";
import * as borrowService from "../services/borrow.service";
import { UserServiceResponseType } from "../types/user.types";
import { BorrowServiceResponseType } from "../types/borrow.types";

const { getUsers, getUserById, createUserByName } = userService as UserServiceResponseType;
const { borrowBook, returnBook } = borrowService as BorrowServiceResponseType;

export const createUser = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { name } = req.body;
		await createUserByName(name);
		res.status(201).json();
	} catch (error) {
		next(error);
	}
};

export const getAllUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const users = await getUsers();
		res.status(201).json(users);
	} catch (error) {
		next(error);
	}
};

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { userId } = req.params;
		const user = await getUserById(Number(userId));
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

export const createBorrow = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { userId, bookId } = req.params;
		await borrowBook(Number(userId), Number(bookId));
		res.status(204).json({});
	} catch (error) {
		next(error);
	}
};

export const createReturnBorrow = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { userId, bookId } = req.params;
		const { score } = req.body;
		await returnBook(Number(userId), Number(bookId), Number(score));
		res.status(204).send({});
	} catch (error) {
		next(error);
	}
};
