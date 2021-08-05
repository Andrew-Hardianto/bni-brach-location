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
            unique: true,
        },
        Kecamatan_Name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        Provinsi_Code: {
            type: Sequelize.BIGINT,
            references: {
                model: 'Master_Provinsi',
                key: 'Provinsi_Code'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },
        Kabupaten_Code: {
            type: Sequelize.BIGINT,
            references: {
                model: 'Master_Kabupaten_Kota',
                key: 'Kabupaten_Code'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
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