const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const db = require('../config/db');
const Wilayah = db.Wilayah;
const Op = db.Sequelize.Op;

// get all wilayah
exports.getAllWilayah = asyncHandler(async (req, res) => {
        const wilayah = await Wilayah.findAll();

        res.status(200).json({
            success: true,
            wilayah
        })
})

// get by id wilayah
exports.getByIdWilayah = asyncHandler(async (req, res, next) => {
        const wilayah = await Wilayah.findByPk(req.params.id);

        if (!wilayah) {
            res.status(404)
            next(new ErrorResponse('Data tidak ditemukan!', 400))
        }

        res.status(200).json({
            success: true,
            wilayah
        })
})

// add Wilayah
exports.createWilayah = asyncHandler(async (req, res, next) => {
        const { Region_Code, Region_Subname, Region_Name } = req.body;

        const checkId = await Wilayah.findOne(
            {
                where: {
                    Region_Code
                }
            }
        )

        if (!Region_Code || !Region_Name || !Region_Subname) return next(new ErrorResponse('Kode/Nama harus diisi!', 400))

        if (checkId) return next(new ErrorResponse('Kode tidak boleh sama!', 400))

        const wilayah = await Wilayah.create(req.body);

        res.status(201).json({
            success: true,
            wilayah
        })
})

// Update wilayah
exports.updateWilayah = asyncHandler(async (req, res, next) => {
        const checkId = await Wilayah.findByPk(req.params.id)

        if (!checkId) {
            res.status(404)
            return next(new ErrorResponse('Wilayah tidak ditemukan!', 400))
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
})

// delete wilayah
exports.deleteWilayah = asyncHandler(async (req, res) => {
        await Wilayah.destroy({
            where: {
                ID_Region: req.params.id
            }
        })

        res.status(200).json({
            success: true,
            data: {}
        })
})