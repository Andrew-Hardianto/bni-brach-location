module.exports = (sequelize, Sequelize) => {
    const Provinsi = sequelize.define("provinsi", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        nama: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    Provinsi.associate = function (models) {
        Provinsi.hasMany(models.Kota, { foreignKey: 'provinsiId' })
    };

    return Provinsi;
}