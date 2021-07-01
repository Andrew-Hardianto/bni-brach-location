module.exports = (sequelize, Sequelize) => {
    const Kelurahan = sequelize.define("Master_Kelurahan", {
        ID_Kelurahan: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        Kelurahan_Code: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
        },
        Kelurahan_Name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
    }, {
        tableName: 'Master_Kelurahan',
        timestamps: false
    });

    return Kelurahan;
}