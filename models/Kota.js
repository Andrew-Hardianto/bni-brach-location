module.exports = (sequelize, Sequelize) => {
    const Kota = sequelize.define("Master_Kabupaten_Kota", {
        ID_Kabupaten: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        Kabupaten_Code: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
        },
        Kabupaten_Name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        BI_Location_Code: {
            type: Sequelize.INTEGER,
        },
        Antasena_Code: {
            type: Sequelize.INTEGER,
        }
    }, {
        tableName: 'Master_Kabupaten_Kota',
        timestamps: false
    });

    return Kota;
}