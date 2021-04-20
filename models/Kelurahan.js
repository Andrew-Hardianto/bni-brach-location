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
            allowNull: false,
            references: {
                model: "kecamatans",
                key: 'id'
            }
        },
    });

    Kelurahan.associate = function (models) {
        Kelurahan.hasMany(models.Kodepos, { foreignKey: 'kelurahanId' })
    };

    return Kelurahan;
}