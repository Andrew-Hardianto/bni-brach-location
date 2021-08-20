module.exports = (sequelize, Sequelize) => {
    const Kodepos = sequelize.define("Master_Kodepos", {
        ID_Postcode: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        Postcode: {
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
        Kabkota_Code: {
            type: Sequelize.BIGINT,
            references: {
                model: 'Master_Kabupaten_Kota',
                key: 'Kabkota_Code'
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
        Status: {
            type: Sequelize.STRING(1),
            enum: ['Y', 'N'],
            defaultValue: 'Y'
        }
    }, {
        tableName: 'Master_Kodepos',
        timestamps: false
    });

    return Kodepos;
}