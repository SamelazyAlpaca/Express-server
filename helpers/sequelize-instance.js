import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('node_postgres', 'postgres', 'user', {
	host: 'localhost',
	dialect: 'postgres',
})

