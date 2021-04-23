module.exports = (sequelize, Sequelize) => {
    const Kecamatan = sequelize.define("kecamatan", {
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
        kotaId: {
            type: Sequelize.STRING,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            references: {
                model: "kota",
                key: 'id'
            }
        },
    }, {
        tableName: 'kecamatan'
    });

    Kecamatan.associate = function (models) {
        Kecamatan.hasMany(models.Kelurahan, { as: 'kelurahan' })
        Kecamatan.belongsToMany(models.Kota, { foreignKey: 'kotaId', as: 'kota' })
    };

    return Kecamatan;
}