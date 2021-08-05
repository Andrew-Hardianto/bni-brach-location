module.exports = (sequelize, Sequelize) => {
    const Kelurahan = sequelize.define("Master_Kelurahan", {
        ID_Kelurahan: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        Kelurahan_Code: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            unique: true,
        },
        Kelurahan_Name: {
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
        Kecamatan_Code: {
            type: Sequelize.BIGINT,
            references: {
                model: 'Master_Kecamatan',
                key: 'Kecamatan_Code'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },
    }, {
        tableName: 'Master_Kelurahan',
        timestamps: false
    });

    return Kelurahan;
}