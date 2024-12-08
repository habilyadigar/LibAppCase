import Book from "../database/Models/Book";

module.exports = {
	getBookById: async (bookId: number) => {
		try {
			const { id, name, score } = (await Book.findByPk(Number(bookId))) as Book;
			return { id, name, score: score === -1 ? -1 : score.toString() };
		} catch (error) {
			throw error;
		}
	},
	getBookList: async () => {
		try {
			const books = await Book.findAll({ attributes: ["id", "name"] });
			return books;
		} catch (error) {
			throw error;
		}
	},
	createBookbyName: async (name: string) => {
		try {
			await Book.create({ name });
		} catch (error) {
			throw error;
		}
	}
};
