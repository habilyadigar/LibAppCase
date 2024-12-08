import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import Book from "./Book";
import User from "./User";

class Borrow extends Model {
	public id!: number;
	public bookId!: number;
	public userId!: number;
	public borrowDate!: Date;
	public returnDate!: Date;
	public userScore!: number;
}

Borrow.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		borrowDate: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},
		returnDate: {
			type: DataTypes.DATE,
			allowNull: true
		},
		userScore: {
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: {
				min: 1,
				max: 10
			}
		},
		bookId: {
			type: DataTypes.INTEGER,
			references: {
				model: Book,
				key: "id"
			}
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: "id"
			}
		}
	},
	{
		sequelize,
		tableName: "borrows",
		indexes: [
			{
				unique: true,
				fields: ["bookId"],
				where: {
					returnDate: null
				}
			}
		]
	}
);

// User - Borrow (One-to-Many)
User.hasMany(Borrow, { foreignKey: "userId" });
Borrow.belongsTo(User, { foreignKey: "userId" });

// Book - Borrow (One-to-Many)
Book.hasMany(Borrow, { foreignKey: "bookId" });
Borrow.belongsTo(Book, { foreignKey: "bookId" });


export default Borrow;
