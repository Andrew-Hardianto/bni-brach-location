const db = require('../config/db');
const geocoder = require('../utils/geocoder');
const Outlet = db.Outlet;
const Cabang = db.Cabang;
const Op = db.Sequelize.Op;

// get all outlet
exports.getAllOutlet = async (req, res) => {
    try {
        const outlet = await Outlet.findAll({
            include: [
                {
                    model: Cabang,
                    include: [
                        'wilayah'
                    ]
                }
            ]
        });

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
        const outlet = await Outlet.findByPk(req.params.id, {
            include: [
                {
                    model: Cabang,
                    include: [
                        'wilayah'
                    ]
                }
            ]
        });

        res.status(200).json({
            success: true,
            outlet
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// add outlet
exports.createOutlet = async (req, res, next) => {
    try {
        const { kode, nama, biLocationCode, alamat, kodeCabang, kodePos, latitude, longitude } = req.body;

        const checkId = await Outlet.findOne(
            {
                where: {
                    kode: kode
                }
            }
        )

        if (!kode || !nama || !alamat) return next(new Error('Kode/Nama/alamat harus diisi!'))

        if (checkId) return next(new Error('Kode outlet sudah digunakan!'))

        // const loc = await geocoder.geocode(
        //     {
        //         address: alamat,
        //     }
        // );

        const cab = await Cabang.findOne({ where: { kode: kodeCabang } })

        const outlet = await Outlet.create({
            kode: kode,
            nama: nama,
            alamat: alamat,
            biLocationCode: biLocationCode,
            kodepos: kodePos,
            latitude: latitude,
            longitude: longitude,
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
        const { kode, nama, alamat, biLocationCode, kodeCabang, kodepos, latitude, longitude, status } = req.body;

        if (!nama || !alamat) return next(new Error('Nama/alamat harus diisi!'))

        // const loc = await geocoder.geocode(
        //     {
        //         address: alamat,
        //     }
        // );

        const cab = await Cabang.findOne({ where: { kode: kodeCabang } })

        const outlet = await Outlet.update({
            kode: kode,
            nama: nama,
            alamat: alamat,
            biLocationCode: biLocationCode,
            kodepos: kodepos,
            latitude: latitude,
            longitude: longitude,
            kodeCabang: kodeCabang,
            status: status,
            namaCabang: cab.nama
        }, {
            where: {
                id: req.params.id
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
                id: req.params.id
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