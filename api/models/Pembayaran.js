'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pembayaran.hasMany(models.Cart, {
        as : 'cart',
        foreignKey : 'kode'
      }),
      Pembayaran.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id'
      })
    }
  };
  Pembayaran.init({
    kode: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    total_harga: DataTypes.DECIMAL,
    status : DataTypes.ENUM('unpaid', 'pending', 'accepted'),
    foto_bukti: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Pembayaran',
  });
  return Pembayaran;
};