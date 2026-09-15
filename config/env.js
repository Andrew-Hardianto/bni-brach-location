require('dotenv').config();

const env = {
    database: process.env.DB_NAME || 'branch-location',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
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
//     // dialectOptions: {
//     //     options: {
//     //         requestTimeout: 3000
//     //     }
//     // },
//     port: '1433',
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };

module.exports = env;