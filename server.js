const express = require('express');
const morgan = require('morgan');
require('colors');

const db = require('./config/db');
const provinsiRoutes = require('./routes/provinsiRoute');
const kotaRoutes = require('./routes/kotaRoute');

// koneksi ke database
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync with { force: true }');
// });

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan('dev'));

// route
app.use('/provinsi', provinsiRoutes);
app.use('/kota', kotaRoutes);

const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server berjalan di ${PORT}`.blue.bold)
})
