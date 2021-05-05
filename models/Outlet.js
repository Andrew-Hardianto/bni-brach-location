module.exports = (sequelize, Sequelize) => {
    const Outlet = sequelize.define("outlet", {
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
        namaCabang: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'outlet'
    });
    return Outlet;
}