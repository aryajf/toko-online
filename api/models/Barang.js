'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Barang extends Model {
    static associate(models) {
      Barang.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id'
      })
    }
  };
  Barang.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    stok: DataTypes.INTEGER,
    harga: DataTypes.INTEGER,
    cover: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Barang',
  });
  return Barang;
};