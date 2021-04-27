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
      avatar: {
          type : Sequelize.STRING,
          allowNull : true
      },
      alamat: {
          type : Sequelize.TEXT,
          allowNull : false
      },
      phone: {
          type : Sequelize.STRING,
          allowNull : false
      },
      role: {
        type: Sequelize.ENUM('User', 'Admin'),
        allowNull: false,
      },
      createdAt: {
          type: Sequelize.DATE,
          allowNull : true
      },
      updatedAt: {
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
     await queryInterface.dropTable('Users');
  }
};
