require('colors');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

const db = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const provinsiRoutes = require('./routes/provinsiRoute');
const kotaRoutes = require('./routes/kotaRoute');
const kecamatanRoutes = require('./routes/kecamatanRoute');
const kelurahanRoutes = require('./routes/kelurahanRoute');
const kodeposRoutes = require('./routes/kodeposRoute');
const wilayahRoutes = require('./routes/wilayahRoute');
const cabangRoutes = require('./routes/cabangRoute');
const outletRoutes = require('./routes/outletRoute');

// Load env vars
dotenv.config();

// koneksi ke database
// db.sequelize.sync();
db.sequelize.sync({ force: false }).then(() => {
    console.log('Drop and Resync');
});

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan('dev'));

// route
app.use('/provinsi', provinsiRoutes);
app.use('/kota', kotaRoutes);
app.use('/kecamatan', kecamatanRoutes);
app.use('/kelurahan', kelurahanRoutes);
app.use('/kodepos', kodeposRoutes);
app.use('/wilayah', wilayahRoutes);
app.use('/cabang', cabangRoutes);
app.use('/outlet', outletRoutes);

app.use(notFound)
app.use(errorHandler)

const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server berjalan di ${PORT}`.blue.bold)
})
