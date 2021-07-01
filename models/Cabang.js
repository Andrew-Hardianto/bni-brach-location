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
            allowNull: false,
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
        }
    }, {
        tableName: 'Branch',
        timestamps: false
    });

    // Cabang.beforeSave(async function (next) {
    //     const loc = await geocoder.geocode(
    //         {
    //             address: this.alamat,
    //         }
    //     );
    //     console.log(this.alamat)
    //     this.latitude = loc[0].latitude;
    //     this.longitude = loc[0].longitude;
    //     next()
    // })

    return Cabang;
}