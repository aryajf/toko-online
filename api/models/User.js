'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
        User.hasMany(models.Barang, {
            as : 'barang',
            foreignKey : 'user_id'
        })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    phone: DataTypes.STRING,
    role : DataTypes.ENUM('User', 'Admin'),
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};