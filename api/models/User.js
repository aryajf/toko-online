module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define(
        "User",
        {
            id: {
                type : DataTypes.INTEGER,
                autoIncrement : true,
                primaryKey : true,
                allowNull : false
            },
            name: {
                type : DataTypes.STRING,
                allowNull : false
            },
            email: {
                type : DataTypes.STRING,
                allowNull : false
            },
            password: {
                type : DataTypes.STRING,
                allowNull : false
            },
            profile: {
                type : DataTypes.STRING,
                allowNull : true
            },
            role_id: {
                type : DataTypes.INTEGER,
                allowNull : true
            },
            createdAt: {
				field: 'created_at',
				type: DataTypes.DATE,
			},
			updatedAt: {
				field: 'updated_at',
				type: DataTypes.DATE,
			}
        },
        {
			tableName: "users",
		}
    )

    User.associate = (models) => {
        User.hasMany(models.Barang, {
            as : 'barang',
            foreignKey : 'user_id'
        }),
        User.belongsTo(models.Role, {
            as : 'role',
            foreignKey : 'role_id'
        })
    }

    return User;
}