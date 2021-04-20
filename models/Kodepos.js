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
            allowNull: false,
            references: {
                model: "kelurahans",
                key: 'id'
            }
        },
    });

    // Kodepos.associate = function (models) {
    //     Kodepos.hasOne(models.Kelurahan, { foreignKey: 'kelurahanId' })
    // };

    return Kodepos;
}