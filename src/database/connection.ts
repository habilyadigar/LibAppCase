import { Sequelize } from "sequelize";
import { Client } from "pg";
import "dotenv/config";

const dbConfig: any = {
	database: process.env.DB_NAME,
	dialect: "postgres",
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	logging: false
};

async function ensureDatabaseExists() {
	const client = new Client({
		user: dbConfig.username,
		password: dbConfig.password,
		host: dbConfig.host,
		port: dbConfig.port,
		database: "postgres"
	});

	try {
		await client.connect();
		const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [
			dbConfig.database
		]);

		if (res.rowCount === 0) {
			console.log(`Database '${dbConfig.database}' does not exist. Creating...`);
			await client.query(`CREATE DATABASE "${dbConfig.database}"`);
			console.log(`Database '${dbConfig.database}' created successfully.`);
		} else {
			console.log(`Database '${dbConfig.database}' already exists.`);
		}
	} catch (err) {
		console.error("Error while checking/creating database:", err);
	} finally {
		await client.end();
	}
}

const sequelize = new Sequelize(dbConfig);

const initializeDatabase = async () => {
	return ensureDatabaseExists()
		.then(() => sequelize.authenticate())
		.then(() => {
			console.log("Connected successfully.");
			return sequelize.sync();
		})
		.then(() => {
			console.log("Tables synced successfully.");
		})
		.catch((err) => {
			console.error("Error during Sequelize operations:", err);
		});
};

(async () => {
	await initializeDatabase();
})();

export default sequelize;
