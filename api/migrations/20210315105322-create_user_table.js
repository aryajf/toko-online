'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement :true,
        primaryKey : true,
        allowNull : false
      },
      name: {
        type : Sequelize.STRING,
        allowNull : false
      },
      email: {
          type : Sequelize.STRING,
          allowNull : false
      },
      password: {
          type : Sequelize.STRING,
          allowNull : false
      },
      profile: {
          type : Sequelize.STRING,
          allowNull : true
      },
      role_id: {
          type : Sequelize.INTEGER,
          allowNull : true
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
     * await queryInterface.dropTable('users');
     */
  }
};
