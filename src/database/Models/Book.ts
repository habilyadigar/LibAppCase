import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

class Book extends Model {
	public id!: number;
	public name!: string;
	public score!: number;
}

Book.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		score: {
			type: DataTypes.FLOAT,
			defaultValue: -1
		}
	},
	{
		sequelize,
		tableName: "books"
	}
);

export default Book;
