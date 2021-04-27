const db = require('../config/db');
const Wilayah = db.Wilayah;
const Op = db.Sequelize.Op;

// get all wilayah
exports.getAllWilayah = async (req, res) => {
    try {
        const wilayah = await Wilayah.findAll();

        res.status(200).json({
            success: true,
            wilayah
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// get by id wilayah
exports.getByIdWilayah = async (req, res, next) => {
    try {
        const wilayah = await Wilayah.findByPk(req.params.kode);

        if (!wilayah) {
            res.status(404)
            next(new Error('Data tidak ditemukan!'))
        }

        res.status(200).json({
            success: true,
            wilayah
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// add Wilayah
exports.createWilayah = async (req, res, next) => {
    try {
        const { kode, nama } = req.body;

        const checkId = Wilayah.findOne({
            id
        })

        if (!kode || !nama) return next(new Error('Kode/Nama harus diisi!'))

        if (checkId) return next(new Error('Kode tidak boleh sama!'))

        const wilayah = await Wilayah.create(req.body);

        res.status(201).json({
            success: true,
            wilayah
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}