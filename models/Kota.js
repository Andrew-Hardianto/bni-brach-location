module.exports = (sequelize, Sequelize) => {
    const Kota = sequelize.define("kota", {
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
        biCode: {
            type: Sequelize.STRING,
        },
        antasenaCode: {
            type: Sequelize.STRING,
        }
    }, {
        tableName: 'kota'
    });

    return Kota;
}