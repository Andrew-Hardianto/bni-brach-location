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


db.Provinsi.hasMany(db.Kota, { as: "kota",foreignKey: "provinsiId",onDelete:"set null",onUpdate:"cascade",sourceKey:"id" });
db.Kota.belongsTo(db.Provinsi, {
  foreignKey: "provinsiId",
  as: "provinsi",
  targetKey:"id"
});
db.Kota.hasMany(db.Kecamatan, { as: "kecamatan",foreignKey: "kotaId",onDelete:"set null",onUpdate:"cascade",sourceKey:"id" });
db.Kecamatan.belongsTo(db.Kota, {
  foreignKey: "kotaId",
  as: "kota",
  targetKey:"id"
});
db.Kecamatan.hasMany(db.Kelurahan, { as: "kelurahan",foreignKey: "kecamatanId",onDelete:"set null",onUpdate:"cascade",sourceKey:"id" });
db.Kelurahan.belongsTo(db.Kecamatan, {
  foreignKey: "kecamatanId",
  as: "kecamatan",
  targetKey:"id"
});
db.Kelurahan.hasMany(db.Kodepos, { as: "kodepos",foreignKey: "kelurahanId",onDelete:"set null",onUpdate:"cascade",sourceKey:"id" });
db.Kodepos.belongsTo(db.Kelurahan, {
  foreignKey: "kelurahanId",
  as: "kelurahan",
  targetKey:"id"
});

module.exports = db;