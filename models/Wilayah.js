module.exports = (sequelize, Sequelize) => {
    const Wilayah = sequelize.define("Region", {
        ID_Region: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        Region_Code: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
        },
        Region_Subname: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        Region_Name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
    }, {
        tableName: 'Region',
        timestamps: false
    });
    return Wilayah;
}