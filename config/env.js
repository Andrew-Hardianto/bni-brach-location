const env = {
    database: 'branch-location',
    username: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
// const env = {
//     database: 'branch-location',
//     username: 'sa',
//     password: '12345',
//     host: 'localhost',
//     dialect: 'mssql',
//     port: '1433',
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };

module.exports = env;