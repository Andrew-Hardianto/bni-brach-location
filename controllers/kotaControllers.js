const db = require('../config/db');
const Kota = db.Kota;
const Provinsi = db.Provinsi;
const Op = db.Sequelize.Op;

// get all kota
exports.getKota = async (req, res) => {
    try {
        const kota = await Kota.findAll({ include: ["provinsi"] });

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
        const kota = await Kota.findByPk(req.params.id);

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
        const { id, nama } = req.body;

        const checkId = await Provinsi.findOne(
            {
                where: {
                    id
                }
            }
        )

        if (!id || !nama) return next(new Error('ID/Nama Kota harus diisi!'));
        
        if (checkId) return next(new Error('ID sudah ada!'));

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
        const kota = await Kota.update(req.body, {
            where: {
                id: req.params.id
            }
        })

        res.status(201).json({
            success: true,
            kota
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        })
    }
}

// delete kota
exports.deleteKota = async (req, res, next) => {
    try {
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