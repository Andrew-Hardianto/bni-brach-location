const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const db = require('../config/db');
const geocoder = require('../utils/geocoder');
const Cabang = db.Cabang;
const Wilayah = db.Wilayah;
const Op = db.Sequelize.Op;

// get all cabang
exports.getAllCabang = asyncHandler(async (req, res) => {
        const cabang = await Cabang.findAll({ include: ["wilayah"] });

        res.status(200).json({
            success: true,
            cabang
        })
})

// get all cabang
exports.getByIdCabang = asyncHandler(async (req, res) => {
        const cabang = await Cabang.findByPk(req.params.id, { include: ["wilayah"] });

        res.status(200).json({
            success: true,
            cabang
        })
})

// add cabang
exports.createCabang = asyncHandler(async (req, res, next) => {
        const { Branch_Code, Branch_Name, Address, Region_Code } = req.body;

        const checkId = await Cabang.findOne(
            {
                where: {
                    Branch_Code: Branch_Code
                }
            }
        )

        if (!Branch_Code) return next(new ErrorResponse('Field Branch Code tidak boleh kosong!', 400));
        if (!Branch_Name) return next(new ErrorResponse('Field Branch Name tidak boleh kosong!', 400));
        if (!Address) return next(new ErrorResponse('Field Address tidak boleh kosong!', 400));
        if (!Region_Code) return next(new ErrorResponse('Field Region Code tidak boleh kosong!', 400));

        if (checkId) return next(new ErrorResponse('Kode tidak boleh sama!', 400));

        const cabang = await Cabang.create(req.body);

        res.status(201).json({
            success: true,
            cabang
        })
})

// update cabang
exports.updateCabang = asyncHandler(async (req, res, next) => {
        const { Branch_Code, Branch_Name, Address, Region_Code } = req.body;

        if (!Branch_Code) return next(new ErrorResponse('Field Branch Code tidak boleh kosong!', 400));
        if (!Branch_Name) return next(new ErrorResponse('Field Branch Name tidak boleh kosong!', 400));
        if (!Address) return next(new ErrorResponse('Field Address tidak boleh kosong!', 400));
        if (!Region_Code) return next(new ErrorResponse('Field Region Code tidak boleh kosong!', 400));

        const cabang = await Cabang.update(req.body, {
            where: {
                ID_Branch: req.params.id
            }
        })

        res.status(200).json({
            success: true,
            cabang
        })
})

// delete cabang
exports.deleteCabang = asyncHandler(async (req, res) => {
        await Cabang.destroy({
            where: {
                ID_Branch: req.params.id
            }
        })

        res.status(200).json({
            success: true,
            data: {}
        })
})