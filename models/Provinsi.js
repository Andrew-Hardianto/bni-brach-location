module.exports = (sequelize, Sequelize) => {
    const Provinsi = sequelize.define("provinsi", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: true
        },
        nama: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        tableName: 'provinsi'
    });

    Provinsi.associate = function (models) {
        Provinsi.hasMany(models.Kota, { foreignKey: 'provinsiId' })
    };

    return Provinsi;
}