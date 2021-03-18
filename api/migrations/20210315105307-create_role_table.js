'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable('role', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement :true,
        primaryKey : true,
        allowNull : false
      },
      nama_role: {
          type : Sequelize.STRING,
          allowNull : false
      },
      created_at: {
          type: Sequelize.DATE,
          allowNull : true
      },
      updated_at: {
          type: Sequelize.DATE,
          allowNull : true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('role');
     */
  }
};
