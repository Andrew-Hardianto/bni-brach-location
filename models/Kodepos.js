module.exports = (sequelize, Sequelize) => {
    const Kodepos = sequelize.define("kodepos", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        kode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        kelurahanId: {
            type: Sequelize.STRING,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            references: {
                model: "kelurahan",
                key: 'id'
            }
        },
    }, {
        tableName: 'kodepos'
    });

    Kodepos.associate = function (models) {
        Kodepos.hasOne(models.Kelurahan, { foreignKey: 'kelurahanId' })
    };

    return Kodepos;
}