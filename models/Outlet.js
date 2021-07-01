module.exports = (sequelize, Sequelize) => {
    const Outlet = sequelize.define("Outlet", {
        ID_Outlet: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        Outlet_Code: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
        },
        Outlet_Name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        Address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Latitude: {
            type: Sequelize.STRING(100)
        },
        Longitude: {
            type: Sequelize.STRING(100)
        }
    }, {
        tableName: 'Outlet',
        timestamps: false
    });
    return Outlet;
}