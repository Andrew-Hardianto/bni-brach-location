const db = require('../config/db');
const Kelurahan = db.Kelurahan;
const Kodepos = db.Kodepos;
const Op = db.Sequelize.Op;
const fs = require('fs')

// get all data
exports.getKelurahan = async (req, res) => {
    try {
        const kelurahan = await Kelurahan.findAll({ include: ["kecamatan"] });

        res.status(200).json({
            success: true,
            kelurahan
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// get by id data
exports.getByIdKelurahan = async (req, res) => {
    try {
        const kelurahan = await Kelurahan.findByPk(req.params.id, { include: ["kecamatan"] });

        res.status(200).json({
            success: true,
            kelurahan
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

// add Kelurahan
exports.createKelurahan = async (req, res, next) => {
    try {
        const { kode, nama } = req.body;

        const checkkode = await Kelurahan.findOne(
            {
                where: {
                    kode
                }
            }
        )

        if (!kode || !nama) return next(new Error('Kode Kelurahan/Nama Kelurahan harus diisi!'));

        if (checkkode) return next(new Error('Kode Kelurahan sudah ada!'));

        const kelurahan = await Kelurahan.create(req.body);

        res.status(201).json({
            success: true,
            kelurahan
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        })
    }
}

// update Kelurahan
exports.updateKelurahan = async (req, res, next) => {
    try {

        const kelurahan = await Kelurahan.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({
            success: true,
            kelurahan
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

// delete Kelurahan
exports.deleteKelurahan = async (req, res, next) => {
    try {

        const id = await Kelurahan.findAll({
            where: {
                id: req.params.id
            }
        });

        if (!id) return next(new Error(`Kelurahan dengan Id ${id} tidak ditemukan!`, 404))

        await Kelurahan.destroy({
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