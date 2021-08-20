'use strict';
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
            unique: true,
        },
        Provinsi_Name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        BI_Location_Code: {
            type: Sequelize.STRING(4),
        },
        Status: {
            type: Sequelize.STRING(1),
            enum: ['Y', 'N'],
            defaultValue: 'Y'
        }
    }, {
        tableName: 'Master_Provinsi',
        timestamps: false
    });

    Provinsi.associate = function (models) {
        Provinsi.hasMany(models.Kota, {
            foreignKey: 'Provinsi_Code',
            as: 'kota'
        });

    };

    return Provinsi;
}