import 'colors';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';

import db from './config/db';
import { notFound, errorHandler  } from './middleware/errorHandler';
import provinsiRoutes from './routes/provinsiRoute';
import kotaRoutes from './routes/kotaRoute';
import kecamatanRoutes from './routes/kecamatanRoute';
import kelurahanRoutes from './routes/kelurahanRoute';
import kodeposRoutes from './routes/kodeposRoute';
import wilayahRoutes from './routes/wilayahRoute';
import cabangRoutes from './routes/cabangRoute';
import outletRoutes from './routes/outletRoute';
import authRoutes from './routes/authRoute';

// Load env vars
dotenv.config();

// koneksi ke database
// db.sequelize.sync();
db.sequelize.sync({ force: false }).then(() => {
    console.log('Drop and Resync');
})

const app = express();
// app.use(function (req, res, next) {
//     req.headers['if-none-match'] = 'no-match-for-this';
//     next();
// });

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan('dev'));

// Enable CORS
app.use(cors());

// route
app.use('/provinsi', provinsiRoutes);
app.use('/kota', kotaRoutes);
app.use('/kecamatan', kecamatanRoutes);
app.use('/kelurahan', kelurahanRoutes);
app.use('/kodepos', kodeposRoutes);
app.use('/wilayah', wilayahRoutes);
app.use('/cabang', cabangRoutes);
app.use('/outlet', outletRoutes);
app.use('/auth', authRoutes);

app.use(notFound)
app.use(errorHandler)

const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server berjalan di ${PORT}`.blue.bold)
})

export default app;