const geocoder = require('../utils/geocoder');

module.exports = (sequelize, Sequelize) => {
    const Cabang = sequelize.define("Branch", {
        ID_Branch: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        Branch_Code: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            unique: true,
        },
        Branch_Name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        BI_Location_Code: {
            type: Sequelize.INTEGER
        },
        Address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Latitude: {
            type: Sequelize.STRING(100)
        },
        Longitude: {
            type: Sequelize.STRING(100)
        },
        Region_Code: {
            type: Sequelize.BIGINT,
            references: {
                model: 'Region',
                key: 'Region_Code'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },
    }, {
        tableName: 'Branch',
        timestamps: false
    });

    return Cabang;
}