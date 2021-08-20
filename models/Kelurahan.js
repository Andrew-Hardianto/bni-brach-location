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
        Status: {
            type: Sequelize.STRING(1),
            enum: ['Y', 'N'],
            defaultValue: 'Y'
        }
    }, {
        tableName: 'Master_Kelurahan',
        timestamps: false
    });

    return Kelurahan;
}