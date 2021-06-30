const Sequelize = require('sequelize');
const env = require('./env');

const sequelize = new Sequelize(env.database,
  env.username,
  env.password,
  {
    host: env.host,
    dialect: env.dialect,
    port: env.port,
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
db.Wilayah = require('../models/Wilayah')(sequelize, Sequelize);
db.Cabang = require('../models/Cabang')(sequelize, Sequelize);
db.Outlet = require('../models/Outlet')(sequelize, Sequelize);


db.Provinsi.hasMany(db.Kota, { as: "kota", foreignKey: "provinsiId", onDelete: "set null", onUpdate: "cascade", sourceKey: "kode" });
db.Kota.belongsTo(db.Provinsi, {
  foreignKey: "provinsiId",
  as: "provinsi",
  targetKey: "kode"
});
db.Kota.hasMany(db.Kecamatan, { as: "kecamatan", foreignKey: "kotaId", onDelete: "set null", onUpdate: "cascade", sourceKey: "kode" });
db.Kecamatan.belongsTo(db.Kota, {
  foreignKey: "kotaId",
  as: "kota",
  targetKey: "kode"
});
db.Kecamatan.hasMany(db.Kelurahan, { as: "kelurahan", foreignKey: "kecamatanId", onDelete: "set null", onUpdate: "cascade", sourceKey: "kode" });
db.Kelurahan.belongsTo(db.Kecamatan, {
  foreignKey: "kecamatanId",
  as: "kecamatan",
  targetKey: "kode"
});
db.Kelurahan.hasMany(db.Kodepos, { as: "kodepos", foreignKey: "kelurahanId", onDelete: "set null", onUpdate: "cascade", sourceKey: "kode" });
db.Kodepos.belongsTo(db.Kelurahan, {
  foreignKey: "kelurahanId",
  as: "kelurahan",
  targetKey: "kode"
});
db.Wilayah.hasMany(db.Cabang, { as: "cabang", foreignKey: "kodeWilayah", onDelete: "set null", onUpdate: "cascade", sourceKey: "kode" });
db.Cabang.belongsTo(db.Wilayah, {
  foreignKey: "kodeWilayah",
  as: "wilayah",
  targetKey: "kode"
});
db.Cabang.hasMany(db.Outlet, { as: "outlet", foreignKey: "kodeCabang", onDelete: "set null", onUpdate: "cascade", sourceKey: "kode" });
db.Outlet.belongsTo(db.Cabang, {
  foreignKey: "kodeCabang",
  targetKey: "kode"
});
db.Kodepos.hasMany(db.Outlet, { as: "outlet", foreignKey: "kodepos", onDelete: "set null", onUpdate: "cascade", sourceKey: "id" });
db.Kodepos.hasMany(db.Cabang, { as: "cabang", foreignKey: "kodepos", onDelete: "set null", onUpdate: "cascade", sourceKey: "id" });
db.Outlet.belongsTo(db.Kodepos, {
  foreignKey: "kodepos",
  targetKey: "id"
});
db.Cabang.belongsTo(db.Kodepos, {
  foreignKey: "kodepos",
  targetKey: "id"
});

module.exports = db;