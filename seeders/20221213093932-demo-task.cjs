'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('tasks', [{
			id: 'e801792c-9f76-43e5-9fc5-42a5516de83c',
			name: 'lalalalala',
			done: false,
			createdAt: new Date(),
			updatedAt: new Date()
		}]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('tasks', null, {});
	}
};
