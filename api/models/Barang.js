module.exports = (Sequelize, DataTypes) => {
    const Barang = Sequelize.define(
        "Barang",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement :true,
                primaryKey : true,
                allowNull : false
            },
            title: {
                type : DataTypes.STRING,
                allowNull : false
            },
            description: {
                type : DataTypes.STRING,
                allowNull : false
            },
            cover: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            user_id: {
              type: DataTypes.INTEGER,
              allowNull: false,
            },
            createdAt: {
                type : DataTypes.DATE,
                field: 'created_at'
            },
            updatedAt: {
                type : DataTypes.DATE,
                field: 'updated_at'
            },
        },
        {
            tableName : 'barang'
        }
    )
    Barang.associate = (models) => {
      Barang.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id'
      })
    }
    
    return Barang;
}