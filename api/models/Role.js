module.exports = (Sequelize, DataTypes) => {
    const Role = Sequelize.define(
        "Role",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement :true,
                primaryKey : true,
                allowNull : false
            },
            nama_role: {
                type : DataTypes.STRING,
                allowNull : false
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
            tableName : 'role'
        }
    )
    Role.associate = (models) => {
      Role.hasOne(models.User, {
        as: 'user',
        foreignKey: 'role_id'
      })
    }
    
    return Role;
}