import Borrow from "../database/Models/Borrow";

export type BorrowData = Pick<
	Borrow,
	"id" | "bookId" | "userId" | "userScore" | "borrowDate" | "returnDate"
>;

export interface BorrowServiceResponseType {
	borrowBook: (userId: number, bookId: number) => Promise<void>;
	returnBook: (userId: number, bookId: number, score: number) => Promise<void>;
}
