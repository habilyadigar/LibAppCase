import { Op } from "sequelize";
import Book from "../database/Models/Book";
import Borrow from "../database/Models/Borrow";
import User from "../database/Models/User";
import { CustomError } from "../utils/CustomError";

module.exports = {
	getUsers: async () => {
		try {
			const users = await User.findAll({ attributes: ["id", "name"] });
			return users;
		} catch (error) {
			throw error;
		}
	},

	getUserById: async (userId: number) => {
		try {
			const user = await User.findByPk(Number(userId), { attributes: ["id", "name"] });
			if (!user) throw new CustomError("User not found.", 400);

			const filter = (dateFilter: any) => {
				return {
					where: {
						userId,
						returnDate: dateFilter
					},
					attributes: ["userScore"],
					include: [
						{
							model: Book,
							attributes: ["name"]
						}
					]
				};
			};

			const past = await Borrow.findAll(filter({ [Op.ne]: null }));
			const present = await Borrow.findAll(filter({ [Op.eq]: null }));

			return {
				...user?.dataValues,
				books: {
					past: past.map((borrow: any) => ({
						userScore: borrow.userScore,
						name: borrow?.Book?.name
					})),
					present: present.map((borrow: any) => ({
						name: borrow?.Book?.name
					}))
				}
			};
		} catch (error) {
			throw error;
		}
	},
	
	createUserByName: async (name: string) => {
		try {
			await User.create({ name });
		} catch (error) {
			throw error;
		}
	}
};
