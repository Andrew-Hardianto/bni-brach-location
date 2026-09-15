export default (sequelize, Sequelize) => {
    const User = sequelize.define("Master_User", {
        ID_User: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
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