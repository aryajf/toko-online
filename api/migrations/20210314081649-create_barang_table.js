'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable('barang', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement :true,
        primaryKey : true,
        allowNull : false
      },
      title: {
        type : Sequelize.STRING,
        allowNull : false
      },
      description: {
        type : Sequelize.STRING,
        allowNull : false
      },
      cover: {
				type: Sequelize.STRING,
				allowNull: false,
			},
      user_id: {
        type : Sequelize.INTEGER,
        allowNull : false,
        // references: {
				// 	model: 'User',
				// 	key: 'id'
				// }
      },
      created_at: {
        type : Sequelize.DATE,
        allowNull : false
      },
      updated_at: {
        type : Sequelize.DATE,
        allowNull : false
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
