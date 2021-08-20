module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Master_User", {
        ID_User: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        Username: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        Password: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
    }, {
        tableName: 'Master_User',
        timestamps: false
    });

    return User;
}