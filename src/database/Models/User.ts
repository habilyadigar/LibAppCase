import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

class User extends Model {
	public id!: number;
	public name!: number;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize,
		tableName: "users"
	}
);

export default User;