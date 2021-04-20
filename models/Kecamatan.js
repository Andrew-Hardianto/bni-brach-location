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
            allowNull: false,
            references: {
                model: "kota",
                key: 'id'
            }
        },
    });

    Kecamatan.associate = function (models) {
        Kecamatan.hasMany(models.Kelurahan, { foreignKey: 'kelurahanId' })
    };

    return Kecamatan;
}