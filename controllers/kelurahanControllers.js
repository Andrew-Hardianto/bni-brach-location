const db = require('../config/db');
const Kelurahan = db.Kelurahan;
const Op = db.Sequelize.Op;

// get all data
exports.getKelurahan = async (req, res) => {
    try {
        const kelurahan = await Kelurahan.findAll();

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
        const kelurahan = await Kelurahan.findByPk(req.params.id);

        res.status(200).json({
            success: true,
            kelurahan
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err
        })
    }
}

// add Kelurahan
exports.createKelurahan = async (req, res, next) => {
    try {
        const id = await Kelurahan.findOne(
            {
                where: {
                    id: req.body.id
                }
            }
        )

        if (id) return next(new Error('ID sudah ada!', 400))

        const kelurahan = await Kelurahan.create(req.body);

        res.status(201).json({
            success: true,
            kelurahan
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err
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

        res.status(201).json({
            success: true,
            kelurahan
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err
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

        res.status(201).json({
            success: true,
            data: {}
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        })
    }
}