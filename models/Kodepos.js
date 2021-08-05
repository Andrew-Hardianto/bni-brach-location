module.exports = (sequelize, Sequelize) => {
    const Kodepos = sequelize.define("Master_Kodepos", {
        ID_Kodepos: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        Kodepos_Code: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
        Kelurahan_Code: {
            type: Sequelize.BIGINT,
            references: {
                model: 'Master_Kelurahan',
                key: 'Kelurahan_Code'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },
    }, {
        tableName: 'Master_Kodepos',
        timestamps: false
    });

    return Kodepos;
}