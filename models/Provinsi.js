module.exports = (sequelize, Sequelize) => {
    const Provinsi = sequelize.define("provinsi", {
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
            allowNull: false
        }
    }, {
        tableName: 'provinsi'
    });

    return Provinsi;
}