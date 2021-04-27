module.exports = (sequelize, Sequelize) => {
    const Outlet = sequelize.define("outlet", {
        kode:{
            type:Sequelize.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        nama:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        status:{
            type:Sequelize.BOOLEAN,
            default:true
        },
        alamat:{
            type:Sequelize.STRING,
            allowNull:false
        },
        biLocationCode:{
            type:Sequelize.INTEGER
        },
        latitude:{
            type:Sequelize.GEOMETRY
        },
        longitude:{
            type:Sequelize.GEOMETRY
        },
        namaCabang:{
            type:Sequelize.STRING
        }
    },{
        tableName: 'outlet'
    });
        return Outlet;
    }