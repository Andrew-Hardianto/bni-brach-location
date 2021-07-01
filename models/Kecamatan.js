module.exports = (sequelize, Sequelize) => {
    const Kecamatan = sequelize.define("Master_Kecamatan", {
        ID_Kecamatan: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        Kecamatan_Code: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
        },
        Kecamatan_Name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
    }, {
        tableName: 'Master_Kecamatan',
        timestamps: false
    });

    // Kecamatan.associate = function (models) {
    //     Kecamatan.hasMany(models.Kelurahan, { as: 'kelurahan' })
    //     Kecamatan.belongsTo(models.Kota, { foreignKey: 'kotaId', as: 'kota' })
    // };

    return Kecamatan;
}