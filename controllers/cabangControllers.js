const db = require('../config/db');
const geocoder = require('../utils/geocoder');
const Cabang = db.Cabang;
const Wilayah = db.Wilayah;
const Op = db.Sequelize.Op;

// get all cabang
exports.getAllCabang = async (req, res) => {
    try {
        const cabang = await Cabang.findAll({ include: ["wilayah"] });

        res.status(200).json({
            success: true,
            cabang
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// get all cabang
exports.getByIdCabang = async (req, res) => {
    try {
        const cabang = await Cabang.findByPk(req.params.id, { include: ["wilayah"] });

        res.status(200).json({
            success: true,
            cabang
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// add cabang
exports.createCabang = async (req, res, next) => {
    try {
        const { Branch_Code, Branch_Name, Address, Region_Code } = req.body;

        const checkId = await Cabang.findOne(
            {
                where: {
                    Branch_Code: Branch_Code
                }
            }
        )

        if (!Branch_Code) return next(new Error('Field Branch Code tidak boleh kosong!'));
        if (!Branch_Name) return next(new Error('Field Branch Name tidak boleh kosong!'));
        if (!Address) return next(new Error('Field Address tidak boleh kosong!'));
        if (!Region_Code) return next(new Error('Field Region Code tidak boleh kosong!'));

        if (checkId) return next(new Error('Kode tidak boleh sama!'));

        const cabang = await Cabang.create(req.body);

        res.status(201).json({
            success: true,
            cabang
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

// update cabang
exports.updateCabang = async (req, res, next) => {
    try {
        const { Branch_Code, Branch_Name, Address, Region_Code } = req.body;

        if (!Branch_Code) return next(new Error('Field Branch Code tidak boleh kosong!'));
        if (!Branch_Name) return next(new Error('Field Branch Name tidak boleh kosong!'));
        if (!Address) return next(new Error('Field Address tidak boleh kosong!'));
        if (!Region_Code) return next(new Error('Field Region Code tidak boleh kosong!'));

        const cabang = await Cabang.update(req.body, {
            where: {
                ID_Branch: req.params.id
            }
        })

        res.status(200).json({
            success: true,
            cabang
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// delete cabang
exports.deleteCabang = async (req, res) => {
    try {
        await Cabang.destroy({
            where: {
                ID_Branch: req.params.id
            }
        })

        res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}