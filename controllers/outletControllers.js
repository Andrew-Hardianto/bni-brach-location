const db = require('../config/db');
const geocoder = require('../utils/geocoder');
const Outlet = db.Outlet;
const Cabang = db.Cabang;
const Op = db.Sequelize.Op;

// get all outlet
exports.getAllOutlet = async (req, res) => {
    try {
        const outlet = await Outlet.findAll();

        res.status(200).json({
            success: true,
            outlet
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// get all outlet
exports.getByIdOutlet = async (req, res) => {
    try {
        const outlet = await Outlet.findByPk(req.params.kode);

        res.status(200).json({
            success: true,
            outlet
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// add outlet
exports.createOutlet = async (req, res, next) => {
    try {
        const { kode, nama, alamat, kodeCabang } = req.body;

        const checkId = await Outlet.findOne(
            {
                where: {
                    kode: kode
                }
            }
        )

        if (!kode || !nama || !alamat) return next(new Error('Kode/Nama/alamat harus diisi!'))

        if (checkId) return next(new Error('Kode outlet sudah digunakan!'))

        const loc = await geocoder.geocode(
            {
                address: alamat,
            }
        );

        const cab = await Cabang.findOne({ where: { kode: kodeCabang } })
        // console.log(cab.nama)
        const outlet = await Outlet.create({
            kode: kode,
            nama: nama,
            alamat: alamat,
            kodepos: loc[0].zipcode,
            latitude: loc[0].latitude,
            longitude: loc[0].longitude,
            kodeCabang: kodeCabang,
            namaCabang: cab.nama
        })

        res.status(201).json({
            success: true,
            outlet
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

// update outlet
exports.updateOutlet = async (req, res, next) => {
    try {
        const { nama, alamat, kodeCabang } = req.body;

        if (!nama || !alamat) return next(new Error('Nama/alamat harus diisi!'))

        const loc = await geocoder.geocode(
            {
                address: alamat,
            }
        );

        const outlet = await Outlet.update({
            nama: nama,
            alamat: alamat,
            kodepos: loc[0].zipcode,
            latitude: loc[0].latitude,
            longitude: loc[0].longitude,
            kodeCabang: kodeCabang
        }, {
            where: {
                kode: req.params.kode
            }
        })

        res.status(200).json({
            success: true,
            outlet
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// delete outlet
exports.deleteOutlet = async (req, res) => {
    try {
        await Outlet.destroy({
            where: {
                kode: req.params.kode
            }
        })

        res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}