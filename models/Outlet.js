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
            unique: true,
        },
        Outlet_Name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        Outlet_Level: {
            type: Sequelize.STRING(100),
        },
        Address: {
            type: Sequelize.STRING,
            allowNull: false,
            max: 100
        },
        Latitude: {
            type: Sequelize.STRING(100)
        },
        Longitude: {
            type: Sequelize.STRING(100)
        },
        Region_Code: {
            type: Sequelize.BIGINT,
            references: {
                model: 'Region',
                key: 'Region_Code'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },
        Branch_Code: {
            type: Sequelize.BIGINT,
            references: {
                model: 'Branch',
                key: 'Branch_Code'
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
        tableName: 'Outlet',
        timestamps: false
    });
    return Outlet;
}