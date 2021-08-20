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
            unique: true,
        },
        Region_Subname: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        Region_Name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        Status: {
            type: Sequelize.STRING(1),
            enum: ['Y', 'N'],
            defaultValue: 'Y'
        }
    }, {
        tableName: 'Region',
        timestamps: false
    });
    return Wilayah;
}