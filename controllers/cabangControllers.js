const db = require('../config/db');
const geocoder = require('../utils/geocoder');
const Cabang = db.Cabang;
const Wilayah = db.Wilayah;
const Op = db.Sequelize.Op;

// get all cabang
exports.getAllCabang = async (req, res) => {
    try {
        const cabang = await Cabang.findAll();

        res.status(200).json({
            success: true,
            cabang
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// get all cabang
exports.getByIdCabang = async (req, res) => {
    try {
        const cabang = await Cabang.findByPk(req.params.kode);

        res.status(200).json({
            success: true,
            cabang
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// add cabang
exports.createCabang = async (req, res, next) => {
    try {
        const { kode, nama, alamat, kodeWilayah } = req.body;

        const checkId = await Cabang.findOne(
            {
                where: {
                    kode: kode
                }
            }
        )

        if (!kode || !nama || !alamat) return next(new Error('Kode/Nama/alamat harus diisi!'))

        if (checkId) return next(new Error('Kode tidak boleh sama!'))

        const loc = await geocoder.geocode(
            {
                address: alamat,
            }
        );

        const will = await Wilayah.findOne({ where: { kode: kodeWilayah } })
        // console.log(will.nama)
        const cabang = await Cabang.create({
            kode: kode,
            nama: nama,
            alamat: alamat,
            kodepos: loc[0].zipcode,
            latitude: loc[0].latitude,
            longitude: loc[0].longitude,
            kodeWilayah: kodeWilayah,
            namaWilayah: will.nama
        })

        res.status(201).json({
            success: true,
            cabang
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

// update cabang
exports.updateCabang = async (req, res, next) => {
    try {
        const { nama, alamat, kodeWilayah } = req.body;

        if (!nama || !alamat) return next(new Error('Nama/alamat harus diisi!'))

        const loc = await geocoder.geocode(
            {
                address: alamat,
            }
        );

        const cabang = await Cabang.update({
            nama: nama,
            alamat: alamat,
            kodepos: loc[0].zipcode,
            latitude: loc[0].latitude,
            longitude: loc[0].longitude,
            kodeWilayah: kodeWilayah
        }, {
            where: {
                kode: req.params.kode
            }
        })

        res.status(200).json({
            success: true,
            cabang
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// delete cabang
exports.deleteCabang = async (req, res) => {
    try {
        await Cabang.destroy({
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