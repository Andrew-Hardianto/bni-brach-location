module.exports = (sequelize, Sequelize) => {
    const Kodepos = sequelize.define("Master_Kodepos", {
        ID_Kodepos: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        Kodepos_Code: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
        }
    }, {
        tableName: 'Master_Kodepos',
        timestamps: false
    });

    return Kodepos;
}