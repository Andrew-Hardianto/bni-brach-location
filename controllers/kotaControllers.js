const db = require('../config/db');
const Kota = db.Kota;
const Provinsi = db.Provinsi;
const Op = db.Sequelize.Op;

// get all kota
exports.getKota = async (req, res) => {
    try {
        const kota = await Kota.findAll({
            include: [
                {
                    model: Provinsi,
                    attributes: ["id", "nama"],
                }
            ]
        })

        res.status(200).json({
            success: true,
            kota
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }
}

// get kota by id
exports.getByIdKota = async (req, res, next) => {
    try {
        const kota = await Kota.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!kota) return next(new Error(`Kota dengan id ${id} idak ditemukan`, 404));

        res.status(200).json({
            success: true,
            kota
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// add kota
exports.addKota = async (req, res, next) => {
    try {
        const id = await Kota.findOne({
            where: {
                id: req.body.id
            }
        })

        if (id) return next(new Error('ID Sudah ada!', 400));

        const kota = await Kota.create(req.body);

        res.status(201).json({
            success: true,
            kota
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// update kota 
exports.updateKota = async (req, res, next) => {
    try {
        const id = await Kota.findOne({ where: req.params.id });

        if (!id) return next(new Error(`Kota dengan id ${id} tidak ditemukan!`, 404));

        const kota = await Kota.update(req.body, {
            where: {
                id: req.params.id
            }
        })

        res.status(200).json({
            success: true,
            kota
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// delete kota
exports.deleteKota = async (req, res, next) => {
    try {
        const id = await Kota.findOne({ where: req.params.id });

        if (!id) return next(new Error(`Kota dengan id ${id} tidak ditemukan!`, 404));

        await Kota.destroy({ where: { id: req.params.id } });

        res.status(200).json({
            success: true,
            data: {}
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}