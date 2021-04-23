module.exports = (sequelize, Sequelize) => {
    const Kota = sequelize.define("kota", {
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
        provinsiId: {
            type: Sequelize.INTEGER,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            references: {
                model: "provinsi",
                key: 'id'
            }
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

    Kota.associate = function (models) {
        Kota.belongsToMany(models.Provinsi, { foreignKey: 'provinsiId', targetKey: 'id', as: 'provinsi' })
        Kota.hasMany(models.Kecamatan, { as: 'kecamatan' })
    };

    return Kota;
}