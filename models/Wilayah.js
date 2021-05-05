module.exports = (sequelize, Sequelize) => {
    const Wilayah = sequelize.define("wilayah", {
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
    }, {
        tableName: 'wilayah'
    });
    return Wilayah;
}