import { DataTypes } from "sequelize"
import { sequelize } from "../helpers/sequelize-instance.js"

const Task = sequelize.define("todos", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	uuid: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
		unique: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	done: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
	userId: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	updatedAt: {
		type: DataTypes.DATE,
		allowNull: false,
	}
})

export default Task