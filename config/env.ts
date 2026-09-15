import dotenv from 'dotenv';
dotenv.config();

const env: any = {
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

export default env;
