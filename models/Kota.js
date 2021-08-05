module.exports = (sequelize, Sequelize) => {
    const Kota = sequelize.define("Master_Kabupaten_Kota", {
        ID_Kabupaten: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        Kabupaten_Code: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            unique: true,
        },
        Kabupaten_Name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        BI_Location_Code: {
            type: Sequelize.INTEGER,
        },
        Antasena_Code: {
            type: Sequelize.INTEGER,
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