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
        type : Sequelize.TEXT,
        allowNull : false
      },
      stok: {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      harga: {
        type : Sequelize.DECIMAL,
        allowNull : false
      },
      cover: {
				type: Sequelize.STRING,
				allowNull: false,
			},
      user_id: {
        type : Sequelize.INTEGER,
        allowNull : false,
      },
      createdAt: {
        type : Sequelize.DATE,
        allowNull : false
      },
      updatedAt: {
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
     await queryInterface.dropTable('Barang');
  }
};
