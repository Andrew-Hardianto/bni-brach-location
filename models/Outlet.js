module.exports = (sequelize, Sequelize) => {
    const Outlet = sequelize.define("outlet", {
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
        namaCabang: {
            type: Sequelize.STRING
        },
        kodepos: {
            type: Sequelize.INTEGER
        }
    }, {
        tableName: 'outlet'
    });
    return Outlet;
}