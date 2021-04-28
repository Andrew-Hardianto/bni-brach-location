const geocoder = require('../utils/geocoder');

module.exports = (sequelize, Sequelize) => {
    const Cabang = sequelize.define("cabang", {
        kode: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nama: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM('Aktif', 'Tidak Aktif'),
            defaultValue: "Aktif"
        },
        alamat: {
            type: Sequelize.STRING,
            allowNull: false
        },
        biLocationCode: {
            type: Sequelize.INTEGER
        },
        latitude: {
            type: Sequelize.STRING
        },
        longitude: {
            type: Sequelize.STRING
        },
        namaWilayah: {
            type: Sequelize.STRING
        },
        kodepos: {
            type: Sequelize.INTEGER
        }
    }, {
        tableName: 'cabang'
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