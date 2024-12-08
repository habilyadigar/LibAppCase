import { Op } from "sequelize";
import Book from "../database/Models/Book";
import Borrow from "../database/Models/Borrow";
import User from "../database/Models/User";
import { CustomError } from "../utils/CustomError";

module.exports = {
	borrowBook: async (userId: number, bookId: number) => {
		try {
			const isUserExist = await User.findByPk(userId);
			const isBookExist = await Book.findByPk(bookId);

			if (!isBookExist || !isUserExist) throw new CustomError("User or Book Not Found", 400);

			const isBorrowed = await Borrow.findOne({ where: { bookId, returnDate: null } });

			if (isBorrowed) throw new CustomError("This book already borrowed", 400);
			await Borrow.create({ userId, bookId });
		} catch (error) {
			throw error;
		}
	},

	returnBook: async (userId: number, bookId: number, score: number) => {
		try {
			const isUserExist = await User.findByPk(userId);
			const book = await Book.findByPk(bookId);

			if (!book || !isUserExist) throw new CustomError("User or Book Not Found", 400);

			const borrow = await Borrow.findOne({ where: { userId, bookId, returnDate: null } });
			if (!borrow) throw new Error("This book already returned!");

			const filter = {
				bookId,
				userScore: {
					[Op.ne]: null
				}
			};

			const sumOfScores = await Borrow.sum("userScore", { where: filter });
			const countOfScores = await Borrow.count({ where: filter });
			borrow.returnDate = new Date();
			if (score) {
				borrow.userScore = score;
				book.score = Number(((sumOfScores + score) / (countOfScores + 1)).toFixed(2));
			}
			await book.save();
			await borrow.save();
		} catch (error) {
			throw error;
		}
	}
};
