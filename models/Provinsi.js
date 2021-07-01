module.exports = (sequelize, Sequelize) => {
    const Provinsi = sequelize.define("Master_Provinsi", {
        ID_Provinsi: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        Provinsi_Code: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
        },
        Provinsi_Name: {
            type: Sequelize.STRING(100),
            allowNull: false
        }
    }, {
        tableName: 'Master_Provinsi',
        timestamps: false
    });

    return Provinsi;
}