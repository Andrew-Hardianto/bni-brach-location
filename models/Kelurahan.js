module.exports = (sequelize, Sequelize) => {
    const Kelurahan = sequelize.define("Kelurahan", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        nama: {
            type: Sequelize.STRING,
            allowNull: false
        },
        kecamatanId: {
            type: Sequelize.STRING,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            references: {
                model: "kecamatan",
                key: 'id'
            }
        },
    }, {
        tableName: 'kelurahan'
    });

    Kelurahan.associate = function (models) {
        Kelurahan.hasMany(models.Kodepos, { as: 'kodepos' })
        Kelurahan.belongsToMany(models.Kecamatan, { foreignKey: 'kecamatanId', as: 'kecamatan' })
    };

    return Kelurahan;
}