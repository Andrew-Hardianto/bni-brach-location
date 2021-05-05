const db = require('../config/db');
const Kecamatan = db.Kecamatan;
const Op = db.Sequelize.Op;

// get all data
exports.getKecamatan = async (req, res) => {
    try {
        const kecamatan = await Kecamatan.findAll({ include: ["kota"] });

        res.status(200).json({
            success: true,
            kecamatan
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// get by id data
exports.getByIdKecamatan = async (req, res) => {
    try {
        const kecamatan = await Kecamatan.findByPk(req.params.id, { include: ["kota"] });

        res.status(200).json({
            success: true,
            kecamatan
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err
        })
    }
}

// add kecamatan
exports.createKecamatan = async (req, res, next) => {
    try {
        const { kode, nama } = req.body;

        const checkkode = await Kecamatan.findOne(
            {
                where: {
                    kode
                }
            }
        )

        if (!kode || !nama) return next(new Error('Kode Kecamatan/Nama Kecamatan harus diisi!'));
        if (checkkode) return next(new Error('Kode Kecamatan sudah ada!'));

        const kecamatan = await Kecamatan.create(req.body);

        res.status(201).json({
            success: true,
            kecamatan
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        })
    }
}

// update kecamatan
exports.updateKecamatan = async (req, res, next) => {
    try {
        const { kode, nama } = req.body;

        if (!kode || !nama) return next(new Error('Kode Kecamatan/Nama Kecamatan harus diisi!'));

        const kecamatan = await Kecamatan.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({
            success: true,
            kecamatan
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

// delete kecamatan
exports.deleteKecamatan = async (req, res, next) => {
    try {

        const id = await Kecamatan.findAll({
            where: {
                id: req.params.id
            }
        });

        if (!id) return next(new Error(`Kecamatan dengan Id ${id} tidak ditemukan!`, 404))

        await Kecamatan.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({
            success: true,
            data: {}
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}