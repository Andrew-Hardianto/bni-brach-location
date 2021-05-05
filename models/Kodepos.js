module.exports = (sequelize, Sequelize) => {
    const Kodepos = sequelize.define("kodepos", {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        kode: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Kode sudah digunakan!'
            },
        },
    }, {
        tableName: 'kodepos'
    });

    // Kodepos.associate = function (models) {
    //     Kodepos.belongsTo(models.Kelurahan, { foreignKey: 'kelurahanId', as: 'kelurahan' })
    // };

    return Kodepos;
}