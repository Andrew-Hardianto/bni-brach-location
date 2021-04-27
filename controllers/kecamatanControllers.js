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
        const kecamatan = await Kecamatan.findByPk(req.params.id);

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
        const id = await Kecamatan.findOne(
            {
                where: {
                    id: req.body.id
                }
            }
        )

        if (id) return next(new Error('ID sudah ada!', 400))

        const kecamatan = await Kecamatan.create(req.body);

        res.status(201).json({
            success: true,
            kecamatan
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err
        })
    }
}

// update kecamatan
exports.updateKecamatan = async (req, res, next) => {
    try {

        const kecamatan = await Kecamatan.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        res.status(201).json({
            success: true,
            kecamatan
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err
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

        res.status(201).json({
            success: true,
            data: {}
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err
        })
    }
}