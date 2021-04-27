module.exports = (sequelize, Sequelize) => {
    const Wilayah = sequelize.define("wilayah", {
        kode:{
            type:Sequelize.INTEGER,
            allowNull:false,
            primaryKey:true
        },nama:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
    },{
        tableName: 'wilayah'
    });
        return Wilayah;
    }