module.exports = (sequelize, Sequelize) => {
    const Kelurahan = sequelize.define("Kelurahan", {
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
        },
    }, {
        tableName: 'kelurahan'
    });

    return Kelurahan;
}