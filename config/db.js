const Sequelize = require('sequelize');
const env = require('./env');

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,

    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Provinsi = require('../models/Provinsi')(sequelize, Sequelize);
db.Kota = require('../models/Kota')(sequelize, Sequelize);
db.Kecamatan = require('../models/Kecamatan')(sequelize, Sequelize);
db.Kelurahan = require('../models/Kelurahan')(sequelize, Sequelize);
db.Kodepos = require('../models/Kodepos')(sequelize, Sequelize);


module.exports = db;