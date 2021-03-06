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
    dialectOptions: {
      options: {
        requestTimeout: 150000000
      }
    },
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
db.User = require('../models/User')(sequelize, Sequelize);


db.Provinsi.hasMany(db.Kota, { as: "kota", foreignKey: "Provinsi_Code", unique: true, onDelete: 'SET NULL', onUpdate: 'CASCADE', sourceKey: "Provinsi_Code", hooks: true });
db.Kota.belongsTo(db.Provinsi, {
  foreignKey: "Provinsi_Code",
  as: "provinsi",
  targetKey: "Provinsi_Code",
  hooks: true
});
db.Provinsi.hasMany(db.Kecamatan, { as: "kecamatan", foreignKey: "Provinsi_Code", onDelete: 'SET NULL', onUpdate: 'CASCADE', sourceKey: "Provinsi_Code" });
db.Kecamatan.belongsTo(db.Provinsi, {
  foreignKey: "Provinsi_Code",
  as: "provinsi",
  targetKey: "Provinsi_Code"
});
db.Provinsi.hasMany(db.Kelurahan, { as: "kelurahan", foreignKey: "Provinsi_Code", onDelete: 'SET NULL', onUpdate: 'CASCADE', sourceKey: "Provinsi_Code" });
db.Kelurahan.belongsTo(db.Provinsi, {
  foreignKey: "Provinsi_Code",
  as: "provinsi",
  targetKey: "Provinsi_Code"
});
db.Provinsi.hasMany(db.Kodepos, { as: "kodepos", foreignKey: "Provinsi_Code", onDelete: 'SET NULL', onUpdate: 'CASCADE', sourceKey: "Provinsi_Code" });
db.Kodepos.belongsTo(db.Provinsi, {
  foreignKey: "Provinsi_Code",
  as: "provinsi",
  targetKey: "Provinsi_Code"
});
db.Kota.hasMany(db.Kecamatan, { as: "kecamatan", foreignKey: "Kabkota_Code", onDelete: 'SET NULL', onUpdate: 'CASCADE', sourceKey: "Kabkota_Code" });
db.Kecamatan.belongsTo(db.Kota, {
  foreignKey: "Kabkota_Code",
  as: "kota",
  targetKey: "Kabkota_Code"
});
db.Kota.hasMany(db.Kelurahan, { as: "kelurahan", foreignKey: "Kabkota_Code", onDelete: 'SET NULL', onUpdate: 'CASCADE', sourceKey: "Kabkota_Code" });
db.Kelurahan.belongsTo(db.Kota, {
  foreignKey: "Kabkota_Code",
  as: "kota",
  targetKey: "Kabkota_Code"
});
db.Kota.hasMany(db.Kodepos, { as: "kodepos", foreignKey: "Kabkota_Code", onDelete: 'SET NULL', onUpdate: 'CASCADE', sourceKey: "Kabkota_Code" });
db.Kodepos.belongsTo(db.Kota, {
  foreignKey: "Kabkota_Code",
  as: "kota",
  targetKey: "Kabkota_Code"
});
db.Kecamatan.hasMany(db.Kelurahan, { as: "kelurahan", foreignKey: "Kecamatan_Code", onDelete: 'SET NULL', onUpdate: 'CASCADE', sourceKey: "Kecamatan_Code" });
db.Kelurahan.belongsTo(db.Kecamatan, {
  foreignKey: "Kecamatan_Code",
  as: "kecamatan",
  targetKey: "Kecamatan_Code"
});
db.Kecamatan.hasMany(db.Kodepos, { as: "kodepos", foreignKey: "Kecamatan_Code", onDelete: 'SET NULL', onUpdate: 'CASCADE', sourceKey: "Kecamatan_Code" });
db.Kodepos.belongsTo(db.Kecamatan, {
  foreignKey: "Kecamatan_Code",
  as: "kecamatan",
  targetKey: "Kecamatan_Code"
});
db.Kelurahan.hasMany(db.Kodepos, { as: "kodepos", foreignKey: "Kelurahan_Code", onDelete: 'SET NULL', onUpdate: 'CASCADE', sourceKey: "Kelurahan_Code" });
db.Kodepos.belongsTo(db.Kelurahan, {
  foreignKey: "Kelurahan_Code",
  as: "kelurahan",
  targetKey: "Kelurahan_Code"
});
db.Wilayah.hasMany(db.Cabang, { as: "cabang", foreignKey: "Region_Code", onDelete: 'SET NULL', onUpdate: 'CASCADE', sourceKey: "Region_Code" });
db.Cabang.belongsTo(db.Wilayah, {
  foreignKey: "Region_Code",
  as: "wilayah",
  targetKey: "Region_Code"
});
db.Wilayah.hasMany(db.Outlet, { as: "outlet", foreignKey: "Region_Code", onDelete: 'SET NULL', onUpdate: 'CASCADE', sourceKey: "Region_Code" });
db.Outlet.belongsTo(db.Wilayah, {
  foreignKey: "Region_Code",
  as: "wilayah",
  targetKey: "Region_Code"
});
db.Cabang.hasMany(db.Outlet, { as: "outlet", foreignKey: "Branch_Code", onDelete: 'SET NULL', onUpdate: 'CASCADE', sourceKey: "Branch_Code" });
db.Outlet.belongsTo(db.Cabang, {
  foreignKey: "Branch_Code",
  as: "cabang",
  targetKey: "Branch_Code"
});

module.exports = db;