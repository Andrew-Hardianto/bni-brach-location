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
        provinsi: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: "provinsis",
                key: 'id'
            }
        },
        biCode: {
            type: Sequelize.STRING,
        },
        antasenaCode: {
            type: Sequelize.STRING,
        }
    });

    Kota.associate = function (models) {
        Kota.hasOne(models.Provinsi, { foreignKey: 'provinsi' })
        Kota.belongsTo(models.Provinsi, { foreignKey: 'provinsi' })
    };

    return Kota;
}