try {
    require('tsx/cjs');
} catch (e) {}

const bcrypt = require('bcryptjs');
const dbRaw = require('./config/db');
const db = dbRaw.default || dbRaw;
const User = db.User;

const insertUser = async () => {
    try {
        await db.sequelize.sync();
        const hashedPassword = bcrypt.hashSync('Welcome@123', 10);
        await User.create({
            Username: 'admin',
            Password: hashedPassword
        });
        console.log("Admin user created successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error creating user:", error);
        process.exit(1);
    }
};

insertUser();
