'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.Barang, {
        as: 'barang',
        foreignKey: 'barang_id'
      }),
      Cart.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id'
      }),
      Cart.belongsTo(models.Pembayaran, {
        as: 'pembayaran',
        foreignKey: 'kode'
      })
    }
  };
  Cart.init({
    user_id: DataTypes.INTEGER,
    barang_id: DataTypes.INTEGER,
    kode: DataTypes.STRING,
    stok: DataTypes.DECIMAL,
    harga: DataTypes.DECIMAL,
    status : DataTypes.ENUM('cart', 'unpaid'),
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Cart',
  });
  return Cart;
};