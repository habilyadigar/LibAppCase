import Book from "../database/Models/Book";

export type BookData = Pick<Book, "id" | "name" | "score">;

export interface BookServiceResponseType {
	getBookById: (bookId: number) => Promise<BookData>;
	getBookList: () => Promise<Omit<BookData, "score">[]>;
	createBookbyName: (name: string) => Promise<void>;
}
