import { Model, DataTypes } from "sequelize"
import sequelize from "./index.js";

class Tasks extends Model { }

Tasks.init({
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
		unique: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	done: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
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
}, {
	sequelize,
	modelName: 'task',
	timestamps: true,
});

// module.exports = Tasks
export default Tasks