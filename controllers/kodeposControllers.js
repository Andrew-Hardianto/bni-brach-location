const db = require('../config/db');
const Kodepos = db.Kodepos;
const Op = db.Sequelize.Op;

// get all data
exports.getKodepos = async (req, res) => {
    try {
        const kodepos = await Kodepos.findAll({ include: ["kelurahan"] });

        res.status(200).json({
            success: true,
            kodepos
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// get by id data
exports.getByIdKodepos = async (req, res) => {
    try {
        const kodepos = await Kodepos.findByPk(req.params.id);

        res.status(200).json({
            success: true,
            kodepos
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

// add Kodepos
exports.createKodepos = async (req, res, next) => {
    try {
        const { kode } = req.body;

        if (!kode) return next(new Error('Kode POS harus diisi!'));

        const checkkode = await Kodepos.findOne({ where: { kode } });

        if (checkkode) return next(new Error('kodepos sudah digunakan!'));

        const kodepos = await Kodepos.create(req.body);

        res.status(201).json({
            success: true,
            kodepos
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        })
    }
}

// update Kodepos
exports.updateKodepos = async (req, res, next) => {
    try {

        const kodepos = await Kodepos.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({
            success: true,
            kodepos
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

// delete Kodepos
exports.deleteKodepos = async (req, res, next) => {
    try {

        const id = await Kodepos.findAll({
            where: {
                id: req.params.id
            }
        });

        if (!id) return next(new Error(`Kodepos dengan Id ${id} tidak ditemukan!`, 404))

        await Kodepos.destroy({
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