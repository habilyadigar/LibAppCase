import { NextFunction, Request, Response } from "express";
import Book from "../database/Models/Book";
import * as bookService from "../services/book.service";
import { BookServiceResponseType } from "../types/book.types";

const { createBookbyName, getBookById, getBookList } = bookService as BookServiceResponseType;

export const createBook = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { name } = req.body;
		await createBookbyName(name);
		res.status(201).json();
	} catch (error) {
		next(error);
	}
};

export const getAllBooks = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const books = await getBookList();
		res.status(201).json(books);
	} catch (error) {
		next(error);
	}
};

export const getBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { bookId } = req.params;
		const book = await getBookById(Number(bookId));
		res.status(200).json(book);
	} catch (error) {
		next(error);
	}
};
