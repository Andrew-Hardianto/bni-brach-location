const geocoder = require('../utils/geocoder');

module.exports = (sequelize, Sequelize) => {
    const Cabang = sequelize.define("cabang", {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        kode: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Kode sudah digunakan!'
            },
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