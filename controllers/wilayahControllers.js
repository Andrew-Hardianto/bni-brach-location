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
        const wilayah = await Wilayah.findByPk(req.params.id);

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
        const { Region_Code, Region_Subname, Region_Name } = req.body;

        const checkId = await Wilayah.findOne(
            {
                where: {
                    Region_Code
                }
            }
        )

        if (!Region_Code || !Region_Name || !Region_Subname) return next(new Error('Kode/Nama harus diisi!'))

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

// Update wilayah
exports.updateWilayah = async (req, res, next) => {
    try {

        const checkId = await Wilayah.findByPk(req.params.id)

        if (!checkId) {
            res.status(404)
            return next(new Error('Wilayah tidak ditemukan!'))
        }

        const wilayah = await Wilayah.update(req.body, {
            where: {
                ID_Region: req.params.id
            }
        })

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

// delete wilayah
exports.deleteWilayah = async (req, res) => {
    try {
        await Wilayah.destroy({
            where: {
                ID_Region: req.params.id
            }
        })

        res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}