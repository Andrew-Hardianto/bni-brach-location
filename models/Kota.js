module.exports = (sequelize, Sequelize) => {
    const Kota = sequelize.define("Master_Kabupaten_Kota", {
        ID_Kabkota: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        Kabkota_Code: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            unique: true,
        },
        Kabkota_Name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        BI_Location_Code: {
            type: Sequelize.STRING(4),
        },
        Antasena_Code: {
            type: Sequelize.STRING(4),
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
        Kabkota_Flag: {
            type: Sequelize.STRING(100),
            enum: ['Other', 'Kotamadya', 'Kabupaten']
        },
        Status: {
            type: Sequelize.STRING(1),
            enum: ['Y', 'N'],
            defaultValue: 'Y'
        }
    }, {
        tableName: 'Master_Kabupaten_Kota',
        timestamps: false
    });

    Kota.associate = function (models) {
        Kota.belongsTo(models.Provinsi, {
            foreignKey: 'Provinsi_Code',
            as: 'provinsi',
            hooks: true
        });

    };

    return Kota;
}