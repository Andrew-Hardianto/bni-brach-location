module.exports = (sequelize, Sequelize) => {
    const Kecamatan = sequelize.define("kecamatan", {
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
        tableName: 'kecamatan'
    });

    // Kecamatan.associate = function (models) {
    //     Kecamatan.hasMany(models.Kelurahan, { as: 'kelurahan' })
    //     Kecamatan.belongsTo(models.Kota, { foreignKey: 'kotaId', as: 'kota' })
    // };

    return Kecamatan;
}