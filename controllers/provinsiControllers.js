const db = require('../config/db');
const Provinsi = db.Provinsi;
const Op = db.Sequelize.Op;

// get all data
exports.getProvinsi = async (req, res) => {
    try {
        const provinsi = await Provinsi.findAll();

        res.status(200).json({
            success: true,
            provinsi
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// get by id data
exports.getByIdProvinsi = async (req, res) => {
    try {
        const provinsi = await Provinsi.findByPk(req.params.id);

        res.status(200).json({
            success: true,
            provinsi
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err
        })
    }
}

// add Provinsi
exports.createProvinsi = async (req, res, next) => {
    try {
        const { kode, nama } = req.body;

        const checkkode = await Provinsi.findOne(
            {
                where: {
                    kode
                }
            }
        )

        if (!kode || !nama) return next(new Error('kode provinsi/Nama harus diisi', 401))

        if (checkkode) return next(new Error('kode provinsi sudah digunakan!', 400))

        const provinsi = await Provinsi.create(req.body);

        res.status(201).json({
            success: true,
            provinsi
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        })
    }
}

// update Provinsi
exports.updateProvinsi = async (req, res, next) => {
    try {
        const { kode, nama } = req.body;

        if (!kode || !nama) return next(new Error('kode provinsi/Nama harus diisi', 401))

        const provinsi = await Provinsi.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({
            success: true,
            provinsi
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

// delete Provinsi
exports.deleteProvinsi = async (req, res, next) => {
    try {

        const id = await Provinsi.findAll({
            where: {
                id: req.params.id
            }
        });

        if (!id) return next(new Error(`Provinsi dengan Id ${id} tidak ditemukan!`, 404))

        await Provinsi.destroy({
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